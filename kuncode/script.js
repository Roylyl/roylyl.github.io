(() => {
  const RELEASE_BASE = "https://github.com/Roylyl/KunCode/releases";
  const meta = name => document.querySelector(`meta[name="${name}"]`)?.content || "";
  const version = meta("kuncode-release");
  const assetName = platform => meta(`kuncode-${platform}-asset`).replaceAll("{version}", version);
  const releaseUrl = `${RELEASE_BASE}/tag/${version}`;
  const downloadUrl = platform => `${RELEASE_BASE}/download/${version}/${assetName(platform)}`;
  const WINDOWS_URL = downloadUrl("windows");
  const MAC_URL = downloadUrl("macos");

  const primary = document.getElementById("primaryDownload");
  const primaryHint = document.getElementById("primaryHint");
  const primaryText = document.getElementById("primaryText");
  const windowsCard = document.querySelector('[data-platform="windows"]');
  const macCard = document.querySelector('[data-platform="mac"]');
  const windowsBadge = document.getElementById("windowsBadge");
  const macBadge = document.getElementById("macBadge");

  document.querySelectorAll("[data-release-version]").forEach(el => { el.textContent = version; });
  document.querySelector('[data-download="windows"]').href = WINDOWS_URL;
  document.querySelector('[data-download="mac"]').href = MAC_URL;
  document.querySelector('[data-filename="windows"]').textContent = assetName("windows");
  document.querySelector('[data-filename="mac"]').textContent = assetName("macos");
  const releaseLink = document.querySelector("[data-release-link]");
  releaseLink.href = releaseUrl;
  releaseLink.textContent = `查看 ${version} Release ↗`;

  const ua = navigator.userAgent || "";
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  const isMac = /Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua);
  const isWindows = /Win/i.test(platform) || /Windows/i.test(ua);

  if (isMac) {
    primary.href = "#download";
    primaryHint.textContent = "检测到 macOS";
    primaryText.textContent = "选择 macOS 安装包";
    macCard.classList.add("detected");
    macBadge.textContent = "请确认 M 系列芯片";
  } else if (isWindows) {
    primary.href = WINDOWS_URL;
    primaryHint.textContent = "检测到 Windows";
    primaryText.textContent = "下载 Windows x64";
    windowsCard.classList.add("detected");
    windowsBadge.textContent = "推荐";
  } else {
    primary.href = "#download";
    primaryHint.textContent = "选择你的平台";
    primaryText.textContent = "下载 KunCode";
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const target = link.getAttribute("href");
      if (!target || target === "#") return;
      const el = document.querySelector(target);
      if (!el) return;
      event.preventDefault();
      const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      el.scrollIntoView({ behavior, block: "start" });
    });
  });
})();
