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

  const entryPaths = {
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
    "nb-context": "nb",
    "question-rain": "问号瀑布",
    "he-meaning": "何意味",
    "eat-what": "吃什么",
    "six-six-six": "666量子态",
    "strong-chain": "强三连",
    steady: "稳了",
    person: "人物",
    "all-broadcast": "全员广播",
    "check-in-kids": "打卡了孩子们",
    "dell-question": "戴尔问号",
    "frame-study": "逐帧学习",
    "jacobian-rapid": "雅可比速问速答",
    "robot-basics": "机器人基础",
    "seven-robots": "七个机器人",
    "603-vision": "603视界",
    "cognition-universe": "高认知宇宙",
    "kunkun-who": "困困是谁",
    "silence-open": "静音不开",
    "portrait-generator": "人物群像生成器",
    "six-reaction": "6号反应",
    "peng-peng": "彭鹏",
    "wei-ziqi": "魏子奇",
    "tang-yinxin": "唐胤鑫",
    "wu-zixuan": "吴子轩",
    "xia-weicheng": "夏炜城",
    "chen-zuhan": "陈祖涵",
    "deng-yuhang": "邓宇航",
    "li-jianyu": "黎健毓",
    "tang-bofu": "唐博釜",
    "li-yanzhen": "李彦臻",
    "wang-pengtao": "王鹏涛",
    "tu-tenghui": "涂腾辉"
  };

  const generatedTopics = Object.freeze([
    "问号", "何意味", "吃什么", "666", "6号", "稳了", "人物", "高认知", "共🦌主义", "困困",
    "困教", "困教练", "逐帧学习", "雅可比", "机器人", "七个机器人", "603", "604", "杜邦线", "全员广播",
    "打卡", "静音", "戴尔", "指挥部", "五年计划", "高认知大学", "高认知酒店", "群聊回路", "短句连发", "nb",
    "61", "徐哥", "书记", "工程设计", "AI工具", "云电脑", "硬件", "项目", "学习", "代码报错",
    "元认知", "智能采茶机", "桌面机器人", "Robomaster", "高认知饮食", "课程表", "查寝", "接龙", "机器人协会", "群史"
  ]);
  const generatedFormats = Object.freeze([
    "{topic}研究所", "{topic}委员会", "{topic}临时法", "{topic}现象学", "{topic}操作手册",
    "{topic}经济学", "{topic}生态位", "{topic}协议", "{topic}鹿群宇宙", "{topic}档案",
    "{topic}观测站", "{topic}工作组", "{topic}危机公关", "{topic}共和国", "{topic}式回答",
    "{topic}的反向解释", "{topic}与鹿群的关系", "{topic}拟人化", "{topic}事件续集", "{topic}不完全指南"
  ]);
  const generatedEntryRecords = [];
  generatedTopics.forEach((topic, topicIndex) => {
    generatedFormats.forEach((format, formatIndex) => {
      const index = topicIndex * generatedFormats.length + formatIndex + 1;
      const slug = `odd-${String(index).padStart(4, "0")}`;
      const title = format.replace("{topic}", topic);
      generatedEntryRecords.push({ slug, title, topic, format, index });
      entryPaths[slug] = title;
    });
  });
  Object.freeze(entryPaths);

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
  window.WEIJIBA_GENERATED_ENTRY_RECORDS = generatedEntryRecords;
  window.WEIJIBA_ENTRY_URL = getEntryUrl;
  window.WEIJIBA_ENTRY_FROM_PATH = getEntryFromPath;
  window.WEIJIBA_NORMALIZE_ENTRY_LINKS = normalizeEntryLinks;
})();
