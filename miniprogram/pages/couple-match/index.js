Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: '',
    selectedValue: 0,
    scores: { communication: 0, values: 0, lifestyle: 0, conflict: 0, intimacy: 0 },
    showResult: false,
    result: {},
    matchScore: '',
    analysis: {},
    progress: 0,
    history: []
  },

  results: {
    'soulmate': {
      emoji: '💑',
      name: '灵魂伴侣',
      description: '你们是彼此的灵魂伴侣！无论是精神契合度还是日常相处，都堪称完美。你们的相遇像是命运的安排，珍惜这份难得的缘分！',
      tags: ['心有灵犀', '命中注定', '神仙眷侣'],
      level: 'excellent'
    },
    'powerCouple': {
      emoji: '👑',
      name: '王者CP',
      description: '你们是最强王者组合！在一起时总能产生1+1>2的效果。无论是事业还是生活，都是彼此最好的搭档！',
      tags: ['强强联合', '最佳拍档', '并肩作战'],
      level: 'excellent'
    },
    'sweetLove': {
      emoji: '🍯',
      name: '甜蜜蜜组合',
      description: '你们的生活充满甜蜜和温馨！虽然偶尔有小摩擦，但甜蜜永远是主旋律。你们懂得如何让对方开心。',
      tags: ['甜度爆表', '宠溺对方', '温馨日常'],
      level: 'good'
    },
    'buddyLovers': {
      emoji: '🎮',
      name: '损友恋人',
      description: '你们是那种可以一起疯一起闹的恋人！互怼但又离不开对方，这种独特的相处模式让你们的关系充满乐趣。',
      tags: ['互相吐槽', '欢乐不断', '默契满分'],
      level: 'good'
    },
    'growthCouple': {
      emoji: '🌱',
      name: '共同成长型',
      description: '你们的关系是那种细水长流、共同进步的类型。虽然不够轰轰烈烈，但每一天都在变得更好。',
      tags: ['共同进步', '相互激励', '未来可期'],
      level: 'good'
    },
    'adventurePartners': {
      emoji: '🧗',
      name: '冒险搭档',
      description: '你们是那种说走就走、一起冒险的情侣！生活永远不无聊，每一天都充满新鲜感。',
      tags: ['说走就走', '新鲜感', '刺激有趣'],
      level: 'good'
    },
    'stormyLovers': {
      emoji: '⛈️',
      name: '欢喜冤家',
      description: '你们的感情像一部精彩的电视剧，有吵有闹但谁也离不开谁。这种酸甜苦辣俱全的爱情也别有风味！',
      tags: ['相爱相杀', '戏剧性', '分分合合'],
      level: 'challenging'
    },
    'homebodies': {
      emoji: '🏠',
      name: '居家小分队',
      description: '你们是那种享受宅在家里的甜蜜情侣。不需要轰轰烈烈，窝在一起就是最幸福的时光。',
      tags: ['居家型', '温馨甜蜜', '简单幸福'],
      level: 'good'
    }
  },

  dimensionNames: {
    communication: '沟通方式',
    values: '价值观契合',
    lifestyle: '生活方式',
    conflict: '冲突处理',
    intimacy: '亲密度'
  },

  onLoad() {
    this.initQuestions();
  },

  initQuestions() {
    const questions = [
      { text: '你们吵架时，通常谁先低头？', dimension: 'conflict', optionA: '看情况，谁错了谁先认', optionB: '我通常会主动哄对方', optionC: '等他来找我', optionD: '必须一方先道歉才能和好' },
      { text: '周末约会你们更喜欢？', dimension: 'lifestyle', optionA: '在家做饭，享受二人世界', optionB: '出门探店，打卡各种美食', optionC: '看展、看电影等文艺活动', optionD: '运动、旅行等户外活动' },
      { text: '对方没有及时回消息时，你会？', dimension: 'communication', optionA: '继续做自己的事，不多想', optionB: '有点担心，会再发一条', optionC: '疯狂刷消息看他有没有回复', optionD: '直接打电话问' },
      { text: '你们对未来的规划是？', dimension: 'values', optionA: '一起在大城市奋斗买房', optionB: '回小城市过安稳日子', optionC: '不设限，随遇而安', optionD: '一起创业或出国发展' },
      { text: '情人节你期望收到什么礼物？', dimension: 'intimacy', optionA: '精心准备的手工礼物', optionB: '名牌包包或首饰', optionC: '一起吃顿浪漫晚餐', optionD: '一场说走就走的旅行' },
      { text: '你们吵架最常见的原因是？', dimension: 'conflict', optionA: '他总是忘记重要日子', optionB: '消费观念不一致', optionC: '生活习惯不同', optionD: '和异性相处边界的分歧' },
      { text: '你更喜欢哪种相处模式？', dimension: 'lifestyle', optionA: '每天黏在一起', optionB: '各自有空间，但每天见面', optionC: '平时忙，周末集中约会', optionD: '异地恋也无所谓' },
      { text: '当他说"我没事"的时候，你相信吗？', dimension: 'communication', optionA: '完全相信，给他空间', optionB: '半信半疑，会观察', optionC: '不相信，会追问到底', optionD: '不相信，会用行动哄他' },
      { text: '你们出去吃饭一般谁买单？', dimension: 'values', optionA: '男生主动买单', optionB: 'AA制或轮流买单', optionC: '谁有钱谁买', optionD: '经济条件好的一方多出' },
      { text: '你最不能接受的对方的行为是？', dimension: 'values', optionA: '撒谎或隐瞒', optionB: '和前任联系', optionC: '沉迷游戏或不求上进', optionD: '控制欲太强' },
      { text: '你们的朋友对你们评价是？', dimension: 'intimacy', optionA: '"你们太甜了，看不下去"', optionB: '"你们很互补"', optionC: '"感觉你们很适合"', optionD: '"你们好像兄弟/闺蜜"' },
      { text: '对方做了什么会让你最感动？', dimension: 'intimacy', optionA: '记住我说过的每件小事', optionB: '在我最低落时陪伴左右', optionC: '为我努力改变自己', optionD: '给我意外的惊喜' },
      { text: '你们吵架后的和解方式是？', dimension: 'conflict', optionA: '坐下来好好谈谈', optionB: '一顿美食就能和好', optionC: '需要时间冷静', optionD: '必须有第三方调解' },
      { text: '你更看重对方什么品质？', dimension: 'values', optionA: '上进心和事业心', optionB: '温柔体贴会照顾人', optionC: '幽默有趣能玩到一起', optionD: '诚实可靠有责任心' },
      { text: '你们在一起后会查看对方手机吗？', dimension: 'communication', optionA: '完全信任，从不看', optionB: '偶尔借用时会看到', optionC: '偶尔会想看但忍住了', optionD: '会光明正大地看' },
      { text: '你理想中的恋爱时长是？', dimension: 'intimacy', optionA: '慢慢来，享受过程', optionB: '1-2年内结婚', optionC: '先同居试试看', optionD: '时机成熟就结婚' },
      { text: '当你们有重大决定时，通常谁做主？', dimension: 'conflict', optionA: '一起商量着决定', optionB: '谁更懂就听谁的', optionC: '男生做主的多', optionD: '有时候听他的有时候听我的' },
      { text: '你们的社交圈重合度高吗？', dimension: 'lifestyle', optionA: '共同朋友很多', optionB: '各有各的朋友，偶尔介绍', optionC: '几乎不重合但互不干涉', optionD: '一方完全融入另一方的圈子' },
      { text: '对方最让你受不了的习惯是？', dimension: 'conflict', optionA: '拖延症晚期', optionB: '爱抱怨负能量', optionC: '过于完美主义', optionD: '邋遢不爱收拾' },
      { text: '你们有考虑过分手吗？', dimension: 'intimacy', optionA: '从没想过', optionB: '偶尔气头上想过', optionC: '认真讨论过一次', optionD: '经常觉得不合适' },
      { text: '你们在一起后生活质量有变化吗？', dimension: 'lifestyle', optionA: '变好了，有人一起分担', optionB: '差不多，没什么变化', optionC: '变差了，开销大了', optionD: '看情况，有时好有时坏' },
      { text: '你父母对你们的关系怎么看？', dimension: 'values', optionA: '非常满意，催着结婚', optionB: '觉得还行，支持我们', optionC: '有点保留意见', optionD: '不太同意我们在一起' },
      { text: '你们吵架时会翻旧账吗？', dimension: 'conflict', optionA: '从不，就事论事', optionB: '偶尔会提一下', optionC: '经常翻，越吵越凶', optionD: '吵完和好后当没事发生' },
      { text: '你觉得自己在感情中更像是？', dimension: 'intimacy', optionA: '付出型，什么都想给他最好的', optionB: '索取型，希望被宠着', optionC: '独立型，保持平等关系', optionD: '依赖型，离开他会不习惯' }
    ];
    this.setData({ questions, currentQuestion: questions[0], progress: 0, history: [] });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const value = e.currentTarget.dataset.value;
    const { currentIndex, questions, scores, history, currentQuestion } = this.data;
    const dimension = currentQuestion.dimension;

    let newScores = { ...scores };
    newScores[dimension] = newScores[dimension] + value;

    const newHistory = [...history, { selectedOption: option, selectedValue: value, scores: newScores }];

    if (currentIndex < questions.length - 1) {
      this.setData({
        selectedOption: option,
        selectedValue: value,
        scores: newScores,
        history: newHistory,
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
        selectedValue: 0,
        progress: ((currentIndex + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScores);
    }
    wx.vibrateShort();
  },

  prevQuestion() {
    const { currentIndex, history, questions } = this.data;
    if (currentIndex === 0 || history.length === 0) return;

    const newHistory = [...history];
    const lastHistory = newHistory.pop();

    let newScores = { communication: 0, values: 0, lifestyle: 0, conflict: 0, intimacy: 0 };
    if (newHistory.length > 0) {
      newScores = newHistory[newHistory.length - 1].scores;
    }

    this.setData({
      currentIndex: currentIndex - 1,
      currentQuestion: questions[currentIndex - 1],
      selectedOption: lastHistory.selectedOption,
      selectedValue: lastHistory.selectedValue,
      scores: newScores,
      history: newHistory,
      progress: ((currentIndex - 1) / questions.length) * 100
    });
    wx.vibrateShort();
  },

  nextQuestion() {
    if (!this.data.selectedOption && this.data.currentIndex > 0) return;

    const { currentIndex, questions, selectedValue, scores, currentQuestion } = this.data;
    const dimension = currentQuestion.dimension;

    const newScores = { ...scores };
    newScores[dimension] = newScores[dimension] + selectedValue;

    if (currentIndex < questions.length - 1) {
      this.setData({
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
        selectedValue: 0,
        scores: newScores,
        progress: ((currentIndex + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScores);
    }
    wx.vibrateShort();
  },

  calculateResult(scores) {
    const totalScore = scores.communication + scores.values + scores.lifestyle + scores.conflict + scores.intimacy;
    const maxScore = 96;
    const basePercentage = Math.round((totalScore / maxScore) * 100);

    let resultKey;
    let analysis = {};

    if (basePercentage >= 85 && scores.intimacy >= 18 && scores.conflict >= 14) {
      resultKey = 'soulmate';
    } else if (basePercentage >= 80 && (scores.values >= 18 || scores.lifestyle >= 18)) {
      resultKey = 'powerCouple';
    } else if (scores.lifestyle >= 18 && scores.intimacy >= 16) {
      resultKey = 'sweetLove';
    } else if (scores.communication >= 16 && scores.conflict >= 14) {
      resultKey = 'buddyLovers';
    } else if (scores.values >= 16 && scores.intimacy >= 14) {
      resultKey = 'growthCouple';
    } else if (scores.lifestyle >= 16 && scores.conflict <= 10) {
      resultKey = 'adventurePartners';
    } else if (scores.conflict <= 10) {
      resultKey = 'homebodies';
    } else if (basePercentage >= 65) {
      resultKey = 'growthCouple';
    } else {
      resultKey = 'stormyLovers';
    }

    const dimensionDetails = [];
    for (const key in this.data.dimensionNames) {
      const dimScore = scores[key];
      const dimMax = 20;
      const percentage = Math.round((dimScore / dimMax) * 100);
      let level = '一般';
      if (percentage >= 80) level = '非常契合';
      else if (percentage >= 60) level = '较好';
      else if (percentage >= 40) level = '一般';
      else level = '需要加强';

      dimensionDetails.push({
        name: this.data.dimensionNames[key],
        score: dimScore,
        level: level,
        percentage: percentage
      });
    }

    const matchScore = Math.min(99, Math.max(52, basePercentage + Math.floor(Math.random() * 15)));

    this.setData({
      showResult: true,
      result: this.results[resultKey],
      matchScore: matchScore + '%',
      analysis: dimensionDetails,
      progress: 100
    });
  },

  restart() {
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      selectedValue: 0,
      scores: { communication: 0, values: 0, lifestyle: 0, conflict: 0, intimacy: 0 },
      showResult: false,
      result: {},
      matchScore: '',
      analysis: {},
      progress: 0,
      history: [],
      currentQuestion: this.data.questions[0]
    });
  }
})