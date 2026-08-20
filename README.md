# 罗宇伦 Roy Luo · Engineering Portfolio

这是我的个人主页与工程作品集，基于纯 HTML / CSS / JavaScript 构建，可直接部署到 **GitHub Pages**。

网站的核心定位不是“展示一个漂亮网页”，而是尽可能清晰地呈现我目前的工程能力、项目实践、产品思考与音频相关经历。页面视觉采用暗色、玻璃拟态与较克制的滚动动效，整体交互参考现代产品官网的叙事节奏，同时保持静态站点的轻量性和可维护性。

> Engineering first. Build ideas into working prototypes.

## 👤 About Me

**罗宇伦 Roy Luo**

湖南农业大学卓越工程师学院本科生。目前主要关注：

- 硬件开发与基础 PCB 设计
- ESP32 / Arduino / ESP-IDF 嵌入式实践
- 蓝牙音频与多设备交互
- 样机搭建、调试、系统联调与工程验证
- 音频产品体验、延迟、底噪与动态响应
- 从项目概念到可展示 Demo 的推进与落地

除工程方向外，我也是 **DP音乐工作室主理人 · Desk Park乐队吉他手**。长期的乐队排练、现场演出、效果器与监听设备使用，让我能够从真实使用场景理解音频产品，而不仅仅从参数表理解声音。

## 🚀 Featured Projects

### 01 · 超声波定向扬声器

围绕定向音频传播展开的工程项目，基于 ESP32 平台推进功能验证、硬件系统搭建、蓝牙音频接收、样机调试与现场展示。

项目重点包括：

- 超声波换能器阵列与定向声概念验证
- ESP32 控制与蓝牙音频链路
- 功放、电源与样机系统联调
- PCB 与硬件结构持续迭代
- 面向公共展示、个人音频等真实场景进行验证

详细页面：`ultrasonic.html`

### 02 · 音享贴 · LENGHE SoundShare

**音享贴**是一款面向多人蓝牙音频共享场景的轻量化中继设备概念。它并不要求用户更换已有耳机或音箱，而是尝试打通不同品牌、不同终端之间的连接壁垒。

目前页面展示了：

- iPad 控制 UI
- iPhone 控制 UI
- Android 控制 UI
- 微信小程序 UI
- Apple Watch 音量 / 延迟控制 UI
- 多设备音量、声道、延迟校准等产品逻辑

详细页面：`soundshare.html`

## 💡 Product & Entrepreneurship Philosophy

我更认同一种 **务实的理想主义**。

对产品而言，我更关心它是否解决真实问题，而不是参数是否足够夸张。对于资源有限的团队，很多创新并不一定来自重新发明底层技术，而可能来自成熟技术之间的重新组合、交互方式的优化，以及对一个被忽略场景的重新定义。

对创业而言，我希望形成这样的长期循环：

> **用能够落地的产品养活团队，用团队积累的资源继续投入真正值得长期研究的技术。**

完整内容见：`philosophy.html`

## 🎸 Music

音乐是网站的第二条主线。

主页底部包含 Desk Park 相关演出照片与在线视频。站点会根据访问者的 IP 国家/地区自动选择视频平台：

- 中国大陆 IP：优先加载 **哔哩哔哩**播放器
- 其他地区：默认加载 **YouTube** 播放器
- 若 IP 地理检测失败：保持 YouTube 作为默认方案

当前嵌入的视频：

- 《忧书》Cover 黄贯中
- 《梦幻丽莎发廊》Cover 五条人

## 🌐 Multi-language

网站支持三种语言，并在顶部导航栏提供语言下拉菜单：

- 简体中文
- 繁體中文
- English

首次访问时会优先读取浏览器 / 操作系统语言：

- `zh-CN`、`zh-SG` 等 → 简体中文
- `zh-TW`、`zh-HK`、`zh-MO`、`zh-Hant` → 繁體中文
- 其他语言 → English

用户手动切换后，会通过 `localStorage` 保存选择。

## ✨ Website Features

- 暗色工程作品集视觉
- Apple-inspired 慢速滚动动效
- 液态玻璃 / 鼠标局部光晕效果
- 响应式桌面端、平板端与移动端布局
- 顶部浮动导航栏
- 底部滚动进度条
- 多语言自动检测与手动切换
- favicon / Apple Touch Icon
- 中国大陆 IP 自动切换 Bilibili 视频播放器
- 项目主页 + 独立二级详情页
- 微信 / Instagram / 抖音二维码
- 邮件与 GitHub 快捷入口
- 无框架、无构建步骤，可直接部署到 GitHub Pages

## 📁 Project Structure

```text
Roylyl.github.io/
├── index.html                  # 个人主页
├── style.css                   # 主页样式
├── script.js                   # 主页滚动 / 动效逻辑
├── i18n.js                     # 全站多语言逻辑
├── i18n.css                    # 语言菜单样式
├── regional-video.js           # IP 地区识别与视频平台切换
│
├── ultrasonic.html             # 超声波定向扬声器
├── ultrasonic.css
├── ultrasonic.js
│
├── soundshare.html             # 音享贴 LENGHE SoundShare
├── soundshare.css
├── soundshare.js
│
├── philosophy.html             # 产品理念与创业理念
├── philosophy.css
├── philosophy.js
│
├── assets/                     # 图片、UI、简历、favicon 等资源
└── README.md
```

## 🧭 Page Structure

主页主要包含：

1. Hero / 个人定位
2. 核心能力结构
3. Featured Projects
4. Engineering Skills
5. Product & Entrepreneurship Philosophy
6. Music / Desk Park
7. Social Media
8. Contact

两个核心工程项目只在主页展示概览，详细内容放在独立页面，避免首页信息密度过高。

## 🖥 Local Preview

不建议直接双击 `index.html` 作为最终测试方式。部分跨域 iframe、地理位置 API 和第三方资源在 `file://` 环境下可能表现不同。

在项目目录中运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 🚢 Deploy to GitHub Pages

如果 GitHub 用户名为 `Roylyl`，建议仓库命名为：

```text
Roylyl.github.io
```

将本项目中的文件直接放到仓库根目录：

```text
Roylyl.github.io/
├── index.html
├── style.css
├── assets/
└── ...
```

不要额外套一层 `roylyl-github-profile/` 文件夹。

随后在 GitHub：

```text
Settings
→ Pages
→ Build and deployment
→ Deploy from a branch
→ main
→ / (root)
```

最终地址：

```text
https://roylyl.github.io/
```

## 🌍 Regional Video Logic

这是一个纯静态 GitHub Pages 站点，因此无法在 GitHub Pages 服务端直接读取访客 IP。当前采用浏览器端 IP-to-country API 判断访问国家/地区，并对结果进行 24 小时本地缓存。

逻辑如下：

```text
访问页面
   ↓
读取缓存国家代码
   ↓
无缓存 → 请求 IP-to-country API
   ↓
country === "CN" ?
   ├─ Yes → Bilibili iframe
   └─ No  → YouTube iframe
```

由于 IP 地理位置本身并非 100% 精确，并且 VPN / 代理 / 企业网络可能改变出口 IP，因此该逻辑只是播放器可用性优化，而不是身份或精确位置判断。

## 🔗 Contact

- GitHub: `@Roylyl`
- Email: `L3092105572@gmail.com`
- Instagram: `@ROYLYL06`
- Douyin: `@Roylyl` / `luoyulun`

二维码与更多联系方式已放在主页底部。

## Notes

本项目目前主要用于个人展示、项目介绍与实习 / 工程方向交流。页面仍会随着实际项目进度继续更新。

© Roy Luo
