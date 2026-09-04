(() => {
  "use strict";

  const forceScrollTop = () => window.scrollTo(0, 0);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  forceScrollTop();
  window.addEventListener("pageshow", forceScrollTop);
  window.addEventListener("load", () => {
    forceScrollTop();
    window.setTimeout(forceScrollTop, 0);
  }, { once: true });

  const entryPaths = Object.freeze({
    kunkun: "困困",
    luchun: "鹿群",
    history: "群内编年史与群史",
    gonglu: "共🦌主义",
    "high-cognition": "高认知",
    "kun-coach": "困教练",
    "short-messages": "短句连发",
    tech: "鹿群科技话题",
    hardware: "硬件与数码",
    projects: "项目与竞赛",
    platforms: "数字平台与产品",
    "ai-tools": "AI与大模型",
    learning: "学习与课程",
    coding: "编码与开发",
    security: "安全与数据",
    "chat-cycle": "鹿群群聊回路",
    "61": "61",
    "xu-ge": "徐哥",
    secretary: "书记",
    particle: "对齐一下颗粒度",
    "nb-context": "nb"
  });

  const slugByPath = Object.fromEntries(Object.entries(entryPaths).map(([slug, path]) => [path, slug]));

  function getSiteRoot() {
    const marker = "/weijiba/";
    const pathname = window.location.pathname;
    const markerIndex = pathname.indexOf(marker);
    if (markerIndex >= 0) return pathname.slice(0, markerIndex + marker.length);
    return "/";
  }

  function getEntryUrl(slug) {
    const path = entryPaths[slug];
    return path ? `${getSiteRoot()}${encodeURIComponent(path)}/` : "";
  }

  function getEntryFromPath(pathname) {
    let path = pathname.split("/").filter(Boolean).pop() || "";
    try {
      path = decodeURIComponent(path);
    } catch (_) {}
    return slugByPath[path] || "";
  }

  function normalizeEntryLinks(root = document) {
    root.querySelectorAll?.('a[href*="article.html?entry="]').forEach((link) => {
      const rawHref = link.getAttribute("href") || "";
      const slug = new URL(rawHref, window.location.href).searchParams.get("entry");
      const href = getEntryUrl(slug);
      if (!href) return;
      link.setAttribute("href", href);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  }

  window.WEIJIBA_ENTRY_PATHS = entryPaths;
  window.WEIJIBA_ENTRY_URL = getEntryUrl;
  window.WEIJIBA_ENTRY_FROM_PATH = getEntryFromPath;
  window.WEIJIBA_NORMALIZE_ENTRY_LINKS = normalizeEntryLinks;
})();
