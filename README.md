<div align="center">

<img src="assets/portrait-160.jpg" width="96" alt="罗宇伦 Roy Luo">

# 罗宇伦 · Roy Luo

### Hardware · Embedded · Engineering Portfolio

以工程能力为主线，把想法做成样机。

[![License: GPL-3.0-only](https://img.shields.io/badge/license-GPL--3.0--only-2563eb?style=flat-square)](LICENSE)
[![Website](https://img.shields.io/badge/website-roylyl.github.io-0f172a?style=flat-square)](https://roylyl.github.io/)
[![Pages](https://img.shields.io/github/deployments/Roylyl/roylyl.github.io/github-pages?style=flat-square&label=GitHub%20Pages)](https://roylyl.github.io/)
[![HTML](https://img.shields.io/badge/HTML5-native-e34f26?style=flat-square&logo=html5&logoColor=white)](index.html)

[访问网站](https://roylyl.github.io/) · [页面与项目](#快速入口) · [本地预览](#本地预览) · [检查与验证](#验证) · [维护指南](#维护指南) · [联系](#联系)

</div>

这是罗宇伦的个人作品集网站。内容围绕硬件开发、嵌入式系统、音频产品和工程验证展开，记录从需求与技术判断，到样机实现、调试与验证的实践过程；音乐与音频设备实践、行业调研和产品思考则呈现工程工作如何连接真实场景。

主站由五个静态页面组成，使用原生 HTML、CSS 和 JavaScript，无需安装前端依赖或执行构建。仓库同时保留三个独立站点目录，它们不属于主站的五页导航体系。

> 《晚渡》完全由 Codex GPT-6 Astra 模型操作 MacBook 上的 FL Studio 完成，仅用于 Astra Computer Use 能力测试，不是罗宇伦的个人音乐作品。

## 快速入口

| 内容 | 入口 | 说明 |
| --- | --- | --- |
| 个人作品集 | [作品集详情](https://roylyl.github.io/) · [源码](https://github.com/Roylyl/roylyl.github.io/blob/main/index.html) | 个人介绍、能力、实习、项目、音乐与联系方式 |
| 01 · 音享贴 · LENGHE SoundShare | [音享贴详情](https://roylyl.github.io/soundshare.html) · [源码](https://github.com/Roylyl/roylyl.github.io/blob/main/soundshare.html) | 跨生态多人蓝牙音频共享硬件原型与产品设计 |
| 02 · 超声波定向扬声器 | [超声波详情](https://roylyl.github.io/ultrasonic.html) · [源码](https://github.com/Roylyl/roylyl.github.io/blob/main/ultrasonic.html) | ESP32 驱动的定向音频第一代 Demo |
| 其他项目 | [其他项目详情](https://roylyl.github.io/other-projects.html) · [源码](https://github.com/Roylyl/roylyl.github.io/blob/main/other-projects.html) | DeerWebTranslator、MacDuo、晚渡（Astra Computer Use 音乐制作测试）与 READMEWriter |
| DeerWebTranslator | [DeerWebTranslator详情](https://roylyl.github.io/other-projects.html) · [源码](https://github.com/Roylyl/DeerWebTranslator) | 原位翻译、阅读状态与取消恢复 |
| MacDuo | [MacDuo详情](https://roylyl.github.io/other-projects.html) · [源码](https://github.com/Roylyl/MacDuo) | 基于 MacBook-Duo 的形态交互实验 |
| 晚渡 | [晚渡详情](https://roylyl.github.io/other-projects.html) · [源码](https://github.com/Roylyl/Astra-Music) | Codex GPT-6 Astra 操作 MacBook 上 FL Studio 的 Computer Use 测试，非个人作品 |
| READMEWriter | [READMEWriter详情](https://roylyl.github.io/other-projects.html) · [源码](https://github.com/Roylyl/READMEWriter) | 基于仓库事实的 Codex README 写作技能 |
| 产品与创业理念 | [理念详情](https://roylyl.github.io/philosophy.html) · [源码](https://github.com/Roylyl/roylyl.github.io/blob/main/philosophy.html) | 产品判断、交互与学习、技术融合、使用验证、经营与研究、长期方向 |

“详情”链接打开对应网站页面；DeerWebTranslator、MacDuo、晚渡与 READMEWriter 的“源码”链接进入各自项目仓库，其余“源码”链接打开本站对应页面的源文件。音享贴与超声波的链接为展示页源码，不代表硬件、固件或 PCB 工程已公开。

## 页面组织

主站由首页和四个二级页面组成。下面按实际浏览顺序说明首页的全部内容区、每个二级页的正文结构，以及页面之间的入口与返回关系。仓库内另有三个独立站点，归属见本节末尾。

本节中的 `#…` 表示 HTML 内部章节 ID，用于说明内容位置；网站点击目录时不会把这些片段写入地址栏。

### 首页

[index.html](index.html) 的顶部导航依次为关于、经历、项目、音乐、社交媒体、联系；品牌入口返回页首，右侧提供背景音乐、语言切换与 GitHub 入口，窄屏使用折叠菜单。

| 顺序 | 内容区与位置 | 展示内容与操作 |
| --- | --- | --- |
| 1 | 首屏介绍 · `#top` | 姓名与工程方向、个人简介、当前重点与音乐身份、形象图片；提供查看项目、联系和简历下载入口。 |
| 2 | 关于与能力 · `#about` | 嵌入式开发、硬件与验证、项目推进、产品与调研四组能力。 |
| 3 | 实习与行业经历 · `#experience` | 雷鸟创新、湖南康通电子、深圳科创学院的岗位、时间与实践内容。 |
| 4 | 项目 · `#projects` | 音享贴（01）在前、超声波定向扬声器（02）在后；接着是“其他项目”短入口和“产品与创业理念”短入口，四部分同属项目区。桌面硬件卡片并排，窄屏按相同顺序纵向排列。 |
| 5 | 音乐实践 · `#music` | DP 音乐工作室与 Desk Park 乐队介绍、现场照片、两段演出视频；视频使用平台原生播放器并按 IP 自动选源。 |
| 6 | 社交媒体 · `#social` | 微信、Instagram、抖音、WhatsApp 的账号与二维码；支持二维码放大、账号复制，适用的平台提供外部入口。 |
| 7 | 联系 · `#contact` | 交流说明、邮箱、GitHub 与简历下载入口。 |
| 8 | 页脚 | 姓名与年份、网站署名及背景音乐版权说明。 |

“其他项目”入口位于 `#other-projects`，理念入口位于 `#philosophy`，二者都属于 `#projects`，不再单独占用首页顶部导航项。软件项目的完整介绍及《晚渡》试听在其他项目页，完整理念在理念页。

### 四个二级页面

| 页面 | 正文顺序与范围 | 导航与页面关系 |
| --- | --- | --- |
| [音享贴](soundshare.html) | 项目介绍（`#intro`）→ 产品价值与完整使用流程（`#value`）→ PCB、板级验证、双路音频、控制应用及系统架构（`#prototype`）→ iOS、Android、小程序、Apple Watch、iPad 界面（`#ui`）→ 影音共享、K 歌与户外组网场景（`#scenes`）→ 后续验证方向与收尾入口。 | 顶部目录直达介绍、产品价值、原型状态、界面、场景；另有个人主页与超声波页面入口。 |
| [超声波定向扬声器](ultrasonic.html) | 项目介绍（`#intro`）→ 目标、角色与阶段（`#overview`）→ 系统、嵌入式、硬件及推进过程（`#engineering`）→ 目标位置、邻近区域与移动路径等空间验证问题（`#spatial-questions`）→ 展板和团队样机照片（`#gallery`）。 | 顶部目录直达介绍、概览、工程、画面；空间验证内容位于工程与画面之间。另有个人主页与音享贴页面入口。 |
| [其他项目](other-projects.html) | 页面导言 → DeerWebTranslator 的原位翻译与阅读状态设计（`#deer-web-translator`）→ MacDuo 的桌面交互、控制与恢复（`#macduo`）→ 晚渡的 Astra Computer Use 测试声明、原生试听、参数、测试产物及工程与 MIDI 链接（`#wandu`）→ READMEWriter 的仓库事实核对与文档写作规范（`#readme-writer`）→ 返回主页。 | 顶部直接列出四个条目。软件项目的设计说明和晚渡的测试说明始终展开；源码链接分别进入对应仓库。返回入口定位到首页 `#other-projects`。 |
| [产品与创业理念](philosophy.html) | 页面导言 → 产品判断（`#product`）→ 交互与学习（`#interaction`）→ 技术融合（`#fusion`）→ 使用验证（`#validation`）→ 经营与研究（`#startup`）→ 长期方向（`#future`）→ 返回主页。 | 六个章节直接放在顶部目录，正文始终展开；技术融合章节链接音享贴，使用验证章节链接超声波。返回入口定位到首页 `#philosophy`。 |

四页末尾均保留姓名、年份、主题信息与背景音乐版权说明。晚渡的标题和目录名称在简、繁中文下显示“晚渡”，英文下显示“WANDU”；其测试性质与非个人作品声明在正文中明确保留。

### 共用导航与访问方式

- **当前位置反馈**：首页与四个二级页的顶部章节目录随滚动自动高光，使用淡蓝文字与柔和背景标识当前章节，同时通过 `aria-current="location"` 提供辅助技术语义；尚未进入章节时不误选，返回主页与跨页链接不参与高光；窄屏展开菜单沿用相同状态，不改变网址或增加历史记录。
- **顶部布局**：首页与四个二级页共享整条液态玻璃导航。主体使用 7% 白色表面、沿胶囊曲面的 RGB 折射与边缘高光，不对背景图像施加高斯模糊；桌面、平板、手机统一采用胶囊圆角。二级页左侧为项目品牌或返回入口，中间为目录，右侧为音乐与语言控制；桌面目录居中，窄屏收进顶部菜单，正文不重复设置目录按钮。
- **首页进入详情**：通过同源内嵌页面连续导航，不显示中间加载页；正文就绪后即可滚动、点击目录和保存阅读位置，不等待非必要图片加载。页面本身迟迟未就绪时只显示底部提示与直接打开入口。保留首页背景音乐会话，并同步地址、标题、界面语言与阅读位置。进入详情时暂停首页粒子与演出视频；返回时恢复首页浏览环境，视频不自动播放。
- **独立打开详情**：四页均支持直接访问；首次进入与刷新均从页面顶部开始。目录、正文按钮及返回顶部等当前页面内的跳转统一平滑滚动，不在地址栏添加 `#…`，也不为每次章节点击增加历史记录。背景音乐是否能恢复播放仍受浏览器策略限制；晚渡试听由用户主动开始，与背景音乐互斥。
- **返回与历史记录**：品牌、返回链接及浏览器前进后退共同提供页面间移动；检查时同时覆盖首页进入、详情间跳转、返回首页与直接访问，不能只验证其中一条路径。
- **位置与地址**：正文保留章节 ID，供目录和返回入口定位使用；地址栏仅显示页面路径。旧链接中的 `#…` 会在打开时移除，页面从顶部开始。浏览器前进后退仍可恢复浏览位置，但刷新始终回到顶部。

### 仓库内的独立站点

[kuncode/](kuncode/)（KunCode）、[lululu/](lululu/)（加密鹿）、[weijiba/](weijiba/)（魏鸡百科）属于独立站点目录，不接入上述五页主站的连续导航、章节目录或内容层级。本 README 的页面结构与主站验证流程覆盖上述五页；独立站点按各自任务维护和验证。

## 本地预览

先进入仓库根目录，再用 Python 3 启动随仓库提供的预览服务器。它支持音频分段请求（HTTP Range），使原生播放器能够跳转到未缓冲的位置：

macOS / Linux：

```sh
python3 scripts/preview.py 8000
```

Windows（已安装 Python Launcher）：

```powershell
py -3 scripts/preview.py 8000
```

打开 [本地网站](http://127.0.0.1:8000/)，在终端按 `Ctrl+C` 停止。若端口已被占用，把命令和访问地址中的 `8000` 一起换成其他端口。

使用 HTTP 服务预览，不要直接双击 HTML。`file://` 下的同源判断、跨页面通信和第三方请求可能与正式网站不同。预览服务需以仓库根目录为入口，连续导航按站点根路径识别页面。

## 验证

### 自动回归检查

运行自动测试时另需 Node.js 22 或更新版本，无需执行 `npm install`。在仓库根目录运行：

```sh
node --test tests/particle-input.test.cjs tests/project-audio.test.cjs tests/nav-glass-optics.test.cjs
git diff --check
```

[粒子输入回归测试](tests/particle-input.test.cjs) 执行实际粒子脚本，模拟浏览器输入与 WebGL 接口，检查传入渲染器的交互坐标。覆盖普通鼠标、触屏与鼠标并存、主指针为触摸时接入鼠标、合并事件采样、触摸切换、窗口失焦、局部坐标和减少动态效果。它不替代真实浏览器与显卡的渲染验证；仅预览网站不需要 Node.js。

[音频状态回归测试](tests/project-audio.test.cjs) 在模拟页面环境中检查试听与背景音乐互斥、异步播放请求及页面可见性等状态逻辑。内嵌详情页与首页之间的实际音频协作仍需用浏览器验证；两组测试都不验证第三方播放器的可用性。

[玻璃光学回归测试](tests/nav-glass-optics.test.cjs) 检查胶囊导航与圆角矩形卡片在八种尺寸下的中心中性、镜像对称、平直边不产生横向拉扯、调整宽度不拉伸光学场，以及 RGB 三通道在连续计算和 8 位位移图双线性采样后均不翻折。它验证光学映射约束，浏览器的合成与 Safari 页面捕获仍需实测。滚动合成需另外检查连续滚动、反向滚动与停止时的采样坐标、透明通道及材质一致性；不以光学数值测试代替真机验证。

### 浏览器检查

日常布局检查使用本机浏览器调整视口即可，不需要启动虚拟机或手机模拟器。建议覆盖以下组合：

| 维度 | 检查范围 |
| --- | --- |
| 主站页面 | `index.html`、`soundshare.html`、`ultrasonic.html`、`other-projects.html`、`philosophy.html` |
| 视口宽度 | 320、390、768、1440 CSS 像素；修改导航时加测 860 / 861、1100 / 1101、1160 / 1161 等断点两侧 |
| 界面语言 | 简体中文、繁體中文、English |
| 可见布局 | 横向溢出、标题换行、图片说明裁切、截图可读性、点击区域、液态玻璃导航边缘与文字对比、固定导航遮挡、目录居中、圆形语言按钮的图标居中 |
| 使用方式 | 鼠标、键盘焦点、菜单展开、页面滚动、前进与后退 |

视口尺寸只代表布局条件，不代表操作系统或设备。Windows Chrome、macOS、Android 平板、iPad、Android 手机与 iPhone 的实机结果应分别记录；没有相应环境时明确标注未验证。不要把本机 Chrome 的布局检查写成 Safari、移动设备或 Windows 的实机兼容结论。

发布前按实际浏览顺序检查：

1. **首页与语言**：确认音享贴在超声波前，两个详情页编号与首页一致；“其他项目”和理念入口紧接硬件项目，顶部不再有“理念”按钮。切换简、繁、英，检查文字、日期、换行与简历下载。
2. **项目导航**：首页 → 音享贴 → 超声波 → 后退两次 → 前进，检查地址、标题、语言、焦点和阅读位置；直接打开详情页并刷新，确认回到顶部且地址栏不含 `#…`。模拟图片加载延迟，确认目录跳转不重建详情页，后续加载完成不重置阅读位置。
3. **粒子与布局**：在代表视口下检查横向溢出；在可用输入设备上检查交互：鼠标可以接管粒子，手指滚动不受干扰；减少动态效果、切后台和返回页面正常。
4. **菜单与联系方式**：检查手机导航、语言菜单的键盘操作，以及二维码放大、Esc 关闭、账号复制与反馈。
5. **视频与音乐**：检查两段原生视频在中国大陆、其他地区和检测失败时的自动选源；进入详情页后首页视频停止、首页粒子暂停；返回后重新加载播放器，保持自动播放关闭。检查《晚渡》原生试听、暂停、进度与独立音频入口；试听与背景音乐互斥；分别检查独立打开和首页内嵌导航，离开《晚渡》所在页面后不继续播放，返回后不自动续播。
6. **其他项目**：从首页入口进入 `other-projects.html`，检查顶部项目目录、返回主页与刷新回到顶部；确认三个软件与工具项目的设计说明及《晚渡》的测试说明始终展示，核对源码、测试工程与 MIDI 入口；中文显示“晚渡”，英文显示“WANDU”。
7. **理念阅读**：从首页简短入口进入二级页，逐章检查顶部目录跳转、三语正文和项目链接；核对目录定位有效且地址栏不添加锚点，以及查看项目后返回理念页的阅读位置。检查桌面、平板和手机代表宽度下的标题、正文与按钮，不把静态检查视为实机验证。

### 加载与切换专项检查

以下检查覆盖五个主站页面，分别验证直接打开和从首页进入详情。开发者工具关闭缓存用于检查首次访问，恢复缓存后再检查重复访问；慢网和失败场景可通过请求延迟、请求阻止模拟。

| 场景 | 预期结果 |
| --- | --- |
| 当前页图片尚未完成 | 原位置出现加载反馈，正文、目录和滚动仍可使用；当前页请求未结束前，不开始其他页面的后台预加载。图片随后完成时不改变阅读位置。 |
| 图片成功、缓存命中与失败 | 成功后显示原图；已就绪的缓存图片直接展示；失败有重试入口，重试后恢复图片。二维码同时检查缩略图、放大弹窗和扫描完整性。 |
| 当前页就绪后的空闲时间 | 网络面板可见其他主站页面及同源展示资源依次请求；不因预加载执行目标页脚本、开始音乐试听或启动第三方播放器。 |
| 切换页面、切到后台再返回 | 旧预加载任务取消，回到可见页面后按当前页面重新安排；快速连续点击不同详情不会留下可交互的旧页面或继续播放旧音频。 |
| 页面过渡 | 新详情正文就绪后平滑显现，旧详情随后移除；返回首页自然显现，无居中加载页。独立页面在支持原生视图过渡的浏览器中验证动画，不支持时正常跳转。 |
| 动效偏好与定位 | 减少动态效果时无页面过渡、加载占位静止；主动点击当前页目录仍平滑定位，地址不带章节片段；刷新回到页首，前进后退检查阅读位置。 |

预加载队列处理结束不代表所有资源都下载成功。网络面板仍需检查失败请求；缓存可能被浏览器回收，也不能据此认定网站支持离线访问。

## 网站组成

```text
.
├── index.html                    # 个人主页
├── style.css / script.js         # 主页样式、菜单与二维码交互
├── portfolio-cards.css           # 五页统一圆角卡片、静态表面与内容间距
├── portfolio-additions.css       # 项目区入口网格、软件项目与试听共用样式
├── project-context.css           # 音享贴设计取舍与定向声空间场景
├── soundshare.html / .css / .js   # 项目 01：音享贴
├── ultrasonic.html / .css / .js   # 项目 02：超声波定向扬声器
├── philosophy.html / .css / .js   # 理念页及两个阅读页共用的基础样式、进度脚本
├── other-projects.html / .css     # 软件项目与晚渡 Computer Use 测试二级页
├── soundshare-particles.js       # 首页与两个项目页共用的 WebGL2 粒子
├── site-preload.js               # 当前页优先、空闲预加载其他主站页面与展示资源
├── page-transitions.css          # 独立页面切换的原生视图过渡
├── image-loading.css / .js       # 图片加载动画、失败重试与完成显现
├── i18n.css / i18n.js            # 三语界面、语言菜单与简历映射
├── background-music.js           # 背景音乐会话、试听互斥与内嵌页协作
├── background-music.css          # 音乐按钮与共用顶部导航布局
├── nav-liquid-glass.css / .js    # 五页导航及首页两张浮动卡片的玻璃外观与 SVG 滤镜
├── nav-glass-optics.js           # 胶囊法线、凸曲面 Snell 近似与 RGB 共用位移图
├── nav-glass-webgl.js            # Safari / Firefox 分块捕获、WebGL 和可见性生命周期
├── vendor/liquid-glass/          # 固定版本的必要浏览器渲染依赖、改动说明与许可证
├── continuous-navigation.*       # 详情页嵌入、切换过渡、历史记录与阅读位置
├── regional-video.js             # IP 地区识别与原生视频选源
├── social-controls.css           # 联系方式与二维码区域样式
├── site-accessibility.css        # 焦点、无脚本回退与减少动态效果
├── region-notice.*               # 中国大陆访问提示
├── nav-scroll.js                 # 页内平滑定位、刷新回顶与详情页移动菜单
├── assets/                       # 正式图片、音频、图标与三语简历
├── scripts/preview.py            # 支持音频分段请求的本地预览服务器
├── tests/particle-input.test.cjs  # 粒子输入回归测试
├── tests/project-audio.test.cjs   # 试听与背景音乐、详情导航的状态测试
├── kuncode/                      # 独立页面目录
├── lululu/                       # 独立页面目录
└── weijiba/                      # 独立页面目录
```

主站包含主页和四个详情页；后三个独立目录不接入主站的连续导航。它们与 `assets/`、`tests/` 一样属于正式仓库内容。

## 网站行为

### 当前页面优先的加载流程

五页共用图片反馈与后台预加载机制，按以下顺序处理：

1. **先展示当前正文**：详情页 DOM 就绪即可操作，不用等待所有图片；图片在自身原有尺寸内显示柔和光带与细环，不改变布局，也不覆盖视频播放器。
2. **补齐当前页资源**：等待当前页加载事件与字体就绪，再逐张推动尚未完成的懒加载图片。图片成功后淡入，缓存中已就绪的图片直接展示；失败显示重试入口。照片、项目图、界面截图、图标与二维码使用同一机制。
3. **确认图片请求已结束**：成功或失败都视为请求已结束；仍有图片等待时暂不启动其他页面的预加载。单张图片等待超时不会被当作加载成功，也不会因此强行进入其他页面队列。
4. **空闲时预加载其他页面**：以低优先级、串行请求处理其余主站页面的普通与内嵌 HTML，以及其中引用的同源 CSS、JavaScript、图片、图片候选尺寸和字体。资源进入浏览器缓存；HTML 只用于提取资源地址，不执行未访问页面的脚本。
5. **随当前页面调整任务**：页面切换或进入后台时取消旧任务；页面重新可见后，按当前页面安排加载。已成功处理的资源在当前会话内去重，失败请求不阻止余下队列。

后台预加载不包含音视频、PDF、外部域名资源或三个独立站点，也不预启动 YouTube、哔哩哔哩播放器。它使用浏览器 HTTP 缓存，没有离线资源包或永久缓存保证；实际复用受缓存策略与浏览器回收影响。视野外和后台暂停图片占位动画，减少动态效果模式使用静态占位。

### 页面切换、定位与统一外观

- **连续导航**：首页承载内嵌详情，保留背景音乐会话，并同步地址、标题、语言、焦点与阅读位置。新详情正文就绪后淡入并轻微上移，随后移除旧详情；返回首页也使用短暂显现效果。切换期间旧详情不可交互，音视频停止。
- **直接访问**：每个二级页可独立打开；支持原生跨文档视图过渡的浏览器使用淡入淡出，不支持时正常导航。系统启用减少动态效果时关闭页面过渡。
- **滚动与历史**：当前页目录、正文定位按钮和返回顶部平滑滚动，地址栏不添加章节片段；章节点击不增加一条浏览历史。刷新始终回到顶部，跨页返回入口可定位相应内容，浏览器前进后退可恢复阅读位置。
- **导航与浮动卡片光学**：五页顶部导航，以及首页“当前重点”“第二身份”两张浮动卡片，共享最近边界法线与凸超椭圆曲面，按 Snell 定律的单界面近似生成位移图。导航采用胶囊，浮动卡片在宽屏与照片重叠时保留原有圆角矩形；窄屏进入正文流后，改用与实习经历一致的普通文本卡片，关闭折射并释放对应 WebGL 资源。光学表面各自按实际尺寸和圆角生成光学图，不共用拉伸后的纹理。平直上下边不产生水平拉扯，中央平台保持中性，端帽沿圆弧法线折射。红、绿、蓝分别使用同一场的 0.82 / 1 / 1.18 倍，加宽的曲面边带增强折射与 RGB 色散；不再使用贯穿长条的渐变图或固定 −180 等大位移。缩放、圆角和语言引起的尺寸变化会重新计算光学图；数值测试约束采样不翻折。所有光学表面保留相同的 7% 白底、1.45 倍饱和度和边缘高光，不对页面背景施加高斯模糊。文字投影、浮动卡片的浅色正文，以及导航按钮自身的局部底色提高亮背景上的可读性。
- **浏览器渲染**：Chromium 使用实时 SVG 背景滤镜，先用颜色矩阵校正 PNG 的 128 中性值，再完成三通道折射。Safari / Firefox 按需加载本地 WebGL 模块，复用同一张光学图和色散比例；正文按块捕获；首页三块玻璃共用一个场景控制器和总计 24 MiB 的缓存，各自只采样附近区域，并将玻璃表面及其前景文字排除，避免递归镜像，采样最高按 2 倍屏幕密度处理，每块仍限制为 2 Mi 像素。`blur: 0` 直接采样全分辨率纹理，不经过半分辨率模糊缓冲。粒子在绘制完成后通过一个共享回调同步复制各个可见玻璃附近的小块区域，不开启 `preserveDrawingBuffer`，也不复制整屏。切后台、被详情覆盖或页面退出时释放采样与 GPU 资源。
- **Safari 连续折射合成**：滑动与静止使用同一 WebGL 折射路径，不再在触摸、滚动或停止时切换为原生透明背景。场景每帧按当前视口重新裁切；先合成不透明背景，避免未位移原文从截图透明区域透出。7% 白色表面与边缘高光独立绘制在折射画面上方、导航内容下方。真实设备上的异步滚动合成与帧延迟仍需实测，不能由桌面浏览器检查推定。
- **实现来源与边界**：光学模型参考 [Zettersten 的 liquid-glass 技能](https://github.com/Zettersten/skills/tree/main/skills/liquid-glass)中的曲面与 Snell 思路，以及 [shuding/liquid-glass](https://github.com/shuding/liquid-glass) 的 SDF / SVG 管线；法线、位移图和不翻折约束为本网站独立实现。WebGL 与 HTML 捕获适配自 [simple-liquid-glass](https://github.com/lucaperullo/simple-liquid-glass) 的固定提交，必要的本地修改及第三方许可证见 [依赖说明](vendor/liquid-glass/README.md)。这是用于界面的光学近似，不是完整双界面光线追踪。Safari 的 DOM 捕获并非原生背景采样，跨域播放器、受保护媒体和连续 CSS 动画不能保证逐像素一致；不捕获 iframe，也不重新加载播放器。首次捕获或捕获失败时保留清晰透明表面，减少透明度偏好启用时使用实色表面。
- **章节反馈与初始画布**：五页的悬停高光与当前章节蓝色 Section Indicator 分层显示，移动菜单沿用相同章节状态。五页在外部样式加载前设置深色画布，避免刷新时短暂闪白。
- **文本卡片与三语**：除宽屏下的两张浮动光学卡片外，文本卡片采用首页的静态圆角玻璃表面，统一边框、阴影与间距，无鼠标跟随光泽或卡片悬浮抬升。主站支持简体中文、繁體中文（香港用语）和 English。
- **粒子输入**：按实际 `pointerType === 'mouse'` 事件跟随鼠标，支持鼠标与触屏并存；触摸操作保留正常滚动。缺少 WebGL2 或浮点颜色缓冲扩展时不启动粒子，系统启用减少动态效果时停止动画。
- **键盘与回退**：语言菜单支持方向键、Home / End、Tab 和 Esc；手机菜单管理背景交互，二维码与地区提示使用原生弹窗。脚本不可用时正文仍可阅读。

### 视频、背景音乐与试听

- **两段演出视频**：按 IP 识别结果选源，中国大陆使用哔哩哔哩，其他地区及检测失败时使用 YouTube。使用平台原生 iframe，关闭自动播放，不添加自定义缩略图或手动平台选择。进入详情停止首页视频，返回后不自动播放。
- **背景音乐**：首次访问默认静音、按需加载，由访客主动开启；首页连续导航保留会话，独立页面或刷新后恢复播放仍受浏览器策略限制。
- **晚渡测试试听**：其他项目页使用原生 `audio` 与 `preload="metadata"`，预先读取时长信息，播放由访客主动开始。试听与背景音乐双向互斥，独立访问和内嵌导航均适用；离开页面停止，返回不自动续播。测试声明、工程与 MIDI 链接始终展开。

### 本地状态与外部请求

| 用途 | 实现与保存范围 |
| --- | --- |
| 语言偏好 | `localStorage`，用于恢复界面语言与对应简历入口 |
| 访问提示 | `localStorage` 保存上次展示时间，冷却时间为一小时 |
| 背景音乐 | `sessionStorage` 保存当前会话状态 |
| 跨页定位 | `sessionStorage` 的 `roylyl.navigation-target` 暂存目标页面与章节，目标页读取后移除；刷新不恢复章节定位 |
| 阅读位置 | 连续导航通过 `history.state` 保存页面与滚动位置，用于前进后退；不将章节写入可见网址 |
| 预加载去重与缓存 | 当前脚本会话在内存中保存已处理地址与资源清单；资源响应使用浏览器 HTTP 缓存，不使用持久化离线存储 |
| 首页地区检测 | 依次请求 `api.country.is`、`ipapi.co`；仅在页面内共享结果，不持久化地区 |
| 独立详情页访问提示 | 没有共享检测任务时使用 `ipwho.is`；内嵌详情页复用父页任务，不重复查询或弹窗 |
| 视频播放 | 由 YouTube 或哔哩哔哩原生播放器处理 |
| 晚渡试听 | 同源静态文件 `assets/wandu.m4a`，不增加外部播放器或 CDN 请求 |

界面语言不参与视频选源。地区识别与视频的可用性取决于访客网络；表中的存储说明仅涵盖本站脚本，不包含第三方播放器自身的行为。

《晚渡》的试听文件来自 [Astra-Music 测试工程](https://github.com/Roylyl/Astra-Music)，网站仅保留播放所需的 `assets/wandu.m4a`。FL Studio 工程、MIDI 和生成脚本通过源仓库提供，不复制到本站。试听音频属于正式展示资源，不是编译缓存。

## 维护指南

### 修改边界

- 首页项目区保留硬件项目、其他项目入口和理念入口的连续结构；软件项目与《晚渡》全文集中在 `other-projects.html`，理念全文集中在 `philosophy.html`。
- 目录直接放在二级页顶部；设计说明与理念正文保持展开。修改共用导航时同时检查五页、三语与宽度断点，避免只修正单页。
- 两段视频继续按 IP 自动选源，使用播放平台原生 iframe；不添加手动选源或自定义缩略图。
- 保留《晚渡》的 Computer Use 测试声明，项目列表与试听区域都不将其归为个人音乐作品。
- 联系二维码须保持扫描能力。调整颜色、尺寸或弹窗后，检查原图完整性与实际扫码结果。
- 主站维护默认围绕五页及其共享资源展开；KunCode、加密鹿与魏鸡百科按各自任务单独检查。

### 文件入口

| 修改内容 | 入口与检查重点 |
| --- | --- |
| 主站文字 | 对应 HTML 与 [i18n.js](i18n.js)；同步三语映射并检查换行。 |
| 项目顺序与入口 | [index.html](index.html) 的 `#projects` 和 [portfolio-additions.css](portfolio-additions.css)；保持卡片顺序、间距与详情页编号一致。 |
| 其他项目与晚渡 | [other-projects.html](other-projects.html)、[other-projects.css](other-projects.css)；同步顶部目录、项目锚点、完整说明、测试归属和试听链接。 |
| 后台预加载与过渡 | [site-preload.js](site-preload.js)、[page-transitions.css](page-transitions.css)、[continuous-navigation.js](continuous-navigation.js)；验证当前图片未完成时不请求其他页面、切换可取消旧任务、无媒体预下载、过渡后旧框架被移除。 |
| 图片加载与重试 | [image-loading.js](image-loading.js)、[image-loading.css](image-loading.css)；检查延迟、成功、缓存、失败重试、二维码弹窗、动态图片来源与减少动态效果，不能改变图片尺寸或覆盖视频。 |
| 顶部导航与语言按钮 | [background-music.css](background-music.css)、[i18n.css](i18n.css)、各页导航 HTML 与 [nav-scroll.js](nav-scroll.js)；检查居中、控件重叠和手机菜单。 |
| 导航与浮动卡片玻璃 | [nav-liquid-glass.css](nav-liquid-glass.css)、[nav-liquid-glass.js](nav-liquid-glass.js)；检查五页的整栏材质、首页两张浮动卡片的独立圆角折射、共享快照及前景排除、背景文字对齐、跨端胶囊圆角、Safari WebGL 分块捕获与透明回退、悬停高光、当前章节标记、移动菜单及内嵌详情；覆盖滚动、缩放和横竖屏尺寸变化。 |
| 试听与背景音乐 | [background-music.js](background-music.js)；先运行音频回归测试，再验证独立打开与内嵌详情页的双向互斥及离页停止。 |
| 产品与创业理念 | 首页 `#philosophy` 的短入口，以及 [philosophy.html](philosophy.html) 的完整正文；同步目录、章节 ID 和三语映射，区分当前判断、已有成果与后续问题。 |
| 简历 PDF | `assets/` 内三份正式文件，以及 `i18n.js` 的 `resumeAssets`、`resumeVersion` 和 HTML 初始下载链接；核对文件名、页序与语言。 |
| 粒子交互 | [soundshare-particles.js](soundshare-particles.js)；先运行输入回归测试，再检查首页与两个项目页的真实渲染、尺寸和交互。 |
| 视频选源 | [regional-video.js](regional-video.js) 与首页原生 iframe；维持 IP 自动选源、原生嵌入和关闭自动播放。 |
| 联系方式 | [index.html](index.html)、[script.js](script.js)、[social-controls.css](social-controls.css) 与原二维码图片；检查复制、放大和平台入口。 |
| 文本卡片 | [portfolio-cards.css](portfolio-cards.css) 的 `.portfolio-card` 与 `--module-glass-*`；以首页表面为标准，统一五页的圆角、边框、阴影与模糊；不加入鼠标跟随光泽，检查序号、标题、正文的间距与长标题换行。 |
| 连续导航 | [continuous-navigation.js](continuous-navigation.js)；添加详情页时同步 `detailPages` 与 `site-preload.js` 的 `paths`，接入共用样式与脚本，并验证页面直达、无锚点地址的目录定位、刷新回顶、浏览器前进与后退。 |

### 更新资源版本

1. 修改 CSS、JavaScript 或固定文件名的素材后，更新**实际引用该资源的页面**中的 `?v=`。不必给无关资源一起改版本。例如粒子脚本由 `index.html`、`soundshare.html`、`ultrasonic.html` 引用，理念页没有加载它。
2. `philosophy.css` 与 `philosophy.js` 同时服务理念页和其他项目页；`background-music.css` 也负责共用导航。修改这些文件时检查全部实际引用页。
3. 五页均引用图片加载、卡片、预加载和页面过渡的共用资源。修改这些资源时同步五页中相应的 `?v=`，确保直接访问与内嵌访问得到相同实现。
4. 更新需要通过连续导航加载的详情页 HTML 时，保持 `continuous-navigation.js` 的 `siteNavigationVersion`、内嵌 URL 的 `nav-version` 与 `site-preload.js` 的备用版本号一致；同时更新五页中相关脚本的 `?v=`，使预加载地址与实际打开地址匹配。
5. 发布后分别检查首次访问和缓存命中，从首页进入详情及直接打开详情各验证一次，确认正文、共用资源、预加载请求与过渡均已生效。

文本卡片采用共用的静态表面；首页、音享贴与超声波原有的鼠标光泽跟随监听已移除。音享贴产品价值、原型状态、场景卡片不使用大段固定留白，理念与其他项目以完整展开的圆角卡片承载正文。卡片的入场动画优先放在卡片自身。父容器长期使用 `will-change: opacity` 会影响内部 `backdrop-filter` 的背景采样；当前主页使用卡片级入场和 `will-change: transform`。调整后滚动检查能力、实习与项目模块的一致性。

### 忽略规则

[.gitignore](.gitignore) 统一忽略系统元数据、编辑器本地设置、可选工具依赖、Python 缓存、环境变量覆盖文件，以及根目录的 `tmp/`、`temp/`、缓存和测试报告。`.env.example` 与 `.env.*.example` 模板仍可提交；网站运行本身不需要环境变量配置。

临时预览、截图和检查结果可放在根目录 `tmp/`。正式图片、音频、PDF、测试源码、锁文件与独立页面目录不按类型排除。忽略规则只影响未跟踪文件，不会自动删除或停止跟踪已有文件。

检查某个文件被哪条规则忽略：

```sh
git check-ignore -v tmp/example.png
```

## 发布到 GitHub Pages

仓库可以直接使用分支发布，无需前端构建：

1. 在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**。
2. 以 `main` 分支的 **/(root)** 作为发布源并保存；这是本仓库当前文件布局适用的配置。
3. 本地验证通过后，将修改提交并推送到配置的发布分支，在仓库 **Actions** 中确认 Pages 部署成功。
4. 打开 [线上网站](https://roylyl.github.io/)，复查页面直达、语言切换、简历下载、视频与移动端菜单。

完整配置见 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。本地修改不会自动更新线上网站。

## 简历与个人资料

实习经历、项目进度和个人介绍以[作品集主页](https://roylyl.github.io/)及正式简历为入口，README 不重复维护完整履历。

网站通过 `i18n.js` 中的语言映射提供对应简历：

| 界面语言 | 下载文件 |
| --- | --- |
| 简体中文 | [罗宇伦_简历.pdf](assets/罗宇伦_简历.pdf) |
| 繁體中文（香港用语） | [羅宇倫_履歷.pdf](assets/羅宇倫_履歷.pdf) |
| English | [Roy Luo_Resume.pdf](assets/Roy%20Luo_Resume.pdf) |

## 联系

- GitHub：[@Roylyl](https://github.com/Roylyl)
- 邮箱：[L3092105572@gmail.com](mailto:L3092105572@gmail.com)
- 其他社交平台与二维码：见网站主页联系区域

## 版权与第三方内容

本仓库中由罗宇伦 Roy Luo 原创且有权授权的代码、文字、视频、简历、图片及其他内容采用 [GNU General Public License v3.0](LICENSE)（`GPL-3.0-only`，仅第 3 版）发布。第三方依赖、音乐、商标、嵌入内容及另有说明的材料不因本次许可变更而重新授权；本地依赖声明见 [vendor/liquid-glass/LICENSES.txt](vendor/liquid-glass/LICENSES.txt)。

背景音乐《你离开了南京，从此没有人和我说话》仅用于个人作品集的非商业展示与页面体验演示。本人不主张拥有该音乐作品、录音制品或相关素材的著作权及其他权利，相关权利归原作者、表演者、录音制作者及其他合法权利人所有；此处不构成版权许可或对第三方的再授权。

页面中的 YouTube、哔哩哔哩、GitHub、Instagram、微信、抖音、WhatsApp、Microsoft、Visual Studio Code 等名称、商标、嵌入内容及服务归各自权利人所有；相关引用仅用于识别、链接或展示服务，不表示存在隶属、授权、赞助或官方合作关系。

如相关权利人认为网站内容或素材侵犯其合法权益，请通过上方邮箱联系；核实权利信息后，将及时停止使用并移除相关内容。

Copyright © 2026 罗宇伦 Roy Luo. 原创内容按 GPL-3.0-only 授权；第三方权利如上所述。
