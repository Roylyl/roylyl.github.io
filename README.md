<p align="center">
  <img src="assets/portrait-160.jpg" width="96" alt="罗宇伦Roy Luo">
</p>

<h1 align="center">罗宇伦 · Roy Luo</h1>

<p align="center">Consumer Electronics · Hardware · Embedded · Audio</p>
<p align="center">以工程能力为主线，把想法做成样机。</p>

<p align="center">
  <a href="https://roylyl.github.io/"><img src="https://img.shields.io/badge/website-roylyl.github.io-0f172a?style=flat-square" alt="个人主页"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0--only-2563eb?style=flat-square" alt="GPL-3.0-only许可证"></a>
  <a href="#网站架构"><img src="https://img.shields.io/badge/HTML%20%2F%20CSS%20%2F%20JavaScript-native-485866?style=flat-square" alt="原生HTML、CSS与JavaScript"></a>
  <a href="https://github.com/Roylyl/roylyl.github.io"><img src="https://img.shields.io/github/last-commit/Roylyl/roylyl.github.io?style=flat-square&amp;label=updated&amp;color=485866" alt="最近更新"></a>
</p>

<p align="center">
  <a href="https://roylyl.github.io/">访问主页</a> ·
  <a href="#主页内容">主页内容</a> ·
  <a href="#本地预览">本地预览</a> ·
  <a href="#网站架构">网站架构</a> ·
  <a href="#联系与简历">联系与简历</a>
</p>

这是罗宇伦的个人主页与作品集，介绍消费电子硬件、嵌入式系统和音频产品方向的学习与实践。网站集中展示个人能力、实习经历、软硬件项目、音乐实践和产品思考，也提供简历下载与联系方式。

我是湖南农业大学卓越工程师学院智能科学与技术本科生。项目实践涵盖PCB设计、嵌入式音频链路、软硬件原型、多端交互与工程验证，同时参与智能眼镜AI音频相关的模型接入与测试。作为DP音乐工作室主理人和Desk Park乐队吉他手，我也通过演出与音频设备使用理解产品的实际需求。

## 主页内容

[首页](https://roylyl.github.io/)以个人介绍为起点，依次展示能力、经历、项目、音乐、社交媒体与联系方式。

| 内容 | 展示重点 |
| --- | --- |
| 关于与能力 | 硬件与PCB、嵌入式与音频、工程验证、软件与产品原型。 |
| 实习与行业经历 | 雷鸟创新、湖南康通电子、深圳科创学院的实践经历。 |
| 项目作品 | 音享贴、超声波定向扬声器，以及音频工具、应用和网页项目。 |
| 音乐实践 | DP音乐工作室、Desk Park乐队、演出照片和视频。 |
| 社交与联系 | 社交平台入口、二维码、账号复制、邮箱与简历下载。 |

项目与理念通过四个详情页展开，首页保留简洁入口：

| 页面 | 内容 |
| --- | --- |
| [音享贴 · LENGHE SoundShare](soundshare.html) | 影音共享产品原型，介绍使用流程、PCB与板级开发、音频链路、多端控制及应用场景。 |
| [超声波定向扬声器](ultrasonic.html) | 基于ESP32的定向音频Demo，介绍系统设计、嵌入式实现、硬件推进与样机。 |
| [工程工具与软件项目](other-projects.html) | 音频与语音识别工具、CarPlay接收端、桌面交互、网页翻译及README工具，并链接各自项目仓库。 |
| [产品与创业理念](philosophy.html) | 产品判断、交互与学习、技术融合、使用验证、经营与研究、长期方向。 |

硬件项目的详情页用于展示项目过程，不代表PCB或固件工程已经公开。其他项目页中的《晚渡》是Codex操作FL Studio的Computer Use实验，不属于个人音乐作品。

## 浏览体验

- 简体中文、繁體中文与English三种语言，简历下载随界面语言切换。
- 桌面与手机响应式布局，顶部章节目录随滚动标记当前位置，窄屏收起为菜单。
- 首页与详情页连续导航，支持页面直达和浏览器前进、后退。
- 图片按需加载，配合占位与失败重试；页面使用共用的玻璃导航、圆角卡片和过渡效果。
- 演出视频按访问地区选择YouTube或哔哩哔哩原生播放器；背景音乐与作品试听互斥，避免叠加播放。
- 社交二维码支持放大，账号支持复制，简历提供PDF下载。

语言偏好和部分访问提示保存在当前浏览器，背景音乐与跨页定位使用会话状态。视频、地区识别和GitHub统计等功能会访问对应的外部服务，其可用性取决于访客网络。

## 本地预览

网站使用原生HTML、CSS和JavaScript，没有前端依赖安装或构建步骤。安装Python3后，在仓库根目录运行预览服务器。

macOS/Linux：

```sh
python3 scripts/preview.py 8000
```

Windows：

```powershell
py -3 scripts/preview.py 8000
```

打开[本地主页](http://127.0.0.1:8000/)，按`Ctrl+C`停止服务。端口被占用时，将命令和访问地址中的端口一起更换。

预览服务器默认仅监听本机，并支持音频分段请求。请通过HTTP访问，避免直接双击HTML导致跨页导航、同源通信与正式网站行为不同。

## 网站架构

个人主页采用多页面静态结构：首页加四个详情页。各页面可以独立打开，也可以通过共用导航在首页内加载详情页。页面共享外观、语言、图片加载、音频和导航模块，由GitHub Pages托管。

```text
roylyl.github.io/
├── index.html                   # 个人主页
├── soundshare.html              # 音享贴详情
├── ultrasonic.html              # 超声波定向扬声器详情
├── other-projects.html          # 工程工具与软件项目
├── philosophy.html              # 产品与创业理念
├── style.css / script.js        # 首页基础样式与交互
├── i18n.js / i18n.css           # 三语文案、语言控件与简历映射
├── continuous-navigation.js    # 详情页加载与浏览历史
├── site-preload.js              # 页面与静态资源预加载
├── image-loading.js / .css      # 图片加载、占位与重试
├── nav-liquid-glass.js / .css   # 共用玻璃导航
├── background-music.js / .css   # 背景音乐与共用控件
├── regional-video.js           # 演出视频地区选源
├── portfolio-cards.css         # 共用内容卡片
├── assets/                     # 照片、二维码、视频素材、音频与简历
├── vendor/                     # 本地第三方依赖及许可说明
├── scripts/preview.py          # 本地预览服务器
├── tests/                      # 主站交互回归脚本
└── music/                      # 独立音乐子站，另有README
```

目录树列出主要入口，其余页面专用样式与脚本位于根目录。`nav-glass-platform.js`、`nav-glass-optics.js`和`nav-glass-webgl.js`处理导航材质的平台适配与渲染；`nav-scroll.js`负责当前章节反馈；`soundshare-particles.js`提供相关页面的粒子交互。

[continuous-navigation.js](continuous-navigation.js)管理四个详情页的iframe加载、浏览历史和返回位置；[site-preload.js](site-preload.js)复用浏览器HTTP缓存，在当前页面资源优先的基础上预加载站内页面与静态资源，不预下载音视频和PDF。

仓库中的`music/`独立维护，有自己的播放器、数据和Service Worker，不属于个人主页的五页导航体系。相关说明见[music/README.md](music/README.md)。

## 内容维护

| 修改内容 | 主要入口 |
| --- | --- |
| 个人介绍、经历与联系方式 | [index.html](index.html)、[script.js](script.js)。 |
| 三语文案与简历入口 | [i18n.js](i18n.js)、[i18n.css](i18n.css)及对应页面。 |
| 硬件项目 | [soundshare.html](soundshare.html)、[ultrasonic.html](ultrasonic.html)及各自样式、脚本。 |
| 软件项目与实验 | [other-projects.html](other-projects.html)、[other-projects.css](other-projects.css)。 |
| 产品与创业理念 | [philosophy.html](philosophy.html)、[philosophy.css](philosophy.css)、[philosophy.js](philosophy.js)。 |
| 共用布局与卡片 | [style.css](style.css)、[portfolio-additions.css](portfolio-additions.css)、[portfolio-cards.css](portfolio-cards.css)。 |
| 导航、图片和页面切换 | [nav-scroll.js](nav-scroll.js)、[image-loading.js](image-loading.js)、[continuous-navigation.js](continuous-navigation.js)、[site-preload.js](site-preload.js)。 |
| 视频与背景音乐 | [regional-video.js](regional-video.js)、[background-music.js](background-music.js)。 |

修改共用文案或资源时，同步实际引用页面中的语言映射和`?v=`版本参数。连续导航加载的详情页更新时，保持`continuous-navigation.js`中的`siteNavigationVersion`与`site-preload.js`的对应版本一致。

简历更新保留现有文件名，同步`i18n.js`中的`resumeAssets`及页面下载链接版本。项目介绍区分当前成果和后续方向，《晚渡》继续保留实验归属说明。

## 发布

页面和静态资源可直接通过GitHub Pages发布，无需前端打包。使用分支发布时，发布源选择`main`分支的仓库根目录，网站入口为[roylyl.github.io](https://roylyl.github.io/)。

提交并推送后，由GitHub Pages更新线上内容；本地文件修改不会自动发布。页面路径保持在站点根目录，以便连续导航和预加载模块正确识别。

## 联系与简历

- GitHub：[@Roylyl](https://github.com/Roylyl)
- 邮箱：[L3092105572@gmail.com](mailto:L3092105572@gmail.com)
- 社交平台与二维码：见[个人主页](https://roylyl.github.io/)

| 语言 | 简历 |
| --- | --- |
| 简体中文 | [罗宇伦_简历.pdf](assets/罗宇伦_简历.pdf) |
| 繁體中文 | [羅宇倫_履歷.pdf](assets/羅宇倫_履歷.pdf) |
| English | [Roy Luo_Resume.pdf](assets/Roy%20Luo_Resume.pdf) |

## 版权与第三方内容

本仓库中由罗宇伦Roy Luo原创且有权授权的代码、文字、视频、简历、图片及其他内容采用 [GNU General Public License v3.0](LICENSE)（`GPL-3.0-only`，仅第3版）发布。第三方依赖、音乐、商标、嵌入内容及另有说明的材料不因本次许可变更而重新授权；本地依赖声明见 [vendor/liquid-glass/LICENSES.txt](vendor/liquid-glass/LICENSES.txt)。

背景音乐《你离开了南京，从此没有人和我说话》仅用于个人作品集的非商业展示与页面体验演示。本人不主张拥有该音乐作品、录音制品或相关素材的著作权及其他权利，相关权利归原作者、表演者、录音制作者及其他合法权利人所有；此处不构成版权许可或对第三方的再授权。

页面中的YouTube、哔哩哔哩、GitHub、Instagram、微信、抖音、WhatsApp、Microsoft、Visual Studio Code等名称、商标、嵌入内容及服务归各自权利人所有；相关引用仅用于识别、链接或展示服务，不表示存在隶属、授权、赞助或官方合作关系。

如相关权利人认为网站内容或素材侵犯其合法权益，请通过上方邮箱联系；核实权利信息后，将及时停止使用并移除相关内容。

Copyright © 2026罗宇伦Roy Luo. 原创内容按GPL-3.0-only授权；第三方权利如上所述。
