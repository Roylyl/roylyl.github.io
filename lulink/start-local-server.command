#!/bin/bash
cd "$(dirname "$0")"
PORT=8080
if command -v python3 >/dev/null 2>&1; then
  (sleep 1; open "http://localhost:$PORT") &
  python3 -m http.server "$PORT"
else
  echo "未找到 Python 3。请安装 Python 3，或用任意本地静态服务器打开此目录。"
  read -p "按回车退出"
fi
