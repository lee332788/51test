Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: '',
    scores: { S: 0, B: 0, T: 0, I: 0 },
    showResult: false,
    result: {},
    progress: 0,
    history: []
  },

  results: {
    'ST': { emoji: '🙏', name: '感恩者', description: '你是一个懂得感恩的人，对生活中的美好心怀感激。你温柔善良，善于发现身边的幸福。', tags: ['感恩', '善良', '知足', '温暖'] },
    'SI': { emoji: '🐒', name: '吗喽', description: '你是朋友圈中的开心果，幽默风趣，善于自嘲和调侃。你用乐观的态度面对生活的苦与乐。', tags: ['幽默', '乐观', '自嘲', '接地气'] },
    'BT': { emoji: '😈', name: '愤世者', description: '你有着独特的洞察力，看问题深刻而犀利。你不随波逐流，有着自己的原则和立场。', tags: ['独立', '犀利', '深刻', '有原则'] },
    'BI': { emoji: '🦋', name: '梦想家', description: '你心中有星辰大海，富有想象力和创造力。你不满足于现实，总在追寻更美好的世界。', tags: ['理想主义', '创意', '浪漫', '追求'] },
    'ST2': { emoji: '🛡️', name: '守护者', description: '你责任感强，重视承诺，总是想保护和帮助身边的人。你是朋友眼中的可靠后盾。', tags: ['责任', '可靠', '守护', '担当'] },
    'SI2': { emoji: '🎭', name: '戏精', description: '你情感丰富，善于表达，生活中总是充满戏剧性。你用热情感染着周围的每一个人。', tags: ['戏剧性', '热情', '表达力', '感染力'] },
    'BT2': { emoji: '🔥', name: '燃烧者', description: '你充满激情，做事全力以赴。你不甘平庸，总是在追求卓越和突破。', tags: ['激情', '上进', '不服输', '行动派'] },
    'BI2': { emoji: '🌈', name: '彩虹族', description: '你乐观向上，相信风雨后必有彩虹。你善于调节气氛，给身边人带来正能量。', tags: ['乐观', '正能量', '调节气氛', '希望'] },
    'ST3': { emoji: '📚', name: '博学者', description: '你热爱学习，求知欲强。你享受沉浸在知识海洋中的感觉，不断充实自己。', tags: ['好学', '求知欲', '深思', '积累'] },
    'SI3': { emoji: '🎨', name: '艺术家', description: '你有一双发现美的眼睛，审美独特。你用创造力和想象力装点这个世界。', tags: ['审美', '创造力', '独特', '美感'] },
    'BT3': { emoji: '⚔️', name: '战士', description: '你勇敢无畏，敢于面对困难和挑战。你相信只有经历风雨才能见到彩虹。', tags: ['勇敢', '坚强', '不服输', '战斗'] },
    'BI3': { emoji: '💫', name: '追光者', description: '你永远在追逐光的路上，积极向上。你相信美好终将到来，保持着对生活的热爱。', tags: ['积极', '阳光', '追梦', '向上'] }
  },

  onLoad() {
    this.initQuestions();
  },

  initQuestions() {
    const questions = [
      { text: '当别人帮助你时，你的反应通常是：', dimension: 'SB', optionA: '真诚地道谢，记在心里', optionB: '想着如何回报对方' },
      { text: '在朋友圈里，你经常扮演的角色是：', dimension: 'SB', optionA: '倾听者，默默陪伴', optionB: '气氛制造者，活跃气氛' },
      { text: '你更认同哪种人生态度：', dimension: 'SB', optionA: '知足常乐，珍惜当下', optionB: '永不满足，追求更多' },
      { text: '面对他人的批评，你会：', dimension: 'SB', optionA: '虚心接受，反思自己', optionB: '先反驳，再思考是否合理' },
      { text: '你更喜欢什么样的社交方式：', dimension: 'SB', optionA: '三两知己，深入交流', optionB: '一大群人，热热闹闹' },
      { text: '当看到别人成功时，你通常会：', dimension: 'SB', optionA: '真心祝福，学习经验', optionB: '有点嫉妒，想迎头赶上' },
      { text: '你对"吗喽"这个网络用语的态度：', dimension: 'SB', optionA: '自嘲可以，认清现实挺好', optionB: '有点丧，不太喜欢这种说法' },
      { text: '遇到挫折时，你更倾向于：', dimension: 'SB', optionA: '自己消化，默默承受', optionB: '找人倾诉，释放情绪' },
      { text: '你更看重生活中的：', dimension: 'SB', optionA: '安稳感和确定性', optionB: '新鲜感和刺激感' },
      { text: '对未来的规划，你更偏向于：', dimension: 'SB', optionA: '稳扎稳打，一步步来', optionB: '敢于冒险，追逐梦想' },
      { text: '当你听到一个社会事件时，你会：', dimension: 'TI', optionA: '理性分析，关注真相', optionB: '感性共鸣，情绪激动' },
      { text: '你做决定时更依赖：', dimension: 'TI', optionA: '逻辑和事实依据', optionB: '直觉和内心感受' },
      { text: '你认为什么是成熟的表现：', dimension: 'TI', optionA: '能够控制情绪，理性思考', optionB: '能够真实表达自己的情感' },
      { text: '当朋友向你倾诉烦恼时，你通常会：', dimension: 'TI', optionA: '分析问题，给出建议', optionB: '先安慰，再慢慢开导' },
      { text: '你更愿意为什么付出努力：', dimension: 'TI', optionA: '有实际价值和意义的事', optionB: '让自己和他人的情感得到满足' },
      { text: '面对复杂问题时，你的处理方式是：', dimension: 'TI', optionA: '拆解分析，一步一步解决', optionB: '凭感觉走，先干了再说' },
      { text: '你更喜欢的工作环境是：', dimension: 'TI', optionA: '安静有序，规则明确', optionB: '自由开放，充满可能' },
      { text: '你判断一件事好坏的标准更倾向于：', dimension: 'TI', optionA: '客观标准和实际效果', optionB: '个人价值观和情感体验' },
      { text: '当你在公开场合发表观点时，你更在意：', dimension: 'TI', optionA: '观点是否有理有据', optionB: '是否能引起共鸣' },
      { text: '你觉得自己更像是：', dimension: 'TI', optionA: '冷眼旁观者', optionB: '热情参与者' },
      { text: '对于规则和制度，你的态度是：', dimension: 'TI', optionA: '尊重规则，维持秩序', optionB: '质疑规则，追求变革' },
      { text: '你更欣赏的品质是：', dimension: 'TI', optionA: '理性、冷静、有原则', optionB: '热情、善良、有同理心' },
      { text: '当看到社会不公时，你的反应会是：', dimension: 'TI', optionA: '理性思考解决方案', optionB: '感到愤怒，想改变现状' },
      { text: '你更喜欢什么样的内容：', dimension: 'TI', optionA: '有深度、能引发思考的', optionB: '轻松有趣、能放松心情的' },
      { text: '面对失败，你通常会：', dimension: 'TI', optionA: '总结教训，避免再犯', optionB: '调整心态，继续前行' },
      { text: '你认为最重要的品质是：', dimension: 'TI', optionA: '独立思考和判断能力', optionB: '与人为善和共情能力' },
      { text: '你更愿意为什么而奋斗：', dimension: 'TI', optionA: '个人成就和自我实现', optionB: '他人幸福和社会进步' },
      { text: '当别人和你意见不合时，你会：', dimension: 'TI', optionA: '坚持自己，说服对方', optionB: '尊重差异，保留意见' },
      { text: '你觉得自己更偏向：', dimension: 'TI', optionA: '愤世嫉俗，看透一切', optionB: '赤子之心，永远热忱' },
      { text: '对于"躺平"这种生活方式，你的看法是：', dimension: 'TI', optionA: '理解，但自己不会选择', optionB: '不认同，生命在于奋斗' },
      { text: '你更希望自己的人生是：', dimension: 'TI', optionA: '一部深刻的哲学著作', optionB: '一首热烈的诗歌' }
    ];
    this.setData({ questions, currentQuestion: questions[0], progress: 0, history: [] });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, scores, history } = this.data;
    const question = questions[currentIndex];
    const dimension = question.dimension;

    let newScores = { ...scores };
    if (option === 'A') {
      newScores[dimension[0]]++;
    } else {
      newScores[dimension[1]]++;
    }

    const newHistory = [...history, { selectedOption: option, scores: newScores }];

    if (currentIndex < questions.length - 1) {
      this.setData({
        selectedOption: option,
        scores: newScores,
        history: newHistory,
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
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

    let newScores = { S: 0, B: 0, T: 0, I: 0 };
    if (newHistory.length > 0) {
      newScores = newHistory[newHistory.length - 1].scores;
    }

    this.setData({
      currentIndex: currentIndex - 1,
      currentQuestion: questions[currentIndex - 1],
      selectedOption: lastHistory.selectedOption,
      scores: newScores,
      history: newHistory,
      progress: ((currentIndex - 1) / questions.length) * 100
    });
    wx.vibrateShort();
  },

  nextQuestion() {
    if (!this.data.selectedOption && this.data.currentIndex > 0) return;

    const { currentIndex, questions, selectedOption, scores } = this.data;
    const question = questions[currentIndex];
    const dimension = question.dimension;

    const newScores = { ...scores };
    if (selectedOption === 'A') {
      newScores[dimension[0]]++;
    } else {
      newScores[dimension[1]]++;
    }

    if (currentIndex < questions.length - 1) {
      this.setData({
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
        scores: newScores,
        progress: ((currentIndex + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScores);
    }
    wx.vibrateShort();
  },

  calculateResult(scores) {
    let type;
    const totalS = scores.S;
    const totalB = scores.B;
    const totalT = scores.T;
    const totalI = scores.I;

    if (totalS >= totalB && totalT >= totalI) {
      type = 'ST';
    } else if (totalS >= totalB && totalI >= totalT) {
      type = 'SI';
    } else if (totalB >= totalS && totalT >= totalI) {
      type = 'BT';
    } else if (totalB >= totalS && totalI >= totalT) {
      type = 'BI';
    } else if (totalS >= totalB + 5) {
      type = totalT >= totalI ? 'ST2' : 'SI2';
    } else if (totalB >= totalS + 5) {
      type = totalT >= totalI ? 'BT2' : 'BI2';
    } else if (totalT >= totalI + 5) {
      type = totalS >= totalB ? 'ST3' : 'BT3';
    } else {
      type = totalS >= totalB ? 'SI3' : 'BI3';
    }

    this.setData({
      showResult: true,
      result: { type, ...this.results[type] },
      progress: 100
    });
  },

  restart() {
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      scores: { S: 0, B: 0, T: 0, I: 0 },
      showResult: false,
      result: {},
      progress: 0,
      history: [],
      currentQuestion: this.data.questions[0]
    });
  }
})
