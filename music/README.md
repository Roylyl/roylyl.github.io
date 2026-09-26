# Roylyl Music

`/music/`是独立的静态音乐子站，沿用个人主页的深色、冰蓝、薄荷绿和半透明圆角风格。页面无需登录，不加载主站的JavaScript或CSS，也不修改主站导航与背景音乐。没有Service Worker，不会接管其他页面。

## 音乐来源

- 在线索引：`https://raw.githubusercontent.com/Roylyl/Music/main/tracks.json`
- 音频及封面：相同仓库的相对路径，经逐段URL编码后访问。
- `data/tracks.json`是轻量索引备份，远端索引不可用时使用；不是离线音频缓存。
- 音频按需加载，不随网页复制或预下载整个音乐库。

支持专辑浏览、歌曲搜索、歌手筛选、发行年份排序、Apple Music固定歌单、播放队列、随机播放、列表/单曲循环、进度调整和Media Session。iPhone锁屏控制及蓝牙行为仍需真机验证。iOS通常由系统控制音量。

“我喜欢”完全取自`data/apple-music.json`，不读取或修改浏览器收藏；心形图标只展示Apple Music的喜欢状态。最近播放位置仍存于当前浏览器的`roy-music:*`键下。加载页面不会自动播放。此站点没有访问控制，公开音频地址也不构成私有存储。

## 本地预览

从网站仓库根目录运行：

```sh
python3 -m http.server 8037 --bind 127.0.0.1
```

打开`http://127.0.0.1:8037/music/`。部署时仅将`music/`目录随现有GitHub Pages流程发布，入口为`https://roylyl.github.io/music/`。本目录没有独立构建步骤。

更新音乐后，远端`tracks.json`会在下次加载时读取；可同步更新`data/tracks.json`作为备用。更换资源托管时只需调整`app.js`中的`ROOT`。

## 全屏播放与音频参数

点击专辑网格封面、专辑名称或推荐专辑封面进入歌曲列表，不改变当前播放；点击封面右下角的绿色播放键或“播放专辑”，会关闭随机与循环模式，从第一首按专辑曲序播放；点击歌曲则播放所选歌曲。点击底部当前歌曲封面或音频参数按钮打开全屏界面。全屏采用桌面双栏与手机纵向布局，播放控制使用统一SVG图标。支持浏览器原生全屏时会请求全屏，不支持时使用覆盖视口的播放页面。

`data/audio-properties.json`保存按曲目ID及相对路径匹配的音源参数，来自音乐库的`audioProperties`。展示格式、码率、采样率、声道及文件大小；有固定且已记录位深的格式才显示位深，MP3不显示这一项。音源替换后需同步更新此参数文件，浏览器不会根据播放设备推断音源规格。

## Apple Music固定歌单

侧栏固定展示“鹿”“我🩷深圳”；最后一个来自Apple Music的“mq”，只更改网页名称。按XML导出的曲序保存所有条目，未入库的歌曲仍显示，播放时跳过。按歌曲、专辑及版本匹配资源，现场版不自动换成录音室版。现有音源仍通过`Roylyl/Music`仓库的相对路径播放。

“我喜欢”使用导出资料库中的`Favorited`或`Loved`标记，排除音乐视频。它不允许在网页本地修改。两个歌单和喜欢列表都是**导出时的快照**；静态网页不会实时读取Mac上的Music.app，也没有配置后台同步服务。Apple Music中更改后，需要重新导出并运行导入脚本，再发布更新后的JSON。喜欢列表的成员与Apple Music一致，排列采用资料库导出顺序。

### 更新步骤

1. 在Music.app选择“文件→资料库→导出资料库”，将XML保存在仓库外。XML包含本地媒体路径等私人元数据，不应发布。
2. 在Python环境中安装`opencc-python-reimplemented`，用于简繁体匹配。
3. 从网站仓库根目录运行：

```sh
python3 music/scripts/import_apple_music.py /path/to/export.xml
python3 music/scripts/find_playlist_sources.py
python3 music/scripts/finalize_apple_music.py ../Music
```

导入脚本只写经过筛选的歌名、艺人、专辑、曲序、来源和曲目映射。`data/apple-music.json`供前端读取；`reports/apple-music-matches.json`记录版本匹配；`reports/source-search.json`缓存来源搜索结果。最后一步把便携歌单清单写入音频仓库的`playlists.json`，并将补源报告同步到两边的`reports/`。

来源搜索区分可购买下载、仅在线播放和未匹配。不把试听片段当成完整歌曲，不把Apple Music受保护下载复制成网页MP3。取得独立音频后，按音乐仓库既有规范入库并更新`tracks.json`，再重新导入歌单。
