(() => {
  const STORAGE_KEY = 'roylyl.site.language';
  // The shell changes its URL while this document remains the home page.
  const documentPage = location.pathname.split('/').pop() || 'index.html';
  const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();

  const cn = {
    'Open menu': '打开菜单', 'Close menu': '关闭菜单',
    '个人主页': '个人主页',
    '背景音乐仅用于个人非商业展示 · 音乐版权归原权利人所有': '背景音乐仅用于个人非商业展示 · 音乐版权归原权利人所有',
    '学生工程实践者 · 音频产品探索者 · Desk Park 乐队吉他手': '学生工程实践者 · 音频产品探索者 · Desk Park 乐队吉他手',
    '通过音响展调研，我开始更系统地思考音频产品、技术融合和真实使用场景。': '通过音响展调研，我开始更系统地思考音频产品、技术融合和真实使用场景。',
    '欢迎交流硬件、音频产品和早期项目实践。': '欢迎交流硬件、音频产品和早期项目实践。',
    'About': '关于', 'Experience': '经历', 'Projects': '项目', 'Skills': '技能', 'Philosophy': '理念', 'Music': '音乐', 'Social': '社交媒体', 'Contact': '联系', 'Resume': '简历',
    'Intro': '介绍', 'Value': '产品价值', 'Scenes': '场景', 'Ultrasonic': '定向声', 'Home': '主页',
    'Overview': '概览', 'Engineering': '工程', 'Gallery': '画面', 'SoundShare': '音享贴',
    'Product': '产品', 'Fusion': '技术融合', 'Startup': '创业', 'Future': '未来',
    'HARDWARE · EMBEDDED · ENGINEERING PORTFOLIO': '硬件 · 嵌入式 · 工程作品集',
    'CURRENT FOCUS': '当前重点', 'SECONDARY IDENTITY': '第二身份', 'ABOUT': '关于', 'FEATURED PROJECTS': '精选项目', 'SKILLS': '技能',
    'PRODUCT & ENTREPRENEURSHIP PHILOSOPHY': '产品与创业理念', 'PRODUCT PHILOSOPHY': '产品理念', 'ENTREPRENEURSHIP': '创业理念', 'MY WORKING PRINCIPLE': '我的工作原则',
    'MUSIC · SECONDARY': '音乐 · 第二主线', 'SOCIAL': '社交媒体', 'WECHAT': 'WECHAT', 'DOUYIN': 'DOUYIN', 'WHATSAPP': 'WHATSAPP', 'CONTACT': '联系方式',
    'Embedded': '嵌入式', 'Hardware': '硬件', 'Project Delivery': '项目交付', 'Audio Awareness': '音频感知',
    'VALUE': '产品价值', 'UI SHOWCASE': '界面展示', 'SCENES': '使用场景', 'OVERVIEW': '项目概览', 'ENGINEERING': '工程实现', 'GALLERY': '项目画面',
    'SHORT TERM': '短期', 'MID TERM': '中期', 'LONG TERM': '长期', 'WORKING PRINCIPLE': '工作原则',
    'CURRENT EXPERIENCE': '当前经历', 'INTERNSHIP EXPERIENCE': '实习经历', 'HARDWARE & MARKET RESEARCH': '硬件与市场调研', 'MARKET RESEARCH INTERNSHIP': '市场调研实习', 'HARDWARE INTERNSHIP': '硬件部实习', 'AI AUDIO ALGORITHM INTERNSHIP': 'AI 音频算法实习', 'FIRST PCB VALIDATED': '首版 PCB 已验证',
    'ENGINEERING STATUS': '工程状态', 'VERIFIED': '已验证', 'IMPLEMENTED': '已实现', 'DEVELOPED': '已开发', 'DESIGNED': '已完成设计',
    'SYSTEM ARCHITECTURE': '系统架构', 'SOURCE': '音源', 'A BOARD': 'A 板',
    'Prototype Status': '原型状态', 'CONCEPT FORM · ENGINEERING PROJECT BELOW': '概念形态 · 工程过程见下文',
    '01 · BUILD': '01 · 搭建', '02 · DEBUG': '02 · 调试', '03 · VALIDATE': '03 · 验证'
  };

  const tw = {
    'Open menu': '開啟選單', 'Close menu': '關閉選單',
    '个人主页': '個人首頁',
    '背景音乐仅用于个人非商业展示 · 音乐版权归原权利人所有': '背景音樂僅用於個人非商業展示 · 音樂版權歸原權利人所有',
    '学生工程实践者 · 音频产品探索者 · Desk Park 乐队吉他手': '學生工程實踐者 · 音頻產品探索者 · Desk Park 樂隊吉他手',
    '通过音响展调研，我开始更系统地思考音频产品、技术融合和真实使用场景。': '透過音響展調研，我開始更系統地思考音頻產品、技術融合和真實使用場景。',
    '欢迎交流硬件、音频产品和早期项目实践。': '歡迎交流硬件、音頻產品和早期項目實踐。',
    '罗宇伦 Roy Luo': '羅宇倫 Roy Luo',
    '← 罗宇伦 Roy Luo': '← 羅宇倫 Roy Luo',
    'About': '關於', 'Experience': '經歷', 'Projects': '項目', 'Skills': '技能', 'Philosophy': '理念', 'Music': '音樂', 'Social': '社交媒體', 'Contact': '聯絡', 'Resume': '履歷',
    'Intro': '介紹', 'Value': '產品價值', 'Scenes': '場景', 'Ultrasonic': '定向聲', 'Home': '首頁', 'Overview': '概覽', 'Engineering': '工程', 'Gallery': '畫面', 'SoundShare': '音享貼', 'Product': '產品', 'Fusion': '技術融合', 'Startup': '創業', 'Future': '未來',
    'HARDWARE · EMBEDDED · ENGINEERING PORTFOLIO': '硬件 · 嵌入式 · 工程作品集', 'CURRENT FOCUS': '目前重點', 'SECONDARY IDENTITY': '第二身份', 'ABOUT': '關於', 'FEATURED PROJECTS': '精選項目', 'SKILLS': '技能',
    'PRODUCT & ENTREPRENEURSHIP PHILOSOPHY': '產品與創業理念', 'PRODUCT PHILOSOPHY': '產品理念', 'ENTREPRENEURSHIP': '創業理念', 'MY WORKING PRINCIPLE': '我的工作原則',
    'MUSIC · SECONDARY': '音樂 · 第二主線', 'SOCIAL': '社群媒體', 'WECHAT': 'WECHAT', 'DOUYIN': 'DOUYIN', 'WHATSAPP': 'WHATSAPP', 'CONTACT': '聯絡方式', 'Embedded': '嵌入式', 'Hardware': '硬件', 'Project Delivery': '項目交付', 'Audio Awareness': '音頻感知',
    'VALUE': '產品價值', 'UI SHOWCASE': '介面展示', 'SCENES': '使用場景', 'OVERVIEW': '項目概覽', 'ENGINEERING': '工程實現', 'GALLERY': '項目畫面', 'SHORT TERM': '短期', 'MID TERM': '中期', 'LONG TERM': '長期', 'WORKING PRINCIPLE': '工作原則',
    '查看项目': '查看項目', '联系我': '聯絡我', '硬件 / 嵌入式': '硬件 / 嵌入式', '音乐 QA': '音樂 QA', '简体 · 繁體 · English': '簡體 · 繁體 · English',
    '以工程能力为主线，': '以工程能力為主線，', '把想法做成样机。': '把想法做成樣機。',
    '我是罗宇伦，湖南农业大学卓越工程师学院本科生。当前重点方向是硬件开发、嵌入式系统、样机实现与工程验证。 长期的音乐与音频实践，也让我在延迟、底噪、动态响应和交互体验上保持更敏锐的感知。': '我是羅宇倫，湖南農業大學卓越工程師學院本科生。目前重點方向是硬件開發、嵌入式系統、樣機實現與工程驗證。長期的音樂與音頻實踐，也讓我在延遲、底噪、動態響應和互動體驗上保持更敏銳的感知。',
    '硬件调试、样机搭建、基础 PCB 设计与系统联调。': '硬件調試、樣機搭建、基礎 PCB 設計與系統聯調。',
    'DP音乐工作室主理人 · Desk Park乐队吉他手': 'DP音樂工作室主理人 · Desk Park樂隊吉他手',
    '长期乐队演出与音频设备实践，让我能从真实使用场景理解音频产品。': '長期樂隊演出與音頻設備實踐，讓我能從真實使用場景理解音頻產品。',
    '我目前最核心的能力结构。': '我目前最核心的能力結構。',
    '嵌入式开发': '嵌入式開發', '硬件实现': '硬件實現', '项目推进': '項目推進', '音频体验辅助': '音頻體驗輔助',
    '以 ESP32 为主，进行蓝牙音频、基础控制逻辑与原型功能验证。': '以 ESP32 為主，進行藍牙音頻、基礎控制邏輯與原型功能驗證。',
    '样机搭建、功放电路实验、硬件调试、系统联调与现场展示。': '樣機搭建、功放電路實驗、硬件調試、系統聯調與現場展示。',
    '能够在学生项目中承担负责人角色，推进分工、验证与展示落地。': '能夠在學生項目中承擔負責人角色，推進分工、驗證與展示落地。',
    '长期乐队演出与设备使用，让我对延迟、底噪、动态响应等更敏感。': '長期樂隊演出與設備使用，讓我對延遲、底噪、動態響應等更敏感。',
    '从功能原型，到可验证的工程项目。': '從功能原型，到可驗證的工程項目。',
    '超声波定向扬声器': '超聲波定向揚聲器',
    '基于 ESP32 平台推进的定向音频项目，围绕蓝牙音频接收、样机搭建、基础硬件系统与工程验证展开。': '基於 ESP32 平台推進的定向音頻項目，圍繞藍牙音頻接收、樣機搭建、基礎硬件系統與工程驗證展開。',
    '了解更多': '瞭解更多',
    '音享贴 · LENGHE SoundShare': '音享貼 · LENGHE SoundShare',
    '面向多人蓝牙音频共享场景的轻量化中继设备概念，重点展示产品结构、控制逻辑与多端 UI 设计。': '面向多人藍牙音頻共享場景的輕量化中繼設備概念，重點展示產品結構、控制邏輯與多端 UI 設計。',
    '面向工程岗位的能力展示。': '面向工程職位的能力展示。',
    'ESP32、Arduino、ESP-IDF 学习实践，进行原型功能验证与基础嵌入式开发。': 'ESP32、Arduino、ESP-IDF 學習實踐，進行原型功能驗證與基礎嵌入式開發。',
    '基础 PCB 设计、硬件调试、样机搭建、功放联调、现场功能验证与展示。': '基礎 PCB 設計、硬件調試、樣機搭建、功放聯調、現場功能驗證與展示。',
    '嘉立创 EDA': '嘉立創 EDA',
    '从概念、分工到原型展示的完整推进能力，能在学生项目中承担负责人角色。': '從概念、分工到原型展示的完整推進能力，能在學生項目中承擔負責人角色。',
    '音乐与音频设备实践让我能从用戶视角理解延迟、底噪、动态响应与交互体验。': '音樂與音頻設備實踐讓我能從用戶視角理解延遲、底噪、動態響應與互動體驗。',
    '不为了创新而创新。': '不為了創新而創新。',
    '从真实场景和用户痛点出发，再决定技术方案': '從真實場景和用戶痛點出發，再決定技術方案',
    '避免无意义的参数堆叠和功能堆砌': '避免無意義的參數堆疊和功能堆砌',
    '尊重用户已有设备，尽量创造增量价值而非强制替代': '尊重用戶已有設備，盡量創造增量價值而非強制替代',
    '让多个成熟功能形成协同，而不是简单做功能加法': '讓多個成熟功能形成協同，而不是簡單做功能加法',
    '务实的理想主义。': '務實的理想主義。',
    '先做出用户愿意使用、愿意付费的产品': '先做出用戶願意使用、願意付費的產品',
    '用现金流换取研发自由与更长的技术周期': '用現金流換取研發自由與更長的技術週期',
    '选择巨头动力不足、但足以支撑小团队的细分市场': '選擇巨頭動力不足、但足以支撐小團隊的細分市場',
    '短期务实落地，长期继续探索定向声与空间音频': '短期務實落地，長期繼續探索定向聲與空間音頻',
    '阅读全文 →': '閱讀全文 →',
    '音乐是第二主线，但依然能说明我与音频产品的关系。': '音樂是第二主線，但依然能說明我與音頻產品的關係。',
    '乐队演出 / 基础音频制作 / 音色实践': '樂隊演出 / 基礎音頻製作 / 音色實踐',
    '我长期进行乐队排练与现场演出，熟悉电吉他、效果器、监听系统和 DAW 工作流。这些实践也持续反哺我对音频产品、设备交互和真实使用体验的理解。': '我長期進行樂隊排練與現場演出，熟悉電吉他、效果器、監聽系統和 DAW 工作流。這些實踐也持續反饋我對音頻產品、設備互動和真實使用體驗的理解。',
    '更多联系方式与社交媒体。': '更多聯絡方式與社群媒體。',
    '微信': '微信', '微信号：Roylyl06': '微信號：Roylyl06',
    '用户 ID：ROYLYL06': '用戶 ID：ROYLYL06',
    '抖音': '抖音', '@Roylyl · 抖音号：luoyulun': '@Roylyl · 抖音號：luoyulun',
    '如果你在寻找硬件 / 嵌入式方向的实习生，欢迎联系我。': '如果你正在尋找硬件 / 嵌入式方向的實習生，歡迎聯絡我。',
    '也可以查看我的 GitHub、简历与两个项目的完整介绍。': '也可以查看我的 GitHub、履歷與兩個項目的完整介紹。',
    '发邮件': '寄送郵件', '下载简历': '下載履歷', '下载简历 ↗': '下載履歷 ↗', '下载三语简历': '下載三語履歷', '下载三语简历 ↗': '下載三語履歷 ↗',
    '角色：项目负责人': '角色：項目負責人', '平台：ESP32': '平台：ESP32', '阶段：第一代 Demo': '階段：第一代 Demo',
    '角色：产品与交互设计': '角色：產品與互動設計', '形态：蓝牙中继': '形態：藍牙中繼', '阶段：产品概念': '階段：產品概念',
    '产品与交互设计': '產品與互動設計', '蓝牙中继': '藍牙中繼', '产品概念': '產品概念',
    '查看二维码': '查看 QR Code', '关闭二维码': '關閉 QR Code', '社交媒体二维码': '社群媒體 QR Code', '点击播放视频': '點擊播放影片',

    '音享贴': '音享貼', '返回主页': '返回首頁', '查看多端 UI': '查看多端 UI',
    '一个面向跨生态多人蓝牙音频共享的轻量化中继设备概念。核心目标是让用户在不更换现有蓝牙设备的前提下，低成本完成多人同步听音与可视化控制。': '一個面向跨生態多人藍牙音頻共享的輕量化中繼設備概念。核心目標是讓用戶在不更換現有藍牙設備的前提下，以較低成本完成多人同步聽音與視覺化控制。',
    '它不是替代现有设备，而是打通设备之间的壁垒。': '它不是取代現有設備，而是打通設備之間的壁壘。',
    '音享贴围绕“音源终端 — 音享贴中继 — 多终端播放设备”的架构工作，强调跨品牌兼容、手动可视化校准与多设备独立控制。': '音享貼圍繞「音源終端 — 音享貼中繼 — 多終端播放設備」的架構工作，強調跨品牌相容、手動視覺化校準與多設備獨立控制。',
    '跨生态共享': '跨生態共享', '连接手机或平板作为音源，再同步分发到多台蓝牙耳机或音箱。': '連接手機或平板作為音源，再同步分發到多台藍牙耳機或音箱。',
    '磁吸轻量形态': '磁吸輕量形態', '以轻量化硬件中继的思路切入，强调便携、低门槛与快速落地。': '以輕量化硬件中繼的思路切入，強調便攜、低門檻與快速落地。',
    '手动毫秒级校准': '手動毫秒級校準', '通过可视化延迟调节解决不同设备的固有播放时差，适配民用场景。': '透過視覺化延遲調節解決不同設備的固有播放時差，適配日常使用場景。',
    '多端可视化控制': '多端視覺化控制', '支持 iPad、iPhone、Android、微信小程序与 Apple Watch 等交互形态。': '支援 iPad、iPhone、Android、微信小程式與 Apple Watch 等互動形態。',
    '多终端控制界面。': '多終端控制介面。',
    '在这个项目里，UI 不是装饰，而是产品逻辑的一部分：设备连接、同步校准、音量控制、状态确认都需要更直观的交互来承载。': '在這個項目裡，UI 不是裝飾，而是產品邏輯的一部分：設備連接、同步校準、音量控制、狀態確認都需要更直觀的互動來承載。',
    '大屏控制总览': '大螢幕控制總覽', '适合在更大视图下查看多设备状态与高级设置。': '適合在更大視圖下查看多設備狀態與進階設定。',
    'iOS 控制应用': 'iOS 控制應用', '基于 iOS 开发设备连接、音量控制与播放状态管理功能。': '基於 iOS 開發設備連接、音量控制與播放狀態管理功能。',
    'Android 控制应用': 'Android 控制應用', '基于 Android 开发设备连接、音量控制与播放状态管理功能。': '基於 Android 開發設備連接、音量控制與播放狀態管理功能。',
    '微信小程序 UI': '微信小程式 UI', '轻量化跨端控制入口': '輕量化跨端控制入口', '适合作为更低门槛的设备控制入口，方便用户快速连接与管理。': '適合作為更低門檻的設備控制入口，方便用戶快速連接與管理。',
    '节点音量控制': '節點音量控制', '在腕上查看与微调不同节点设备的音量状态。': '在手腕上查看與微調不同節點設備的音量狀態。',
    '延迟与同步提示': '延遲與同步提示', '在更轻量的场景里查看双设备同步状态与延迟信息。': '在更輕量的場景裡查看雙設備同步狀態與延遲信息。',
    '围绕真实场景来定义产品价值。': '圍繞真實場景來定義產品價值。',
    '情侣 / 朋友影音共享': '情侶 / 朋友影音共享', '多人使用各自耳机同步观影或听音，兼顾私密性与陪伴感。': '多人使用各自耳機同步觀影或聽音，兼顧私密性與陪伴感。',
    '居家 / 聚会 K 歌': '居家 / 聚會 K 歌', '同时连接耳机与音箱，在监听与氛围之间找到更轻量的平衡。': '同時連接耳機與音箱，在監聽與氛圍之間找到更輕量的平衡。',
    '户外多音箱组网': '戶外多音箱組網', '在露营、团建、骑行等活动中临时搭建同步音响系统。': '在露營、團建、騎行等活動中臨時搭建同步音響系統。',
    '从概念、交互到落地路径，继续打磨。': '從概念、互動到落地路徑，持續打磨。',
    '这个页面展示的是音享贴的产品概念、界面体系与场景逻辑。它与我的工程主页保持连接，但把更完整的产品表达放到了二级页面中。': '這個頁面展示的是音享貼的產品概念、介面體系與場景邏輯。它與我的工程首頁保持連結，但把更完整的產品表達放到了二級頁面中。',
    '查看超声波项目': '查看超聲波項目',

    '项目概览': '項目概覽', '项目定位': '項目定位', '定向音频原型验证': '定向音頻原型驗證',
    '一个围绕定向音频传播展开的工程项目。我在项目中承担负责人角色，关注硬件系统搭建、ESP32 功能验证、样机调试与整体推进。': '一個圍繞定向音頻傳播展開的工程項目。我在項目中承擔負責人角色，關注硬件系統搭建、ESP32 功能驗證、樣機調試與整體推進。',
    '查看工程细节': '查看工程細節', '通过超声波阵列与相关音频链路，探索“声音更有方向”的实现路径，面向公共展示与个人音频体验场景。': '透過超聲波陣列與相關音頻鏈路，探索「聲音更有方向」的實現路徑，面向公共展示與個人音頻體驗場景。',
    '我的角色': '我的角色', '项目负责人': '項目負責人', '负责整体推进、任务分工与展示沟通，同时参与硬件系统搭建、蓝牙音频功能验证与样机调试。': '負責整體推進、任務分工與展示溝通，同時參與硬件系統搭建、藍牙音頻功能驗證與樣機調試。',
    '当前阶段': '目前階段', '第一代 Demo': '第一代 Demo', '已完成基础样机开发，实现蓝牙音频接收与基础定向发声，并完成展示与联调验证。': '已完成基礎樣機開發，實現藍牙音頻接收與基礎定向發聲，並完成展示與聯調驗證。',
    '我在工程层面做了什么。': '我在工程層面做了什麼。', '系统与样机': '系統與樣機', '参与超声波定向扬声器系统搭建': '參與超聲波定向揚聲器系統搭建', '进行样机组装、功能验证与现场联调': '進行樣機組裝、功能驗證與現場聯調', '围绕真实展示场景推进可运行 Demo': '圍繞真實展示場景推進可運行 Demo',
    '嵌入式与控制': '嵌入式與控制', '基于 ESP32 进行基础功能验证': '基於 ESP32 進行基礎功能驗證', '围绕蓝牙音频接收进行调试': '圍繞藍牙音頻接收進行調試', '持续学习 ESP-IDF 与嵌入式开发流程': '持續學習 ESP-IDF 與嵌入式開發流程',
    '硬件与电路': '硬件與電路', '参与功放电路搭建与基础优化': '參與功放電路搭建與基礎優化', '进行硬件调试与系统联调': '進行硬件調試與系統聯調', '使用嘉立创 EDA、KiCad 进行基础 PCB 设计': '使用嘉立創 EDA、KiCad 進行基礎 PCB 設計',
    '推进与展示': '推進與展示', '负责项目推进、分工协作与沟通展示': '負責項目推進、分工協作與溝通展示', '完成项目展板、现场展示与答辩支持': '完成項目展板、現場展示與答辯支援', '让项目从概念走向可见的工程样机': '讓項目從概念走向可見的工程樣機',
    '项目相关画面': '項目相關畫面', '项目展板': '項目展板', '团队与样机': '團隊與樣機', '概念形态图': '概念形態圖',

    '做能落地的产品，': '做能落地的產品，', '保留改变未来的野心。': '保留改變未來的野心。',
    '开始阅读': '開始閱讀', '产品不是参数表，而是一个问题被更聪明地解决。': '產品不是參數表，而是一個問題被更聰明地解決。',
    '初创者更适合横向重组，而不是一开始就纵向挑战巨头。': '初創者更適合橫向重組，而不是一開始就縱向挑戰巨頭。',
    '成熟技术重新组合': '成熟技術重新組合',
    '不是简单功能相加': '不是簡單功能相加',
    '从细分场景切入': '從細分場景切入',
    '我更认同一种务实的理想主义。': '我更認同一種務實的理想主義。',
    '短期落地，中期积累，长期押注真正值得探索的方向。': '短期落地，中期積累，長期押注真正值得探索的方向。',
    '把产品做出来': '把產品做出來',
    '把工程能力做深': '把工程能力做深',
    '继续探索前沿音频': '繼續探索前沿音頻',
    'PCB 设计、板级验证、硬件调试与系统联调。': 'PCB 設計、板級驗證、硬件調試與系統聯調。',
    '以 ESP32 为主，围绕 BLE/A2DP、嵌入式控制与原型功能验证。': '以 ESP32 為主，圍繞 BLE/A2DP、嵌入式控制與原型功能驗證。',
    '硬件与验证': '硬件與驗證', 'PCB 设计、样机组装、硬件调试、功能测试与系统联调。': 'PCB 設計、樣機組裝、硬件調試、功能測試與系統聯調。',
    '产品与调研': '產品與調研', '结合竞品调研、用户场景分析、多端交互与产品验证推进方案。': '結合競品調研、用戶場景分析、多端互動與產品驗證推進方案。',
    '把工程判断放进真实行业场景。': '把工程判斷放進真實行業場景。', '雷鸟创新': '雷鳥創新', '深圳科创学院': '深圳科創學院', '湖南康通电子股份有限公司': '湖南康通電子股份有限公司',
    'AI AUDIO ALGORITHM INTERNSHIP': 'AI 音頻算法實習', 'AI 音频算法实习生': 'AI 音頻算法實習生', '职能部门实习 · 市场调研': '職能部門實習 · 市場調研', '硬件部实习': '硬件部實習', '音视频行业 · 硬件实践': '音視頻行業 · 硬件實踐',
    '2026.09 — 至今': '2026.09 — 至今', '2026.01 — 2026.02': '2026.01 — 2026.02', '2026.08 — 2026.09': '2026.08 — 2026.09',
    '参与智能眼镜音频方向的算法与技术方案研究，围绕 AI 音频、语音处理及智能穿戴音频场景开展资料调研、技术分析与方案整理；结合实际产品需求，对相关音频算法、开源方案及实现路径进行研究，为后续技术验证与产品方案评估提供支持。': '參與智能眼鏡音頻方向的算法及技術方案研究，圍繞 AI 音頻、語音處理及智能穿戴音頻場景開展資料調研、技術分析及方案整理；結合實際產品需求，研究相關音頻算法、開源方案及實現路徑，為後續技術驗證及產品方案評估提供支持。',
    '调研消费电子产品、技术方案、竞品及应用场景，梳理主要参数、核心功能、用户需求与产品定位；归纳多来源市场信息，形成结构化调研记录与阶段性结论。': '調研消費電子產品、技術方案、競品及應用場景，梳理主要參數、核心功能、用戶需求與產品定位；歸納多來源市場資訊，形成結構化調研記錄與階段性結論。',
    '参与消费级新产品前期定义，结合竞品、市场与用户需求开展功能及技术方案调研；对音视频及智能硬件进行拆解、逆向与方案分析，梳理关键器件、功能模块及技术路径；协助测试团队开展算法与产品功能测试，完成数据记录、异常场景复现及问题跟踪。': '參與消費級新產品前期定義，結合競品、市場及使用者需要開展功能及技術方案調研；對音視頻及智能硬件進行拆解、逆向及方案分析，梳理關鍵器件、功能模組及技術路徑；協助測試團隊開展算法及產品功能測試，完成數據記錄、異常情境復現及問題跟進。',
    '同步开展竞品、市场与用户需求分析，参与某新型消费级产品定义；对音视频及智能硬件进行硬件逆向与分析，拆解关键器件、功能模块及技术路径；协助测试部开展算法测试，记录数据、复现异常并跟进问题闭环。': '同步開展競品、市場與用戶需求分析，參與某新型消費級產品定義；對音視頻及智能硬件進行硬件逆向與分析，拆解關鍵器件、功能模組及技術路徑；協助測試部開展演算法測試，記錄數據、復現異常並跟進問題閉環。',
    '围绕音视频产品与智能硬件开展技术和市场调研，把应用场景、硬件参数、技术方案与产品定位放进同一套分析框架。': '圍繞音視頻產品與智能硬件開展技術和市場調研，把應用場景、硬件參數、技術方案與產品定位放進同一套分析框架。',
    '梳理竞品功能、硬件参数与应用场景，形成结构化对比和阶段性结论。': '梳理競品功能、硬件參數與應用場景，形成結構化對比和階段性結論。',
    '记录技术方案与产品定位差异，为后续讨论、方案判断和调研复盘提供依据。': '記錄技術方案與產品定位差異，為後續討論、方案判斷和調研複盤提供依據。',
    '角色：硬件原型 / 嵌入式与产品设计': '角色：硬件原型 / 嵌入式及產品設計', '形态：蓝牙音频中继': '形態：藍牙音頻中繼', '阶段：首版 PCB 已验证': '階段：首版 PCB 已驗證',
    '跨生态多人蓝牙音频共享硬件原型；已完成首版 PCB 与板级功能验证，并实现双 A2DP、多设备同步及延迟调节。': '跨生態多人藍牙音頻共享硬件原型；已完成首版 PCB 與板級功能驗證，並實現雙 A2DP、多裝置同步及延遲調節。',

    '面向跨生态多人蓝牙音频共享的轻量化硬件中继。首版 PCB 已完成并通过板级功能验证，硬件原型可稳定与移动设备建立连接。': '面向跨生態多人藍牙音頻共享的輕量化硬件中繼。首版 PCB 已完成並通過板級功能驗證，硬件原型可穩定與流動裝置建立連接。',
    '硬件原型 / 嵌入式与产品设计': '硬件原型 / 嵌入式及產品設計', '首版 PCB 已验证': '首版 PCB 已驗證', '双 A2DP · 多设备同步': '雙 A2DP · 多裝置同步',
    '查看工程验证': '查看工程驗證',
    '音享贴围绕“音源终端 — 蓝牙中继 — 多播放终端”的架构工作，通过 BLE 承载控制与状态、I²S 分发 PCM 音频，并由两个播放节点分别建立 A2DP 输出链路。': '音享貼圍繞「音源終端 — 藍牙中繼 — 多播放終端」的架構運作，透過 BLE 承載控制與狀態、I²S 分發 PCM 音頻，並由兩個播放節點分別建立 A2DP 輸出鏈路。',
    '以手机或平板作为音源，将音频分发到两台独立蓝牙播放设备。': '以手機或平板作為音源，將音頻分發到兩台獨立藍牙播放裝置。',
    '可视化延迟校准': '可視化延遲校準', '通过独立音量、声道与延迟调节，应对不同播放设备之间的状态与时差。': '透過獨立音量、聲道與延遲調節，處理不同播放裝置之間的狀態與時差。',
    '完成 iPad、iPhone、Android、微信小程序与 Apple Watch 的交互方案。': '完成 iPad、iPhone、Android、微信小程式與 Apple Watch 的互動方案。',
    '从产品设想到可验证的硬件原型。': '從產品設想到可驗證的硬件原型。',
    '项目已完成首版 PCB 设计、打样、焊接调试与板级功能验证。当前工程采用 A、B1、B2 三板架构，把手机侧音频接收、控制链路与两路蓝牙播放输出拆分处理。': '項目已完成首版 PCB 設計、打樣、焊接調試與板級功能驗證。目前工程採用 A、B1、B2 三板架構，把手機側音頻接收、控制鏈路與兩路藍牙播放輸出拆分處理。',
    'PCB 与板级验证': 'PCB 與板級驗證', '完成首版 PCB 设计、打样、焊接调试及板级功能验证，硬件原型可稳定连接移动设备。': '完成首版 PCB 設計、打樣、焊接調試及板級功能驗證，硬件原型可穩定連接流動裝置。',
    '双路音频与同步': '雙路音頻與同步', '完成双 A2DP、多设备同步及延迟调节，并将独立音量与声道控制纳入系统逻辑。': '完成雙 A2DP、多裝置同步及延遲調節，並將獨立音量與聲道控制納入系統邏輯。',
    'iOS 与 Android 控制应用': 'iOS 與 Android 控制應用', '面向当前硬件原型开发 iOS 与 Android App，围绕 BLE 设备发现、连接控制、状态展示与配置建立移动端控制体系。': '面向目前硬件原型開發 iOS 與 Android App，圍繞 BLE 裝置發現、連接控制、狀態展示與配置建立流動端控制體系。',
    '五端交互体系': '五端互動體系', '完成 iPhone、iPad、Android、微信小程序与 Apple Watch 交互设计，覆盖连接、校准、异常反馈与配置。': '完成 iPhone、iPad、Android、微信小程式與 Apple Watch 互動設計，涵蓋連接、校準、異常反饋與配置。',
    '控制链路与音频链路分离。': '控制鏈路與音頻鏈路分離。', 'BLE 负责控制与状态；音频由 A 板接收后，经 I²S 向 B1/B2 分发 PCM，再由两个节点分别输出到蓝牙播放设备。': 'BLE 負責控制與狀態；音頻由 A 板接收後，經 I²S 向 B1/B2 分發 PCM，再由兩個節點分別輸出到藍牙播放裝置。',
    '移动设备': '流動裝置', 'A2DP 音频输入': 'A2DP 音頻輸入', 'ESP32 中继': 'ESP32 中繼', 'BLE 控制 · PCM 缓冲 · I²S Master': 'BLE 控制 · PCM 緩衝 · I²S Master',
    '播放节点 1': '播放節點 1', '播放节点 2': '播放節點 2',
    '工程状态说明：': '工程狀態說明：', '本页区分已验证硬件、已实现功能与已完成交互设计；其他平台仍需持续进行真机覆盖和长期稳定性测试。': '本頁區分已驗證硬件、已實現功能與已完成互動設計；其他平台仍需持續進行真機覆蓋和長期穩定性測試。',
    '从硬件原型到更完整的产品验证，继续推进。': '從硬件原型到更完整的產品驗證，繼續推進。',
    'SoundShare 已从交互设想推进到首版 PCB 与硬件功能验证，并建立三板音频架构和多端控制体系。下一阶段将围绕平台覆盖、长期稳定性与产品化细节继续验证。': 'SoundShare 已從互動設想推進到首版 PCB 與硬件功能驗證，並建立三板音頻架構和多端控制體系。下一階段將圍繞平台覆蓋、長期穩定性與產品化細節繼續驗證。',

    '负责整体推进、任务分工与展示沟通，并协同完成硬件系统搭建、蓝牙音频功能验证与样机调试。': '負責整體推進、任務分工與展示溝通，並協同完成硬件系統搭建、藍牙音頻功能驗證與樣機調試。',
    '统筹超声波定向扬声器系统搭建与样机实现': '統籌超聲波定向揚聲器系統搭建與樣機實現', '完成样机组装、功能测试与现场联调': '完成樣機組裝、功能測試與現場聯調',
    '基于 ESP32 搭建并验证蓝牙音频接收与定向发声链路': '基於 ESP32 搭建並驗證藍牙音頻接收與定向發聲鏈路', '使用 Arduino IDE 完成功能验证与问题排查': '使用 Arduino IDE 完成功能驗證與問題排查', '结合 ESP-IDF 推进嵌入式调试与系统联调': '結合 ESP-IDF 推進嵌入式調試與系統聯調',
    '协同完成功放电路搭建与信号链检查': '協同完成功放電路搭建與信號鏈檢查', '完成硬件调试、功能测试与系统联调': '完成硬件調試、功能測試與系統聯調', '使用 KiCad、嘉立创 EDA 完成基础 PCB 设计': '使用 KiCad、嘉立創 EDA 完成基礎 PCB 設計',
    '搭建': '搭建', '围绕 ESP32、蓝牙音频接收、功放与定向发声链路完成样机组装。': '圍繞 ESP32、藍牙音頻接收、功放與定向發聲鏈路完成樣機組裝。',
    '调试': '調試', '检查信号链与硬件连接，完成嵌入式功能验证、问题排查和系统联调。': '檢查信號鏈與硬件連接，完成嵌入式功能驗證、問題排查和系統聯調。',
    '验证': '驗證', '面向真实展示场景完成功能测试、现场联调并交付第一代可运行 Demo。': '面向真實展示場景完成功能測試、現場聯調並交付第一代可運行 Demo。',
    'CURRENT EXPERIENCE': '目前經歷', 'INTERNSHIP EXPERIENCE': '實習經歷', 'HARDWARE & MARKET RESEARCH': '硬件與市場調研', 'MARKET RESEARCH INTERNSHIP': '市場調研實習', 'HARDWARE INTERNSHIP': '硬件部實習', 'FIRST PCB VALIDATED': '首版 PCB 已驗證',
    'ENGINEERING STATUS': '工程狀態', 'VERIFIED': '已驗證', 'IMPLEMENTED': '已實現', 'DEVELOPED': '已開發', 'DESIGNED': '已完成設計',
    'SYSTEM ARCHITECTURE': '系統架構', 'SOURCE': '音源', 'A BOARD': 'A 板',
    'Prototype Status': '原型狀態', 'CONCEPT FORM · ENGINEERING PROJECT BELOW': '概念形態 · 工程過程見下文',
    '01 · BUILD': '01 · 搭建', '02 · DEBUG': '02 · 調試', '03 · VALIDATE': '03 · 驗證',
    '罗宇伦证件照头像': '羅宇倫證件照頭像', '核心技术': '核心技術', '罗宇伦个人照片': '羅宇倫個人照片',
    '超声波定向扬声器概念图': '超聲波定向揚聲器概念圖', '音享贴应用图标': '音享貼應用圖標',
    'Desk Park 音乐工作室标识': 'Desk Park 音樂工作室標識', 'Desk Park 舞台演出照片': 'Desk Park 舞台演出照片', '罗宇伦舞台吉他演出照片': '羅宇倫舞台結他演出照片',
    '忧书 Cover 黄贯中': '憂書 Cover 黃貫中', '《梦幻丽莎发廊》Cover 五条人': '《夢幻麗莎髮廊》Cover 五條人',
    '上一组二维码': '上一組二維碼', '下一组二维码': '下一組二維碼', '微信二维码': '微信二維碼', 'Instagram 二维码': 'Instagram 二維碼', '抖音二维码': '抖音二維碼', 'WhatsApp 二维码': 'WhatsApp 二維碼',
    '音享贴图标': '音享貼圖標', 'SoundShare 三板音频与控制架构': 'SoundShare 三板音頻與控制架構',
    '音享贴 iPad UI': '音享貼 iPad UI', '音享贴 iPhone UI': '音享貼 iPhone UI', '音享贴 Android UI': '音享貼 Android UI', '音享贴微信小程序 UI': '音享貼微信小程式 UI',
    '音享贴 Apple Watch 音量界面': '音享貼 Apple Watch 音量介面', '音享贴 Apple Watch 延迟界面': '音享貼 Apple Watch 延遲介面',
    '超声波定向扬声器图标': '超聲波定向揚聲器圖標', '超声波定向扬声器工程闭环': '超聲波定向揚聲器工程閉環',
    '超声波定向扬声器项目展板': '超聲波定向揚聲器項目展板', '项目团队与样机': '項目團隊與樣機',
    '返回主页': '返回首頁', '超声波项目': '超聲波項目'
  };

  const en = {
    '个人主页': 'Personal Home',
    '背景音乐仅用于个人非商业展示 · 音乐版权归原权利人所有': 'Background music is used only for this non-commercial personal portfolio · Rights belong to the respective rights holders',
    '学生工程实践者 · 音频产品探索者 · Desk Park 乐队吉他手': 'Student engineer · Audio product explorer · Desk Park guitarist',
    '通过音响展调研，我开始更系统地思考音频产品、技术融合和真实使用场景。': 'Visiting audio trade shows led me to think more systematically about audio products, technology integration, and real-world use cases.',
    '欢迎交流硬件、音频产品和早期项目实践。': 'I am open to conversations about hardware, audio products, and early-stage projects.',
    '罗宇伦 Roy Luo': 'Roy Luo', '← 罗宇伦 Roy Luo': '← Roy Luo',
    'About': 'About', 'Projects': 'Projects', 'Skills': 'Skills', 'Philosophy': 'Philosophy', 'Music': 'Music', 'Contact': 'Contact',
    '以工程能力为主线，': 'Engineering first, ', '把想法做成样机。': 'turn ideas into working prototypes.',
    '我是罗宇伦，湖南农业大学卓越工程师学院本科生。当前重点方向是硬件开发、嵌入式系统、样机实现与工程验证。 长期的音乐与音频实践，也让我在延迟、底噪、动态响应和交互体验上保持更敏锐的感知。': 'I am Roy Luo, an undergraduate at the College of Excellent Engineers, Hunan Agricultural University. My current focus is hardware development, embedded systems, prototyping, and engineering validation. Long-term practice in music and audio also gives me a sharper sense of latency, noise floor, dynamic response, and interaction design.',
    '查看项目': 'View projects', '联系我': 'Contact me', '硬件 / 嵌入式': 'Hardware / Embedded', '音乐 QA': 'Music QA', '简体 · 繁體 · English': 'Simplified · Traditional · English',
    '硬件调试、样机搭建、基础 PCB 设计与系统联调。': 'Hardware debugging, prototype assembly, basic PCB design, and system integration.',
    'DP音乐工作室主理人 · Desk Park乐队吉他手': 'Founder of DP Music Studio · Guitarist of Desk Park',
    '长期乐队演出与音频设备实践，让我能从真实使用场景理解音频产品。': 'Years of live performance and hands-on audio gear practice help me understand audio products from real-world use cases.',
    '我目前最核心的能力结构。': 'My current core capability stack.',
    '嵌入式开发': 'Embedded Development', '硬件实现': 'Hardware Implementation', '项目推进': 'Project Delivery', '音频体验辅助': 'Audio Awareness',
    '以 ESP32 为主，进行蓝牙音频、基础控制逻辑与原型功能验证。': 'ESP32-centered work on Bluetooth audio, control logic, and prototype validation.',
    '样机搭建、功放电路实验、硬件调试、系统联调与现场展示。': 'Prototype assembly, amplifier experiments, hardware debugging, system integration, and live demonstrations.',
    '能够在学生项目中承担负责人角色，推进分工、验证与展示落地。': 'Able to lead student projects from task allocation and validation through to a working demonstration.',
    '长期乐队演出与设备使用，让我对延迟、底噪、动态响应等更敏感。': 'Live performance and equipment use make me more sensitive to latency, noise floor, and dynamic response.',
    '从功能原型，到可验证的工程项目。': 'From functional prototypes to verifiable engineering projects.',
    '超声波定向扬声器': 'Ultrasonic Directional Speaker',
    '基于 ESP32 平台推进的定向音频项目，围绕蓝牙音频接收、样机搭建、基础硬件系统与工程验证展开。': 'A directional-audio project built around ESP32, covering Bluetooth audio reception, prototype assembly, hardware systems, and engineering validation.',
    '了解更多': 'Learn more',
    '音享贴 · LENGHE SoundShare': 'LENGHE SoundShare',
    '面向多人蓝牙音频共享场景的轻量化中继设备概念，重点展示产品结构、控制逻辑与多端 UI 设计。': 'A lightweight Bluetooth audio relay concept for multi-user listening, emphasizing product architecture, control logic, and cross-device UI design.',
    '面向工程岗位的能力展示。': 'Capabilities relevant to engineering roles.',
    'ESP32、Arduino、ESP-IDF 学习实践，进行原型功能验证与基础嵌入式开发。': 'Hands-on learning with ESP32, Arduino, and ESP-IDF for prototype validation and foundational embedded development.',
    '嘉立创 EDA': 'JLC EDA',
    '基础 PCB 设计、硬件调试、样机搭建、功放联调、现场功能验证与展示。': 'Basic PCB design, hardware debugging, prototype assembly, amplifier integration, on-site validation, and demonstrations.',
    '从概念、分工到原型展示的完整推进能力，能在学生项目中承担负责人角色。': 'End-to-end project execution from concept and task breakdown to prototype demonstration, including team leadership responsibilities.',
    '音乐与音频设备实践让我能从使用者视角理解延迟、底噪、动态响应与交互体验。': 'Music and audio-equipment practice helps me evaluate latency, noise floor, dynamic response, and UX from the user perspective.',
    '不为了创新而创新。': 'Innovation should serve the problem.',
    '从真实场景和用户痛点出发，再决定技术方案': 'Start with real scenarios and user pain points, then choose the technology',
    '避免无意义的参数堆叠和功能堆砌': 'Avoid meaningless specification and feature stacking',
    '尊重用户已有设备，尽量创造增量价值而非强制替代': 'Respect devices users already own and create incremental value instead of forced replacement',
    '让多个成熟功能形成协同，而不是简单做功能加法': 'Make mature functions work together rather than simply adding features',
    '务实的理想主义。': 'Pragmatic idealism.',
    '先做出用户愿意使用、愿意付费的产品': 'Build something users are willing to use and pay for',
    '用现金流换取研发自由与更长的技术周期': 'Use cash flow to buy R&D freedom and longer development cycles',
    '选择巨头动力不足、但足以支撑小团队的细分市场': 'Choose niches too small for giants but large enough to sustain a focused team',
    '短期务实落地，长期继续探索定向声与空间音频': 'Execute pragmatically in the short term while continuing to explore directional and spatial audio',
    '阅读全文 →': 'Read the full philosophy →',
    '音乐是第二主线，但依然能说明我与音频产品的关系。': 'Music is a secondary thread, but it still explains how I think about audio products.',
    '乐队演出 / 基础音频制作 / 音色实践': 'Live performance / basic production / tone exploration',
    '我长期进行乐队排练与现场演出，熟悉电吉他、效果器、监听系统和 DAW 工作流。这些实践也持续反哺我对音频产品、设备交互和真实使用体验的理解。': 'I have long-term experience in band rehearsals and live performance, with hands-on familiarity with electric guitars, effects, monitoring systems, and DAW workflows. This continuously informs how I understand audio products, device interaction, and real-world experience.',
    '更多联系方式与社交媒体。': 'More ways to connect.', '微信': 'WeChat', '微信号：Roylyl06': 'WeChat ID: Roylyl06', '用户 ID：ROYLYL06': 'User ID: ROYLYL06', '抖音': 'Douyin', '@Roylyl · 抖音号：luoyulun': '@Roylyl · Douyin ID: luoyulun', 'WHATSAPP': 'WHATSAPP',
    '如果你在寻找硬件 / 嵌入式方向的实习生，欢迎联系我。': 'If you are looking for a hardware or embedded-systems intern, feel free to contact me.',
    '也可以查看我的 GitHub、简历与两个项目的完整介绍。': 'You can also review my GitHub, résumé, and full project pages.', '发邮件': 'Email me', '下载简历': 'Download résumé', '下载简历 ↗': 'Download résumé ↗', '下载三语简历': 'Download trilingual résumé', '下载三语简历 ↗': 'Download trilingual résumé ↗',
    '角色：项目负责人': 'Role: Project lead', '平台：ESP32': 'Platform: ESP32', '阶段：第一代 Demo': 'Stage: First demo',
    '角色：产品与交互设计': 'Role: Product & interaction', '形态：蓝牙中继': 'Form: Bluetooth relay', '阶段：产品概念': 'Stage: Product concept',
    '产品与交互设计': 'Product & interaction', '蓝牙中继': 'Bluetooth relay', '产品概念': 'Product concept',
    '查看二维码': 'View QR code', '关闭二维码': 'Close QR code', '社交媒体二维码': 'Social QR code', '点击播放视频': 'Click to play',

    '音享贴': 'LENGHE SoundShare', '一个面向跨生态多人蓝牙音频共享的轻量化中继设备概念。核心目标是让用户在不更换现有蓝牙设备的前提下，低成本完成多人同步听音与可视化控制。': 'A lightweight relay concept for cross-ecosystem multi-user Bluetooth audio sharing. The goal is to enable synchronized listening and visual control without forcing users to replace their existing Bluetooth devices.',
    '查看多端 UI': 'Explore multi-device UI', '返回主页': 'Back to home',
    '它不是替代现有设备，而是打通设备之间的壁垒。': 'It does not replace existing devices; it connects the gaps between them.',
    '音享贴围绕“音源终端 — 音享贴中继 — 多终端播放设备”的架构工作，强调跨品牌兼容、手动可视化校准与多设备独立控制。': 'SoundShare follows a source → relay → multi-output architecture, emphasizing cross-brand compatibility, visual manual calibration, and independent control of multiple devices.',
    '跨生态共享': 'Cross-ecosystem sharing', '连接手机或平板作为音源，再同步分发到多台蓝牙耳机或音箱。': 'Use a phone or tablet as the source and distribute audio to multiple Bluetooth headphones or speakers.',
    '磁吸轻量形态': 'Lightweight magnetic form', '以轻量化硬件中继的思路切入，强调便携、低门槛与快速落地。': 'A lightweight hardware relay concept focused on portability, low friction, and rapid deployment.',
    '手动毫秒级校准': 'Manual millisecond calibration', '通过可视化延迟调节解决不同设备的固有播放时差，适配民用场景。': 'Visual delay adjustment compensates for the inherent playback differences between consumer devices.',
    '多端可视化控制': 'Multi-device visual control', '支持 iPad、iPhone、Android、微信小程序与 Apple Watch 等交互形态。': 'Designed for iPad, iPhone, Android, WeChat Mini Program, and Apple Watch interfaces.',
    '多终端控制界面。': 'Control interfaces across devices.',
    '在这个项目里，UI 不是装饰，而是产品逻辑的一部分：设备连接、同步校准、音量控制、状态确认都需要更直观的交互来承载。': 'In this project, UI is part of the product logic rather than decoration: connection, synchronization, volume control, and status confirmation all need clear interaction design.',
    '大屏控制总览': 'Large-screen control overview', '适合在更大视图下查看多设备状态与高级设置。': 'A larger workspace for multi-device status and advanced settings.',
    'iOS 控制应用': 'iOS control app', '基于 iOS 开发设备连接、音量控制与播放状态管理功能。': 'Developed on iOS for device connection, volume control, and playback-status management.',
    'Android 控制应用': 'Android control app', '基于 Android 开发设备连接、音量控制与播放状态管理功能。': 'Developed on Android for device connection, volume control, and playback-status management.',
    '微信小程序 UI': 'WeChat Mini Program UI', '轻量化跨端控制入口': 'Lightweight cross-platform control entry', '适合作为更低门槛的设备控制入口，方便用户快速连接与管理。': 'A lower-friction control entry that lets users quickly connect and manage devices.',
    '节点音量控制': 'Node volume control', '在腕上查看与微调不同节点设备的音量状态。': 'View and fine-tune volume for different nodes from the wrist.',
    '延迟与同步提示': 'Latency and sync status', '在更轻量的场景里查看双设备同步状态与延迟信息。': 'Check two-device sync state and latency information in a lightweight interface.',
    '围绕真实场景来定义产品价值。': 'Define product value around real scenarios.',
    '情侣 / 朋友影音共享': 'Couples / friends media sharing', '多人使用各自耳机同步观影或听音，兼顾私密性与陪伴感。': 'Multiple people can use their own headphones for synchronized viewing or listening while keeping the experience private and shared.',
    '居家 / 聚会 K 歌': 'Home / party karaoke', '同时连接耳机与音箱，在监听与氛围之间找到更轻量的平衡。': 'Connect headphones and speakers at the same time to balance monitoring and room ambience.',
    '户外多音箱组网': 'Outdoor multi-speaker setup', '在露营、团建、骑行等活动中临时搭建同步音响系统。': 'Create a temporary synchronized speaker setup for camping, group events, cycling, and similar activities.',
    '从概念、交互到落地路径，继续打磨。': 'Refining the path from concept and interaction to implementation.',
    '这个页面展示的是音享贴的产品概念、界面体系与场景逻辑。它与我的工程主页保持连接，但把更完整的产品表达放到了二级页面中。': 'This page presents the product concept, interface system, and scenario logic of SoundShare. It remains connected to the engineering portfolio while giving the product a dedicated space for fuller expression.',
    '查看超声波项目': 'View ultrasonic project',

    '一个围绕定向音频传播展开的工程项目。我在项目中承担负责人角色，关注硬件系统搭建、ESP32 功能验证、样机调试与整体推进。': 'An engineering project exploring directional audio propagation. I serve as project lead, focusing on hardware-system construction, ESP32 validation, prototype debugging, and overall project execution.',
    '查看工程细节': 'View engineering details', '项目概览': 'Project overview', '项目定位': 'Positioning', '定向音频原型验证': 'Directional-audio prototype validation',
    '通过超声波阵列与相关音频链路，探索“声音更有方向”的实现路径，面向公共展示与个人音频体验场景。': 'Explore ways to make sound more directional through ultrasonic arrays and the associated audio chain, targeting public displays and personal audio scenarios.',
    '我的角色': 'My role', '项目负责人': 'Project lead', '负责整体推进、任务分工与展示沟通，同时参与硬件系统搭建、蓝牙音频功能验证与样机调试。': 'Responsible for overall execution, task allocation, and presentation, while also participating in hardware-system construction, Bluetooth audio validation, and prototype debugging.',
    '当前阶段': 'Current stage', '第一代 Demo': 'First-generation demo', '已完成基础样机开发，实现蓝牙音频接收与基础定向发声，并完成展示与联调验证。': 'A first prototype has been completed with Bluetooth audio reception and basic directional output, followed by demo and integration validation.',
    '我在工程层面做了什么。': 'What I contributed on the engineering side.', '系统与样机': 'System & prototype', '参与超声波定向扬声器系统搭建': 'Participated in ultrasonic directional speaker system assembly', '进行样机组装、功能验证与现场联调': 'Prototype assembly, functional validation, and on-site integration', '围绕真实展示场景推进可运行 Demo': 'Built a runnable demo around real presentation scenarios',
    '嵌入式与控制': 'Embedded & control', '基于 ESP32 进行基础功能验证': 'Validated foundational functions on ESP32', '围绕蓝牙音频接收进行调试': 'Debugged Bluetooth audio reception', '持续学习 ESP-IDF 与嵌入式开发流程': 'Continuing to learn ESP-IDF and embedded development workflows',
    '硬件与电路': 'Hardware & circuits', '参与功放电路搭建与基础优化': 'Participated in amplifier circuit construction and basic optimization', '进行硬件调试与系统联调': 'Hardware debugging and system integration', '使用嘉立创 EDA、KiCad 进行基础 PCB 设计': 'Basic PCB design using JLC EDA and KiCad',
    '推进与展示': 'Execution & presentation', '负责项目推进、分工协作与沟通展示': 'Led project execution, team coordination, and presentation', '完成项目展板、现场展示与答辩支持': 'Prepared project boards, live demonstrations, and presentation support', '让项目从概念走向可见的工程样机': 'Moved the project from concept to a visible engineering prototype',
    '项目相关画面': 'Project gallery', '项目展板': 'Project board', '团队与样机': 'Team & prototype', '概念形态图': 'Concept render',

    '做能落地的产品，': 'Build products that can ship,', '保留改变未来的野心。': 'keep the ambition to change what comes next.',
    '开始阅读': 'Start reading', '产品不是参数表，而是一个问题被更聪明地解决。': 'A product is not a specification sheet; it is a problem solved more intelligently.',
    '初创者更适合横向重组，而不是一开始就纵向挑战巨头。': 'Early-stage teams are often better suited to horizontal recombination than immediately challenging giants vertically.',
    '成熟技术重新组合': 'Recombine mature technologies',
    '不是简单功能相加': 'More than feature addition',
    '从细分场景切入': 'Enter through a focused niche',
    '我更认同一种务实的理想主义。': 'I believe in pragmatic idealism.',
    '短期落地，中期积累，长期押注真正值得探索的方向。': 'Ship in the short term, build capability in the medium term, and invest long-term in directions worth exploring.',
    '把产品做出来': 'Build the product',
    '把工程能力做深': 'Deepen engineering capability',
    '继续探索前沿音频': 'Keep exploring frontier audio',
    'PCB 设计、板级验证、硬件调试与系统联调。': 'PCB design, board-level validation, hardware debugging, and system integration.',
    '以 ESP32 为主，围绕 BLE/A2DP、嵌入式控制与原型功能验证。': 'ESP32-based development covering BLE/A2DP, embedded control, and prototype validation.',
    '硬件与验证': 'Hardware & validation', 'PCB 设计、样机组装、硬件调试、功能测试与系统联调。': 'PCB design, prototype assembly, hardware debugging, functional testing, and system integration.',
    '产品与调研': 'Product & research', '结合竞品调研、用户场景分析、多端交互与产品验证推进方案。': 'Advance product decisions through competitor research, user-scenario analysis, multi-platform interaction, and product validation.',
    '把工程判断放进真实行业场景。': 'Applying engineering judgment in a real industry context.', '雷鸟创新': 'RayNeo', '深圳科创学院': 'Shenzhen Innox Academy', '湖南康通电子股份有限公司': 'Hunan Comtom Electronic Co., Ltd.',
    'AI AUDIO ALGORITHM INTERNSHIP': 'AI AUDIO ALGORITHM INTERNSHIP', 'AI 音频算法实习生': 'AI Audio Algorithm Intern', '职能部门实习 · 市场调研': 'Corporate Functions Intern · Market Research', '硬件部实习': 'Hardware Department Intern', '音视频行业 · 硬件实践': 'Audiovisual Industry · Hardware Practice',
    '2026.09 — 至今': 'Sep 2026 — Present', '2026.01 — 2026.02': 'Jan 2026 — Feb 2026', '2026.08 — 2026.09': 'Aug 2026 — Sep 2026',
    '参与智能眼镜音频方向的算法与技术方案研究，围绕 AI 音频、语音处理及智能穿戴音频场景开展资料调研、技术分析与方案整理；结合实际产品需求，对相关音频算法、开源方案及实现路径进行研究，为后续技术验证与产品方案评估提供支持。': 'Participate in algorithm and technical-solution research for smart-glasses audio, focusing on AI audio, speech processing and wearable-audio scenarios. Conduct technical research on relevant audio algorithms, open-source solutions and implementation approaches based on product requirements, supporting subsequent technical validation and product-solution evaluation.',
    '调研消费电子产品、技术方案、竞品及应用场景，梳理主要参数、核心功能、用户需求与产品定位；归纳多来源市场信息，形成结构化调研记录与阶段性结论。': 'Researched consumer electronics, technical solutions, competitors, and use cases; organized key specifications, core functions, user needs, and product positioning; synthesized market information from multiple sources into structured research records and interim findings.',
    '参与消费级新产品前期定义，结合竞品、市场与用户需求开展功能及技术方案调研；对音视频及智能硬件进行拆解、逆向与方案分析，梳理关键器件、功能模块及技术路径；协助测试团队开展算法与产品功能测试，完成数据记录、异常场景复现及问题跟踪。': 'Supported early-stage definition of a consumer product through competitor, market and user-needs research; analysed and reverse-engineered audio/video and smart-hardware products to identify key components, functional modules and technical approaches; assisted with algorithm and product-function testing, including data recording, issue reproduction and follow-up.',
    '同步开展竞品、市场与用户需求分析，参与某新型消费级产品定义；对音视频及智能硬件进行硬件逆向与分析，拆解关键器件、功能模块及技术路径；协助测试部开展算法测试，记录数据、复现异常并跟进问题闭环。': 'Conducted competitor, market, and user-needs analysis and contributed to defining a new consumer product; reverse-engineered and analyzed audiovisual and smart hardware, breaking down key components, functional modules, and technical approaches; assisted the test team with algorithm testing, recorded data, reproduced anomalies, and followed issues through closure.',
    '围绕音视频产品与智能硬件开展技术和市场调研，把应用场景、硬件参数、技术方案与产品定位放进同一套分析框架。': 'Conduct technical and market research on audio-video products and smart hardware, evaluating use cases, hardware specifications, technical approaches, and product positioning within one framework.',
    '梳理竞品功能、硬件参数与应用场景，形成结构化对比和阶段性结论。': 'Structured competitor features, hardware specifications, and use cases into comparative analyses and interim findings.',
    '记录技术方案与产品定位差异，为后续讨论、方案判断和调研复盘提供依据。': 'Documented differences in technical approaches and product positioning to support design discussions, option reviews, and research retrospectives.',
    '角色：硬件原型 / 嵌入式与产品设计': 'Role: Hardware prototype / Embedded & product design', '形态：蓝牙音频中继': 'Form: Bluetooth audio relay', '阶段：首版 PCB 已验证': 'Stage: First PCB validated',
    '跨生态多人蓝牙音频共享硬件原型；已完成首版 PCB 与板级功能验证，并实现双 A2DP、多设备同步及延迟调节。': 'A hardware prototype for cross-ecosystem multi-user Bluetooth audio sharing; the first PCB passed board-level functional validation, with dual A2DP, multi-device synchronization, and delay adjustment implemented.',

    '面向跨生态多人蓝牙音频共享的轻量化硬件中继。首版 PCB 已完成并通过板级功能验证，硬件原型可稳定与移动设备建立连接。': 'A lightweight hardware relay for cross-ecosystem multi-user Bluetooth audio sharing. The first PCB has passed board-level functional validation, with stable mobile-device connectivity demonstrated during bring-up.',
    '硬件原型 / 嵌入式与产品设计': 'Hardware Prototype / Embedded & Product Design', '首版 PCB 已验证': 'First PCB validated', '双 A2DP · 多设备同步': 'Dual A2DP · Multi-device sync',
    '查看工程验证': 'View engineering validation',
    '音享贴围绕“音源终端 — 蓝牙中继 — 多播放终端”的架构工作，通过 BLE 承载控制与状态、I²S 分发 PCM 音频，并由两个播放节点分别建立 A2DP 输出链路。': 'SoundShare uses a source-device → Bluetooth-relay → multiple-playback-device architecture. BLE carries control and status, I²S distributes PCM audio, and two playback nodes establish separate A2DP output links.',
    '以手机或平板作为音源，将音频分发到两台独立蓝牙播放设备。': 'Use a phone or tablet as the source and distribute audio to two independent Bluetooth playback devices.',
    '可视化延迟校准': 'Visual delay calibration', '通过独立音量、声道与延迟调节，应对不同播放设备之间的状态与时差。': 'Independent volume, channel, and delay controls address status and timing differences between playback devices.',
    '完成 iPad、iPhone、Android、微信小程序与 Apple Watch 的交互方案。': 'Designed interaction flows for iPad, iPhone, Android, WeChat Mini Program, and Apple Watch.',
    '从产品设想到可验证的硬件原型。': 'From product idea to a validated hardware prototype.',
    '项目已完成首版 PCB 设计、打样、焊接调试与板级功能验证。当前工程采用 A、B1、B2 三板架构，把手机侧音频接收、控制链路与两路蓝牙播放输出拆分处理。': 'The first PCB has been designed, fabricated, soldered, debugged, and validated at board level. The current A/B1/B2 three-board architecture separates mobile audio reception, the control link, and two Bluetooth playback outputs.',
    'PCB 与板级验证': 'PCB & board-level validation', '完成首版 PCB 设计、打样、焊接调试及板级功能验证，硬件原型可稳定连接移动设备。': 'Designed, fabricated, assembled, debugged, and validated the first PCB, with stable connectivity to mobile devices demonstrated during hardware bring-up.',
    '双路音频与同步': 'Dual-path audio & sync', '完成双 A2DP、多设备同步及延迟调节，并将独立音量与声道控制纳入系统逻辑。': 'Implemented dual A2DP, multi-device synchronization, and delay adjustment, with independent volume and channel control integrated into the system logic.',
    'iOS 与 Android 控制应用': 'iOS & Android control apps', '面向当前硬件原型开发 iOS 与 Android App，围绕 BLE 设备发现、连接控制、状态展示与配置建立移动端控制体系。': 'Developed iOS and Android apps for the current hardware prototype, establishing a BLE-based mobile control system for device discovery, connection control, status display, and configuration.',
    '五端交互体系': 'Five-platform interaction system', '完成 iPhone、iPad、Android、微信小程序与 Apple Watch 交互设计，覆盖连接、校准、异常反馈与配置。': 'Designed iPhone, iPad, Android, WeChat Mini Program, and Apple Watch interfaces covering connection, calibration, exception feedback, and configuration.',
    '控制链路与音频链路分离。': 'Control and audio paths are separated.', 'BLE 负责控制与状态；音频由 A 板接收后，经 I²S 向 B1/B2 分发 PCM，再由两个节点分别输出到蓝牙播放设备。': 'BLE handles control and status. Board A receives audio and distributes PCM to B1/B2 over I²S; each node then outputs to a separate Bluetooth playback device.',
    '移动设备': 'Mobile device', 'A2DP 音频输入': 'A2DP audio input', 'ESP32 中继': 'ESP32 relay', 'BLE 控制 · PCM 缓冲 · I²S Master': 'BLE control · PCM buffering · I²S master',
    '播放节点 1': 'Playback node 1', '播放节点 2': 'Playback node 2',
    '工程状态说明：': 'Engineering status:', '本页区分已验证硬件、已实现功能与已完成交互设计；其他平台仍需持续进行真机覆盖和长期稳定性测试。': 'This page distinguishes validated hardware, implemented functions, and completed interaction design. Additional platforms still require broader device coverage and long-duration stability testing.',
    '从硬件原型到更完整的产品验证，继续推进。': 'Advancing from hardware prototype to broader product validation.',
    'SoundShare 已从交互设想推进到首版 PCB 与硬件功能验证，并建立三板音频架构和多端控制体系。下一阶段将围绕平台覆盖、长期稳定性与产品化细节继续验证。': 'SoundShare has progressed from interaction design to first-PCB and hardware functional validation, with a three-board audio architecture and multi-platform control system in place. The next phase focuses on platform coverage, long-duration stability, and productization details.',

    '负责整体推进、任务分工与展示沟通，并协同完成硬件系统搭建、蓝牙音频功能验证与样机调试。': 'Led overall execution, task allocation, and presentations, while coordinating hardware-system construction, Bluetooth audio validation, and prototype debugging.',
    '统筹超声波定向扬声器系统搭建与样机实现': 'Coordinated ultrasonic directional speaker system integration and prototype implementation', '完成样机组装、功能测试与现场联调': 'Assembled the prototype and completed functional testing and on-site integration',
    '基于 ESP32 搭建并验证蓝牙音频接收与定向发声链路': 'Built and validated the ESP32-based Bluetooth audio reception and directional-output chain', '使用 Arduino IDE 完成功能验证与问题排查': 'Used Arduino IDE for functional validation and troubleshooting', '结合 ESP-IDF 推进嵌入式调试与系统联调': 'Applied ESP-IDF in embedded debugging and system integration',
    '协同完成功放电路搭建与信号链检查': 'Coordinated amplifier-circuit assembly and signal-chain inspection', '完成硬件调试、功能测试与系统联调': 'Completed hardware debugging, functional testing, and system integration', '使用 KiCad、嘉立创 EDA 完成基础 PCB 设计': 'Completed foundational PCB design using KiCad and JLCEDA',
    '搭建': 'Build', '围绕 ESP32、蓝牙音频接收、功放与定向发声链路完成样机组装。': 'Assembled the prototype around the ESP32, Bluetooth audio receiver, amplifier, and directional-output chain.',
    '调试': 'Debug', '检查信号链与硬件连接，完成嵌入式功能验证、问题排查和系统联调。': 'Inspected the signal chain and hardware connections, then completed embedded validation, troubleshooting, and system integration.',
    '验证': 'Validate', '面向真实展示场景完成功能测试、现场联调并交付第一代可运行 Demo。': 'Completed functional testing and on-site integration for a real presentation scenario, delivering a working first-generation demo.',
    'Prototype Status': 'Prototype', '罗宇伦证件照头像': 'Roy Luo portrait', '核心技术': 'Core technologies', '罗宇伦个人照片': 'Portrait of Roy Luo',
    '超声波定向扬声器概念图': 'Ultrasonic directional speaker concept render', '音享贴应用图标': 'LENGHE SoundShare app icon',
    'Desk Park 音乐工作室标识': 'DP Music Studio mark', 'Desk Park 舞台演出照片': 'Desk Park live performance', '罗宇伦舞台吉他演出照片': 'Roy Luo performing guitar on stage',
    '忧书 Cover 黄贯中': 'You Shu · Paul Wong cover', '《梦幻丽莎发廊》Cover 五条人': 'Menghuan Lisha Falang · Wu Tiao Ren cover',
    '上一组二维码': 'Previous social QR codes', '下一组二维码': 'Next social QR codes', '微信二维码': 'WeChat QR code', 'Instagram 二维码': 'Instagram QR code', '抖音二维码': 'Douyin QR code', 'WhatsApp 二维码': 'WhatsApp QR code',
    '音享贴图标': 'LENGHE SoundShare icon', 'SoundShare 三板音频与控制架构': 'SoundShare three-board audio and control architecture',
    '音享贴 iPad UI': 'SoundShare iPad interface', '音享贴 iPhone UI': 'SoundShare iPhone interface', '音享贴 Android UI': 'SoundShare Android interface', '音享贴微信小程序 UI': 'SoundShare WeChat Mini Program interface',
    '音享贴 Apple Watch 音量界面': 'SoundShare Apple Watch volume interface', '音享贴 Apple Watch 延迟界面': 'SoundShare Apple Watch delay interface',
    '超声波定向扬声器图标': 'Ultrasonic directional speaker icon', '超声波定向扬声器工程闭环': 'Ultrasonic directional speaker engineering loop',
    '超声波定向扬声器项目展板': 'Ultrasonic directional speaker project board', '项目团队与样机': 'Project team and prototype',
    '返回主页': 'Back to home', '音享贴': 'SoundShare', '超声波项目': 'Ultrasonic project'
  };

  // Approved project additions: keep the original text-node translation flow.
  Object.assign(cn, {
  "两个人各自拥有耳机，也能更方便地共同收听。音享贴以轻量中继连接已有设备，保留独立调节的选择；已完成首版 PCB 与板级功能验证，并实现双 A2DP、多设备同步及延迟调节。": "两个人各自拥有耳机，也能更方便地共同收听。音享贴以轻量中继连接已有设备，保留独立调节的选择；已完成首版 PCB 与板级功能验证，并实现双 A2DP、多设备同步及延迟调节。",
  "PROJECT 03 · WEB EXTENSION": "项目 03 · 浏览器扩展",
  "在原来的页面里，继续阅读。": "在原来的页面里，继续阅读。",
  "浏览器扩展": "浏览器扩展",
  "原位翻译 · 双语切换": "原位翻译 · 双语切换",
  "我围绕网页原位阅读构建翻译扩展，接入可配置的模型服务，让译文进入当前页面，并提供原文与双语切换。工程重点包括保留原有节点和交互、按阅读范围安排请求，以及在停止、恢复和网页更新时维护一致的状态。": "我围绕网页原位阅读构建翻译扩展，接入可配置的模型服务，让译文进入当前页面，并提供原文与双语切换。工程重点包括保留原有节点和交互、按阅读范围安排请求，以及在停止、恢复和网页更新时维护一致的状态。",
  "翻译之外，怎样保留阅读体验": "翻译之外，怎样保留阅读体验",
  "翻译能力之外，产品还要保留阅读任务、页面状态和用户的控制权。": "翻译能力之外，产品还要保留阅读任务、页面状态和用户的控制权。",
  "阅读：优先处理可见内容，保留原有链接和页面操作。": "阅读：优先处理可见内容，保留原有链接和页面操作。",
  "停止：取消当前任务，隔离迟到的翻译结果。": "停止：取消当前任务，隔离迟到的翻译结果。",
  "恢复：切回原文时，避免覆盖网页自身的新内容。": "恢复：切回原文时，避免覆盖网页自身的新内容。",
  "设计参考 KISS Translator 与 TWP，翻译由所配置的模型服务提供。": "设计参考 KISS Translator 与 TWP，翻译由所配置的模型服务提供。",
  "查看状态回归用例 ↗": "查看状态回归用例 ↗",
  "查看翻译扩展源码 ↗": "查看翻译扩展源码 ↗",
  "PROJECT 04 · macOS EXPERIMENT": "项目 04 · macOS 实验",
  "从铰链动作，到屏幕反馈。": "从铰链动作，到屏幕反馈。",
  "macOS 视觉实验": "macOS 视觉实验",
  "基于 MacBook-Duo 改进": "基于 MacBook-Duo 改进",
  "MacDuo 是基于 MacBook-Duo 改进的 macOS 视觉实验，将兼容设备的铰链角度与桌面效果关联。我围绕菜单栏控制、自定义快捷键、独立设置以及捕获和渲染状态恢复继续完善体验，探索物理动作与屏幕反馈之间的关系。": "MacDuo 是基于 MacBook-Duo 改进的 macOS 视觉实验，将兼容设备的铰链角度与桌面效果关联。我围绕菜单栏控制、自定义快捷键、独立设置以及捕获和渲染状态恢复继续完善体验，探索物理动作与屏幕反馈之间的关系。",
  "动作、控制与恢复": "动作、控制与恢复",
  "物理动作可以成为输入维度；完整体验也需要可控的进入、停止与恢复。": "物理动作可以成为输入维度；完整体验也需要可控的进入、停止与恢复。",
  "用菜单栏和自定义快捷键提供明确的控制入口。": "用菜单栏和自定义快捷键提供明确的控制入口。",
  "通过独立设置调整效果，保留手动预览方式。": "通过独立设置调整效果，保留手动预览方式。",
  "处理捕获与渲染生命周期，改善暂停和恢复行为。": "处理捕获与渲染生命周期，改善暂停和恢复行为。",
  "桌面捕获、铰链读取和玻璃效果的基础来自上游。这是软件视觉实验，实际体验取决于兼容机型与桌面环境。": "桌面捕获、铰链读取和玻璃效果的基础来自上游。这是软件视觉实验，实际体验取决于兼容机型与桌面环境。",
  "查看上游与引用说明 ↗": "查看上游与引用说明 ↗",
  "查看 MacDuo 源码 ↗": "查看 MacDuo 源码 ↗",
  "晚渡 · WANDU": "晚渡 · WANDU",
  "单独打开音频 ↗": "单独打开音频 ↗",
  "编曲": "编曲",
  "九声部 MIDI · 88 BPM · E 小调": "九声部 MIDI · 88 BPM · E 小调",
  "浏览 MIDI 素材 ↗": "浏览 MIDI 素材 ↗",
  "也可以查看我的 GitHub、简历与项目的完整介绍。": "也可以查看我的 GitHub、简历与项目的完整介绍。",
  "ASTRA COMPUTER USE TEST": "Astra 电脑操作测试",
  "《晚渡》完全由 Codex GPT-6 Astra 模型操作 MacBook 上的 FL Studio 完成。这不是我的个人作品，而是一次 Astra Computer Use 测试；此处保留试听、工程与 MIDI，供查看测试产物。": "《晚渡》完全由 Codex GPT-6 Astra 模型操作 MacBook 上的 FL Studio 完成。这不是我的个人作品，而是一次 Astra Computer Use 测试；此处保留试听、工程与 MIDI，供查看测试产物。",
  "测试产物试听 · 约 4 分 28 秒": "测试产物试听 · 约 4 分 28 秒",
  "测试方式": "测试方式",
  "Codex GPT-6 Astra · MacBook · FL Studio": "Codex GPT-6 Astra · MacBook · FL Studio",
  "公开产物": "公开产物",
  "FL Studio 工程 · MIDI · 生成源文件": "FL Studio 工程 · MIDI · 生成源文件",
  "这次测试留下了什么": "这次测试留下了什么",
  "本案例用于展示模型操作桌面音乐软件后留下的文件与音频，不作为个人作曲、编曲或演奏能力的证明。": "本案例用于展示模型操作桌面音乐软件后留下的文件与音频，不作为个人作曲、编曲或演奏能力的证明。",
  "小号承担主旋律，乐器由 MIDI 驱动音源演奏，没有真实乐手或人声录音。生成脚本负责 MIDI 与曲目清单，FL Studio 工程和试听音频分别保留。": "小号承担主旋律，乐器由 MIDI 驱动音源演奏，没有真实乐手或人声录音。生成脚本负责 MIDI 与曲目清单，FL Studio 工程和试听音频分别保留。",
  "测试说明与工程 ↗": "测试说明与工程 ↗"
});
  Object.assign(tw, {
  "两个人各自拥有耳机，也能更方便地共同收听。音享贴以轻量中继连接已有设备，保留独立调节的选择；已完成首版 PCB 与板级功能验证，并实现双 A2DP、多设备同步及延迟调节。": "兩個人各自擁有耳機，也能更方便地共同收聽。音享貼以輕量中繼連接已有設備，保留獨立調節的選擇；已完成首版 PCB 與板級功能驗證，並實現雙 A2DP、多設備同步及延遲調節。",
  "PROJECT 03 · WEB EXTENSION": "項目 03 · 瀏覽器擴充功能",
  "在原来的页面里，继续阅读。": "在原來的頁面裡，繼續閱讀。",
  "浏览器扩展": "瀏覽器擴充功能",
  "原位翻译 · 双语切换": "原位翻譯 · 雙語切換",
  "我围绕网页原位阅读构建翻译扩展，接入可配置的模型服务，让译文进入当前页面，并提供原文与双语切换。工程重点包括保留原有节点和交互、按阅读范围安排请求，以及在停止、恢复和网页更新时维护一致的状态。": "我圍繞網頁原位閱讀建立翻譯擴充功能，接入可設定的模型服務，讓譯文進入目前頁面，並提供原文與雙語切換。工程重點包括保留原有節點和互動、按閱讀範圍安排請求，以及在停止、還原和網頁更新時維持一致的狀態。",
  "翻译之外，怎样保留阅读体验": "翻譯之外，怎樣保留閱讀體驗",
  "翻译能力之外，产品还要保留阅读任务、页面状态和用户的控制权。": "翻譯能力之外，產品還要保留閱讀任務、頁面狀態和用戶的控制權。",
  "阅读：优先处理可见内容，保留原有链接和页面操作。": "閱讀：優先處理可見內容，保留原有連結和頁面操作。",
  "停止：取消当前任务，隔离迟到的翻译结果。": "停止：取消目前任務，隔離延遲返回的翻譯結果。",
  "恢复：切回原文时，避免覆盖网页自身的新内容。": "還原：切回原文時，避免覆蓋網頁自身的新內容。",
  "设计参考 KISS Translator 与 TWP，翻译由所配置的模型服务提供。": "設計參考 KISS Translator 與 TWP，翻譯由所設定的模型服務提供。",
  "查看状态回归用例 ↗": "查看狀態回歸測試 ↗",
  "查看翻译扩展源码 ↗": "查看翻譯擴充功能原始碼 ↗",
  "PROJECT 04 · macOS EXPERIMENT": "項目 04 · macOS 實驗",
  "从铰链动作，到屏幕反馈。": "從鉸鏈動作，到螢幕回饋。",
  "macOS 视觉实验": "macOS 視覺實驗",
  "基于 MacBook-Duo 改进": "基於 MacBook-Duo 改進",
  "MacDuo 是基于 MacBook-Duo 改进的 macOS 视觉实验，将兼容设备的铰链角度与桌面效果关联。我围绕菜单栏控制、自定义快捷键、独立设置以及捕获和渲染状态恢复继续完善体验，探索物理动作与屏幕反馈之间的关系。": "MacDuo 是基於 MacBook-Duo 改進的 macOS 視覺實驗，將相容設備的鉸鏈角度與桌面效果連結。我圍繞選單列控制、自訂快捷鍵、獨立設定，以及擷取和渲染狀態恢復持續完善體驗，探索物理動作與螢幕回饋之間的關係。",
  "动作、控制与恢复": "動作、控制與恢復",
  "物理动作可以成为输入维度；完整体验也需要可控的进入、停止与恢复。": "物理動作可以成為輸入維度；完整體驗也需要可控的啟動、停止與恢復。",
  "用菜单栏和自定义快捷键提供明确的控制入口。": "用選單列和自訂快捷鍵提供明確的控制入口。",
  "通过独立设置调整效果，保留手动预览方式。": "透過獨立設定調整效果，保留手動預覽方式。",
  "处理捕获与渲染生命周期，改善暂停和恢复行为。": "處理擷取與渲染生命週期，改善暫停和恢復行為。",
  "桌面捕获、铰链读取和玻璃效果的基础来自上游。这是软件视觉实验，实际体验取决于兼容机型与桌面环境。": "桌面擷取、鉸鏈讀取和玻璃效果的基礎來自上游。這是軟件視覺實驗，實際體驗取決於相容機型與桌面環境。",
  "查看上游与引用说明 ↗": "查看上游與引用說明 ↗",
  "查看 MacDuo 源码 ↗": "查看 MacDuo 原始碼 ↗",
  "晚渡 · WANDU": "晚渡 · WANDU",
  "单独打开音频 ↗": "單獨開啟音訊 ↗",
  "编曲": "編曲",
  "九声部 MIDI · 88 BPM · E 小调": "九聲部 MIDI · 88 BPM · E 小調",
  "浏览 MIDI 素材 ↗": "瀏覽 MIDI 素材 ↗",
  "也可以查看我的 GitHub、简历与项目的完整介绍。": "也可以查看我的 GitHub、履歷與項目的完整介紹。",
  "ASTRA COMPUTER USE TEST": "Astra 電腦操作測試",
  "《晚渡》完全由 Codex GPT-6 Astra 模型操作 MacBook 上的 FL Studio 完成。这不是我的个人作品，而是一次 Astra Computer Use 测试；此处保留试听、工程与 MIDI，供查看测试产物。": "《晚渡》完全由 Codex GPT-6 Astra 模型操作 MacBook 上的 FL Studio 完成。這不是我的個人作品，而是一次 Astra Computer Use 測試；此處保留試聽、工程與 MIDI，供查看測試產物。",
  "测试产物试听 · 约 4 分 28 秒": "測試產物試聽 · 約 4 分 28 秒",
  "测试方式": "測試方式",
  "Codex GPT-6 Astra · MacBook · FL Studio": "Codex GPT-6 Astra · MacBook · FL Studio",
  "公开产物": "公開產物",
  "FL Studio 工程 · MIDI · 生成源文件": "FL Studio 工程 · MIDI · 生成原始碼",
  "这次测试留下了什么": "這次測試留下了什麼",
  "本案例用于展示模型操作桌面音乐软件后留下的文件与音频，不作为个人作曲、编曲或演奏能力的证明。": "本案例用於展示模型操作桌面音樂軟件後留下的檔案與音訊，不作為個人作曲、編曲或演奏能力的證明。",
  "小号承担主旋律，乐器由 MIDI 驱动音源演奏，没有真实乐手或人声录音。生成脚本负责 MIDI 与曲目清单，FL Studio 工程和试听音频分别保留。": "小號承擔主旋律，樂器由 MIDI 驅動音源演奏，沒有真實樂手或人聲錄音。生成腳本負責 MIDI 與曲目清單，FL Studio 工程和試聽音訊分別保留。",
  "测试说明与工程 ↗": "測試說明與工程 ↗",
  "两个人已经各自拥有耳机，却不一定能方便地一起听同一段内容。我希望用轻量中继改善设备之间的协作，并保留各自的音量与控制选择。音享贴由此展开硬件、音频链路和多端交互的设计，先把共同收听这一段体验说明白。": "兩個人已經各自擁有耳機，卻不一定能方便地一起聽同一段內容。我希望用輕量中繼改善設備之間的協作，並保留各自的音量與控制選擇。音享貼由此展開硬件、音頻鏈路和多端互動的設計，先把共同收聽這一段體驗說明白。",
  "从一个音源、两台播放设备的任务出发，让已有耳机获得共同收听的新用途。": "從一個音源、兩台播放設備的任務出發，讓已有耳機獲得共同收聽的新用途。",
  "新增的携带与设置负担，应小于它消除的麻烦。磁吸与轻量形态仍需结合结构、功耗继续打磨。": "新增的攜帶與設定負擔，應小於它消除的麻煩。磁吸與輕量形態仍需結合結構、功耗繼續打磨。",
  "共同收听不等于相同音量。独立调节之外，还要让人看清参数作用于哪一路、当前处于什么状态。": "共同收聽不等於相同音量。獨立調節之外，還要讓人看清參數作用於哪一路、目前處於什麼狀態。",
  "手机承担连接与日常控制，手表适合快速微调，平板提供总览，小程序提供轻量入口。": "手機承擔連線與日常控制，手錶適合快速微調，平板提供總覽，小程式提供輕量入口。",
  "预期使用流程": "預期使用流程",
  "从一起开始，到各自离开。": "從一起開始，到各自離開。",
  "以下流程用于明确设计目标，不代表所有设备组合都已完成验证。": "以下流程用於明確設計目標，不代表所有設備組合都已完成驗證。",
  "一起开始": "一起開始",
  "选择同一音源，确认两路播放设备与连接状态，再进入共同收听。": "選擇同一音源，確認兩路播放設備與連線狀態，再進入共同收聽。",
  "各自调整": "各自調整",
  "分别调整音量与延迟，让每次操作对应清楚的设备与参数。": "分別調整音量與延遲，讓每次操作對應清楚的設備與參數。",
  "暂时离开": "暫時離開",
  "一方断开或重新加入时，怎样保留另一方的播放与各自设置，是后续要验证的体验。": "一方斷開或重新加入時，怎樣保留另一方的播放與各自設定，是後續要驗證的體驗。",
  "共同收听是当前核心任务；K 歌与户外使用保留为拓展设想，仍需各自的验证条件。": "共同收聽是目前核心任務；K 歌與戶外使用保留為拓展設想，仍需各自的驗證條件。",
  "耳机与音箱共同使用的拓展设想。监听延迟与两路播放时差需要分别验证，不能由同步功能直接推定。": "耳機與音箱共同使用的拓展設想。監聽延遲與兩路播放時差需要分別驗證，不能由同步功能直接推定。",
  "户外连接、同步与持续使用仍需验证；当前双路原型不代表更多节点的组网效果已成立。": "戶外連線、同步與持續使用仍需驗證；目前雙路原型不代表更多節點的組網效果已成立。",
  "声音与空间": "聲音與空間",
  "发出声音之后，还要看它在哪里被听见。": "發出聲音之後，還要看它在哪裡被聽見。",
  "我关注声音在空间中的分配：讲解应该在哪里被听见，邻近区域受到多少影响，人移动后体验怎样变化。第一代 Demo 让基础链路成立，下一步希望把问题放进明确的位置、内容与使用条件中。": "我關注聲音在空間中的分配：講解應該在哪裡被聽見，鄰近區域受到多少影響，人移動後體驗怎樣變化。第一代 Demo 讓基礎鏈路成立，下一步希望把問題放進明確的位置、內容與使用條件中。",
  "空间关系设想": "空間關係設想",
  "以一个展项、一段讲解为起点": "以一個展項、一段講解為起點",
  "墙面、背景声与空间条件": "牆面、背景聲與空間條件",
  "声源与内容": "聲源與內容",
  "固定位置 · 同一段讲解": "固定位置 · 同一段講解",
  "关注的收听位置": "關注的收聽位置",
  "走近 · 停留 · 移动": "走近 · 停留 · 移動",
  "邻近区域": "鄰近區域",
  "观察对旁人的影响": "觀察對旁人的影響",
  "场景设想示意，未按比例绘制；不表示实测声束角、传播距离或隔音边界。": "場景設想示意，未按比例繪製；不表示實測聲束角、傳播距離或隔音邊界。",
  "下一步研究问题": "下一步研究問題",
  "先让一个边界清楚的场景成立。": "先讓一個邊界清楚的場景成立。",
  "位置与移动": "位置與移動",
  "固定声源和内容，再比较站位、角度与移动过程，记录讲解在哪些条件下清楚可听。": "固定聲源和內容，再比較站位、角度與移動過程，記錄講解在哪些條件下清楚可聽。",
  "邻区与内容": "鄰區與內容",
  "观察邻近区域与背景声的影响，比较不同讲解内容，不用单个最佳位置代替完整使用过程。": "觀察鄰近區域與背景聲的影響，比較不同講解內容，不用單個最佳位置代替完整使用過程。",
  "结构与持续工作": "結構與持續工作",
  "继续研究阵列、功耗、结构与持续工作表现，并补充 DSP 与声场仿真的研究，让改进有可解释的依据。": "繼續研究陣列、功耗、結構與持續工作表現，並補充 DSP 與聲場模擬的研究，讓改進有可解釋的依據。"
});
  Object.assign(en, {
  "两个人各自拥有耳机，也能更方便地共同收听。音享贴以轻量中继连接已有设备，保留独立调节的选择；已完成首版 PCB 与板级功能验证，并实现双 A2DP、多设备同步及延迟调节。": "Two people can listen together more easily with their own headphones. SoundShare uses a lightweight relay to connect existing devices while preserving independent controls. The first PCB has completed board-level functional validation, and dual A2DP, multi-device synchronization, and delay adjustment have been implemented.",
  "PROJECT 03 · WEB EXTENSION": "PROJECT 03 · WEB EXTENSION",
  "在原来的页面里，继续阅读。": "Keep reading on the same page.",
  "浏览器扩展": "Browser extension",
  "原位翻译 · 双语切换": "In-page translation · Bilingual view",
  "我围绕网页原位阅读构建翻译扩展，接入可配置的模型服务，让译文进入当前页面，并提供原文与双语切换。工程重点包括保留原有节点和交互、按阅读范围安排请求，以及在停止、恢复和网页更新时维护一致的状态。": "I built a browser extension for reading translations within the original page, with configurable model services and options to switch between the original text and a bilingual view. The engineering work focuses on preserving page elements and interactions, scheduling requests around the reading area, and keeping state consistent when stopping, restoring content, or handling page updates.",
  "翻译之外，怎样保留阅读体验": "Preserving the reading experience",
  "翻译能力之外，产品还要保留阅读任务、页面状态和用户的控制权。": "Beyond translating text, the product needs to preserve the reading task, page state, and the user's control.",
  "阅读：优先处理可见内容，保留原有链接和页面操作。": "Read: prioritize visible content while preserving existing links and page interactions.",
  "停止：取消当前任务，隔离迟到的翻译结果。": "Stop: cancel the current task and prevent late translation results from changing the page.",
  "恢复：切回原文时，避免覆盖网页自身的新内容。": "Restore: return to the original text without overwriting new content added by the page.",
  "设计参考 KISS Translator 与 TWP，翻译由所配置的模型服务提供。": "The design draws on KISS Translator and TWP. Translations are provided by the configured model service.",
  "查看状态回归用例 ↗": "View state regression tests ↗",
  "查看翻译扩展源码 ↗": "View extension source ↗",
  "PROJECT 04 · macOS EXPERIMENT": "PROJECT 04 · macOS EXPERIMENT",
  "从铰链动作，到屏幕反馈。": "From hinge movement to screen feedback.",
  "macOS 视觉实验": "macOS visual experiment",
  "基于 MacBook-Duo 改进": "Built on MacBook-Duo",
  "MacDuo 是基于 MacBook-Duo 改进的 macOS 视觉实验，将兼容设备的铰链角度与桌面效果关联。我围绕菜单栏控制、自定义快捷键、独立设置以及捕获和渲染状态恢复继续完善体验，探索物理动作与屏幕反馈之间的关系。": "MacDuo is a macOS visual experiment built on MacBook-Duo, linking hinge angles on compatible devices to desktop effects. I have continued refining menu bar controls, custom shortcuts, dedicated settings, and recovery of capture and rendering state to explore the relationship between physical movement and screen feedback.",
  "动作、控制与恢复": "Movement, control, and recovery",
  "物理动作可以成为输入维度；完整体验也需要可控的进入、停止与恢复。": "Physical movement can serve as an input. A complete experience also needs clear control over starting, stopping, and resuming.",
  "用菜单栏和自定义快捷键提供明确的控制入口。": "Provide clear controls through the menu bar and custom shortcuts.",
  "通过独立设置调整效果，保留手动预览方式。": "Adjust effects through dedicated settings and retain a manual preview option.",
  "处理捕获与渲染生命周期，改善暂停和恢复行为。": "Manage capture and rendering lifecycles to improve pause and resume behavior.",
  "桌面捕获、铰链读取和玻璃效果的基础来自上游。这是软件视觉实验，实际体验取决于兼容机型与桌面环境。": "The foundations for desktop capture, hinge readings, and glass effects come from the upstream project. This is a software visual experiment; the experience depends on compatible hardware and the desktop environment.",
  "查看上游与引用说明 ↗": "View upstream sources and credits ↗",
  "查看 MacDuo 源码 ↗": "View MacDuo source ↗",
  "晚渡 · WANDU": "Wandu",
  "单独打开音频 ↗": "Open audio separately ↗",
  "编曲": "Arrangement",
  "九声部 MIDI · 88 BPM · E 小调": "Nine-part MIDI · 88 BPM · E minor",
  "浏览 MIDI 素材 ↗": "Browse MIDI files ↗",
  "也可以查看我的 GitHub、简历与项目的完整介绍。": "You can also explore my GitHub, résumé, and full project descriptions.",
  "ASTRA COMPUTER USE TEST": "ASTRA COMPUTER USE TEST",
  "《晚渡》完全由 Codex GPT-6 Astra 模型操作 MacBook 上的 FL Studio 完成。这不是我的个人作品，而是一次 Astra Computer Use 测试；此处保留试听、工程与 MIDI，供查看测试产物。": "Wandu was created entirely by the Codex GPT-6 Astra model operating FL Studio on a MacBook. It is not my own musical work, but an Astra Computer Use test. The audio preview, project, and MIDI files are provided here to show the test outputs.",
  "测试产物试听 · 约 4 分 28 秒": "Listen to the test output · About 4 min 28 sec",
  "测试方式": "Test setup",
  "Codex GPT-6 Astra · MacBook · FL Studio": "Codex GPT-6 Astra · MacBook · FL Studio",
  "公开产物": "Public outputs",
  "FL Studio 工程 · MIDI · 生成源文件": "FL Studio project · MIDI · Generation source code",
  "这次测试留下了什么": "What the test produced",
  "本案例用于展示模型操作桌面音乐软件后留下的文件与音频，不作为个人作曲、编曲或演奏能力的证明。": "This case shows the files and audio produced by a model operating desktop music software. It is not evidence of my personal composition, arrangement, or performance skills.",
  "小号承担主旋律，乐器由 MIDI 驱动音源演奏，没有真实乐手或人声录音。生成脚本负责 MIDI 与曲目清单，FL Studio 工程和试听音频分别保留。": "Trumpet carries the main melody, with instruments played through MIDI-driven sound sources. There are no live musician or vocal recordings. The generation script produces MIDI and the score manifest; the FL Studio project and audio preview are retained separately.",
  "测试说明与工程 ↗": "Test notes and project ↗",
  "两个人已经各自拥有耳机，却不一定能方便地一起听同一段内容。我希望用轻量中继改善设备之间的协作，并保留各自的音量与控制选择。音享贴由此展开硬件、音频链路和多端交互的设计，先把共同收听这一段体验说明白。": "Two people may each own headphones yet still struggle to listen together. I want a lightweight relay to help their devices work together while keeping individual volume and control. This shared listening task guides SoundShare's hardware, audio path and interfaces.",
  "从一个音源、两台播放设备的任务出发，让已有耳机获得共同收听的新用途。": "Start with one source and two playback devices, giving existing headphones a new way to be used together.",
  "新增的携带与设置负担，应小于它消除的麻烦。磁吸与轻量形态仍需结合结构、功耗继续打磨。": "The relay should add less carrying and setup effort than it removes. The magnetic, lightweight form still needs refinement alongside structure and power use.",
  "共同收听不等于相同音量。独立调节之外，还要让人看清参数作用于哪一路、当前处于什么状态。": "Listening together need not mean matching volume. Alongside independent controls, each setting should clearly identify its output and current state.",
  "手机承担连接与日常控制，手表适合快速微调，平板提供总览，小程序提供轻量入口。": "Phones handle connection and everyday control, watches offer quick adjustments, tablets provide an overview, and the mini program offers a lightweight entry point.",
  "预期使用流程": "INTENDED USE",
  "从一起开始，到各自离开。": "Start together. Leave independently.",
  "以下流程用于明确设计目标，不代表所有设备组合都已完成验证。": "This flow describes the intended experience; it does not mean every device combination has been validated.",
  "一起开始": "Start together",
  "选择同一音源，确认两路播放设备与连接状态，再进入共同收听。": "Choose one source, confirm both playback devices and their connections, then start listening together.",
  "各自调整": "Adjust individually",
  "分别调整音量与延迟，让每次操作对应清楚的设备与参数。": "Adjust volume and delay separately, with a clear device and setting attached to each action.",
  "暂时离开": "Step away",
  "一方断开或重新加入时，怎样保留另一方的播放与各自设置，是后续要验证的体验。": "How one listener can disconnect and rejoin while preserving the other output and each person's settings remains to be tested.",
  "共同收听是当前核心任务；K 歌与户外使用保留为拓展设想，仍需各自的验证条件。": "Shared listening is the current core task. Karaoke and outdoor use remain possible extensions, each requiring its own validation.",
  "耳机与音箱共同使用的拓展设想。监听延迟与两路播放时差需要分别验证，不能由同步功能直接推定。": "A possible extension using headphones and speakers together. Monitoring latency and the timing difference between outputs need separate validation; synchronization alone does not establish both.",
  "户外连接、同步与持续使用仍需验证；当前双路原型不代表更多节点的组网效果已成立。": "Outdoor connections, synchronization and sustained use still need testing. The current two-output prototype does not establish performance with more nodes.",
  "声音与空间": "SOUND IN SPACE",
  "发出声音之后，还要看它在哪里被听见。": "Beyond making sound: understanding where it is heard.",
  "我关注声音在空间中的分配：讲解应该在哪里被听见，邻近区域受到多少影响，人移动后体验怎样变化。第一代 Demo 让基础链路成立，下一步希望把问题放进明确的位置、内容与使用条件中。": "I am interested in where narration should be heard, how it affects nearby areas, and what changes as people move. The first-generation demo established the basic signal path. Next, I want to study these questions with defined positions, content and conditions of use.",
  "空间关系设想": "SPATIAL CONCEPT",
  "以一个展项、一段讲解为起点": "Start with one exhibit and one piece of narration",
  "墙面、背景声与空间条件": "Walls, background sound and room conditions",
  "声源与内容": "Source and content",
  "固定位置 · 同一段讲解": "Fixed position · Same narration",
  "关注的收听位置": "Listening position of interest",
  "走近 · 停留 · 移动": "Approach · Stay · Move",
  "邻近区域": "Nearby areas",
  "观察对旁人的影响": "Observe the effect on other people",
  "场景设想示意，未按比例绘制；不表示实测声束角、传播距离或隔音边界。": "A scenario concept, not drawn to scale. It does not show a measured beam angle, propagation distance or sound isolation boundary.",
  "下一步研究问题": "NEXT QUESTIONS",
  "先让一个边界清楚的场景成立。": "Start with one clearly defined setting.",
  "位置与移动": "Position and movement",
  "固定声源和内容，再比较站位、角度与移动过程，记录讲解在哪些条件下清楚可听。": "Fix the source and content, then compare positions, angles and movement. Record the conditions in which narration remains clear.",
  "邻区与内容": "Nearby areas and content",
  "观察邻近区域与背景声的影响，比较不同讲解内容，不用单个最佳位置代替完整使用过程。": "Observe nearby areas and background sound, and compare narration content. One ideal listening position cannot stand in for the whole experience.",
  "结构与持续工作": "Structure and sustained operation",
  "继续研究阵列、功耗、结构与持续工作表现，并补充 DSP 与声场仿真的研究，让改进有可解释的依据。": "Continue studying the array, power use, structure and sustained operation, with further research into DSP and sound-field simulation to explain what makes an improvement."
});

  // Keep the reviewed philosophy copy together so all three languages share exact source keys.
  const philosophyCopy = [
    [
      '我怎样做产品与选择方向',
      '我怎樣做產品與選擇方向',
      'How I build products and choose a direction'
    ],
    [
      '我关注声音、设备与人之间的关系，尝试用新的组合和交互改善体验，也在探索怎样通过可持续经营，为长期研究留下时间与资源。',
      '我關注聲音、設備與人之間的關係，嘗試用新的組合和互動改善體驗，也在探索怎樣透過可持續經營，為長期研究留下時間與資源。',
      'I explore the relationships between sound, devices and people, looking for new combinations and interactions that improve the experience. I am also exploring how a sustainable business could make time and resources available for long-term research.'
    ],
    [
      '产品与创业理念',
      '產品與創業理念',
      'Product and entrepreneurship philosophy'
    ],
    [
      '我希望做出带有自己判断的产品：它可以提出新的使用方式，也应在真实使用中不断修正。音乐、硬件项目和展会观察，让我持续关注设备怎样协作、交互怎样保留控制，以及怎样为长期研究创造条件。以下是我当前的判断，其中仍有需要用原型和实验回答的问题。',
      '我希望做出帶有自己判斷的產品：它可以提出新的使用方式，也應在真實使用中不斷修正。音樂、硬件項目和展會觀察，讓我持續關注設備怎樣協作、互動怎樣保留控制，以及怎樣為長期研究創造條件。以下是我目前的判斷，其中仍有需要用原型和實驗回答的問題。',
      'I want to build products that reflect my own judgment: products that can introduce new ways of doing things and evolve through real use. Music, hardware projects and observations at trade shows keep me thinking about how devices work together, how interactions preserve control, and how to create the conditions for long-term research. These are my current views, with questions that still need prototypes and experiments to answer.'
    ],
    [
      '主动提出新的使用方式',
      '主動提出新的使用方式',
      'Propose new ways of doing things'
    ],
    [
      '我会从自己的使用经验和具体场景发现问题，也愿意先提出一种尚未被清楚表达的用法。用户能够描述麻烦，却未必能提前说出一种从未体验过的交互。设计者需要把想法做成可以亲手操作的原型，再看人是否理解、学会以后是否仍愿意使用。',
      '我會從自己的使用經驗和具體場景發現問題，也願意先提出一種尚未被清楚表達的用法。用戶能夠描述麻煩，卻未必能提前說出一種從未體驗過的互動。設計者需要把想法做成可以親手操作的原型，再看人是否理解、學會以後是否仍願意使用。',
      'I look for problems in my own experience and in specific situations, and I am willing to propose a way of using a product that nobody has clearly articulated yet. People can describe a frustration without being able to imagine an interaction they have never experienced. Designers need to turn ideas into hands-on prototypes, then see whether people understand them and still want to use them after learning how.'
    ],
    [
      '技术指标的意义，要放回任务中判断。延迟影响演奏反馈、底噪妨碍聆听时，改善参数就有直接价值。当继续提升某项规格已经很难改变体验，我更想研究设备之间的配合，以及人能否以更自然的方式完成原来的活动。',
      '技術指標的意義，要放回任務中判斷。延遲影響演奏回饋、底噪妨礙聆聽時，改善參數就有直接價值。當繼續提升某項規格已經很難改變體驗，我更想研究設備之間的配合，以及人能否以更自然的方式完成原來的活動。',
      'A specification matters in the context of a task. When latency disrupts performance feedback or noise interferes with listening, improving those measurements has direct value. When further gains in a specification make little difference to the experience, I would rather investigate how devices work together and whether people can carry out the same activity more naturally.'
    ],
    [
      '让学习换来更好的控制',
      '讓學習換來更好的控制',
      'Make learning lead to better control'
    ],
    [
      '我希望工具能让人放心试探：临时看看或听听另一种选择时，原来的内容和位置仍然保留；决定采用以后，再正式改变结果。以声音比较为例，我想探索一种可以临时预听、返回原选择、再明确确认的方式，让注意力留在声音的差别上。',
      '我希望工具能讓人放心試探：臨時看看或聽聽另一種選擇時，原來的內容和位置仍然保留；決定採用以後，再正式改變結果。以聲音比較為例，我想探索一種可以臨時預聽、返回原選擇、再明確確認的方式，讓注意力留在聲音的差別上。',
      'I want tools to make exploration feel safe: when someone briefly looks at or listens to another option, the original content and position should remain intact. The result should change only when they decide to use that option. For sound comparisons, I want to explore a way to preview an option, return to the original and explicitly confirm a choice, keeping attention on the differences in sound.'
    ],
    [
      '我接受有回报的学习。入口应该让人找得到，基本动作应该讲得清；熟练以后，工具还可以提供更细的控制。压力、键盘和按钮都可以承载这种关系。如果学会以后仍然没有收益，或经常误触，就应调整实现。连续交互的价值，也要体现在状态和返回路径上。',
      '我接受有回報的學習。入口應該讓人找得到，基本動作應該講得清；熟練以後，工具還可以提供更細的控制。壓力、鍵盤和按鈕都可以承載這種關係。如果學會以後仍然沒有收益，或經常誤觸，就應調整實現。連續互動的價值，也要體現在狀態和返回路徑上。',
      'I accept learning that pays off. Controls should be discoverable and basic actions easy to explain; with practice, a tool can offer finer control. Pressure-sensitive input, keyboards and buttons can all support this progression. If learning brings no benefit, or accidental actions remain common, the implementation should change. Continuous interactions should also make their state and the way back clear.'
    ],
    [
      '让成熟技术形成协同',
      '讓成熟技術形成協同',
      'Make established technologies work together'
    ],
    [
      '在当前的资源和能力条件下，我会优先评估成熟技术的组合机会。广州展会上，键盘与声卡结合的产品让我注意到，把原本分散的操作组织起来，也可能形成有价值的新体验。真正要解决的工作包括状态、控制、供电和结构怎样配合。',
      '在目前的資源和能力條件下，我會優先評估成熟技術的組合機會。廣州展會上，鍵盤與聲卡結合的產品讓我注意到，把原本分散的操作組織起來，也可能形成有價值的新體驗。真正要解決的工作包括狀態、控制、供電和結構怎樣配合。',
      'Given my current resources and capabilities, I would first evaluate opportunities to combine established technologies. At a trade show in Guangzhou, a product combining a keyboard and an audio interface drew my attention to how bringing separate operations together might create a valuable new experience. The real work includes coordinating state, controls, power and physical construction.'
    ],
    [
      '整合还要计算升级和维护的代价。少一个盒子、少几根线，如果换来整机更换或额外设置，收益就未必成立。音享贴让我持续思考同一件事：两个人已经有各自的耳机，新增的中继应该让共同收听更方便，并把额外的携带与设置负担控制得更小。成熟方案帮助我开始，深入理解关键链路则决定我能继续改进什么。',
      '整合還要計算升級和維護的代價。少一個盒子、少幾根線，如果換來整機更換或額外設定，收益就未必成立。音享貼讓我持續思考同一件事：兩個人已經有各自的耳機，新增的中繼應該讓共同收聽更方便，並把額外的攜帶與設定負擔控制得更小。成熟方案幫助我開始，深入理解關鍵鏈路則決定我能繼續改進什麼。',
      'Integration also has to account for the cost of upgrades and maintenance. One fewer box and a few fewer cables may not be a gain if they mean replacing the whole device or adding more setup. SoundShare keeps me thinking about the same issue: when two people already have their own headphones, an added relay should make shared listening easier while minimizing what they have to carry and configure. Established solutions help me get started; a deeper understanding of the critical parts of the system determines what I can improve next.'
    ],
    [
      '把一次完整使用验证清楚',
      '把一次完整使用驗證清楚',
      'Test the full experience of using a product'
    ],
    [
      '我希望每一次验证都对应一个明确的问题。音频产品除了能否出声，还要看人怎样开始、独立调整、暂时离开、重新加入和结束。原型在我准备好的顺序里运行，只说明了那组条件；其他人换一种顺序操作，仍可能遇到需要重新设计的地方。',
      '我希望每一次驗證都對應一個明確的問題。音頻產品除了能否出聲，還要看人怎樣開始、獨立調整、暫時離開、重新加入和結束。原型在我準備好的順序裡運行，只說明了那組條件；其他人換一種順序操作，仍可能遇到需要重新設計的地方。',
      'I want each test to address a specific question. For audio products, making sound is only part of the task: I also need to consider how people start, adjust their own settings, step away, rejoin and finish. A prototype working through a sequence I have prepared establishes only what happens under those conditions. Someone following a different sequence may still encounter problems that call for a redesign.'
    ],
    [
      '对于定向声音，我想进一步比较同一空间中的目标位置、邻近位置和移动路径，理解声音与空间的关系。展示位置听起来合适，还不足以说明整个场景成立。我会把设备、环境与观察结果一起记录，让结论对应实际检查过的范围，再决定继续扩展还是先缩小问题。',
      '對於定向聲音，我想進一步比較同一空間中的目標位置、鄰近位置和移動路徑，理解聲音與空間的關係。展示位置聽起來合適，還不足以說明整個場景成立。我會把設備、環境與觀察結果一起記錄，讓結論對應實際檢查過的範圍，再決定繼續擴展還是先縮小問題。',
      'For directional sound, I want to compare intended listening positions, nearby positions and paths of movement within the same space to understand the relationship between sound and space. Good results at the demonstration spot alone do not establish that the whole setting works. I would record the equipment, environment and observations together, keep conclusions within the scope actually checked, and then decide whether to expand the work or first narrow the question.'
    ],
    [
      '用经营支持持续研究',
      '用經營支持持續研究',
      'Build a business that supports continued research'
    ],
    [
      '我希望做出用户愿意使用和付费的产品，逐步积累制造、交付和经营经验，为定向声、空间音频等长期方向争取资源。我会从需求具体、自己能够认真完成的范围开始；一个市场被大公司忽略，并不能直接说明它值得做。',
      '我希望做出用戶願意使用和付費的產品，逐步積累製造、交付和經營經驗，為定向聲、空間音頻等長期方向爭取資源。我會從需求具體、自己能夠認真完成的範圍開始；一個市場被大公司忽略，並不能直接說明它值得做。',
      'I want to build products that people are willing to use and pay for, gradually gaining experience in manufacturing, delivery and running a business while securing resources for long-term interests such as directional sound and spatial audio. I would start with a specific need and a scope I can give proper attention to. A market being overlooked by large companies does not, by itself, make it worth pursuing.'
    ],
    [
      '带来收入的业务，也可能占满研究时间。考虑一项业务时，我需要把安装说明、兼容处理、返修和持续支持一起算进去。只有兑现交付以后，仍能留下时间与资金投入研究，经营才真正支持了下一步。我更愿意选择范围清楚、已有工作能够复用的产品，并在需求不断扩张时重新评估投入。',
      '帶來收入的業務，也可能佔滿研究時間。考慮一項業務時，我需要把安裝說明、相容處理、返修和持續支援一起算進去。只有兌現交付以後，仍能留下時間與資金投入研究，經營才真正支持了下一步。我更願意選擇範圍清楚、已有工作能夠複用的產品，並在需求不斷擴張時重新評估投入。',
      'A business that generates revenue can also consume all the time intended for research. When considering an opportunity, I need to account for setup instructions, compatibility issues, repairs and ongoing support. It supports the next step only if time and money remain for research after delivery commitments are met. I would favor products with a clear scope that can reuse existing work, and reassess the investment when requirements keep expanding.'
    ],
    [
      '用户付费获得什么，应当说得明白。当前能提供的能力、使用条件与仍在探索的方向需要分开介绍。我希望收入来自清楚且值得的交换，也会保留为表达和探索而做的作品，不要求每项尝试都成为生意。',
      '用戶付費獲得什麼，應當說得明白。目前能提供的能力、使用條件與仍在探索的方向需要分開介紹。我希望收入來自清楚且值得的交換，也會保留為表達和探索而做的作品，不要求每項嘗試都成為生意。',
      'People should know clearly what they receive when they pay. What a product can currently do, its conditions of use and directions still being explored should be explained separately. I want income to come from a clear, worthwhile exchange. I also want room for work made for expression and exploration, without requiring every experiment to become a business.'
    ],
    [
      '继续研究声音与空间的关系',
      '繼續研究聲音與空間的關係',
      'Keep exploring the relationship between sound and space'
    ],
    [
      '我想继续深入定向声音、空间音频和新的声音交互。对我有吸引力的问题是：声音怎样与位置、内容和人的行动配合；录制与回放怎样保留现场的空间感；人在比较和调整声音时，怎样始终理解自己正在控制什么。',
      '我想繼續深入定向聲音、空間音頻和新的聲音互動。對我有吸引力的問題是：聲音怎樣與位置、內容和人的行動配合；錄製與回放怎樣保留現場的空間感；人在比較和調整聲音時，怎樣始終理解自己正在控制什麼。',
      'I want to go deeper into directional sound, spatial audio and new ways of interacting with sound. The questions that interest me are how sound can work with position, content and human actions; how recording and playback can preserve the sense of space at an event; and how people can always understand what they are controlling as they compare and adjust sound.'
    ],
    [
      '我重视原生空间录制，也对算法和 AI 能把声音做到什么程度保持兴趣。两者让我留下一个还没想清楚的问题：当生成的听感已经足够接近，真实事件的记录、空间定位和创作者的控制，分别还有什么价值？我愿意围绕具体任务比较这些路径，让后续的原型和实验继续改变判断。',
      '我重視原生空間錄製，也對算法和 AI 能把聲音做到什麼程度保持興趣。兩者讓我留下一個還沒想清楚的問題：當生成的聽感已經足夠接近，真實事件的記錄、空間定位和創作者的控制，分別還有什麼價值？我願意圍繞具體任務比較這些路徑，讓後續的原型和實驗繼續改變判斷。',
      'I value capturing spatial sound directly, and I remain curious about what algorithms and AI can achieve with sound. Together, they leave me with a question I have not resolved: when a generated listening experience is close enough, what value remains in a record of a real event, spatial positioning and the control available to its creator? I am willing to compare these approaches for specific tasks and let future prototypes and experiments continue to change my views.'
    ],
    ['产品判断', '產品判斷', 'Product decisions'],
    ['交互与学习', '互動與學習', 'Interaction and learning'],
    ['技术融合', '技術融合', 'Technology integration'],
    ['使用验证', '使用驗證', 'Testing in use'],
    ['经营与研究', '經營與研究', 'Business and research'],
    ['长期方向', '長期方向', 'Long-term direction'],
    ['本页目录', '本頁目錄', 'On this page'],
    ['返回主页', '返回首頁', 'Back to home'],
    ['查看音享贴项目 →', '查看音享貼項目 →', 'View the SoundShare project →'],
    ['查看超声波定向扬声器项目 →', '查看超聲波定向揚聲器項目 →', 'View the ultrasonic directional speaker project →'],
    ['阅读完整理念 →', '閱讀完整理念 →', 'Read the full philosophy →'],
    [
      '罗宇伦关于产品判断、交互设计、技术融合、工程验证与长期研究的思考。',
      '羅宇倫關於產品判斷、互動設計、技術融合、工程驗證與長期研究的思考。',
      'Roy Luo’s reflections on product decisions, interaction design, technology integration, engineering validation and long-term research.'
    ]
  ];
  philosophyCopy.forEach(([source, traditional, english]) => {
    cn[source] = source;
    tw[source] = traditional;
    en[source] = english;
  });

  const pageTitles = {
    'index.html': { 'zh-CN': '罗宇伦 Roy Luo', 'zh-TW': '羅宇倫 Roy Luo', en: 'Roy Luo · Engineering Portfolio' },
    'soundshare.html': { 'zh-CN': '音享贴 · LENGHE SoundShare', 'zh-TW': '音享貼 · LENGHE SoundShare', en: 'LENGHE SoundShare · Roy Luo' },
    'ultrasonic.html': { 'zh-CN': '超声波定向扬声器 · Roy Luo', 'zh-TW': '超聲波定向揚聲器 · Roy Luo', en: 'Ultrasonic Directional Speaker · Roy Luo' },
    'philosophy.html': { 'zh-CN': '产品与创业理念 · 罗宇伦 Roy Luo', 'zh-TW': '產品與創業理念 · 羅宇倫 Roy Luo', en: 'Product & Entrepreneurship Philosophy · Roy Luo' }
  };

  const labels = {
    'zh-CN': { current: '简体中文', button: '语言', aria: '选择语言' },
    'zh-TW': { current: '繁體中文', button: '語言', aria: '選擇語言' },
    en: { current: 'English', button: 'Language', aria: 'Choose language' }
  };

  const resumeAssets = {
    'zh-CN': 'assets/罗宇伦_简历.pdf',
    'zh-TW': 'assets/羅宇倫_履歷.pdf',
    en: 'assets/Roy Luo_Resume.pdf'
  };
  const resumeVersion = '20260907-3';

  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  let currentLanguage;
  const isLanguage = (lang) => Object.prototype.hasOwnProperty.call(labels, lang);

  function detectLanguage() {
    let saved = '';
    try { saved = localStorage.getItem(STORAGE_KEY) || ''; } catch (_) {}
    if (isLanguage(saved)) return saved;
    const candidates = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
    for (const raw of candidates) {
      const parts = String(raw).toLowerCase().split('-');
      if (parts[0] === 'en') return 'en';
      if (parts[0] === 'zh') {
        if (parts.includes('hans')) return 'zh-CN';
        if (parts.some((part) => ['tw', 'hk', 'mo', 'hant'].includes(part))) return 'zh-TW';
        return 'zh-CN';
      }
    }
    return 'en';
  }

  function pageTitle(page = documentPage, lang = currentLanguage || detectLanguage()) {
    let key = documentPage;
    try { key = new URL(page, location.href).pathname.split('/').pop() || 'index.html'; } catch (_) {}
    const titles = pageTitles[key] || pageTitles['index.html'];
    return titles[lang] || titles['zh-CN'];
  }

  function translateValue(original, lang) {
    const key = normalize(original);
    if (!key) return original;
    const dict = lang === 'zh-CN' ? cn : (lang === 'zh-TW' ? tw : en);
    return dict[key] || original;
  }

  function collectTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if (parent.closest('[data-i18n-ui],[data-i18n-static]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => { if (!originalText.has(node)) originalText.set(node, node.nodeValue); });
    return nodes;
  }

  function translateAttributes(lang) {
    document.querySelectorAll('[alt],[title],[aria-label],meta[name="description"]').forEach((el) => {
      if (el.closest('[data-i18n-ui],[data-i18n-static]')) return;
      if (!originalAttrs.has(el)) {
        originalAttrs.set(el, {
          alt: el.hasAttribute('alt') ? el.getAttribute('alt') : null,
          title: el.hasAttribute('title') ? el.getAttribute('title') : null,
          aria: el.hasAttribute('aria-label') ? el.getAttribute('aria-label') : null,
          description: el.matches('meta[name="description"]') ? el.getAttribute('content') : null
        });
      }
      const attrs = originalAttrs.get(el);
      if (attrs.alt !== null) el.setAttribute('alt', translateValue(attrs.alt, lang));
      if (attrs.title !== null) el.setAttribute('title', translateValue(attrs.title, lang));
      if (attrs.aria !== null) el.setAttribute('aria-label', translateValue(attrs.aria, lang));
      if (attrs.description !== null) el.setAttribute('content', translateValue(attrs.description, lang));
    });
  }

  function updateResumeLinks(lang) {
    const asset = resumeAssets[lang] || resumeAssets['zh-CN'];
    document.querySelectorAll('[data-resume-link]').forEach((el) => {
      el.setAttribute('href', `${asset}?v=${resumeVersion}`);
    });
  }

  function renderLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    collectTextNodes().forEach((node) => {
      const original = originalText.get(node);
      const leading = original.match(/^\s*/)?.[0] || '';
      const trailing = original.match(/\s*$/)?.[0] || '';
      node.nodeValue = leading + translateValue(original, lang) + trailing;
    });
    translateAttributes(lang);
    document.title = pageTitle(documentPage, lang);
    updateResumeLinks(lang);
    document.querySelectorAll('[data-lang-current]').forEach((el) => { el.textContent = labels[lang].current; });
    document.querySelectorAll('[data-lang-toggle]').forEach((el) => {
      el.setAttribute('aria-label', labels[lang].aria);
      el.setAttribute('title', labels[lang].aria);
    });
    document.querySelectorAll('[data-lang-option]').forEach((el) => {
      el.classList.toggle('active', el.dataset.langOption === lang);
      el.setAttribute('aria-checked', el.dataset.langOption === lang ? 'true' : 'false');
    });
    window.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang, page: documentPage } }));
  }

  function sendLanguage(target) {
    target?.postMessage({ type: 'site:language-change', lang: currentLanguage }, location.origin);
  }

  function setLanguage(lang, { persist = true, broadcast = true } = {}) {
    if (!isLanguage(lang)) return false;
    if (lang !== currentLanguage) renderLanguage(lang);
    if (persist) { try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {} }
    if (broadcast) {
      if (window.parent !== window) sendLanguage(window.parent);
      sendLanguage(document.querySelector('.detail-shell-frame')?.contentWindow);
    }
    return true;
  }

  function createSwitcher() {
    if (document.querySelector('[data-i18n-ui]')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'lang-switcher';
    wrapper.dataset.i18nUi = 'true';
    wrapper.innerHTML = `
      <button class="lang-toggle" id="siteLanguageToggle" type="button" data-lang-toggle aria-haspopup="menu" aria-expanded="false" aria-controls="siteLanguageMenu">
        <span class="lang-glyph" aria-hidden="true">文</span>
        <span data-lang-current>简体中文</span>
        <span class="lang-chevron" aria-hidden="true">⌄</span>
      </button>
      <div class="lang-menu" id="siteLanguageMenu" role="menu" aria-labelledby="siteLanguageToggle" hidden>
        <button type="button" role="menuitemradio" tabindex="-1" data-lang-option="zh-CN">简体中文</button>
        <button type="button" role="menuitemradio" tabindex="-1" data-lang-option="zh-TW">繁體中文</button>
        <button type="button" role="menuitemradio" tabindex="-1" data-lang-option="en">English</button>
      </div>`;

    const indexHeader = document.querySelector('.site-header');
    if (indexHeader) {
      const cta = indexHeader.querySelector('.header-cta');
      indexHeader.insertBefore(wrapper, cta || null);
    } else {
      const header = document.querySelector('.ss-nav, .detail-nav, .p-nav');
      header?.appendChild(wrapper);
    }

    const toggle = wrapper.querySelector('[data-lang-toggle]');
    const menu = wrapper.querySelector('.lang-menu');
    const options = [...wrapper.querySelectorAll('[data-lang-option]')];
    const focusOption = (index) => {
      const selected = (index + options.length) % options.length;
      options.forEach((option, i) => { option.tabIndex = i === selected ? 0 : -1; });
      options[selected].focus({ preventScroll: true });
    };
    const close = (restoreFocus = false) => {
      const wasOpen = wrapper.classList.contains('open');
      wrapper.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      options.forEach((option) => { option.tabIndex = -1; });
      if (wasOpen && restoreFocus) toggle.focus({ preventScroll: true });
    };
    const open = (index = options.findIndex((option) => option.dataset.langOption === currentLanguage)) => {
      window.dispatchEvent(new Event('site:close-menu'));
      menu.hidden = false;
      wrapper.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      focusOption(index < 0 ? 0 : index);
    };
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (wrapper.classList.contains('open')) close(true);
      else open();
    });
    toggle.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      open(event.key === 'ArrowUp' ? options.length - 1 : 0);
    });
    menu.addEventListener('keydown', (event) => {
      const index = options.indexOf(document.activeElement);
      const destinations = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: options.length - 1 };
      if (Object.prototype.hasOwnProperty.call(destinations, event.key)) {
        event.preventDefault();
        focusOption(destinations[event.key]);
      } else if (event.key === 'Tab') {
        // Let the browser move from the trigger to the next/previous control.
        close(true);
      }
    });
    options.forEach((button) => {
      button.addEventListener('click', () => {
        setLanguage(button.dataset.langOption);
        close(true);
      });
    });
    wrapper.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && wrapper.classList.contains('open')) {
        event.preventDefault();
        event.stopPropagation();
        close(true);
      }
    });
    document.addEventListener('focusin', (event) => {
      const target = event.target;
      if (target instanceof Element && target !== document.body && target !== document.documentElement && !wrapper.contains(target)) close();
    });
    document.addEventListener('click', (event) => { if (!wrapper.contains(event.target)) close(); });
  }

  window.siteLanguage = {
    get: () => currentLanguage || detectLanguage(),
    set: setLanguage,
    pageTitle
  };

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      setLanguage(isLanguage(event.newValue) ? event.newValue : detectLanguage(), { persist: false });
    }
  });
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin) return;
    const fromParent = window.parent !== window && event.source === window.parent;
    const fromDetail = event.source === document.querySelector('.detail-shell-frame')?.contentWindow;
    if (!event.source || (!fromParent && !fromDetail)) return;
    if (event.data?.type === 'site:language-change') {
      setLanguage(event.data.lang, { persist: false, broadcast: false });
    } else if (event.data?.type === 'site:language-request') {
      sendLanguage(event.source);
    }
  });

  function init() {
    createSwitcher();
    renderLanguage(currentLanguage || detectLanguage());
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'site:language-request' }, location.origin);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
