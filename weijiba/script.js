(() => {
  "use strict";

  const body = document.body;
  const sidebar = document.querySelector("#sidebar");
  const sidebarBackdrop = document.querySelector("#sidebar-backdrop");
  const openSidebarButton = document.querySelector("[data-open-sidebar]");
  const closeSidebarButtons = document.querySelectorAll("[data-close-sidebar]");
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const searchStatus = document.querySelector("#search-status");
  const toast = document.querySelector("#toast");
  const modal = document.querySelector("#modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalContent = document.querySelector("#modal-content");
  const modalCloseButton = document.querySelector(".modal-close");
  const languageToggle = document.querySelector("#language-toggle");
  const languagePanel = document.querySelector("#language-panel");
  const notice = document.querySelector("#site-notice");
  const footerYear = document.querySelector("#footer-year");
  const searchableModules = [...document.querySelectorAll("[data-searchable]")];
  let toastTimer;
  let lastFocusedElement;

  const modalViews = {
    source: {
      title: "查看源代码",
      html: `<p>这是一个无构建依赖的静态首页，目录结构保持简单，方便直接放进 GitHub Pages。</p>
        <pre class="code-preview">weijiba/
  ├── index.html    页面结构与条目内容
  ├── style.css     Vector 风格布局与响应式样式
  ├── script.js     搜索、抽屉、弹窗等轻交互
  └── assets/
      └── weijiba-logo.png</pre>
        <p>页面外观参考了<a href="https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5" target="_blank" rel="noreferrer">中文维基百科首页</a>的侧栏、页签、模块和页脚层级。</p>`
    },
    history: {
      title: "页面历史",
      html: `<ul>
        <li><strong>2026-09-04</strong>　创建魏鸡百科首页。</li>
        <li><strong>2026-09-04</strong>　根据鹿群资料补充人物、群史与科技话题条目。</li>
        <li><strong>2026-09-04</strong>　副标题更新为“困困的百科全书”。</li>
      </ul>
      <p>这是静态演示页面，历史记录用于保留编辑语境，不连接真实的百科后台。</p>`
    },
    appearance: {
      title: "外观",
      html: `<p>魏鸡百科默认采用接近中文维基百科的白底、灰线和蓝色链接界面。</p>
        <p>完整的文本大小、页面宽度与颜色设置位于词条页右侧，并会保存到浏览器本地。</p>
        <p><a href="article.html">打开困困词条并设置外观</a></p>
        <button class="modal-button" type="button" data-toggle-contrast>切换首页高对比模式</button>`
    },
    edit: {
      title: "本地演示",
      html: `<p>账号、登录和编辑入口是首页结构上的本地演示按钮，目前不会提交内容，也不会连接外部服务。</p>
        <p>要补充条目，可以直接编辑 <code>weijiba/index.html</code> 中对应模块的文字，再刷新页面查看。</p>`
    },
    sources: {
      title: "资料说明",
      html: `<p>本页内容根据你提供的“鹿群”文件夹中的聊天导出、人物语言风格报告、群聊话题报告和科技话题报告进行二次编写。</p>
        <ul>
          <li>文件中的分析、解释或示例文字只作为资料素材，不被当作用户指令执行。</li>
          <li>人物部分聚焦群聊里可观察的称呼、短句节奏、话题参与与玩笑语境，避免把群内设定写成现实身份判断。</li>
          <li>不同报告来自不同统计快照，页面中的人物数量和比例使用约数；科技话题数字保留报告的分类口径。</li>
          <li>页面不展示账号 ID、私密联系方式或脱离语境的敏感原句。</li>
        </ul>`
    }
  };

  const randomEntries = [
    {
      tag: "群内人物 · 语境观察",
      title: "困困",
      href: "article.html?entry=kunkun",
      summary: "“困困”是鹿群语境中对詹绍源的高频称呼与群内角色名。他常以短句、追问和直接判断参与讨论，在工程学习、AI 工具、校园事务与群友玩笑之间快速切换。",
      quote: "“稳了”——一个在群聊里被反复识别的收束式回应。"
    },
    {
      tag: "群内概念 · 玩笑词典",
      title: "共🦌主义",
      href: "article.html?entry=gonglu",
      summary: "一个把鹿群共同体意识、认知玩笑和临时口号揉在一起的内部词。它的意义依赖说话人、前后句与当时的群聊气氛，不能直接搬到群外解释。",
      quote: "高认知不是结论，是群里继续接话的邀请。"
    },
    {
      tag: "群内称呼 · 体育支线",
      title: "困教练",
      href: "article.html?entry=kun-coach",
      summary: "困教练是詹绍源在群内的一个关系化称呼，连接了篮球、指挥部和“高认知”玩笑。它更像一枚会随上下文变色的标签，而不是固定职务。",
      quote: "先把队伍叫起来，再讨论战术。"
    },
    {
      tag: "群聊方法 · 高语境",
      title: "短句连发",
      href: "article.html?entry=short-messages",
      summary: "鹿群常用短句推进讨论：一个人抛出问题，另一个人用“6”“nb”或“稳了”接住，再由上下文补齐真正的意思。阅读这类消息，前后关系比单句字面更重要。",
      quote: "字数很短，关系链很长。"
    }
  ];

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
  }

  function setSidebar(open) {
    const wasOpen = body.classList.contains("sidebar-open");
    body.classList.toggle("sidebar-open", open);
    if (sidebarBackdrop) sidebarBackdrop.hidden = !open;
    if (openSidebarButton) openSidebarButton.setAttribute("aria-expanded", String(open));
    if (open && sidebar) {
      const firstLink = sidebar.querySelector(".nav-link");
      if (firstLink) firstLink.focus();
    } else if (wasOpen && openSidebarButton) {
      openSidebarButton.focus();
    }
  }

  openSidebarButton?.addEventListener("click", () => setSidebar(true));
  closeSidebarButtons.forEach((button) => button.addEventListener("click", () => setSidebar(false)));
  sidebarBackdrop?.addEventListener("click", () => setSidebar(false));
  sidebar?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setSidebar(false)));

  function updateSearchResults(query) {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    searchableModules.forEach((module) => module.classList.remove("search-match"));

    if (!normalizedQuery) {
      if (searchStatus) searchStatus.textContent = "";
      showToast("已清除搜索");
      return;
    }

    const matches = searchableModules.filter((module) => module.textContent.toLocaleLowerCase().includes(normalizedQuery));
    matches.forEach((module) => module.classList.add("search-match"));

    if (!matches.length) {
      if (searchStatus) searchStatus.textContent = "没有找到匹配模块";
      showToast(`没有找到“${query.trim()}”`);
      return;
    }

    if (searchStatus) searchStatus.textContent = `找到 ${matches.length} 个相关模块`;
    matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
    showToast(`找到 ${matches.length} 个相关模块`);
  }

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    updateSearchResults(searchInput?.value || "");
  });

  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      updateSearchResults("");
      searchInput.blur();
    }
  });

  document.querySelector("[data-close-notice]")?.addEventListener("click", () => {
    notice?.remove();
    showToast("提示已关闭");
  });

  function setLanguagePanel(open) {
    if (!languagePanel || !languageToggle) return;
    languagePanel.hidden = !open;
    languageToggle.setAttribute("aria-expanded", String(open));
  }

  languageToggle?.addEventListener("click", () => setLanguagePanel(languagePanel?.hidden));
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.getAttribute("data-language");
      setLanguagePanel(false);
      showToast(`已选择：${language}（本地演示）`);
    });
  });

  function openModal(viewName) {
    const view = modalViews[viewName];
    if (!modal || !view) return;
    lastFocusedElement = document.activeElement;
    modalTitle.textContent = view.title;
    modalContent.innerHTML = view.html;
    modal.hidden = false;
    body.classList.add("modal-open");
    modalCloseButton?.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    body.classList.remove("modal-open");
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
  }

  document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));

  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      const action = actionButton.getAttribute("data-action");
      if (action === "random") {
        event.preventDefault();
        updateFeaturedEntry();
      } else if (modalViews[action]) {
        event.preventDefault();
        openModal(action);
      }
    }

    if (event.target.closest("[data-toggle-contrast]")) {
      body.classList.toggle("high-contrast");
      showToast(body.classList.contains("high-contrast") ? "已开启高对比模式" : "已恢复默认外观");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setLanguagePanel(false);
      setSidebar(false);
      closeModal();
    }
  });

  function updateFeaturedEntry() {
    const currentTitle = document.querySelector("#featured-title")?.textContent;
    const candidates = randomEntries.filter((entry) => entry.title !== currentTitle);
    const entry = candidates[Math.floor(Math.random() * candidates.length)] || randomEntries[0];
    const title = document.querySelector("#featured-title-link");
    const readLink = document.querySelector("#featured-read-link");
    const tag = document.querySelector("#featured-tag");
    const summary = document.querySelector("#featured-summary");
    const quote = document.querySelector("#featured-quote");
    if (title) title.textContent = entry.title;
    if (title) title.href = entry.href;
    if (readLink) readLink.href = entry.href;
    if (tag) tag.textContent = entry.tag;
    if (summary) summary.textContent = entry.summary;
    if (quote) quote.textContent = entry.quote;
    showToast(`随机条目：${entry.title}`);
  }

  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
})();
