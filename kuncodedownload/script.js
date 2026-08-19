(() => {
  const WINDOWS_URL = "https://github.com/Roylyl/KunCode/releases/download/V1.0.0/KunCode-Windows-x64-V1.0.0.exe";
  const MAC_URL = "https://github.com/Roylyl/KunCode/releases/download/V1.0.0/KunCode-macOS-arm64-V1.0.0.pkg";

  const primary = document.getElementById("primaryDownload");
  const primaryHint = document.getElementById("primaryHint");
  const primaryText = document.getElementById("primaryText");
  const windowsCard = document.querySelector('[data-platform="windows"]');
  const macCard = document.querySelector('[data-platform="mac"]');
  const windowsBadge = document.getElementById("windowsBadge");
  const macBadge = document.getElementById("macBadge");

  const ua = navigator.userAgent || "";
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  const isMac = /Mac/i.test(platform) || /Macintosh|Mac OS X/i.test(ua);
  const isWindows = /Win/i.test(platform) || /Windows/i.test(ua);

  if (isMac) {
    primary.href = MAC_URL;
    primaryHint.textContent = "检测到 macOS";
    primaryText.textContent = "下载 Apple Silicon 版";
    macCard.classList.add("detected");
    macBadge.textContent = "推荐";
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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
