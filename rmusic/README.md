<p align="center">
  <img src="icon.svg" width="104" alt="R music图标">
</p>

<h1 align="center">R music</h1>

<p align="center">连接Music个人曲库，在横向卡片与网格墙面中选歌，以动态歌词陪伴播放。</p>

<p align="center">
  <a href="source/package.json"><img src="https://img.shields.io/badge/version-1.0.0-485866?style=flat-square" alt="R music版本1.0.0"></a>
  <a href="https://roylyl.github.io/rmusic/"><img src="https://img.shields.io/badge/在线使用-R%20music-e96520?style=flat-square" alt="在线使用R music"></a>
  <a href="#开始使用"><img src="https://img.shields.io/badge/platform-Web%20%2F%20PWA-485866?style=flat-square" alt="Web与PWA"></a>
  <a href="#源码开发"><img src="https://img.shields.io/badge/Node.js-%E2%89%A524-485866?style=flat-square" alt="开发环境Node.js24及以上"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-485866?style=flat-square" alt="前端软件许可证AGPL-3.0"></a>
  <a href="https://github.com/chthollyphile/folia-major"><img src="https://img.shields.io/badge/upstream-Folia-485866?style=flat-square" alt="上游项目Folia"></a>
</p>

<p align="center">
  <a href="https://roylyl.github.io/rmusic/">打开播放器</a> ·
  <a href="#主要功能">主要功能</a> ·
  <a href="#设置与缓存">设置与缓存</a> ·
  <a href="#源码开发">源码开发</a> ·
  <a href="#许可与资源权利">许可与资源权利</a>
</p>

R music是Roylyl个人主页下的音乐播放器，使用[Folia](https://github.com/chthollyphile/folia-major)的Web前端，连接[Music个人曲库](https://github.com/Roylyl/Music)。曲目、专辑、歌单、封面和标准化歌词由静态曲库提供，无需登录音乐平台或搭建Navidrome服务器。

播放界面、歌词动画、可视化与队列拼贴等主要前端实现来自chthollyphile及Folia贡献者。Roylyl负责个人曲库适配、浏览布局、界面精简和静态网站部署；本项目是独立维护的Folia修改版。

## 开始使用

1. 打开[在线播放器](https://roylyl.github.io/rmusic/)。
2. 浏览或搜索歌曲、专辑、歌手与歌单，选择歌曲开始播放。
3. 使用底部居中的播放器暂停、切歌、拖动进度或切换循环模式；最右侧的队列按钮打开右侧歌曲列表。
4. 打开“选项”调整主题、歌词动画、浏览布局和缓存容量。

首次加载曲库、音频和歌词需要联网。页面适配桌面与手机浏览器；iPhone可通过Safari的“分享→添加到主屏幕”使用，其他支持PWA的浏览器可使用安装入口。PWA需要HTTPS或本机localhost环境，系统播放控制和后台运行取决于浏览器与系统支持。

### 本地预览

已构建的页面位于本目录，无需安装前端依赖。安装Python3后，在网站仓库根目录运行：

```sh
# macOS/Linux
python3 scripts/preview.py 8037
```

```powershell
# Windows
py -3 scripts/preview.py 8037
```

打开[本地播放器](http://127.0.0.1:8037/rmusic/)。保留同一网站中的`music/data/catalog.json`和`music/share-covers/`；音频与歌词默认从Music仓库读取。

## 主要功能

| 功能 | 说明 |
| --- | --- |
| 曲库浏览 | 按歌曲、专辑、歌手和歌单浏览与搜索，沿用Music曲库中的曲目ID和歌单顺序。 |
| 两种浏览布局 | “横向卡片”和“网格墙面”共用一个设置，覆盖首页及歌单、专辑、歌手等全屏选曲页面。 |
| 动态歌词 | 提供Folia的歌词动画与可视化，读取曲库已有的标准化歌词，按歌曲ID区分不同版本。 |
| 播放控制 | 底部居中播放器提供播放、暂停、上一首、下一首和进度控制；循环按钮在列表循环、随机播放、单曲循环之间切换。 |
| 当前队列 | 从播放器最右侧按钮打开右侧歌曲列表，查看和选择当前队列中的歌曲。 |
| 队列拼贴 | 将播放队列中的封面组成海报墙，展示当前曲目的歌词与播放控制。 |
| 音频预缓存 | 默认开启歌曲缓存，提前加载队列中的待播歌曲，减少切歌等待；支持设置缓存容量。 |
| 歌曲分享 | 调用系统分享面板或复制歌曲链接，每首歌都有独立分享页和封面元数据。 |
| 独立配置 | 使用独立的浏览器存储与PWA范围，可与原`/music/`播放器并行使用。 |

曲库中的喜欢状态用于展示，此个人站点中的爱心为只读。

### 分享歌曲

从歌曲操作入口选择分享。支持系统分享的浏览器会打开设备分享面板，其他浏览器提供复制链接入口。

每首歌曲的分享页位于`/rmusic/share/<歌曲ID>.html`，显示歌名、歌手、专辑和封面，并提供“打开R music”入口。进入播放器后定位对应曲目，等待用户点击播放。分享页的HTML包含标题与封面元数据，链接卡片的具体样式由接收应用决定。

## 设置与缓存

设置页统一使用“选项”入口，左侧按以下顺序显示五个按钮，手机端使用相同顺序的导航：

| 设置 | 内容 |
| --- | --- |
| 视觉设置 | 选择歌词动画，以及跟随系统、深色模式、浅色模式、跟随封面四种主题。 |
| 界面设置 | 选择语言、播放后进入的视图，以及横向卡片或网格墙面。语言支持跟随系统、简体中文、English、繁體中文。 |
| 播放控制 | 调整歌词相关行为和播放设备。 |
| 存储与更新 | 查看与清理缓存、设置歌曲缓存容量、检查应用更新。 |
| 关于 | 查看应用介绍、源码、音乐仓库与许可证，复制播放诊断。 |

卡片样式、背景和字体使用统一配置，首页歌单采用纯图片封面。歌词页的附加字幕层关闭，主歌词动画正常显示。全屏选曲页面共享浏览布局，切换布局保留筛选、选中项和播放队列。

### 缓存容量

歌曲缓存默认开启，并主动预加载队列中的相邻歌曲。到达列表末尾时会继续预缓存列表开头。

容量可选1GB、3GB、5GB、无限，默认无限。选择有限容量后，超出上限时优先清理较久未播放的歌曲。“无限”表示应用不主动设置容量上限，实际可用空间仍由浏览器和设备存储决定。可在“存储与更新”查看缓存歌曲数量和占用空间，并按类别清理缓存。

### 应用更新

打开“存储与更新”时自动检查应用更新，发现新版本后才显示“更新”按钮。点击更新会载入新版本并重新加载页面。应用更新通过PWA服务工作线程完成，曲库内容由独立的Music目录提供。

## 曲库与架构

R music沿用原播放器连接Music仓库的方式，通过静态适配层向Folia组件提供曲库数据，不需要Navidrome服务器或音乐平台账号。

| 内容 | 来源与处理方式 |
| --- | --- |
| 曲目、专辑、歌单与喜欢状态 | 同一网站的`../music/data/catalog.json`。 |
| 音频 | `https://raw.githubusercontent.com/Roylyl/Music/main/`加曲目`src`路径，按路径段编码，附带`audioRevision`。 |
| 歌词 | 同一Music歌曲路径下的LRC，附带`lyricRevision`，按歌曲ID匹配录音室及现场版本。 |
| 封面 | 同一网站的`../music/share-covers/`，读取对应JPG封面。 |

适配逻辑位于[rmusicCatalog.ts](source/src/services/rmusicCatalog.ts)。歌词使用曲库中已有的标准化版本，不通过其他平台的自动匹配覆盖它们。修改曲库后，两套播放器共用更新后的目录和资源。

```text
rmusic/
├── index.html             # 可部署的Web入口
├── assets/                # 构建生成的脚本、样式与界面资源
├── manifest.webmanifest   # PWA名称、图标与页面范围
├── sw.js                  # PWA服务工作线程
├── icons/                 # 浏览器标签页、主屏幕与PWA图标
├── share-cover.png        # 播放器主页的分享缩略图
├── share/                 # 每首歌曲的静态分享页
├── source/                # 修改后的前端源码及构建配置
│   ├── src/               # Folia界面与R music曲库适配
│   ├── shared/            # 前端使用的共享代码
│   ├── dev/               # 拼音、分词等构建数据与脚本
│   ├── package.json       # 依赖与开发命令
│   ├── pnpm-lock.yaml     # 依赖版本记录
│   └── scripts/build.mjs  # 构建并更新本目录的静态文件
├── LICENSE                # AGPL-3.0完整许可证
├── NOTICE                 # 上游归属、版本与修改说明
├── THIRD_PARTY_NOTICES.md  # OpenCC与jieba的许可告知
└── licenses/              # 随附第三方许可证全文
```

## 源码开发

需要Node.js24及以上版本、pnpm11.25.0。项目的`packageManager`字段记录了pnpm版本。进入网站仓库后运行：

```sh
cd rmusic/source
pnpm install --frozen-lockfile
pnpm dev
```

打开[开发页面](http://127.0.0.1:5174/rmusic/)。开发服务器同时提供网站中的曲库目录和封面，无需另起后端。

在同一目录构建：

```sh
pnpm build
```

构建成功后更新`rmusic/index.html`、`rmusic/assets/`和PWA文件。`source/`、许可证和文档保留；`node_modules/`与中间构建目录不进入版本控制。基础路径、PWA范围及曲库预览配置位于[vite.config.ts](source/vite.config.ts)。

构建同时根据现有曲库生成歌曲分享页。只更新曲目信息后，也可在`rmusic/source`中运行`pnpm share:build`重新生成。部署时需同时发布`share/`和对应封面，使分享链接与缩略图可从公网访问。

## 上游项目与本项目改动

| 项目 | 来源 |
| --- | --- |
| 上游名称 | Folia（Lyrics Reimagined／辞曲新境）。 |
| 作者与贡献者 | [chthollyphile](https://github.com/chthollyphile)及[上游贡献者](https://github.com/chthollyphile/folia-major/blob/main/CONTRIBUTORS.md)。 |
| 上游仓库 | [chthollyphile/folia-major](https://github.com/chthollyphile/folia-major)。 |
| 本项目采用的版本 | 所提供源码包标识的Folia0.7.18，提交[9a01e788ed52d25ea01b1f0d37934e5e371ae82b](https://github.com/chthollyphile/folia-major/tree/9a01e788ed52d25ea01b1f0d37934e5e371ae82b)。 |
| 上游许可证 | [GNU Affero General Public License v3.0](https://github.com/chthollyphile/folia-major/blob/main/LICENSE)。本目录保留[许可证全文](LICENSE)。 |
| R music源码 | 本目录中的[source/](source)，含修改后的前端、必要共享代码、构建脚本与依赖锁定文件。 |

R music1.0.0的主要适配于2026年10月13日完成：

- 将网页标题、PWA名称及界面品牌统一为R music。
- 增加Music静态曲库适配，连接现有音频、标准化歌词、封面及固定歌单。
- 调整本地存储、PWA范围、移动端布局和浏览器播放控制。
- 更新字母R图标，并增加逐曲分享页、系统分享入口和分享链接的暂停恢复。
- 将界面聚焦个人曲库，移除需要平台账号、独立服务端及不再使用的设置入口。
- 统一横向卡片与网格墙面的浏览偏好，简化为五项设置导航，并集中底部播放控制与右侧队列入口。
- 默认启用音频预缓存，提供1GB、3GB、5GB及无限容量选项，将应用更新集中到设置页。

上游已有代码及其作者归属保留。React、Three.js、歌词处理库和其他第三方依赖继续遵守各自的许可证；依赖清单与版本见[package.json](source/package.json)及[pnpm-lock.yaml](source/pnpm-lock.yaml)。随附的jieba数据、OpenCC代码及编入产物的派生字表，其来源和许可全文入口见[第三方告知](THIRD_PARTY_NOTICES.md)。

## 许可与资源权利

### 前端软件与对应源码

R music基于Folia修改，前端软件及适配改动按本目录的[AGPL-3.0](LICENSE)提供。[NOTICE](NOTICE)记录上游来源及改动日期。网站仓库根目录的其他许可说明不替代本子项目的许可证；另行标注许可的第三方组件仍按各自许可处理。

分发或公开部署修改版时，应保留上游版权、许可和修改说明，并提供与所运行版本对应的可获取源码，包括修改代码及必要构建文件。AGPL-3.0第13条规定了适用的网络交互场景下提供对应源码的要求。网页已有“源码”入口；发布时需让它指向实际公开且与部署版本对应的源码，不能只上传构建后的文件或只链接未修改的上游仓库。

上游[README的法律说明](https://github.com/chthollyphile/folia-major/blob/9a01e788ed52d25ea01b1f0d37934e5e371ae82b/README.md#法律与免责声明)同时列有个人学习、技术交流、非营利测试及不用于商业盈利的用途说明，其许可证文件使用标准AGPL-3.0文本。本项目如实保留这一表述差异，不将AGPL-3.0改写为非商业许可证。R music用于个人站点；如计划商用，应先核对上述说明与正式许可证的关系并向上游确认授权。

### 音乐与其他素材

音频、歌词、专辑封面、艺术家图片及其他第三方素材的权利分别属于对应权利人，不随前端软件的AGPL-3.0许可证开放。Music曲库记录来源和`rightsStatus`、`redistributionAllowed`等字段；其中`redistributionAllowed:false`表示不能据此主张已获公开再分发许可，字段缺失也不代表允许。

当前曲库适配层不会按这些权利字段自动过滤歌曲。部署者应预先提供适合其使用范围的已授权曲库，不能把播放器能够播放理解为素材已获授权。

公开播放、上传、缓存分发或再利用这些材料前，应取得相应授权，或改用具有明确许可的素材。能下载、个人持有或注明来源均不能替代授权。R music不宣称获得音乐平台、唱片公司或其他内容权利人的额外授权。音乐资料的维护说明见[Music仓库](https://github.com/Roylyl/Music#资料边界与许可)。

上游随附的插画、头像与其他图片也应按各自声明处理。Cappella的[头像说明](source/src/components/visualizer/cappella/avatar/README.md)和[表情说明](source/src/components/visualizer/cappella/emo/README.md)保留上游关于AI图像的来源与使用告知；这些原始说明不构成本项目对图像版权或第三方权利的法律保证。

本README说明项目来源和许可边界，不授予上游未授予的权利，也不替代对具体代码、素材及使用方式的授权核查。
