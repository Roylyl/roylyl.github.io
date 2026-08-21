# 罗宇伦 Roy Luo

个人网站：<https://roylyl.github.io/>

这是罗宇伦的个人介绍网站，用于集中呈现个人经历、工程项目、产品理念、音乐身份与联系方式。网站以清晰、克制的叙事为主，通过主页、项目页面与独立工具页面构成完整的个人形象展示，而非传统简历或技术文档。

## 网站内容

- **个人介绍**：学习背景、关注方向与个人身份
- **精选项目**：超声波定向扬声器与音享贴 LENGHE SoundShare
- **产品理念**：关于产品、技术组合与长期实践的思考
- **音乐经历**：DP 音乐工作室、Desk Park 乐队及相关演出内容
- **联系渠道**：邮件、GitHub、微信、Instagram、抖音与 WhatsApp
- **独立页面**：KunCode 产品页面与“加密鹿”文字编码工具

## 页面结构

- `index.html`：个人主页，涵盖介绍、项目、理念、音乐与联系信息
- `ultrasonic.html`：超声波定向扬声器项目介绍
- `soundshare.html`：音享贴 LENGHE SoundShare 项目介绍
- `philosophy.html`：产品理念与个人思考
- `kuncode/`：KunCode 产品介绍、下载与开源项目链接
- `lululu/`：“加密鹿”文字编码与解码工具

## 设计与体验

网站采用深色视觉、圆角卡片与玻璃质感，强调内容层级、留白和图像表达，并对桌面端与移动端分别进行排版适配。个人主页及主要项目页面提供简体中文、繁体中文和英文界面；`kuncode/` 与 `lululu/` 当前以简体中文为主。

演出视频通过 YouTube 或哔哩哔哩第三方播放器按需加载。为选择播放器，页面可能访问 `api.country.is` 或 `ipapi.co` 判断访问地区。相关内容的可用性及数据处理规则由对应第三方服务决定。

## 技术形式

网站由原生 HTML、CSS 和 JavaScript 构成，不依赖前端框架或构建工具，可直接部署至 GitHub Pages。主要页面的样式、脚本和多语言文本位于仓库根目录，图片与简历文件位于 `assets/`；独立页面的资源分别位于各自目录。

```text
.
├── index.html
├── ultrasonic.html
├── soundshare.html
├── philosophy.html
├── *.css / *.js
├── assets/             # 图片、图标与简历 PDF
├── kuncode/            # KunCode 独立页面及其资源
└── lululu/             # “加密鹿”独立页面及其资源
```

## 本地查看

在项目根目录启动静态服务器：

```bash
python3 -m http.server 8000
```

随后访问 <http://localhost:8000/>。

## 联系

- GitHub：[@Roylyl](https://github.com/Roylyl)
- 邮箱：[L3092105572@gmail.com](mailto:L3092105572@gmail.com)

其他社交平台与二维码可在网站联系区域查看。

## 版权与第三方内容

本仓库当前未授予开源许可。除另有明确说明外，网站中的代码、文字、视频、简历及其他原创内容由罗宇伦 Roy Luo 保留所有权利。本仓库中的图片、照片、截图、图标及其他视觉素材均归罗宇伦 Roy Luo 所有。未经书面许可，不得复制、修改、重新发布或用于商业用途。

图片文件的所有权不会改变其中可能包含的第三方商标或标识的权利归属。页面中出现的 GitHub、YouTube、哔哩哔哩、Microsoft、Visual Studio Code、Instagram、微信、抖音、WhatsApp 等第三方名称、商标、嵌入内容及服务归各自权利人所有。对其引用仅用于识别、链接或展示相关服务，不表示存在隶属、授权、赞助或官方合作关系。

`kuncode/` 页面介绍的 KunCode 项目基于 Code - OSS，其源代码许可和第三方声明以 [KunCode 仓库](https://github.com/Roylyl/KunCode) 及其 [LICENSE](https://github.com/Roylyl/KunCode/blob/main/LICENSE.txt) 为准。本网站的版权声明不会取代或限制任何适用的第三方许可。

© Roy Luo. All rights reserved.
