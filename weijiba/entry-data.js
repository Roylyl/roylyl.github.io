(() => {
  "use strict";

  const topicEntry = (title, count, description, examples) => ({
    title,
    type: "鹿群科技话题",
    description,
    facts: [
      ["主题消息", `${count} 条`],
      ["统计范围", "科技核心消息"],
      ["所属群体", "鹿群"],
      ["资料性质", "话题分类快照"]
    ],
    overview: [
      `${title}是鹿群科技话题报告中的一个主要分类，共识别出约 ${count} 条相关消息。分类用于呈现群体关注方向，同一条消息可能同时落入多个主题。`,
      description
    ],
    sections: [
      { id: "scope", title: "讨论范围", paragraphs: [examples] },
      { id: "pattern", title: "交流方式", paragraphs: ["相关讨论通常从具体问题、设备选择或项目需求开始，经由群友经验、截图和工具建议迅速推进，最后回到是否可执行、是否稳定和是否值得投入。"] },
      { id: "context", title: "语境说明", paragraphs: ["报告中的数量是主题识别结果，不代表成员能力排名，也不等同于独立对话次数。主题之间存在交叉，应与完整上下文共同阅读。"] }
    ],
    references: ["《鹿群_科技IT话题详细报告》中的七方向分类统计。", "鹿群聊天导出中的相关主题消息。"],
    categories: ["鹿群科技", "群聊话题"],
    related: ["tech", "luchun"]
  });

  const entries = {
    luchun: {
      title: "鹿群（微信群）",
      type: "群聊共同体",
      description: "一个以校园熟人关系为底座、跨学期持续活跃的多核心社交共同体。",
      facts: [["消息总量", "57,216 条"], ["统计跨度", "471 个日历日"], ["活跃天数", "469 天"], ["核心成员", "14 人"], ["主要场景", "校园、项目与日常生活"]],
      overview: ["鹿群是一个高黏性、多核心、跨学期延续的校园熟人群聊。它不是单一的班级通知群、项目群或技术群，而是把课程、工程实践、设备、游戏、饮食和成员关系放在同一条时间线上。", "在统计范围内，档案包含 57,216 条消息，跨越 471 个日历日，其中 469 天有实际发言。群聊的持续活跃使共同记忆、固定称呼和内部词汇不断累积。"],
      sections: [
        { id: "structure", title: "群体结构", paragraphs: ["报告将鹿群描述为多核心熟人网络。不同成员会在课程、技术、生活或玩笑话题中暂时成为中心，话题权力不会长期集中在单一人物身上。"] },
        { id: "topics", title: "话题构成", paragraphs: ["校园事务、工程项目、数码硬件、AI 工具、游戏、音乐、饮食和外部新闻共同构成主要话题。成员与关系本身又是一个长期存在的元主题。"] },
        { id: "language", title: "语言与语境", paragraphs: ["群聊文本的中位长度约为 6 个字符。大量信息由引用、表情、成员关系和共同经历承担，因此短句常常拥有超过字面的意义。"] },
        { id: "history", title: "档案与群史", paragraphs: ["当前资料的早期记录始于 2025 年 5 月 12 日。不同报告的导出截止时间略有差异，所以人物发言数等指标可能存在小幅变化。"] }
      ],
      references: ["《鹿群聊天记录话题主轴综合分析报告_V1.0》。", "《鹿群成员性格与语言风格专项报告_V1.0》。", "鹿群聊天导出清单与消息档案。"],
      categories: ["微信群", "校园熟人群体", "鹿群文化"],
      related: ["kunkun", "tech", "chat-cycle", "short-messages"]
    },
    gonglu: {
      title: "共🦌主义",
      type: "群内玩笑术语",
      description: "鹿群内部将共同体意识、高认知玩笑和临时口号组合而成的语境词。",
      facts: [["性质", "内部玩笑"], ["关联词", "高认知、困教"], ["常见用途", "接梗与群体叙事"], ["现实含义", "不代表政治立场"]],
      overview: ["共🦌主义是鹿群内部的复合型玩笑术语。“🦌”指向群名与成员共同体，“主义”则把普通的群聊共识夸张成一套临时世界观。", "该词常与“高认知”“困教”“指挥部”等表达共同出现，主要用于确认共同语境和制造接话机会，不应被解释为现实政治主张。"],
      sections: [
        { id: "origin", title: "形成语境", paragraphs: ["资料显示，该词在 2026 年夏季的群聊中获得较高辨识度，并在不同话题中被重复引用。它没有严格定义，意义会随上下文变化。"] },
        { id: "usage", title: "社交功能", paragraphs: ["它可以把日常决定包装成集体纲领，也可以把严肃讨论迅速拉回轻松语气。其核心功能是建立“大家都懂”的关系信号。"] },
        { id: "limits", title: "解释边界", paragraphs: ["脱离群名、成员关系和前后消息后，这一词语容易被过度解释。词条只记录其群内用法，不推断任何成员的现实立场。"] }
      ],
      references: ["詹绍源人物意见与行为模式分析材料。", "鹿群人物经典语句与群聊语境报告。"],
      categories: ["鹿群术语", "内部玩笑"],
      related: ["high-cognition", "kun-coach", "luchun"]
    },
    "high-cognition": {
      title: "高认知（鹿群用语）",
      type: "群内概念",
      description: "一种兼具称赞、反讽、接梗和群体身份确认功能的高频表达。",
      facts: [["常见形式", "高认知"], ["衍生表达", "集体高认知化"], ["关联人物", "困困"], ["性质", "多义语境梗"]],
      overview: ["高认知是鹿群中的高频元话语。它有时用于称赞一个判断，有时用于调侃过度分析，也可以成为继续接话的邀请。", "詹绍源经常被群友放在“高认知担当”的位置，但该称呼属于群内角色设定，并不是对现实能力的客观评级。"],
      sections: [
        { id: "meanings", title: "多重含义", paragraphs: ["同一表达可以是真诚赞同、轻度反讽、自我调侃或群体口号。判断具体含义需要查看回应对象、标点、表情和后续消息。"] },
        { id: "collective", title: "集体高认知化", paragraphs: ["“以后鹿群都要集体高认知化”一类句式把概念扩展成群体叙事，重点在共同参与玩笑，而不是建立真正的认知等级。"] },
        { id: "reading", title: "阅读提示", paragraphs: ["词条不把“高认知”作为心理学或教育学术语使用，也不据此判断成员人格、智力或社会地位。"] }
      ],
      references: ["鹿群人物语言与角色分析材料。", "群聊中的高认知相关语境样本。"],
      categories: ["鹿群术语", "群聊语言"],
      related: ["kunkun", "gonglu", "short-messages"]
    },
    "kun-coach": {
      title: "困教练",
      type: "群内人物称号",
      description: "詹绍源在鹿群中的关系化称呼之一，连接篮球、指挥和高认知玩笑。",
      facts: [["对应人物", "詹绍源（困困）"], ["常见简称", "教练、困教"], ["使用场景", "体育与团队玩笑"], ["性质", "非正式称号"]],
      overview: ["困教练是“困困”称呼系统中的一条体育支线。资料中也可见“教练”“詹教练”和“困教”等变体。", "这一称号会把普通建议、团队安排或篮球话题包装成“教练发话”，由群友共同维护其喜剧效果。"],
      sections: [
        { id: "name", title: "称号结构", paragraphs: ["“困”来自困困，“教练”来自体育与指导语境。二者组合后既能指向具体人物，也能提示接下来是一段角色化表达。"] },
        { id: "role", title: "群内角色", paragraphs: ["困教练常与“指挥部”“高认知”和“困教”世界观相连，使临时对话拥有连续的群内设定。"] },
        { id: "boundary", title: "现实边界", paragraphs: ["称号不表示现实职业或正式权力，仅记录熟人群聊中的互动方式。"] }
      ],
      references: ["詹绍源身份称呼与行为模式材料。", "鹿群人物经典语句报告。"],
      categories: ["鹿群人物", "群内称号"],
      related: ["kunkun", "high-cognition", "gonglu"]
    },
    "short-messages": {
      title: "短句连发",
      type: "群聊语言现象",
      description: "依靠高共享语境，用多个短消息完成反应、确认、追问与话题推进的交流方式。",
      facts: [["鹿群文本中位数", "约 6 字符"], ["困困文本中位数", "约 5 字符"], ["主要功能", "反应、追问、接梗"], ["理解条件", "前后文与成员关系"]],
      overview: ["短句连发是鹿群中常见的消息组织方式。一条消息只承担一个动作，例如“？”表示追问，“稳了”完成确认，“nb”提供即时反应。", "在詹绍源的一个文本快照中，约 77% 的消息不超过 8 个字符。短并不意味着信息少，许多意义已被引用、表情和共同经历提前编码。"],
      sections: [
        { id: "rhythm", title: "对话节奏", paragraphs: ["多个短句可以快速交替，使不同成员随时插入。它比一次发送完整长段更接近口语式协作。"] },
        { id: "context", title: "语境依赖", paragraphs: ["孤立保存短句会损失回应对象和语气。分析时应连同上一条消息、引用关系、时间间隔与后续反应一起查看。"] },
        { id: "examples", title: "典型形式", paragraphs: ["鹿群中的典型形式包括“nb”“6”“稳了”“人物”和单独的问号。这些词在不同场景下可能表达赞同、惊讶、调侃或结束话题。"] }
      ],
      references: ["ZhanShaoyuan 语言风格分析报告。", "鹿群成员性格与语言风格专项报告。"],
      categories: ["群聊语言", "高语境交流"],
      related: ["kunkun", "nb-context", "61", "chat-cycle"]
    },
    tech: {
      title: "鹿群科技话题",
      type: "群聊主题总览",
      description: "由硬件、项目、数字平台、AI、学习、编码和安全七个方向组成的技术讨论链。",
      facts: [["科技核心消息", "1,721 条"], ["参与者", "15 人"], ["话题方向", "7 类"], ["最高频方向", "硬件与数码"]],
      overview: ["鹿群科技话题不是单独的编程频道，而是一条从设备、软件平台和 AI 工具延伸到课程、竞赛、开发与数据安全的连续链路。", "报告识别出 1,721 条科技核心消息。七类方向可以交叉：一场项目讨论可能同时涉及硬件选型、代码实现和 AI 辅助。"],
      sections: [
        { id: "matrix", title: "七类话题", paragraphs: ["硬件与数码 503 条、项目与竞赛 480 条、数字平台 323 条、AI 与大模型 316 条、学习与课程 213 条、编码与开发 151 条、安全与数据 136 条。"] },
        { id: "chain", title: "实践链路", paragraphs: ["讨论常从“要完成什么”开始，经过设备和平台选择、资料查找、代码实现与调试，最后落到交付、演示或比赛结果。"] },
        { id: "people", title: "成员参与", paragraphs: ["不同成员在不同领域成为临时信息中心，形成多核心的经验交换网络。"] }
      ],
      references: ["《鹿群_科技IT话题详细报告》。", "鹿群聊天记录话题主轴综合分析报告。"],
      categories: ["鹿群科技", "主题分析"],
      related: ["hardware", "projects", "ai-tools", "coding"]
    },
    hardware: topicEntry("硬件与数码", "503", "这是七类科技方向中消息量最高的一类，覆盖电脑、手机、外设、网络设备和购买选择。", "常见内容包括设备性能、价格、配置、维修、升级、使用体验和选购建议。讨论往往与课程、游戏或项目的具体需求连接。"),
    projects: topicEntry("项目与竞赛", "480", "围绕工程设计、课程项目、竞赛准备、演示和协作分工展开。", "常见内容包括任务拆分、技术路线、材料准备、进度协调、结果验证和临时问题排查；工程学习问题也经常在此类对话中出现。"),
    platforms: topicEntry("数字平台与产品", "323", "讨论软件服务、校园系统、在线平台、云服务及其使用体验。", "常见内容包括账号、权限、客户端、云电脑、平台迁移和产品体验，以及对低效率系统或重复流程的评价。"),
    "ai-tools": topicEntry("AI 与大模型", "316", "覆盖 ChatGPT、Codex、DeepSeek、豆包及其他模型或智能工具的实际使用。", "成员关注生成效果、推理能力、配置切换、编程辅助、云端运行和工具是否稳定，评价通常以实际任务能否完成为标准。"),
    learning: topicEntry("学习与课程", "213", "围绕课程理解、作业、考试、工程知识和资料获取展开。", "讨论形式既包括直接求解，也包括资料分享、概念解释和对课程设置的评价；短句式“速问速答”较为常见。"),
    coding: topicEntry("编码与开发", "151", "涉及代码实现、开发工具、调试、环境配置和自动化。", "相关消息包含编程问题、工具链选择、配置切换、报错排查和项目实现，也会与 AI 辅助编码交叉。"),
    security: topicEntry("安全与数据", "136", "覆盖账号安全、隐私、数据保存、风险识别和系统边界。", "讨论常从具体平台、链接或权限问题出发，关注个人数据是否泄露、账号是否可靠，以及信息应如何备份和分享。"),
    "chat-cycle": {
      title: "鹿群群聊回路",
      type: "互动结构",
      description: "从提问、即时反应、群内玩笑再回到可执行结论的典型对话路径。",
      facts: [["起点", "具体问题"], ["中段", "短句与表情"], ["调节器", "群内梗"], ["终点", "建议或确认"]],
      overview: ["鹿群群聊回路描述一种常见互动：有人提出课程、设备或生活问题，其他成员先给出即时反应，再通过玩笑和补充信息逐步形成答案。", "玩笑并不总是偏离主题，它常用于维持参与度、降低讨论压力，并为更多成员创造加入机会。"],
      sections: [
        { id: "question", title: "问题进入", paragraphs: ["问题通常具体、直接，有时只包含一句话或一张截图。共享背景让成员无需重复解释全部前提。"] },
        { id: "reaction", title: "反应与接梗", paragraphs: ["“6”“nb”“人物”以及表情包先完成情绪回应，随后才出现经验、链接或操作建议。"] },
        { id: "resolution", title: "回到结论", paragraphs: ["对话最终常回到“先做什么”“能不能用”或“稳了没有”，体现鹿群较强的实践导向。"] }
      ],
      references: ["鹿群话题主轴综合分析报告。", "鹿群人物语言风格与经典语句报告。"],
      categories: ["群聊结构", "鹿群文化"],
      related: ["luchun", "short-messages", "nb-context"]
    },
    "61": {
      title: "61（鹿群用语）",
      type: "高语境数字表达",
      description: "在鹿群消息中反复出现、但必须依赖上下文解释的数字或符号组合。",
      facts: [["形式", "61"], ["性质", "多义表达"], ["常见位置", "短句与接龙"], ["解释要求", "查看完整上下文"]],
      overview: ["61在鹿群资料中具有较高辨识度，但它并非始终对应一个固定定义。它可能是数字、回应、昵称化写法或某段对话延续出的临时暗号。", "由于该词高度依赖共享经历，词条不提供脱离语境的单一释义。"],
      sections: [
        { id: "uses", title: "使用方式", paragraphs: ["61常以极短消息出现，也可能被其他成员重复或改写。它的社交功能有时比字面内容更重要。"] },
        { id: "ambiguity", title: "多义性", paragraphs: ["判断具体含义需要查看前后消息、说话人和当时话题。相同文本在不同日期可能承担不同作用。"] },
        { id: "method", title: "记录原则", paragraphs: ["保留其多义状态比强行给出确定解释更符合原始资料。"] }
      ],
      references: ["鹿群人物与语言风格材料中的高频词记录。", "鹿群聊天导出语境样本。"],
      categories: ["鹿群术语", "数字表达"],
      related: ["short-messages", "nb-context", "luchun"]
    },
    "xu-ge": {
      title: "徐哥（鹿群称呼）",
      type: "关系化称呼",
      description: "鹿群资料中与课程、评分和校园事务语境关联较多的成员称呼。",
      facts: [["称呼形式", "徐哥"], ["常见语境", "课程与评分"], ["关联短句", "徐哥就搞我们"], ["性质", "熟人群内称呼"]],
      overview: ["徐哥是鹿群资料中一个较高频的关系化称呼，常出现在课程安排、评分和校园事务的讨论里。", "“徐哥就搞我们”等句子是特定群聊语境中的抱怨或调侃，报告同时指出群内不存在可据此确认的现实敌对关系。"],
      sections: [
        { id: "contexts", title: "出现语境", paragraphs: ["相关消息通常围绕课程压力、规则变化和临时安排，称呼本身体现熟人群体对外部角色的共同指代。"] },
        { id: "phrases", title: "经典表达", paragraphs: ["重复短句因易于接话而成为群内素材，但不应从一句抱怨推断现实关系。"] },
        { id: "privacy", title: "记录边界", paragraphs: ["词条不扩展现实身份信息，仅记录该称呼在鹿群中的文本功能。"] }
      ],
      references: ["詹绍源意见分析材料。", "鹿群人物经典语句报告。"],
      categories: ["鹿群称呼", "校园语境"],
      related: ["kunkun", "luchun", "learning"]
    },
    secretary: {
      title: "书记（鹿群称呼）",
      type: "群内角色称呼",
      description: "鹿群中用于成员指代、组织事务或模拟行政语气的关系化称呼。",
      facts: [["形式", "书记"], ["使用场景", "组织与事务玩笑"], ["性质", "语境称呼"], ["现实身份", "本条目不作推断"]],
      overview: ["书记是鹿群热门词中的角色化称呼之一。它既可能指向特定成员，也可能用于模拟通知、组织和行政语气。", "由于称呼依赖当时的成员关系，词条只记录群聊中的语言功能，不补充或推断现实身份。"],
      sections: [
        { id: "role", title: "角色功能", paragraphs: ["这一称呼可以快速建立组织事务的对话框架，使通知、安排或吐槽带上群内角色感。"] },
        { id: "tone", title: "语气变化", paragraphs: ["在正式通知转发中语气可能较严肃，在日常接梗中则常带有夸张和戏仿。"] },
        { id: "limits", title: "资料边界", paragraphs: ["现有资料不足以支持群外身份叙述，因此不将称呼与现实职位直接等同。"] }
      ],
      references: ["鹿群聊天导出中的称呼语境。", "鹿群成员语言与互动材料。"],
      categories: ["鹿群称呼", "角色语言"],
      related: ["luchun", "chat-cycle"]
    },
    particle: {
      title: "对齐一下颗粒度",
      type: "群聊元话语",
      description: "用于提醒讨论者统一问题尺度、定义或细节层级的表达。",
      facts: [["关键词", "对齐、颗粒度"], ["功能", "统一讨论尺度"], ["常见语境", "复杂问题与项目"], ["语气", "认真与玩笑兼有"]],
      overview: ["“对齐一下颗粒度”是鹿群讨论复杂问题时出现的元话语。它不直接回答问题，而是提醒参与者先确认各自在讨论哪一层细节。", "由于表达略带项目管理腔，它也容易被群友引用和戏仿，成为认真沟通与群内玩笑之间的桥梁。"],
      sections: [
        { id: "meaning", title: "基本含义", paragraphs: ["颗粒度指信息或任务被拆分的精细程度。对齐颗粒度意味着先统一问题边界，再比较意见。"] },
        { id: "usage", title: "群聊用法", paragraphs: ["当一方讨论原则、另一方讨论操作细节时，这句话可以暂停争论并重新组织问题。"] },
        { id: "meme", title: "玩笑化", paragraphs: ["词语的专业感与日常群聊形成反差，因此也会在普通话题中被夸张使用。"] }
      ],
      references: ["鹿群群史与经典表达材料。", "2026 年 7 月相关聊天语境。"],
      categories: ["群聊语言", "项目话语"],
      related: ["projects", "chat-cycle", "high-cognition"]
    },
    "nb-context": {
      title: "nb（鹿群语境）",
      type: "短句回应",
      description: "鹿群中用于赞叹、确认、调侃或维持对话节奏的高频简短回应。",
      facts: [["形式", "nb"], ["困困样本频次", "完整回复 22 次"], ["主要功能", "即时反应"], ["理解方式", "回到上下文"]],
      overview: ["nb是鹿群中极常见的即时回应。它可以表达真诚赞叹，也可能只是确认自己看到了消息，或用轻度夸张推动群友继续说。", "在詹绍源的文本样本中，单独的“nb”是重复次数较多的完整回复之一。"],
      sections: [
        { id: "functions", title: "互动功能", paragraphs: ["nb占用字数很少，却能完成态度表达、节奏维持和关系确认。它经常出现在图片、项目成果、游戏表现或出人意料的消息之后。"] },
        { id: "tones", title: "语气判断", paragraphs: ["是否真诚、夸张或反讽，取决于上一条消息、发送速度、后续补充和成员之间的熟悉程度。"] },
        { id: "analysis", title: "分析原则", paragraphs: ["统计频次只能说明表达常用，不能单独证明固定偏好或人格特征。"] }
      ],
      references: ["ZhanShaoyuan 语言风格分析报告。", "鹿群人物经典语句报告。"],
      categories: ["群聊语言", "短句回应"],
      related: ["short-messages", "61", "chat-cycle", "kunkun"]
    }
  };

  const richerRelations = {
    hardware: ["tech", "projects", "platforms", "ai-tools"],
    projects: ["tech", "hardware", "learning", "coding", "particle"],
    platforms: ["tech", "hardware", "ai-tools", "security"],
    "ai-tools": ["tech", "coding", "platforms", "projects", "kunkun"],
    learning: ["tech", "projects", "kunkun", "xu-ge"],
    coding: ["tech", "ai-tools", "projects", "security"],
    security: ["tech", "platforms", "coding", "hardware"],
    secretary: ["luchun", "chat-cycle", "short-messages", "high-cognition"],
    particle: ["projects", "chat-cycle", "high-cognition", "short-messages"]
  };
  Object.entries(richerRelations).forEach(([entrySlug, related]) => {
    if (entries[entrySlug]) entries[entrySlug].related = related;
  });

  const categoryTargets = {
    "鹿群科技": "tech",
    "群聊话题": "luchun",
    "微信群": "luchun",
    "校园熟人群体": "luchun",
    "鹿群文化": "luchun",
    "鹿群术语": "gonglu",
    "内部玩笑": "gonglu",
    "群聊语言": "short-messages",
    "鹿群人物": "kunkun",
    "群内称号": "kun-coach",
    "高语境交流": "short-messages",
    "主题分析": "tech",
    "群聊结构": "chat-cycle",
    "数字表达": "61",
    "鹿群称呼": "kunkun",
    "校园语境": "learning",
    "角色语言": "secretary",
    "项目话语": "projects",
    "短句回应": "nb-context"
  };

  window.WEIJIBA_ENTRY_SLUGS = ["kunkun", ...Object.keys(entries)];

  const slug = new URLSearchParams(window.location.search).get("entry") || "kunkun";
  if (slug === "kunkun") return;

  const entry = entries[slug];
  const article = document.querySelector(".article-main article");
  const toc = document.querySelector("#toc");
  if (!article || !toc) return;

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);

  const entryLink = (relatedSlug) => {
    if (relatedSlug === "kunkun") return "article.html?entry=kunkun";
    return `article.html?entry=${encodeURIComponent(relatedSlug)}`;
  };

  if (!entry) {
    document.title = "未找到词条—魏鸡百科";
    article.innerHTML = `<header class="article-heading"><div class="title-line"><h1>未找到词条</h1></div></header><div class="article-notice"><span class="notice-icon">i</span><p>这个词条暂时不存在。你可以返回<a href="index.html">魏鸡百科首页</a>继续浏览。</p></div>`;
    toc.innerHTML = '<a class="is-active" href="#top">未找到词条</a>';
    return;
  }

  document.title = `${entry.title}—魏鸡百科，困困的百科全书`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.setAttribute("content", `${entry.title}—${entry.description}`);

  const facts = entry.facts.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("");
  const overview = entry.overview.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const sections = entry.sections.map((section) => `<section id="${escapeHtml(section.id)}" class="article-section"><h2><span>${escapeHtml(section.title)}</span><button type="button" data-demo="编辑${escapeHtml(section.title)}">编辑</button></h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>`).join("");
  const references = entry.references.map((reference, index) => `<li id="ref-${index + 1}">${escapeHtml(reference)}</li>`).join("");
  const categories = entry.categories.map((category) => {
    const target = categoryTargets[category];
    const href = target && target !== slug ? entryLink(target) : "index.html#articles";
    return `<a href="${href}">${escapeHtml(category)}</a>`;
  }).join("");
  const related = entry.related.map((relatedSlug) => {
    const relatedEntry = relatedSlug === "kunkun" ? { title: "詹绍源（困困）" } : entries[relatedSlug];
    return relatedEntry ? `<a href="${entryLink(relatedSlug)}">${escapeHtml(relatedEntry.title)}</a>` : "";
  }).filter(Boolean).join("、");

  article.innerHTML = `
    <header class="article-heading">
      <div class="title-line">
        <h1>${escapeHtml(entry.title)}</h1>
        <button class="language-button" type="button" id="article-language-button" aria-expanded="false" aria-controls="article-language-menu"><span aria-hidden="true">文</span> 2种语言</button>
        <div class="language-menu" id="article-language-menu" hidden><button type="button" data-language="简体中文">简体中文</button><button type="button" data-language="繁體中文">繁體中文</button></div>
      </div>
      <div class="article-toolbar">
        <div class="subject-tabs"><a class="active" href="#top">条目</a><button type="button" data-demo="讨论页">讨论</button></div>
        <div class="variant-control"><button type="button" data-demo="字词转换">不转换⌄</button></div>
        <div class="view-tabs"><a class="active" href="#top">阅读</a><button type="button" data-demo="编辑">编辑</button><button type="button" data-demo="查看历史">查看历史</button><button type="button" data-demo="工具">工具⌄</button></div>
      </div>
    </header>
    <div class="article-notice" role="note"><span class="notice-icon" aria-hidden="true">i</span><p>此条目根据鹿群资料二次编写，仅记录可观察的群聊表达与互动语境，不用于推断现实人格、身份或立场。</p></div>
    <aside class="infobox" aria-label="${escapeHtml(entry.title)}概要"><div class="infobox-title">${escapeHtml(entry.title)}</div><div class="infobox-subtitle">${escapeHtml(entry.type)}</div><table><tbody>${facts}</tbody></table></aside>
    ${overview}
    ${sections}
    <section id="related" class="article-section"><h2><span>相关条目</span></h2><p>${related}</p></section>
    <section id="references" class="article-section references"><h2><span>资料来源</span><button type="button" data-demo="编辑资料来源">编辑</button></h2><ol>${references}</ol></section>
    <div class="categories"><span>分类：</span>${categories}</div>
    <p class="last-edited" id="history-note">本页面最后修订于 2026 年 9 月 4 日。页面内容仅用于非官方群内文化记录。</p>`;

  toc.innerHTML = `<a class="is-active" href="#top">序言</a>${entry.sections.map((section, index) => `<a href="#${escapeHtml(section.id)}"><span>${index + 1}</span> ${escapeHtml(section.title)}</a>`).join("")}<a href="#related"><span>${entry.sections.length + 1}</span> 相关条目</a><a href="#references"><span>${entry.sections.length + 2}</span> 资料来源</a>`;
})();
