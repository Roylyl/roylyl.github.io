# KunCode 官网

KunCode 是由 603 打造的跨平台开发工具，基于 Code - OSS 定制。本目录是 KunCode 下载官网的静态页面，用于展示产品信息并提供 Windows 与 macOS 安装包下载入口。

官网地址：[https://roylyl.github.io/kuncode/](https://roylyl.github.io/kuncode/)

项目仓库：[https://github.com/Roylyl/KunCode](https://github.com/Roylyl/KunCode)

## 功能

- 展示 KunCode 产品介绍、主要功能和开源信息
- 提供 Windows x64 安装包下载
- 提供 macOS Apple Silicon（arm64）安装包下载
- 根据访问者的操作系统自动突出推荐的下载平台
- 展示当前版本，并自动生成对应的 GitHub Release 下载链接
- 支持 GitHub Pages 直接部署

## 技术栈

本页面使用原生 Web 技术构建，不依赖构建工具或第三方运行时：

- HTML
- CSS
- JavaScript
- GitHub Pages

## 目录结构

```text
.
├── index.html            # 官网主页、版本和安装包配置
├── style.css             # 页面样式
├── script.js             # 平台检测、下载链接和交互逻辑
├── 部署说明.txt           # 简要部署记录
├── apple-touch-icon.png  # 水豚品牌图标
├── favicon.png           # 网站图标
├── favicon-32.png        # 32 × 32 网站图标
├── og-image.jpg          # 社交分享图
└── og-image-v2.jpg       # 当前使用的社交分享图
```

## 本地预览

页面不需要安装依赖，可以直接使用任意静态文件服务器预览。例如，在本目录执行：

```bash
python3 -m http.server 8000
```

然后访问 [http://localhost:8000](http://localhost:8000)。

也可以直接在浏览器中打开 `index.html`，但使用静态服务器更接近 GitHub Pages 的运行环境。

## 部署到 GitHub Pages

本目录位于 `roylyl.github.io` 仓库的 `kuncode/` 子目录中。部署步骤如下：

1. 将整个 `kuncode` 目录放入 `roylyl.github.io` 仓库根目录。
2. 提交变更并推送到 `main` 分支。
3. 在 GitHub Pages 设置中选择 `main` 分支和仓库根目录（`/(root)`）。
4. 访问 [https://roylyl.github.io/kuncode/](https://roylyl.github.io/kuncode/) 验证页面。

## 发布新版本

当前版本和安装包文件名配置在 `index.html` 的 `<head>` 元信息中：

```html
<meta name="kuncode-release" content="V1.0.0" />
<meta name="kuncode-windows-asset" content="KunCode-Windows-x64-{version}.exe" />
<meta name="kuncode-macos-asset" content="KunCode-macOS-arm64-{version}.pkg" />
```

发布新版本时：

1. 在 GitHub 创建对应的 Release tag，例如 `V1.0.1`。
2. 上传与配置一致的安装包文件：
   - `KunCode-Windows-x64-V1.0.1.exe`
   - `KunCode-macOS-arm64-V1.0.1.pkg`
3. 将 `index.html` 中的 `kuncode-release` 更新为新版本号。
4. 如果安装包命名规则发生变化，同时更新 `kuncode-windows-asset` 或 `kuncode-macos-asset`。
5. 提交并推送官网变更。

`script.js` 会读取这些元信息，并自动生成以下下载地址：

```text
https://github.com/Roylyl/KunCode/releases/download/{version}/{asset}
```

## 支持的平台

| 平台 | 架构 | 安装包格式 |
| --- | --- | --- |
| Windows | x64 | `.exe` |
| macOS | Apple Silicon / arm64 | `.pkg` |

macOS 用户首次打开应用时，如果系统显示安全提示，请前往“系统设置 → 隐私与安全性”，允许打开 KunCode。

## 开源与声明

KunCode 基于 Code - OSS 定制，并以 MIT License 发布。欢迎通过 GitHub 提交 Issue、功能建议和 Pull Request。

KunCode 是由 603 维护的独立第三方开源项目，与 Microsoft Corporation 没有隶属、授权、赞助或官方合作关系。Microsoft、Visual Studio Code 及相关标识属于其各自权利人的商标。
