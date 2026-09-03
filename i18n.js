(() => {
  const STORAGE_KEY = 'roylyl.site.language';
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
    'CURRENT EXPERIENCE': '当前经历', 'INTERNSHIP EXPERIENCE': '实习经历', 'HARDWARE & MARKET RESEARCH': '硬件与市场调研', 'MARKET RESEARCH INTERNSHIP': '市场调研实习', 'HARDWARE INTERNSHIP': '硬件部实习', 'FIRST PCB VALIDATED': '首版 PCB 已验证',
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
    '产品先解决真实问题，创业先让理想拥有继续存在的条件。': '產品先解決真實問題，創業先讓理想擁有繼續存在的條件。',
    '不为了创新而创新。': '不為了創新而創新。',
    '我更关心产品是否真正改善了使用体验，而不是参数是否足够夸张。对初创团队而言，很多机会并不来自重新发明底层技术，而来自把成熟技术重新组合，用新的交互和结构去解决被忽略的具体场景。': '我更關心產品是否真正改善了使用體驗，而不是參數是否足夠誇張。對初創團隊而言，很多機會並不來自重新發明底層技術，而來自把成熟技術重新組合，用新的互動和結構去解決被忽略的具體場景。',
    '从真实场景和用户痛点出发，再决定技术方案': '從真實場景和用戶痛點出發，再決定技術方案',
    '避免无意义的参数堆叠和功能堆砌': '避免無意義的參數堆疊和功能堆砌',
    '尊重用户已有设备，尽量创造增量价值而非强制替代': '尊重用戶已有設備，盡量創造增量價值而非強制替代',
    '让多个成熟功能形成协同，而不是简单做功能加法': '讓多個成熟功能形成協同，而不是簡單做功能加法',
    '务实的理想主义。': '務實的理想主義。',
    '我不把商业落地和技术理想看成冲突关系。早期团队资源有限，应该先做技术门槛可控、供应链成熟、用户明确的产品，获得现金流、制造经验和市场认知，再把这些积累投入更长期、更困难的技术方向。': '我不把商業落地和技術理想看成衝突關係。早期團隊資源有限，應該先做技術門檻可控、供應鏈成熟、用戶明確的產品，獲得現金流、製造經驗和市場認知，再把這些積累投入更長期、更困難的技術方向。',
    '先做出用户愿意使用、愿意付费的产品': '先做出用戶願意使用、願意付費的產品',
    '用现金流换取研发自由与更长的技术周期': '用現金流換取研發自由與更長的技術週期',
    '选择巨头动力不足、但足以支撑小团队的细分市场': '選擇巨頭動力不足、但足以支撐小團隊的細分市場',
    '短期务实落地，长期继续探索定向声与空间音频': '短期務實落地，長期繼續探索定向聲與空間音頻',
    '用能够落地的产品养活团队，用团队积累的资源继续投入真正值得长期研究的技术。': '用能夠落地的產品養活團隊，用團隊積累的資源繼續投入真正值得長期研究的技術。',
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
    '这不是一套固定不变的答案，而是我在项目实践、行业调研和创业思考中逐渐形成的工作方法。核心只有两个问题：今天怎样把产品做出来，长期又想把技术带到哪里。': '這不是一套固定不變的答案，而是我在項目實踐、行業調研和創業思考中逐漸形成的工作方法。核心只有兩個問題：今天怎樣把產品做出來，長期又想把技術帶到哪裡。',
    '开始阅读': '開始閱讀', '产品不是参数表，而是一个问题被更聪明地解决。': '產品不是參數表，而是一個問題被更聰明地解決。',
    '我更关注产品是否真正解决问题，而不是它堆叠了多少参数。在消费电子和音频行业，很多底层技术已经足够成熟，继续把采样率、位深度、连接规格或功能数量往上堆，并不一定能带来同等幅度的用户体验提升。': '我更關注產品是否真正解決問題，而不是它堆疊了多少參數。在消費電子和音頻行業，很多底層技術已經足夠成熟，繼續把採樣率、位元深度、連接規格或功能數量往上堆，並不一定能帶來同等幅度的使用體驗提升。',
    '因此，我更愿意从真实场景出发，再决定技术应该如何被使用。一个好的产品不一定需要发明新的元件，也不一定需要挑战新的物理极限。很多时候，把成熟的 A 技术和成熟的 B 技术，通过一个新的 C 场景重新组合，就能产生新的价值。': '因此，我更願意從真實場景出發，再決定技術應該如何被使用。一個好的產品不一定需要發明新的元件，也不一定需要挑戰新的物理極限。很多時候，把成熟的 A 技術和成熟的 B 技術，透過一個新的 C 場景重新組合，就能產生新的價值。',
    '不为了创新而创新，不为了参数而堆参数，而是用尽可能简单、可靠和成熟的技术，解决一个过去没有被认真解决的问题。': '不為了創新而創新，不為了參數而堆參數，而是用盡可能簡單、可靠和成熟的技術，解決一個過去沒有被認真解決的問題。',
    '这也是我理解音享贴和超声波定向扬声器的共同点。两者技术路线完全不同，但都不是为了展示技术本身，而是希望改变声音在真实场景中的使用方式。': '這也是我理解音享貼和超聲波定向揚聲器的共同點。兩者技術路線完全不同，但都不是為了展示技術本身，而是希望改變聲音在真實場景中的使用方式。',
    '初创者更适合横向重组，而不是一开始就纵向挑战巨头。': '初創者更適合橫向重組，而不是一開始就縱向挑戰巨頭。',
    '成熟技术重新组合': '成熟技術重新組合', '如果单一技术的纵向突破太难、太贵，就横向寻找机会，把供应链成熟的技术重新定义。': '如果單一技術的縱向突破太難、太貴，就橫向尋找機會，把供應鏈成熟的技術重新定義。',
    '不是简单功能相加': '不是簡單功能相加', '真正有价值的融合应该产生协同效应，让组合后的产品拥有原本两个独立设备都不具备的能力。': '真正有價值的融合應該產生協同效應，讓組合後的產品擁有原本兩個獨立設備都不具備的能力。',
    '从细分场景切入': '從細分場景切入', '大公司通常更适合大市场，小团队则可以在足够明确、但巨头动力不足的细分市场里建立第一块阵地。': '大公司通常更適合大市場，小團隊則可以在足夠明確、但巨頭動力不足的細分市場裡建立第一塊陣地。',
    '我更认同一种务实的理想主义。': '我更認同一種務實的理想主義。',
    '商业落地和技术理想并不是互相排斥的方向。对于一个资源有限的初创团队来说，先把容易落地、供应链成熟、用户需求清晰的产品做出来，是获得继续研发资格的一种方式。': '商業落地和技術理想並不是互相排斥的方向。對於一個資源有限的初創團隊來說，先把容易落地、供應鏈成熟、用戶需求清晰的產品做出來，是獲得繼續研發資格的一種方式。',
    '短期产品的价值，不只是赚钱。它还会带来供应链关系、制造经验、工程方法、用户反馈和市场判断。这些东西会成为下一阶段研发能力的一部分。': '短期產品的價值，不只是賺錢。它還會帶來供應鏈關係、製造經驗、工程方法、用戶反饋和市場判斷。這些東西會成為下一階段研發能力的一部分。',
    '先做出用户愿意使用、愿意付费的产品；用现金流换取研发自由，再把积累投入更长期、更困难的技术方向。': '先做出用戶願意使用、願意付費的產品；用現金流換取研發自由，再把積累投入更長期、更困難的技術方向。',
    '所以我并不把“先活下来”和“做有理想的技术”看成二选一。前者解决的是如何继续做下去，后者决定的是最终想走到哪里。': '所以我並不把「先活下來」和「做有理想的技術」看成二選一。前者解決的是如何繼續做下去，後者決定的是最終想走到哪裡。',
    '短期落地，中期积累，长期押注真正值得探索的方向。': '短期落地，中期積累，長期押注真正值得探索的方向。',
    '把产品做出来': '把產品做出來', '选择技术门槛可控、供应链成熟、目标用户清晰的方向，建立现金流与真实市场反馈。': '選擇技術門檻可控、供應鏈成熟、目標用戶清晰的方向，建立現金流與真實市場反饋。',
    '把工程能力做深': '把工程能力做深', '持续补齐 DSP、声场仿真、功耗、结构和量产能力，让核心项目从功能样机走向更完整的产品。': '持續補齊 DSP、聲場模擬、功耗、結構和量產能力，讓核心項目從功能樣機走向更完整的產品。',
    '继续探索前沿音频': '繼續探索前沿音頻', '持续关注定向声、原生空间音频、AI 音频与新型交互方式，寻找长期技术差异化。': '持續關注定向聲、原生空間音頻、AI 音頻與新型互動方式，尋找長期技術差異化。',
    'PCB 设计、板级验证、硬件调试与系统联调。': 'PCB 設計、板級驗證、硬件調試與系統聯調。',
    '以 ESP32 为主，围绕 BLE/A2DP、嵌入式控制与原型功能验证。': '以 ESP32 為主，圍繞 BLE/A2DP、嵌入式控制與原型功能驗證。',
    '硬件与验证': '硬件與驗證', 'PCB 设计、样机组装、硬件调试、功能测试与系统联调。': 'PCB 設計、樣機組裝、硬件調試、功能測試與系統聯調。',
    '产品与调研': '產品與調研', '结合竞品调研、用户场景分析、多端交互与产品验证推进方案。': '結合競品調研、用戶場景分析、多端互動與產品驗證推進方案。',
    '把工程判断放进真实行业场景。': '把工程判斷放進真實行業場景。', '深圳科创学院': '深圳科創學院', '湖南康通电子股份有限公司': '湖南康通電子股份有限公司',
    '职能部门实习 · 市场调研': '職能部門實習 · 市場調研', '硬件部实习': '硬件部實習', '音视频行业 · 硬件实践': '音視頻行業 · 硬件實踐',
    '2026.01 — 2026.02': '2026.01 — 2026.02', '2026.08 — 至今': '2026.08 — 至今',
    '调研消费电子产品、技术方案、竞品及应用场景，梳理主要参数、核心功能、用户需求与产品定位；归纳多来源市场信息，形成结构化调研记录与阶段性结论。': '調研消費電子產品、技術方案、競品及應用場景，梳理主要參數、核心功能、用戶需求與產品定位；歸納多來源市場資訊，形成結構化調研記錄與階段性結論。',
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
    '以工程能力为主线，': 'Engineering first,', '把想法做成样机。': 'turn ideas into working prototypes.',
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
    '产品先解决真实问题，创业先让理想拥有继续存在的条件。': 'Products should solve real problems; entrepreneurship should create the conditions for long-term ambition.',
    '不为了创新而创新。': 'Innovation should serve the problem.',
    '我更关心产品是否真正改善了使用体验，而不是参数是否足够夸张。对初创团队而言，很多机会并不来自重新发明底层技术，而来自把成熟技术重新组合，用新的交互和结构去解决被忽略的具体场景。': 'I care more about whether a product meaningfully improves the user experience than whether its specifications look impressive. For an early-stage team, many opportunities come from recombining mature technologies and applying new interaction and product structures to overlooked scenarios.',
    '从真实场景和用户痛点出发，再决定技术方案': 'Start with real scenarios and user pain points, then choose the technology',
    '避免无意义的参数堆叠和功能堆砌': 'Avoid meaningless specification and feature stacking',
    '尊重用户已有设备，尽量创造增量价值而非强制替代': 'Respect devices users already own and create incremental value instead of forced replacement',
    '让多个成熟功能形成协同，而不是简单做功能加法': 'Make mature functions work together rather than simply adding features',
    '务实的理想主义。': 'Pragmatic idealism.',
    '我不把商业落地和技术理想看成冲突关系。早期团队资源有限，应该先做技术门槛可控、供应链成熟、用户明确的产品，获得现金流、制造经验和市场认知，再把这些积累投入更长期、更困难的技术方向。': 'I do not see commercial execution and technical ambition as opposites. With limited resources, an early-stage team should first build products with manageable technical risk, mature supply chains, and clear users, gaining cash flow, manufacturing experience, and market understanding before investing in harder, longer-term technology.',
    '先做出用户愿意使用、愿意付费的产品': 'Build something users are willing to use and pay for',
    '用现金流换取研发自由与更长的技术周期': 'Use cash flow to buy R&D freedom and longer development cycles',
    '选择巨头动力不足、但足以支撑小团队的细分市场': 'Choose niches too small for giants but large enough to sustain a focused team',
    '短期务实落地，长期继续探索定向声与空间音频': 'Execute pragmatically in the short term while continuing to explore directional and spatial audio',
    '用能够落地的产品养活团队，用团队积累的资源继续投入真正值得长期研究的技术。': 'Use products that can ship to sustain the team, then reinvest accumulated resources into technologies worth pursuing for the long term.',
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
    '这不是一套固定不变的答案，而是我在项目实践、行业调研和创业思考中逐渐形成的工作方法。核心只有两个问题：今天怎样把产品做出来，长期又想把技术带到哪里。': 'This is not a fixed doctrine. It is a working method formed through projects, industry research, and entrepreneurial thinking. It comes down to two questions: how do I build the product today, and where do I want the technology to go over the long term?',
    '开始阅读': 'Start reading', '产品不是参数表，而是一个问题被更聪明地解决。': 'A product is not a specification sheet; it is a problem solved more intelligently.',
    '我更关注产品是否真正解决问题，而不是它堆叠了多少参数。在消费电子和音频行业，很多底层技术已经足够成熟，继续把采样率、位深度、连接规格或功能数量往上堆，并不一定能带来同等幅度的用户体验提升。': 'I care more about whether a product genuinely solves a problem than how many specifications it stacks. In consumer electronics and audio, many underlying technologies are already mature; pushing sample rates, bit depth, connectivity specifications, or feature counts higher does not necessarily create proportional gains in user experience.',
    '因此，我更愿意从真实场景出发，再决定技术应该如何被使用。一个好的产品不一定需要发明新的元件，也不一定需要挑战新的物理极限。很多时候，把成熟的 A 技术和成熟的 B 技术，通过一个新的 C 场景重新组合，就能产生新的价值。': 'I therefore prefer to start from real scenarios and then decide how technology should be used. A good product does not always require a new component or a new physical limit. Often, combining mature technology A and mature technology B in a new scenario C can create meaningful value.',
    '不为了创新而创新，不为了参数而堆参数，而是用尽可能简单、可靠和成熟的技术，解决一个过去没有被认真解决的问题。': 'Do not innovate for innovation’s sake or stack specifications for their own sake. Use the simplest, most reliable mature technology possible to solve a problem that has not been taken seriously enough.',
    '这也是我理解音享贴和超声波定向扬声器的共同点。两者技术路线完全不同，但都不是为了展示技术本身，而是希望改变声音在真实场景中的使用方式。': 'This is the common thread I see between SoundShare and the ultrasonic directional speaker. Their technical paths are very different, but neither exists merely to showcase technology; both aim to change how sound is used in real situations.',
    '初创者更适合横向重组，而不是一开始就纵向挑战巨头。': 'Early-stage teams are often better suited to horizontal recombination than immediately challenging giants vertically.',
    '成熟技术重新组合': 'Recombine mature technologies', '如果单一技术的纵向突破太难、太贵，就横向寻找机会，把供应链成熟的技术重新定义。': 'If a vertical breakthrough is too difficult or expensive, look horizontally and redefine technologies that already have mature supply chains.',
    '不是简单功能相加': 'More than feature addition', '真正有价值的融合应该产生协同效应，让组合后的产品拥有原本两个独立设备都不具备的能力。': 'Valuable integration should create synergy, giving the combined product abilities that neither standalone device had before.',
    '从细分场景切入': 'Enter through a focused niche', '大公司通常更适合大市场，小团队则可以在足够明确、但巨头动力不足的细分市场里建立第一块阵地。': 'Large companies are usually better suited to large markets; small teams can build their first foothold in focused niches that are clear enough to matter but too small to motivate giants.',
    '我更认同一种务实的理想主义。': 'I believe in pragmatic idealism.',
    '商业落地和技术理想并不是互相排斥的方向。对于一个资源有限的初创团队来说，先把容易落地、供应链成熟、用户需求清晰的产品做出来，是获得继续研发资格的一种方式。': 'Commercial execution and technical ambition are not mutually exclusive. For a resource-constrained early-stage team, shipping products with mature supply chains and clear user needs is a way to earn the right to keep doing R&D.',
    '短期产品的价值，不只是赚钱。它还会带来供应链关系、制造经验、工程方法、用户反馈和市场判断。这些东西会成为下一阶段研发能力的一部分。': 'The value of a short-term product is not only revenue. It also brings supplier relationships, manufacturing experience, engineering methods, user feedback, and market judgment—all of which become part of the next stage of R&D capability.',
    '先做出用户愿意使用、愿意付费的产品；用现金流换取研发自由，再把积累投入更长期、更困难的技术方向。': 'First build products people will use and pay for; use cash flow to gain R&D freedom, then reinvest accumulated resources into longer-term and more difficult technologies.',
    '所以我并不把“先活下来”和“做有理想的技术”看成二选一。前者解决的是如何继续做下去，后者决定的是最终想走到哪里。': 'I do not see “survive first” and “build ambitious technology” as mutually exclusive. The former answers how to keep going; the latter determines where I ultimately want to go.',
    '短期落地，中期积累，长期押注真正值得探索的方向。': 'Ship in the short term, build capability in the medium term, and invest long-term in directions worth exploring.',
    '把产品做出来': 'Build the product', '选择技术门槛可控、供应链成熟、目标用户清晰的方向，建立现金流与真实市场反馈。': 'Choose directions with manageable technical risk, mature supply chains, and clear target users to establish cash flow and real market feedback.',
    '把工程能力做深': 'Deepen engineering capability', '持续补齐 DSP、声场仿真、功耗、结构和量产能力，让核心项目从功能样机走向更完整的产品。': 'Continue strengthening DSP, sound-field simulation, power, mechanical design, and manufacturability so core projects can move from functional prototypes toward complete products.',
    '继续探索前沿音频': 'Keep exploring frontier audio', '持续关注定向声、原生空间音频、AI 音频与新型交互方式，寻找长期技术差异化。': 'Keep exploring directional sound, native spatial audio, AI audio, and new interaction models to find durable technical differentiation.',
    'PCB 设计、板级验证、硬件调试与系统联调。': 'PCB design, board-level validation, hardware debugging, and system integration.',
    '以 ESP32 为主，围绕 BLE/A2DP、嵌入式控制与原型功能验证。': 'ESP32-based development covering BLE/A2DP, embedded control, and prototype validation.',
    '硬件与验证': 'Hardware & validation', 'PCB 设计、样机组装、硬件调试、功能测试与系统联调。': 'PCB design, prototype assembly, hardware debugging, functional testing, and system integration.',
    '产品与调研': 'Product & research', '结合竞品调研、用户场景分析、多端交互与产品验证推进方案。': 'Advance product decisions through competitor research, user-scenario analysis, multi-platform interaction, and product validation.',
    '把工程判断放进真实行业场景。': 'Applying engineering judgment in a real industry context.', '深圳科创学院': 'Shenzhen Innox Academy', '湖南康通电子股份有限公司': 'Hunan Comtom Electronic Co., Ltd.',
    '职能部门实习 · 市场调研': 'Corporate Functions Intern · Market Research', '硬件部实习': 'Hardware Department Intern', '音视频行业 · 硬件实践': 'Audiovisual Industry · Hardware Practice',
    '2026.01 — 2026.02': 'Jan 2026 — Feb 2026', '2026.08 — 至今': 'Aug 2026 — Present',
    '调研消费电子产品、技术方案、竞品及应用场景，梳理主要参数、核心功能、用户需求与产品定位；归纳多来源市场信息，形成结构化调研记录与阶段性结论。': 'Researched consumer electronics, technical solutions, competitors, and use cases; organized key specifications, core functions, user needs, and product positioning; synthesized market information from multiple sources into structured research records and interim findings.',
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

  const pageTitles = {
    'index.html': { 'zh-CN': '罗宇伦 Roy Luo', 'zh-TW': '羅宇倫 Roy Luo', en: 'Roy Luo · Engineering Portfolio' },
    'soundshare.html': { 'zh-CN': '音享贴 · LENGHE SoundShare', 'zh-TW': '音享貼 · LENGHE SoundShare', en: 'LENGHE SoundShare · Roy Luo' },
    'ultrasonic.html': { 'zh-CN': '超声波定向扬声器 · Roy Luo', 'zh-TW': '超聲波定向揚聲器 · Roy Luo', en: 'Ultrasonic Directional Speaker · Roy Luo' },
    'philosophy.html': { 'zh-CN': '产品理念与创业理念 · 罗宇伦 Roy Luo', 'zh-TW': '產品理念與創業理念 · 羅宇倫 Roy Luo', en: 'Product & Entrepreneurship Philosophy · Roy Luo' }
  };

  const labels = {
    'zh-CN': { current: '简体中文', button: '语言', aria: '选择语言' },
    'zh-TW': { current: '繁體中文', button: '語言', aria: '選擇語言' },
    en: { current: 'English', button: 'Language', aria: 'Choose language' }
  };

  const resumeAssets = {
    'zh-CN': 'assets/罗宇伦_简历.pdf',
    'zh-TW': 'assets/羅宇倫_簡歷.pdf',
    en: 'assets/Roy-Luo-Resume.pdf'
  };
  const resumeVersion = '20260903-1';

  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  function detectLanguage() {
    let saved = '';
    try { saved = localStorage.getItem(STORAGE_KEY) || ''; } catch (_) {}
    if (saved && labels[saved]) return saved;
    const candidates = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
    for (const raw of candidates) {
      const lang = String(raw).toLowerCase();
      if (lang.startsWith('zh')) {
        if (/(tw|hk|mo|hant)/.test(lang)) return 'zh-TW';
        return 'zh-CN';
      }
    }
    return 'en';
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
    document.querySelectorAll('[alt],[title],[aria-label]').forEach((el) => {
      if (el.closest('[data-i18n-ui],[data-i18n-static]')) return;
      if (!originalAttrs.has(el)) {
        originalAttrs.set(el, {
          alt: el.hasAttribute('alt') ? el.getAttribute('alt') : null,
          title: el.hasAttribute('title') ? el.getAttribute('title') : null,
          aria: el.hasAttribute('aria-label') ? el.getAttribute('aria-label') : null
        });
      }
      const attrs = originalAttrs.get(el);
      if (attrs.alt !== null) el.setAttribute('alt', translateValue(attrs.alt, lang));
      if (attrs.title !== null) el.setAttribute('title', translateValue(attrs.title, lang));
      if (attrs.aria !== null) el.setAttribute('aria-label', translateValue(attrs.aria, lang));
    });
  }

  function updateResumeLinks(lang) {
    const asset = resumeAssets[lang] || resumeAssets['zh-CN'];
    document.querySelectorAll('[data-resume-link]').forEach((el) => {
      el.setAttribute('href', `${asset}?v=${resumeVersion}`);
    });
  }

  function renderLanguage(lang, persist = false) {
    document.documentElement.lang = lang === 'en' ? 'en' : lang;
    collectTextNodes().forEach((node) => {
      const original = originalText.get(node);
      const leading = original.match(/^\s*/)?.[0] || '';
      const trailing = original.match(/\s*$/)?.[0] || '';
      node.nodeValue = leading + translateValue(original, lang) + trailing;
    });
    translateAttributes(lang);
    const page = location.pathname.split('/').pop() || 'index.html';
    const titleSet = pageTitles[page] || pageTitles['index.html'];
    document.title = titleSet[lang] || titleSet['zh-CN'];
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
    if (persist) { try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {} }
    window.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang } }));
  }

  function createSwitcher() {
    if (document.querySelector('[data-i18n-ui]')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'lang-switcher';
    wrapper.dataset.i18nUi = 'true';
    wrapper.innerHTML = `
      <button class="lang-toggle" type="button" data-lang-toggle aria-haspopup="menu" aria-expanded="false">
        <span class="lang-glyph" aria-hidden="true">文</span>
        <span data-lang-current>简体中文</span>
        <span class="lang-chevron" aria-hidden="true">⌄</span>
      </button>
      <div class="lang-menu" role="menu" aria-label="Language">
        <button type="button" role="menuitemradio" data-lang-option="zh-CN">简体中文</button>
        <button type="button" role="menuitemradio" data-lang-option="zh-TW">繁體中文</button>
        <button type="button" role="menuitemradio" data-lang-option="en">English</button>
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
    const close = () => { wrapper.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = wrapper.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    wrapper.querySelectorAll('[data-lang-option]').forEach((button) => {
      button.addEventListener('click', () => {
        renderLanguage(button.dataset.langOption, true);
        close();
      });
    });
    document.addEventListener('click', (event) => { if (!wrapper.contains(event.target)) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  }

  function init() {
    createSwitcher();
    renderLanguage(detectLanguage(), false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
