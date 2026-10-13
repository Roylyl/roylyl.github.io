<p align="center">
  <img src="icon.svg" width="104" alt="R music图标">
</p>

<h1 align="center">R music</h1>

<p align="center">基于Folia的个人Web播放器，连接Music曲库，保留沉浸式歌词与队列拼贴。</p>

<p align="center">
  <a href="source/package.json"><img src="https://img.shields.io/badge/version-1.0.0-ffffff?style=flat-square" alt="R music版本1.0.0"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0-485866?style=flat-square" alt="前端软件许可证AGPL-3.0"></a>
  <a href="#开始使用"><img src="https://img.shields.io/badge/platform-Web%20%2F%20PWA-485866?style=flat-square" alt="Web与PWA"></a>
  <a href="#源码开发"><img src="https://img.shields.io/badge/Node.js-%E2%89%A524-485866?style=flat-square" alt="开发环境Node.js24及以上"></a>
  <a href="https://github.com/chthollyphile/folia-major"><img src="https://img.shields.io/badge/upstream-Folia-485866?style=flat-square" alt="上游项目Folia"></a>
</p>

<p align="center">
  <a href="#开始使用">开始使用</a> ·
  <a href="#主要功能">主要功能</a> ·
  <a href="#曲库与架构">曲库与架构</a> ·
  <a href="#上游项目与本项目改动">上游与改动</a> ·
  <a href="#许可与资源权利">许可与资源权利</a>
</p>

R music是Roylyl个人主页下的独立音乐子站，页面路径为`/rmusic/`。它使用[chthollyphile与贡献者开发的Folia](https://github.com/chthollyphile/folia-major)Web前端源码，改接[Music个人曲库](https://github.com/Roylyl/Music)。播放界面、歌词动画、可视化与队列拼贴等主要前端实现来自Folia，感谢上游作者和贡献者。

R music由Roylyl维护，属于Folia的修改版本，与Folia官方项目、音乐平台及唱片公司没有隶属或官方合作关系。

## 开始使用

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

打开[本地R music](http://127.0.0.1:8037/rmusic/)。请通过HTTP地址访问页面，保留同一网站中的`music/data/catalog.json`和`music/share-covers/`。默认音频与歌词从Music仓库读取，首次播放需要联网。

### Web与PWA

页面可部署到GitHub Pages等静态网站服务，部署路径固定为`/rmusic/`。iPhone可通过Safari的“分享→添加到主屏幕”使用，其他支持PWA的浏览器可使用安装入口。PWA需要HTTPS或本机localhost环境，系统播放控制和后台运行取决于浏览器与系统支持。

公开部署前，请阅读[许可与资源权利](#许可与资源权利)，同时发布对应修改源码，并确认所连接音乐材料的授权范围。

## 主要功能

| 功能 | 使用方式 |
| --- | --- |
| 音乐库 | 按专辑、艺术家和歌曲浏览、搜索，进入专辑或歌单选择曲目。 |
| 固定歌单 | 读取“鹿”“深圳”等歌单，沿用已有曲目ID和歌单顺序。 |
| 喜欢状态 | 展示曲库导入的喜欢状态；此个人站点中的爱心为只读。 |
| 沉浸式播放 | 使用Folia的全屏播放界面、歌词动画、背景可视化和外观设置。 |
| 队列与拼贴 | 管理播放队列，将队列封面拼成海报墙，在当前歌曲海报上显示歌词与播放控制。 |
| 歌曲分享 | 从歌曲操作入口调用系统分享面板；不支持系统分享的浏览器可复制歌曲链接。独立分享页提供歌名、歌手、专辑封面及打开播放器入口。 |
| 独立配置 | 使用独立的浏览器存储与PWA范围，可与原`/music/`播放器并行使用。 |

### 打开队列拼贴

先播放一个歌单或专辑，再返回音乐库首页，点击“音乐库”旁的四格图标“队列拼贴”。

拼贴页面展示当前播放队列。点击海报可切换歌曲并留在该视图，正在播放的海报会放大并展示对应歌词；没有队列时显示空状态。

### 分享歌曲

点击“分享歌曲”打开设备的系统分享面板，可选择系统提供的分享目标。分享内容是歌曲页面链接，浏览器不支持系统分享时提供复制链接入口；取消分享不会产生错误提示。

每首歌曲的分享页位于`/rmusic/share/<歌曲ID>.html`，沿用播放器的明暗主题、已保存配色和玻璃卡片样式，并以专辑封面作为柔焦背景。HTML直接包含歌曲标题、歌手、专辑和封面元数据，供微信等应用生成链接卡片。卡片样式和更新时机由接收应用决定。打开分享页后点击“打开R music”，播放器会定位对应曲目并等待用户点击播放。

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
- 将界面聚焦个人曲库，收起需要平台账号或独立服务端的入口。

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
