# R music第三方告知

本文件记录本播放器随附的中文分词数据与构建时编入产物的OpenCC派生字表。Folia衍生前端整体的AGPL-3.0许可见[LICENSE](LICENSE)，以下组件同时保留各自的原始许可与版权告知。

| 组件 | 来源与版本 | 用途 | 保留的告知 |
| --- | --- | --- | --- |
| opencc-js | [nk2028/opencc-js](https://github.com/nk2028/opencc-js/tree/v1.4.2)，1.4.2 | 构建中文繁体转简体字表 | [MIT许可与版权全文](licenses/opencc-js-MIT.txt) |
| opencc-data | 随opencc-js1.4.2分发，来源为[nk2028/opencc-data](https://github.com/nk2028/opencc-data) | OpenCC转换词典数据，构建后生成的派生数据编入歌词分词模块 | [上游第三方告知与Apache-2.0许可全文](licenses/opencc-js-THIRD_PARTY_LICENSES.md) |
| jieba数据 | [fxsjy/jieba](https://github.com/fxsjy/jieba/tree/67fa2e36e72f69d9134b8a1037b83fbb070b9775)，随Folia提供的固定版本 | 中文分词词典与HMM参数 | [原始MIT许可及Sun Junyi版权告知](source/dev/icuFolia/jieba/LICENSE)、[文件来源](source/dev/icuFolia/jieba/README.md) |

opencc-js的代码采用MIT许可，其随附词典数据采用Apache-2.0许可；本项目不把这些词典数据重新标成MIT。上述两个OpenCC告知文件保留安装包提供的原文。

R music的`source/dev/icuFolia/icuFoliaDataPlugin.mjs`在构建时调用OpenCC，并将字表写入分词模块。即使生产环境不安装`node_modules/`，本目录中的许可文本与来源信息仍与播放器一起保留。

其他通过包管理器安装的依赖继续适用各自的许可；版本由[依赖锁定文件](source/pnpm-lock.yaml)记录。本文件聚焦随附分词数据与OpenCC派生数据，不作为全部依赖许可证清单。
