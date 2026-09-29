# 音乐页交互检查

运行定向回归检查：

```sh
node music/tests/interactions.cjs
node music/tests/media-session.cjs
node music/tests/lyrics.cjs
node music/tests/lyric-loading.cjs
node music/tests/worker.cjs
node music/tests/cache-preferences.cjs
python3 music/tests/catalog.py
```

覆盖连续切歌、同曲连点、加载中暂停、随机播放历史、上一首、筛选后播放、返回时恢复筛选和滚动位置、手机整行播放与更多菜单隔离，以及音频缓存的请求复用和Range响应。测试使用模拟音频与存储，不代表iPhone真机验收。

- `media-session.cjs`：系统播放直接恢复、残留加载标记、旧请求迟到、主动暂停、保留位置与历史、AudioSession中断和兼容降级、耳机引发的pause事件、暂停点保存、迟到播放拦截、自然结束与内部换源区分；模拟事件不代替真机音频抢占检查。
- `lyrics.cjs`：正负offset、多时间戳、同时间组、三位分钟、不同小数精度、创作者信息和混合文本。
- `lyric-loading.cjs`：缓存不可用、强制重试、TTL、404、超时、快速切歌、清理期间的旧请求、手动滚动和拖动进度。
- `worker.cjs`：真实字节切片、Range/HEAD/416、完整下载去重、预算和配额失败、取消、重启后清理仍保留设置、旧网页壳兼容。
- `cache-preferences.cjs`：默认无限与预加载、已保存设置、旧档位迁移、4GB/8GB、存储不可用及MB/GB换算。
- `catalog.py`：四组小型数据夹具，检查歌词删除、路径更换和本地文件缺失时的版本处理，不扫描或重复计算真实曲库哈希。

页面状态检查覆盖专辑收藏、歌手页、专辑详情、全部歌曲、我喜欢和收藏歌单的有搜索/无搜索状态。歌手页本身不算可清空条件；额外搜索清空后保留歌手页。手动歌手筛选保留原列表身份。另有空列表播放边界、菜单最终尺寸定位、菜单内部滚动以及原生退出全屏后的菜单、队列和焦点清理检查。

## 更新曲库

网页统一读取`music/data/catalog.json`，其中包含同一次发布的曲库、Apple Music歌单与音频参数。

```sh
python3 music/scripts/build-catalog.py
```

导入音频和生成分享页脚本会自动调用此步骤。手工修改三个原始JSON文件后，也需要重新生成。音源版本根据本地文件的修改时间和大小生成，不计算文件哈希；本地音源不存在时保留上一版版本号。

发布前先确保音乐仓库中新增或替换的文件已经可访问，再发布网页仓库。网页目录显示848首不代表远程音源已经推送成功。

## 浏览器验收

`browser.cjs`使用Node22或更新版本内置的WebSocket，通过Chrome调试端口检查真实页面。请使用专用临时浏览器配置，避免改动日常浏览器的缓存设置；脚本会将此配置的音频缓存和预加载关闭。先从仓库根目录启动本地预览：

```sh
python3 -m http.server 8049 --bind 127.0.0.1
```

在另一终端启动测试浏览器并运行：

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --no-first-run --no-default-browser-check \
  --user-data-dir=/tmp/roylyl-music-qa-profile \
  --remote-debugging-port=9231 http://127.0.0.1:8049/music/
```

```sh
AUDIT_OUTPUT=/tmp/roylyl-music-qa node music/tests/browser.cjs
```

可用`MUSIC_URL`、`CDP_URL`替换预览地址和调试端口。添加`--states-only`只运行歌词加载、503失败、404缺失和重试恢复检查。完整检查包含十种视口的封面/歌词/设置截图、居中和溢出断言、相同字号、48px进度触摸区、播放控件稳定性及长标题/浅色模式。仅实际播放当前一首，并用测试请求注入歌词HTTP错误，不批量下载音乐。结果JSON和截图写入`AUDIT_OUTPUT`；完成后关闭测试浏览器。

2026-09-29实际验收记录见[产品验收报告](../reports/product-audit-20260929.md)，包括单首完整缓存后的离线重开与播放结果。

通过HTTP/HTTPS打开页面；`file://`不能提供完整的跨文件读取和Service Worker功能。音频Service Worker透传冷缓存Range请求，完整响应另行缓存；关闭预加载后不会下载下一首。当前音源实测`bytes=10-19`返回206及正确的Content-Range。不支持Service Worker时仍可在线播放。

真机检查：iPhone竖屏和横屏、锁屏上下曲、连续点歌后暂停、慢网切换、断网播放已缓存歌曲、系统返回、菜单触控区域、全屏与底栏遮挡。浏览器可能清理本地存储，持久化申请不代表操作系统保证永久保留。
