<p align="center">
  <img src="icons/icon-192.png" width="104" alt="Roylyl Music图标">
</p>

<h1 align="center">Roylyl Music</h1>

<p align="center">把个人音乐库、专辑、歌词和歌单放进浏览器，随时接着听。</p>

<p align="center">
  <a href="https://roylyl.github.io/music/"><img src="https://img.shields.io/badge/在线收听-Roylyl%20Music-83e8c0?style=flat-square" alt="在线收听"></a>
  <a href="app.js"><img src="https://img.shields.io/badge/version-20261009--pwa--40-62c9f3?style=flat-square" alt="前端版本20261009-pwa-40"></a>
  <a href="#开始使用"><img src="https://img.shields.io/badge/platform-Web%20%2F%20PWA-485866?style=flat-square" alt="Web与PWA"></a>
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0-485866?style=flat-square" alt="GPL-3.0许可证"></a>
</p>

<p align="center">
  <a href="#开始使用">开始使用</a> ·
  <a href="#播放与浏览">播放与浏览</a> ·
  <a href="#离线与缓存">离线与缓存</a> ·
  <a href="#曲库与歌单维护">曲库与歌单维护</a> ·
  <a href="https://github.com/Roylyl/Music">音乐库</a>
</p>

Roylyl Music是个人主页下的独立音乐子站，使用原生HTML、CSS和JavaScript，无需登录，也无需安装前端依赖或执行构建。桌面端和手机端共用一套曲库，支持专辑浏览、同步歌词、播放队列与离线缓存，并提供深色、浅色和跟随系统三种外观。

## 开始使用

### 在线收听

打开[Roylyl Music](https://roylyl.github.io/music/)，选择专辑、歌曲或固定歌单即可播放。点击底部的专辑封面进入全屏播放页，在封面与歌词之间切换。

iPhone可在Safari中选择“分享→添加到主屏幕”，从桌面图标打开播放器。其他支持PWA的浏览器可使用浏览器提供的安装入口。首次使用需要联网；系统播放控制和后台运行受浏览器及系统策略影响，iPhone音量由系统控制。

### 本地预览

安装Python3后，在网站仓库根目录运行：

```sh
# macOS/Linux
python3 scripts/preview.py 8037
```

```powershell
# Windows
py -3 scripts/preview.py 8037
```

打开[本地播放器](http://127.0.0.1:8037/music/)。预览服务器默认仅监听本机，支持音频分段请求。请通过HTTP地址访问页面；直接双击HTML文件无法使用完整的PWA缓存功能。

本地预览默认仍读取远程音乐库，首次播放需要联网。只浏览和播放网页时，无需下载整个Music仓库。

## 播放与浏览

| 功能 | 使用方式 |
| --- | --- |
| 专辑与歌曲 | 浏览专辑、搜索歌曲、筛选歌手，按发行年份等条件排序。点击专辑封面进入曲目列表，点击播放键开始播放。 |
| 顺序与随机播放 | 从当前专辑或歌单开始播放；随机模式整轮不重复，播完一轮后重新打乱。上一首沿实际播放历史返回。 |
| 播放队列 | 打开时定位当前曲目，高亮待插队歌曲；手机端标题与关闭按钮保持在列表上方。 |
| 同步歌词 | 按时间滚动和高亮LRC歌词，同一时间的原文与译文一起显示；无时间标签的歌词以纯文本展示。 |
| 全屏播放 | 桌面双栏、手机纵向布局，展示封面、歌词及音源格式、码率、采样率、声道和文件大小。 |
| 歌曲更多菜单 | 分享歌曲、查看专辑、查看歌手；多位歌手可展开选择。 |
| 定时关闭 | 全屏更多菜单可选30分钟、1小时、2小时、3小时或自定义分钟数；显示倒计时，到时暂停并保留进度。 |
| 播放记忆 | 保存曲目、进度、队列、插队和播放模式，刷新后恢复，等待用户点击播放。 |

### 下一首插队

歌曲右侧的“下一首播放”会新增一次播放，放到当前曲目之后。原列表中的歌曲保留：

```text
原列表：A → B → C
播放A时插队B：A → 插队B → 原B → C
依次插队B、C：A → 插队C → 插队B → 原B → C
```

重复添加同一首待插队歌曲，会把它移到下一首；当前歌曲也可以插队，从头再听一次。插队优先于随机和单曲循环，结束后继续原来的播放顺序。

在更多菜单中可“取消此次插队”或“清空待插队”。添加、取消和清空后，底部提示提供5秒撤销入口。开始播放新的专辑或列表会清除旧插队。

### 系统控制与播放恢复

播放器通过Media Session提供锁屏和系统媒体控制。收到暂停或音频中断时保存位置；中断结束后等待用户恢复，避免打断其他应用的音频。网页依赖系统发送耳机暂停事件，不能直接读取耳机佩戴状态。

后台切歌和系统续播优先发起音频播放，再更新界面。启动请求卡住时会尝试一次保留进度的重新加载；加载失败会提供“重试/跳过”。主动暂停、系统中断和新的播放操作会使旧恢复请求失效。

遇到问题可进入“设置→播放诊断”复制记录。诊断仅保存在本机，保留最近24小时最多120条事件，不自动上传。

## 离线与缓存

成功在线打开后，网页和曲库目录可离线重新打开；断网时只能播放已经完整缓存的歌曲。歌曲更多菜单会显示完整缓存状态。

进度条的白色部分表示已播放，浅色部分表示当前音频已缓冲。缓冲区间不等于整首歌曲已保存，离线播放请以完整缓存状态为准。

在设置中可以调整：

- 音乐缓存上限：关闭、256MB、512MB、1GB、2GB、4GB、8GB或无限，默认无限。容量按十进制计算，无限仍受浏览器配额和设备剩余空间限制。
- 下一首预加载：默认开启，会提前下载下一首完整音频；流量有限时可关闭。
- 独立清理音乐、歌词和专辑封面缓存。

网页更新准备完成后会提示刷新，由用户选择更新时间。Service Worker仅管理`/music/`，不影响主站；清理旧网页版本时保留音乐、歌词和封面缓存。

## 曲库与歌单维护

### 数据来自哪里

网页代码位于本仓库的`music/`，音频、原始封面及配套歌词来自[Roylyl/Music](https://github.com/Roylyl/Music)。音源根地址配置在[app.js](app.js)的`ROOT`中，文件按需加载。

| 文件或目录 | 用途 |
| --- | --- |
| [data/catalog.json](data/catalog.json) | 播放器读取的统一目录，打包曲目、歌单、音源参数和资源版本。 |
| [data/tracks.json](data/tracks.json) | 曲目原始索引，包含歌曲ID及音频、封面相对路径。 |
| [data/apple-music.json](data/apple-music.json) | Apple Music导出的歌单、喜欢状态和曲目映射。 |
| [data/audio-properties.json](data/audio-properties.json) | 按歌曲ID及音源路径匹配的音频参数。 |
| [share/](share/)与[share-covers/](share-covers/) | 歌曲分享页面和分享封面。 |
| [scripts/](scripts/)与[reports/](reports/) | 数据导入、目录生成脚本及匹配记录。 |

音频参数描述音源文件，不代表蓝牙传输规格。更换音频后，应同步更新对应路径和参数；歌曲ID用于关联歌单、分享链接及播放记忆，应保持稳定。

### 更新曲库

维护曲库时，建议把两个仓库放在同一父目录：

```text
GitHub/
├── roylyl.github.io/
└── Music/
```

同步`data/tracks.json`和`data/audio-properties.json`后，从网站仓库根目录生成统一目录：

```sh
python3 music/scripts/build-catalog.py
```

脚本会读取相邻Music仓库中可用的音频和LRC，为资源生成独立版本标记。歌词跟随歌曲版本更新；未带版本标记的歌词按24小时重新验证。LRC的`offset`单位为毫秒，正值提前、负值延后，只在解析时应用一次。

需要重新生成歌曲分享页面与JPEG封面时，在macOS运行：

```sh
python3 music/scripts/generate-share-pages.py
```

该脚本使用macOS自带的`sips`处理封面，依赖相邻Music仓库，并在结束时生成统一目录。Windows预览和使用已有分享页面不需要运行它。

### 更新Apple Music歌单

“鹿”“深圳”和“我喜欢”来自Apple Music资料库导出的快照。未入库的条目仍显示，播放时跳过。匹配保留专辑和版本区别，不自动用录音室版替换现场版。

心形图标展示导出的喜欢状态，网页访客不能修改。Apple Music中修改歌单或喜欢状态后，需要重新导入并发布数据。

1. 在Music.app中选择“文件→资料库→导出资料库”，将XML保存在仓库外。XML含本地媒体路径等私人信息，不要加入公开仓库。
2. 在用于维护的Python环境中安装依赖。
3. 从网站仓库根目录执行导入、来源查询和歌单同步，再生成统一目录。

```sh
python3 -m pip install opencc-python-reimplemented
python3 music/scripts/import_apple_music.py /path/to/export.xml
python3 music/scripts/find_playlist_sources.py
python3 music/scripts/finalize_apple_music.py ../Music
python3 music/scripts/build-catalog.py
```

来源查询需要联网，用于补充未匹配条目的目录信息，不会下载完整歌曲。歌单同步会将清单写入Music仓库的`playlists.json`，并同步导入报告。取得音频后，先按Music仓库规范入库，再更新网页索引和歌单映射。

### 发布更新

`music/`随本仓库的GitHub Pages流程发布，入口保持为`/music/`。发布前端或目录更新时，配套更新以下版本：

- [index.html](index.html)中的资源版本参数及设置页版本文案。
- [app.js](app.js)中的`APP_VERSION`和`SHELL_VERSION`。
- [audio-worker.js](audio-worker.js)中的`FILES`资源地址和`SHELL`版本。

数据生成脚本只更新数据，不会代替这一步。资源地址和网页缓存版本一起更新后，已安装的播放器才能收到新版本提示。若修改了音频、歌词或封面路径，也要配套发布Music仓库，避免网页指向不存在的资源。

## 许可与资源

网页代码遵循仓库的[GPL-3.0许可证](../LICENSE)。歌曲、歌词和专辑封面具有各自的权利归属，不因代码许可而取得再分发授权。本站使用公开可访问的资源地址，没有私有音乐存储或访问控制功能。
