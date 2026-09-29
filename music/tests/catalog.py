"""Synthetic fixtures only; no music-library reads or writes."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location(
    'build_catalog', Path(__file__).resolve().parents[1] / 'scripts/build-catalog.py')
catalog = importlib.util.module_from_spec(spec)
spec.loader.exec_module(catalog)


class ResourceRevisionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)
        self.track = {'id': 'example', 'src': 'song.mp3'}
        self.previous = dict(self.track, audioRevision='old-audio', lyricRevision='old-lyric')

    def update(self):
        catalog.apply_resource_revisions(self.track, self.previous, self.repo)

    def test_unavailable_library_keeps_same_resource_revision(self):
        self.update()
        self.assertEqual(self.track['audioRevision'], 'old-audio')
        self.assertEqual(self.track['lyricRevision'], 'old-lyric')

    def test_new_path_does_not_inherit_old_resource_revision(self):
        self.track['src'] = 'different-song.mp3'
        self.update()
        self.assertEqual(self.track['audioRevision'], 'initial')
        self.assertNotIn('lyricRevision', self.track)

    def test_confirmed_lyric_removal_drops_immutable_revision(self):
        (self.repo / 'song.mp3').write_bytes(b'fixture')
        self.track['lyricRevision'] = 'stale-inline-revision'
        self.update()
        self.assertNotEqual(self.track['audioRevision'], 'old-audio')
        self.assertNotIn('lyricRevision', self.track)

    def test_lyric_edit_changes_only_lyric_revision(self):
        (self.repo / 'song.mp3').write_bytes(b'fixture')
        lyric = self.repo / 'song.lrc'
        lyric.write_text('[00:01.00]Fixture one', encoding='utf-8')
        self.update()
        audio_revision, lyric_revision = self.track['audioRevision'], self.track['lyricRevision']
        lyric.write_text('[00:01.00]Fixture two', encoding='utf-8')
        self.update()
        self.assertEqual(self.track['audioRevision'], audio_revision)
        self.assertNotEqual(self.track['lyricRevision'], lyric_revision)


if __name__ == '__main__':
    unittest.main()
