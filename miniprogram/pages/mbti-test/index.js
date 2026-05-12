Page({
  data: {
    selectedVersion: '',
    versionName: '',
    testStarted: false,
    currentQuestions: [],
    currentIndex: 0,
    selectedOption: '',
    scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    showResult: false,
    result: {},
    percentages: { E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50 },
    history: []
  },

  simpleQuestions: [
    { text: '在社交聚会中，你通常会：', dimension: 'EI', optionA: '主动与很多人交谈，包括陌生人', optionB: '只与少数熟悉的人交谈' },
    { text: '你更倾向于：', dimension: 'EI', optionA: '团队合作，头脑风暴', optionB: '独自工作，深度思考' },
    { text: '你更喜欢：', dimension: 'SN', optionA: '看具体的事实和细节', optionB: '看整体的模式和可能性' },
    { text: '做决定时，你更依赖：', dimension: 'SN', optionA: '过去的经验和实际数据', optionB: '直觉和未来的可能性' },
    { text: '做决定时，你更注重：', dimension: 'TF', optionA: '逻辑分析和客观事实', optionB: '个人价值观和对他人的影响' },
    { text: '你认为更重要的是：', dimension: 'TF', optionA: '公平和正义', optionB: '和谐和同理心' },
    { text: '对于计划和安排，你更倾向于：', dimension: 'JP', optionA: '提前规划，按计划执行', optionB: '灵活应变，随机而行' },
    { text: '面对截止日期，你会：', dimension: 'JP', optionA: '提前完成，留有余地', optionB: '最后关头冲刺' }
  ],

  standardQuestions: [
    { text: '当你参加聚会时，你通常是：', dimension: 'EI', optionA: '晚走的那个', optionB: '早走的那个' },
    { text: '你更喜欢的工作环境是：', dimension: 'EI', optionA: '开放式的，大家可以自由交流', optionB: '安静的，有独立空间' },
    { text: '你更容易被什么所吸引：', dimension: 'EI', optionA: '和人交流的机会', optionB: '独立思考的时间' },
    { text: '在课堂上，你更喜欢：', dimension: 'EI', optionA: '参与讨论', optionB: '安静听讲' },
    { text: '你更愿意在哪种场合认识新朋友：', dimension: 'EI', optionA: '社交活动和聚会', optionB: '通过共同兴趣的社群' },
    { text: '当你独自一人时，你通常会：', dimension: 'EI', optionA: '约朋友出来', optionB: '享受独处时光' },
    { text: '你更喜欢什么样的电影：', dimension: 'EI', optionA: '有互动性的讨论片', optionB: '让人深思的文艺片' },
    { text: '你在社交媒体上更倾向于：', dimension: 'EI', optionA: '分享生活点滴，与朋友互动', optionB: '浏览信息，很少发帖' },
    { text: '你更喜欢什么样的团队项目：', dimension: 'EI', optionA: '大家一起头脑风暴', optionB: '各自负责一部分' },
    { text: '当你在人群中时，你会：', dimension: 'EI', optionA: '主动和周围的人交谈', optionB: '观察周围环境' },
    { text: '你更倾向于通过什么方式学习：', dimension: 'SN', optionA: '实际操作和练习', optionB: '阅读和观察' },
    { text: '你看小说时，更关注：', dimension: 'SN', optionA: '具体的情节和事件', optionB: '人物的心理变化' },
    { text: '当你解释一个概念时，你倾向于：', dimension: 'SN', optionA: '用具体的例子', optionB: '用抽象的理论' },
    { text: '你更喜欢什么样的新闻：', dimension: 'SN', optionA: '具体的事实和数据', optionB: '背后的原因和分析' },
    { text: '处理问题时，你更依赖：', dimension: 'SN', optionA: '过去的经验', optionB: '新的想法' },
    { text: '你更擅长记住：', dimension: 'SN', optionA: '具体的细节', optionB: '整体的概念' },
    { text: '在学习新技能时，你更喜欢：', dimension: 'SN', optionA: '一步一步地练习', optionB: '先了解整体框架' },
    { text: '你更容易理解：', dimension: 'SN', optionA: '实际的应用', optionB: '抽象的原理' },
    { text: '你更喜欢什么样的老师：', dimension: 'SN', optionA: '给出具体例子的', optionB: '讲解抽象理论的' },
    { text: '当你在一个新的城市，你更愿意：', dimension: 'SN', optionA: '按计划去景点', optionB: '随意漫步探索' },
    { text: '当你做一个重要决定时，你更依赖：', dimension: 'TF', optionA: '逻辑分析', optionB: '内心感受' },
    { text: '在争论中，你通常：', dimension: 'TF', optionA: '用事实和逻辑说服对方', optionB: '考虑对方的感受' },
    { text: '你认为成功更重要的是：', dimension: 'TF', optionA: '能力和努力', optionB: '人际关系和运气' },
    { text: '当你给别人建议时，你更注重：', dimension: 'TF', optionA: '合理性', optionB: '对方的需求' },
    { text: '你更欣赏的品质是：', dimension: 'TF', optionA: '聪明和能力', optionB: '善良和体贴' },
    { text: '在工作中，你更看重：', dimension: 'TF', optionA: '公平公正', optionB: '和谐友好' },
    { text: '你认为规则存在的意义是：', dimension: 'TF', optionA: '保证公平和效率', optionB: '保护人的权益' },
    { text: '当你评价一个人时，你首先看：', dimension: 'TF', optionA: '他的能力和成就', optionB: '他的品格和态度' },
    { text: '你更希望自己是：', dimension: 'TF', optionA: '有能力的', optionB: '受人喜爱的' },
    { text: '在做选择时，你会被什么所影响：', dimension: 'TF', optionA: '事实和数据', optionB: '对他人的影响' },
    { text: '你更喜欢什么样的生活方式：', dimension: 'JP', optionA: '有计划有组织的', optionB: '自由随性的' },
    { text: '你通常喜欢什么时候完成工作：', dimension: 'JP', optionA: '提前完成', optionB: '最后时刻完成' },
    { text: '你对日程安排的态度是：', dimension: 'JP', optionA: '提前计划好', optionB: '随情况变化' },
    { text: '你更喜欢什么样的约会方式：', dimension: 'JP', optionA: '提前计划好的', optionB: '临时决定' },
    { text: '当你旅行时，你通常：', dimension: 'JP', optionA: '提前做好详细攻略', optionB: '走到哪算哪' },
    { text: '你更倾向于：', dimension: 'JP', optionA: '按清单做事', optionB: '随机应变' },
    { text: '你的房间通常是：', dimension: 'JP', optionA: '整洁有序的', optionB: '随意自在的' },
    { text: '你对deadline的态度是：', dimension: 'JP', optionA: '严格遵守', optionB: '灵活处理' },
    { text: '你更喜欢什么样的社交活动：', dimension: 'JP', optionA: '有组织的主题活动', optionB: '随意的聚会' },
    { text: '当你做计划时，你喜欢：', dimension: 'JP', optionA: '设定明确的目标', optionB: '保持开放的可能性' }
  ],

  professionalQuestions: [],

  results: {
    'INTJ': { name: '建筑师', description: '富有想象力和战略性的思想家，一切皆在计划之中。你善于分析、逻辑清晰，是天生的策划者。', tags: ['独立', '创新', '逻辑性强', '战略思维'] },
    'INTP': { name: '逻辑学家', description: '具有创造力的发明家，对知识有着止不住的渴望。你思维敏捷、善于分析，喜欢探索未知领域。', tags: ['好奇', '分析', '灵活', '创新'] },
    'ENTJ': { name: '指挥官', description: '大胆、富有想象力且意志强大的领导者。你决策果断、自信满满，善于带领团队达成目标。', tags: ['果断', '自信', '高效', '领导力'] },
    'ENTP': { name: '辩论家', description: '聪明好奇的思想者，不会放弃任何智力上的挑战。你机智幽默、思维活跃，喜欢辩论和探索。', tags: ['机智', '创新', '多才多艺', '好奇'] },
    'INFJ': { name: '提倡者', description: '安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。你忠诚、有原则，是天生的引导者。', tags: ['理想主义', '有同情心', '有原则', '忠诚'] },
    'INFP': { name: '调停者', description: '诗意、善良的利他主义者，总是热情地为正当理由提供帮助。你敏感细腻、追求意义。', tags: ['敏感', '理想主义', '富有创造力', '善良'] },
    'ENFJ': { name: '主人公', description: '富有魅力且鼓舞人心的领导者，有使人着迷的能力。你热情洋溢、善于沟通，是天生的领袖。', tags: ['热情', '有同情心', '有责任心', '魅力'] },
    'ENFP': { name: '竞选者', description: '热情、有创造力、社交自由的人，总能找到微笑的理由。你乐观开朗、充满活力。', tags: ['热情', '好奇', '充满活力', '乐观'] },
    'ISTJ': { name: '物流师', description: '实际且注重事实的个人，可靠性不容怀疑。你勤奋负责、注重细节，是可信赖的伙伴。', tags: ['可靠', '务实', '有条理', '负责'] },
    'ISFJ': { name: '守卫者', description: '非常专注而温暖的守护者，时刻准备保护所爱之人。你温柔体贴、默默奉献。', tags: ['关怀', '忠诚', '耐心', '温暖'] },
    'ESTJ': { name: '总经理', description: '出色的管理者，在管理事情或人的方面无与伦比。你务实高效、责任心强，善于组织管理。', tags: ['组织能力强', '务实', '直接', '可靠'] },
    'ESFJ': { name: '执政官', description: '极有同情心、爱社交、受欢迎的人，总是热心提供帮助。你热情友好、乐于助人。', tags: ['热情', '有同情心', '受欢迎', '友好'] },
    'ISTP': { name: '鉴赏家', description: '大胆而实际的实验家，擅长使用任何形式的工具。你冷静理性、动手能力强。', tags: ['冷静', '灵活', '务实', '动手能力'] },
    'ISFP': { name: '探险家', description: '灵活且有魅力的艺术家，时刻准备探索和体验新鲜事物。你敏感细腻、追求美感。', tags: ['敏感', '温和', '灵活', '审美'] },
    'ESTP': { name: '企业家', description: '聪明、精力充沛、善于感知的人，享受冒险和即兴发挥。你行动力强、适应力好。', tags: ['冲动', '精力充沛', '灵活', '务实'] },
    'ESFP': { name: '表演者', description: '自发的、精力充沛的艺人，生活永不无聊在你们身边。你乐观热情、充满魅力。', tags: ['热情', '乐观', '有创造力', '社交'] }
  },

  onLoad() {
    this.initProfessionalQuestions();
  },

  initProfessionalQuestions() {
    const baseQuestions = [
      { text: '在聚会中，你通常是：', dimension: 'EI', optionA: '和很多人交流', optionB: '只和熟人聊天' },
      { text: '你更愿意花时间在：', dimension: 'EI', optionA: '社交活动', optionB: '独处思考' },
      { text: '当你到一个新地方，你更愿意：', dimension: 'EI', optionA: '主动和人攀谈', optionB: '先观察环境' },
      { text: '你更喜欢的工作方式是：', dimension: 'EI', optionA: '和团队一起', optionB: '独自完成' },
      { text: '你在课堂上更倾向于：', dimension: 'EI', optionA: '举手发言', optionB: '认真听讲' },
      { text: '你更容易从哪种方式获得能量：', dimension: 'EI', optionA: '和他人相处', optionB: '独自充电' },
      { text: '在社交媒体上，你通常：', dimension: 'EI', optionA: '积极互动分享', optionB: '浏览为主' },
      { text: '当你遇到问题时，你通常会：', dimension: 'EI', optionA: '向他人寻求建议', optionB: '自己想清楚再说' },
      { text: '你更喜欢什么样的电影：', dimension: 'EI', optionA: '动作片或喜剧', optionB: '文艺片或悬疑片' },
      { text: '在会议上，你通常：', dimension: 'EI', optionA: '积极发言', optionB: '先听别人说' },
      { text: '你更喜欢阅读：', dimension: 'SN', optionA: '事实类书籍', optionB: '小说或诗歌' },
      { text: '在学习新东西时，你更关注：', dimension: 'SN', optionA: '具体的使用方法', optionB: '背后的原理' },
      { text: '你更容易记住：', dimension: 'SN', optionA: '具体的数字和事实', optionB: '整体的印象' },
      { text: '当你听到一个新想法时，你首先会想：', dimension: 'SN', optionA: '这怎么实现', optionB: '这意味着什么' },
      { text: '你更喜欢处理：', dimension: 'SN', optionA: '具体的事情', optionB: '抽象的概念' },
      { text: '你觉得比喻和象征：', dimension: 'SN', optionA: '有助于理解', optionB: '容易让人困惑' },
      { text: '你更感兴趣的是：', dimension: 'SN', optionA: '现实世界发生的事情', optionB: '可能发生的事情' },
      { text: '当你在做计划时，你更依赖：', dimension: 'SN', optionA: '过去的经验', optionB: '新的想法' },
      { text: '你更喜欢什么样的新闻：', dimension: 'SN', optionA: '具体的新闻报道', optionB: '深度分析和评论' },
      { text: '在学习历史时，你更关注：', dimension: 'SN', optionA: '具体的历史事件', optionB: '历史发展的规律' },
      { text: '在做决定时，你更看重：', dimension: 'TF', optionA: '逻辑和事实', optionB: '人的感受' },
      { text: '当朋友向你倾诉烦恼时，你通常：', dimension: 'TF', optionA: '给出建议和解决方案', optionB: '先安慰和倾听' },
      { text: '你认为公平比慈悲：', dimension: 'TF', optionA: '更重要', optionB: '同样重要' },
      { text: '当你评价一部电影时，你更看重：', dimension: 'TF', optionA: '演技和制作质量', optionB: '情感表达' },
      { text: '你更容易被什么说服：', dimension: 'TF', optionA: '有力的论证', optionB: '真诚的话语' },
      { text: '你更愿意成为：', dimension: 'TF', optionA: '公正的裁判', optionB: '受欢迎的朋友' },
      { text: '你认为规则存在的意义是：', dimension: 'TF', optionA: '维护秩序', optionB: '保护人们' },
      { text: '当你在工作中发现一个问题，你会：', dimension: 'TF', optionA: '指出问题所在', optionB: '考虑对团队的影响' },
      { text: '你更欣赏的品质是：', dimension: 'TF', optionA: '聪明和能力', optionB: '善良和体贴' },
      { text: '在做选择时，你会被什么影响：', dimension: 'TF', optionA: '事实和分析', optionB: '个人价值观' },
      { text: '你更喜欢什么样的生活：', dimension: 'JP', optionA: '有计划有安排的', optionB: '随性自在的' },
      { text: '你通常如何准备一次旅行：', dimension: 'JP', optionA: '提前做好详细计划', optionB: '走到哪玩到哪' },
      { text: '你的办公桌通常是：', dimension: 'JP', optionA: '整洁有序的', optionB: '随手放置的' },
      { text: '你更喜欢什么时候完成作业：', dimension: 'JP', optionA: '一布置就开始', optionB: '最后几天赶工' },
      { text: '当你要做一个重要决定时：', dimension: 'JP', optionA: '提前很久就开始思考', optionB: '最后一刻再做' },
      { text: '你更喜欢什么样的约会：', dimension: 'JP', optionA: '计划周全的', optionB: '随性自然的' },
      { text: '你对日程表的态度是：', dimension: 'JP', optionA: '严格遵守', optionB: '随时调整' },
      { text: '你更倾向于：', dimension: 'JP', optionA: '按清单办事', optionB: '随机应变' },
      { text: '你房间的布置通常是：', dimension: 'JP', optionA: '固定不变的', optionB: '经常变化的' },
      { text: '你对deadline的态度是：', dimension: 'JP', optionA: '提前完成', optionB: '踩点完成' }
    ];

    for (let i = 0; i < 200; i++) {
      const baseQ = baseQuestions[i % baseQuestions.length];
      this.professionalQuestions.push({
        text: baseQ.text + ` (${Math.floor(i / baseQuestions.length) + 1}-${i % baseQuestions.length + 1})`,
        dimension: baseQ.dimension,
        optionA: baseQ.optionA,
        optionB: baseQ.optionB
      });
    }
  },

  selectVersion(e) {
    const version = e.currentTarget.dataset.version;
    this.setData({ selectedVersion: version });
    wx.vibrateShort();
  },

  startTest() {
    if (!this.data.selectedVersion) return;

    let questions, versionName;
    if (this.data.selectedVersion === 'simple') {
      questions = this.simpleQuestions;
      versionName = '简化';
    } else if (this.data.selectedVersion === 'standard') {
      questions = this.standardQuestions;
      versionName = '标准';
    } else {
      questions = this.professionalQuestions;
      versionName = '专业';
    }

    this.setData({
      testStarted: true,
      currentQuestions: questions,
      versionName: versionName,
      currentIndex: 0,
      selectedOption: '',
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      showResult: false,
      currentQuestion: questions[0],
      progress: 0,
      history: []
    });
    wx.vibrateShort();
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, currentQuestions, scores, history } = this.data;
    const question = currentQuestions[currentIndex];
    const dimension = question.dimension;

    let newScores = { ...scores };
    if (option === 'A') {
      newScores[dimension[0]]++;
    } else {
      newScores[dimension[1]]++;
    }

    const newHistory = [...history, { selectedOption: option, scores: newScores }];

    if (currentIndex < currentQuestions.length - 1) {
      this.setData({
        selectedOption: option,
        scores: newScores,
        history: newHistory,
        currentIndex: currentIndex + 1,
        currentQuestion: currentQuestions[currentIndex + 1],
        progress: ((currentIndex + 1) / currentQuestions.length) * 100
      });
    } else {
      this.calculateResult(newScores);
    }
    wx.vibrateShort();
  },

  prevQuestion() {
    const { currentIndex, history, currentQuestions } = this.data;
    if (currentIndex === 0 || history.length === 0) return;

    const newHistory = [...history];
    const lastHistory = newHistory.pop();

    let newScores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    if (newHistory.length > 0) {
      newScores = newHistory[newHistory.length - 1].scores;
    }

    this.setData({
      currentIndex: currentIndex - 1,
      currentQuestion: currentQuestions[currentIndex - 1],
      selectedOption: lastHistory.selectedOption,
      scores: newScores,
      history: newHistory,
      progress: ((currentIndex - 1) / currentQuestions.length) * 100
    });
    wx.vibrateShort();
  },

  nextQuestion() {
    if (!this.data.selectedOption) return;

    const { currentIndex, currentQuestions, selectedOption, scores, history } = this.data;
    const question = currentQuestions[currentIndex];
    const dimension = question.dimension;

    const newScores = { ...scores };
    if (selectedOption === 'A') {
      newScores[dimension[0]]++;
    } else {
      newScores[dimension[1]]++;
    }

    const newHistory = [...history];
    newHistory.push({ selectedOption: selectedOption, scores: newScores });

    if (currentIndex < currentQuestions.length - 1) {
      this.setData({
        currentIndex: currentIndex + 1,
        currentQuestion: currentQuestions[currentIndex + 1],
        selectedOption: '',
        scores: newScores,
        history: newHistory,
        progress: ((currentIndex + 1) / currentQuestions.length) * 100
      });
    } else {
      this.calculateResult(newScores);
    }
    wx.vibrateShort();
  },

  calculateResult(scores) {
    const total = {
      E: scores.E + scores.I,
      S: scores.S + scores.N,
      T: scores.T + scores.F,
      J: scores.J + scores.P
    };

    const percentages = {
      E: total.E > 0 ? Math.round((scores.E / total.E) * 100) : 50,
      I: total.E > 0 ? Math.round((scores.I / total.E) * 100) : 50,
      S: total.S > 0 ? Math.round((scores.S / total.S) * 100) : 50,
      N: total.S > 0 ? Math.round((scores.N / total.S) * 100) : 50,
      T: total.T > 0 ? Math.round((scores.T / total.T) * 100) : 50,
      F: total.T > 0 ? Math.round((scores.F / total.T) * 100) : 50,
      J: total.J > 0 ? Math.round((scores.J / total.J) * 100) : 50,
      P: total.J > 0 ? Math.round((scores.P / total.J) * 100) : 50
    };

    const type = (scores.E >= scores.I ? 'E' : 'I') +
                 (scores.S >= scores.N ? 'S' : 'N') +
                 (scores.T >= scores.F ? 'T' : 'F') +
                 (scores.J >= scores.P ? 'J' : 'P');

    this.setData({
      showResult: true,
      result: { type, ...this.results[type] },
      percentages,
      progress: 100
    });
  },

  restart() {
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      showResult: false,
      result: {},
      progress: 0,
      history: [],
      currentQuestion: this.data.currentQuestions[0]
    });
  },

  backToHome() {
    this.setData({
      selectedVersion: '',
      versionName: '',
      testStarted: false,
      currentQuestions: [],
      currentIndex: 0,
      selectedOption: '',
      scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
      showResult: false,
      result: {},
      progress: 0,
      history: []
    });
  }
})