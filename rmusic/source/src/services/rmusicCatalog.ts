import type {
    SubsonicAlbum,
    SubsonicArtist,
    SubsonicPlaylist,
    SubsonicResponse,
    SubsonicSong,
} from '../types/navidrome';

export const RMUSIC_SERVER = 'rmusic://catalog';
export const RMUSIC_FAVORITE_NOTICE = '你不能点击，这个按钮仅限Roylyl操作';
export const RMUSIC_PLAYLIST_NOTICE = '固定歌单由Roylyl维护，请在原始曲库中更新。';
const MUSIC_ROOT = 'https://raw.githubusercontent.com/Roylyl/Music/main/';

interface CatalogTrack {
    id: string;
    title: string;
    artist: string;
    album: string;
    albumYear?: number;
    albumArtist?: string;
    releaseEdition?: string;
    trackNumber: number;
    discNumber: number;
    duration: number;
    src: string;
    cover: string;
    audioRevision?: string;
    lyricRevision?: string;
}

interface AppleEntry {
    trackId?: string;
    title: string;
    artist: string;
    album: string;
}

interface CatalogPayload {
    version: string;
    tracks: CatalogTrack[];
    audioProperties?: Record<string, { fileSize?: number; bitRate?: number; }>;
    appleMusic: {
        updatedAt: string;
        entries: Record<string, AppleEntry>;
        favorites: string[];
        playlists: Array<{ id: string; name: string; entries: string[]; }>;
    };
}

export interface RmusicCatalog {
    version: string;
    tracks: CatalogTrack[];
    songs: SubsonicSong[];
    albums: SubsonicAlbum[];
    artists: SubsonicArtist[];
    playlists: SubsonicPlaylist[];
    favorites: SubsonicSong[];
    tracksById: Map<string, CatalogTrack>;
    songsById: Map<string, SubsonicSong>;
    albumsById: Map<string, SubsonicAlbum>;
    artistsById: Map<string, SubsonicArtist>;
}

let catalog: RmusicCatalog | null = null;
let catalogRequest: Promise<RmusicCatalog> | null = null;
const lyricRequests = new Map<string, Promise<string | null>>();
const normalize = (value: string): string => value.normalize('NFKC').toLocaleLowerCase().trim();
const encodePath = (path: string): string => path.split('/').map(encodeURIComponent).join('/');
const artistNames = (value: string): string[] => value.split(/\s+(?:&|／|\/)\s+|[、;；]/).map(name => name.trim()).filter(Boolean);
const artistId = (name: string): string => 'artist:' + name;
const safePath = (path: unknown): path is string => typeof path === 'string'
    && !path.startsWith('/') && !path.includes('\\') && !path.split('/').some(part => part === '..')
    && !/^[a-z]+:/i.test(path);
const yearOf = (track: CatalogTrack): number => Number(track.albumYear ?? track.src.match(/\/(\d{4}) - /)?.[1]) || 0;

// Resolve against the published page, so the same adapter works in /rmusic/ and a local preview.
const libraryBase = (): URL => new URL('../music/', document.baseURI);
const coverUrl = (path: string): string => new URL('share-covers/' + encodePath(path.replace(/\.[^/.]+$/, '.jpg')), libraryBase()).href;
const lookupId = (id: string): string => id.startsWith('rmusic:') ? id.slice(7) : id;

function shuffle<T>(values: T[]): T[] {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index--) {
        const other = Math.floor(Math.random() * (index + 1));
        [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
}

function buildCatalog(payload: CatalogPayload): RmusicCatalog {
    if (!payload?.version || !Array.isArray(payload.tracks) || !payload.appleMusic?.entries
        || !Array.isArray(payload.appleMusic.playlists) || !Array.isArray(payload.appleMusic.favorites)) {
        throw new Error('音乐目录格式不正确，请更新网页曲库。');
    }
    const tracks = payload.tracks.filter(track => track && typeof track.id === 'string'
        && typeof track.title === 'string' && typeof track.artist === 'string' && typeof track.album === 'string'
        && safePath(track.src) && /\.mp3$/i.test(track.src) && safePath(track.cover));
    const tracksById = new Map(tracks.map(track => [track.id, track]));
    if (!tracks.length || tracksById.size !== tracks.length) throw new Error('音乐目录为空或歌曲标识重复。');
    const apple = payload.appleMusic;
    for (const id of [...apple.favorites, ...apple.playlists.flatMap(playlist => playlist.entries)]) {
        const entry = apple.entries[id];
        if (!entry || (entry.trackId && !tracksById.has(entry.trackId))) throw new Error('歌单与音乐目录版本不一致。');
    }
    const favoriteIds = new Set(apple.favorites.map(id => apple.entries[id]?.trackId).filter(Boolean));

    // Match the original player's album ownership, including albums with guest performers.
    const releaseKey = (track: CatalogTrack): string => track.src.split('/')[0] + '/' + yearOf(track)
        + '/' + normalize(track.album).replace(/\s+/g, ' ') + '/' + (track.releaseEdition || '');
    const owners = new Map<string, Set<string>>();
    for (const track of tracks) {
        const owner = track.src.split('/')[1];
        if (owner && artistNames(owner).length === 1) {
            const candidates = owners.get(releaseKey(track)) || new Set<string>();
            candidates.add(owner);
            owners.set(releaseKey(track), candidates);
        }
    }
    const albumsById = new Map<string, SubsonicAlbum>();
    const songsById = new Map<string, SubsonicSong>();
    for (const track of tracks) {
        const [category, pathOwner] = track.src.split('/');
        const candidates = [...(owners.get(releaseKey(track)) || [])].filter(name => artistNames(pathOwner).includes(name));
        const owner = track.albumArtist || (candidates.length === 1 ? candidates[0] : pathOwner);
        const displayOwner = owner === pathOwner && normalize(owner) === normalize(track.artist) ? track.artist : owner;
        const albumId = 'album:' + category + '/' + owner + '/' + releaseKey(track);
        let album = albumsById.get(albumId);
        if (!album) {
            album = {
                id: albumId, name: track.album, artist: displayOwner, artistId: artistId(displayOwner),
                coverArt: 'cover:' + track.cover, songCount: 0, duration: 0,
                created: payload.version, year: yearOf(track) || undefined, song: [],
            };
            albumsById.set(albumId, album);
        }
        const properties = payload.audioProperties?.[track.id];
        const song: SubsonicSong = {
            id: track.id, parent: albumId, isDir: false, title: track.title, album: track.album,
            artist: track.artist, track: track.trackNumber, discNumber: track.discNumber,
            year: yearOf(track) || undefined, coverArt: 'cover:' + track.cover,
            size: properties?.fileSize || 0, contentType: 'audio/mpeg', suffix: 'mp3',
            duration: track.duration, bitRate: properties?.bitRate ? Math.round(properties.bitRate / 1000) : undefined,
            path: track.src, created: payload.version, albumId, artistId: artistId(artistNames(track.artist)[0] || track.artist),
            type: 'music', isVideo: false, starred: favoriteIds.has(track.id) ? apple.updatedAt : undefined,
        };
        album.song!.push(song);
        album.songCount++;
        album.duration += song.duration;
        songsById.set(song.id, song);
    }
    const albums = [...albumsById.values()];
    for (const album of albums) album.song!.sort((a, b) => (a.discNumber || 1) - (b.discNumber || 1) || (a.track || 0) - (b.track || 0));
    const artistsById = new Map<string, SubsonicArtist>();
    for (const album of albums) {
        const artist = artistsById.get(album.artistId) || { id: album.artistId, name: album.artist, albumCount: 0, coverArt: album.coverArt };
        artist.albumCount = (artist.albumCount || 0) + 1;
        artistsById.set(artist.id, artist);
    }
    for (const song of songsById.values()) {
        for (const name of artistNames(song.artist)) {
            const id = artistId(name);
            if (!artistsById.has(id)) artistsById.set(id, { id, name, albumCount: 0, coverArt: song.coverArt });
        }
    }
    const orderedSongs = (ids: string[]): SubsonicSong[] => ids.map(id => songsById.get(apple.entries[id]?.trackId || '')).filter((song): song is SubsonicSong => Boolean(song));
    const playlists = apple.playlists.map(playlist => {
        const entry = orderedSongs(playlist.entries);
        return {
            id: playlist.id, name: playlist.name, comment: '来自Apple Music与个人曲库', owner: 'Roylyl', public: true,
            songCount: entry.length, duration: entry.reduce((sum, song) => sum + song.duration, 0),
            created: apple.updatedAt, changed: apple.updatedAt, coverArt: entry[0]?.coverArt, entry,
        } satisfies SubsonicPlaylist;
    });
    return {
        version: payload.version, tracks, songs: [...songsById.values()], albums,
        artists: [...artistsById.values()].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN')),
        playlists, favorites: orderedSongs(apple.favorites), tracksById, songsById, albumsById, artistsById,
    };
}

export function loadRmusicCatalog(): Promise<RmusicCatalog> {
    if (catalog) return Promise.resolve(catalog);
    if (!catalogRequest) {
        catalogRequest = (async () => {
            const controller = new AbortController();
            const timeout = window.setTimeout(() => controller.abort(), 15000);
            try {
                const response = await fetch(new URL('data/catalog.json', libraryBase()), { cache: 'no-cache', signal: controller.signal });
                if (!response.ok) throw new Error('音乐目录加载失败，请检查网络后重试。');
                catalog = buildCatalog(await response.json());
                return catalog;
            } finally {
                window.clearTimeout(timeout);
            }
        })().catch(error => {
            catalogRequest = null;
            throw error;
        });
    }
    return catalogRequest;
}

export function rmusicStreamUrl(id: string): string {
    const track = catalog?.tracksById.get(lookupId(id));
    if (!track) throw new Error('歌曲尚未加载到音乐目录。');
    return MUSIC_ROOT + encodePath(track.src) + '?v=' + encodeURIComponent(track.audioRevision || 'initial');
}

export function rmusicCoverUrl(id: string): string {
    if (id.startsWith('cover:')) {
        const path = id.slice(6);
        if (safePath(path)) return coverUrl(path);
    }
    const song = catalog?.songsById.get(lookupId(id));
    const album = catalog?.albumsById.get(id);
    const artist = catalog?.artistsById.get(id);
    const playlist = catalog?.playlists.find(item => item.id === id);
    const cover = song?.coverArt || album?.coverArt || artist?.coverArt || playlist?.coverArt;
    return cover ? rmusicCoverUrl(cover) : new URL('placeholder.svg', libraryBase()).href;
}

export async function rmusicLyrics(artist: string, title: string, songId?: string): Promise<string | null> {
    const library = await loadRmusicCatalog();
    const track = songId ? library.tracksById.get(lookupId(songId)) : library.tracks.find(item => normalize(item.title) === normalize(title) && normalize(item.artist) === normalize(artist));
    if (!track) return null;
    const path = track.src.replace(/\.[^./]+$/, '.lrc');
    const url = MUSIC_ROOT + encodePath(path) + (track.lyricRevision ? '?lyricRevision=' + encodeURIComponent(track.lyricRevision) : '');
    let request = lyricRequests.get(url);
    if (!request) {
        request = (async () => {
            const controller = new AbortController();
            const timeout = window.setTimeout(() => controller.abort(), 10000);
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (response.status === 404) return null;
                if (!response.ok) throw new Error('歌词加载失败');
                return await response.text();
            } finally { window.clearTimeout(timeout); }
        })().catch(() => { lyricRequests.delete(url); return null; });
        lyricRequests.set(url, request);
    }
    return request;
}

type ParamValue = string | number | boolean | Array<string | number | boolean>;
export async function rmusicSubsonic<T>(endpoint: string, params: Record<string, ParamValue> = {}): Promise<SubsonicResponse<T>> {
    const library = await loadRmusicCatalog();
    const id = String(params.id || '');
    const size = (key: string, fallback: number): number => Math.max(0, Number(params[key] ?? fallback) || 0);
    const offset = size('offset', 0);
    let payload: Record<string, unknown> = {};
    switch (endpoint.replace(/\.view$/, '')) {
        case 'ping': break;
        case 'getOpenSubsonicExtensions': payload = { openSubsonicExtensions: [] }; break;
        case 'getUser': payload = { user: { username: 'Roylyl', streamRole: true, coverArtRole: true, playlistRole: false, downloadRole: false, uploadRole: false, settingsRole: false, adminRole: false, scrobblingEnabled: false } }; break;
        case 'getMusicFolders': payload = { musicFolders: { musicFolder: [{ id: 'music', name: '个人曲库' }] } }; break;
        case 'getLicense': payload = { license: { valid: true } }; break;
        case 'getAlbumList2': {
            const type = String(params.type || 'alphabeticalByName');
            let albums = [...library.albums];
            if (type === 'random') albums = shuffle(albums);
            else if (type === 'newest') albums.sort((a, b) => (b.year || 0) - (a.year || 0) || a.name.localeCompare(b.name, 'zh-CN'));
            else if (type === 'alphabeticalByArtist') albums.sort((a, b) => a.artist.localeCompare(b.artist, 'zh-CN') || a.name.localeCompare(b.name, 'zh-CN'));
            else albums.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
            payload = { albumList2: { album: albums.slice(offset, offset + size('size', 50)) } };
            break;
        }
        case 'getAlbum': payload = { album: library.albumsById.get(id) }; break;
        case 'getSong': payload = { song: library.songsById.get(lookupId(id)) }; break;
        case 'getPlaylists': payload = { playlists: { playlist: library.playlists } }; break;
        case 'getPlaylist': payload = { playlist: library.playlists.find(playlist => playlist.id === id) }; break;
        case 'getRandomSongs': payload = { randomSongs: { song: shuffle(library.songs).slice(0, size('size', 100)) } }; break;
        case 'getStarred2': payload = { starred2: { song: library.favorites, artist: [], album: [] } }; break;
        case 'getArtists': payload = { artists: { index: [{ name: '个人曲库', artist: library.artists }] } }; break;
        case 'getArtist': {
            const artist = library.artistsById.get(id);
            const album = library.albums.filter(item => item.artistId === id || item.song?.some(song => artistNames(song.artist).some(name => artistId(name) === id)));
            payload = { artist: artist ? { ...artist, album } : undefined };
            break;
        }
        case 'search3': {
            const query = normalize(String(params.query || ''));
            const matches = (...values: string[]): boolean => values.some(value => normalize(value).includes(query));
            payload = { searchResult3: {
                artist: library.artists.filter(artist => matches(artist.name)).slice(size('artistOffset', 0), size('artistOffset', 0) + size('artistCount', 5)),
                album: library.albums.filter(album => matches(album.name, album.artist)).slice(size('albumOffset', 0), size('albumOffset', 0) + size('albumCount', 10)),
                song: library.songs.filter(song => matches(song.title, song.artist, song.album)).slice(size('songOffset', 0), size('songOffset', 0) + size('songCount', 20)),
            } };
            break;
        }
        case 'getLyricsBySongId': payload = { lyricsList: {} }; break;
        case 'getLyrics': payload = { lyrics: { value: await rmusicLyrics(String(params.artist || ''), String(params.title || ''), params.id ? String(params.id) : undefined) } }; break;
        case 'scrobble': break; // No server or Apple Music state is written.
        case 'star': case 'unstar': throw new Error(RMUSIC_FAVORITE_NOTICE);
        case 'createPlaylist': case 'deletePlaylist': case 'updatePlaylist': throw new Error(RMUSIC_PLAYLIST_NOTICE);
        default: throw new Error('此操作不适用于个人静态曲库。');
    }
    return { 'subsonic-response': { status: 'ok', version: '1.16.1', type: 'R music', serverVersion: '1.0.0', openSubsonic: false, ...payload } } as SubsonicResponse<T>;
}
