Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: '',
    scores: { hetero: 0, homo: 0, bi: 0, pan: 0, ace: 0, gray: 0 },
    showResult: false,
    result: {},
    percentages: {},
    analysis: [],
    progress: 0,
    history: []
  },

  results: {
    hetero: {
      emoji: '💚',
      type: '异性恋',
      name: '经典型',
      description: '你主要被异性吸引。这是最常见的性取向之一，无论何时，真爱都值得被祝福。',
      tags: ['传统', '稳定', '浪漫'],
      color: '#4CAF50'
    },
    gay: {
      emoji: '💙',
      type: '同性恋',
      name: '勇敢型',
      description: '你主要被同性吸引。勇敢做自己，爱你所爱，你值得被尊重和珍惜。',
      tags: ['勇敢', '真实', '骄傲'],
      color: '#2196F3'
    },
    lesbian: {
      emoji: '💜',
      type: '女同性恋',
      name: '绽放型',
      description: '你主要被女性吸引。每个爱情故事都是独特的，你正在书写属于自己的篇章。',
      tags: ['温柔', '坚定', '绽放'],
      color: '#9C27B0'
    },
    bi: {
      emoji: '💛',
      type: '双性恋',
      name: '兼容并蓄型',
      description: '你可能被一种以上性别的人吸引。你的心像万花筒，能欣赏不同性别的美好。',
      tags: ['包容', '多元', '开放'],
      color: '#FFEB3B'
    },
    pan: {
      emoji: '🧡',
      type: '泛性恋',
      name: '心灵相通型',
      description: '你更看重人的内在而非性别。对你来说，性格和灵魂契合才是最重要的。',
      tags: ['超越', '深情', '通透'],
      color: '#FF9800'
    },
    ace: {
      emoji: '🤍',
      type: '无性恋',
      name: '精神共鸣型',
      description: '你对他人的吸引力不主要体现在外貌或性吸引上。精神层面的连接对你来说更重要。',
      tags: ['纯粹', '深邃', '独特'],
      color: '#9E9E9E'
    },
    grayAce: {
      emoji: '💭',
      type: '灰色无性恋',
      name: '流动型',
      description: '你的性取向处于一种流动状态，可能在某些情况下会感受到吸引力，但不是常态。',
      tags: ['流动', '探索', '真实'],
      color: '#607D8B'
    },
    demi: {
      emoji: '💫',
      type: '半性恋',
      name: '深度连接型',
      description: '你只会在与某人建立深厚的情感联系后，才会感受到性吸引力。感情到了，一切自然发生。',
      tags: ['深情', '慎重', '专一'],
      color: '#00BCD4'
    },
    queer: {
      emoji: '🏳️‍🌈',
      type: '酷儿',
      name: '自由型',
      description: '你不完全符合传统性取向分类。拒绝被定义本身就是一种态度，你就是独一无二的你。',
      tags: ['自由', '反叛', '独特'],
      color: '#E91E63'
    },
    questioning: {
      emoji: '❓',
      type: '探索中',
      name: '疑问型',
      description: '你正在探索自己的性取向。这完全正常！自我探索是一段美好的旅程。',
      tags: ['好奇', '探索', '开放'],
      color: '#795548'
    }
  },

  onLoad() {
    this.initQuestions();
  },

  initQuestions() {
    const questions = [
      { text: '当你看到吸引人的人时，你的第一反应是？', dimension: 'attraction', optionA: '会注意到异性', optionB: '会注意到同性', optionC: '无论性别，好看就会注意', optionD: '很少注意到外观' },
      { text: '你对浪漫小说的偏好是？', dimension: 'fantasy', optionA: '男女主的爱情故事', optionB: '男男或女女的爱情故事', optionC: '各种类型都会看', optionD: '不太看这类内容' },
      { text: '如果可以，你会希望和谁约会？', dimension: 'desire', optionA: '异性', optionB: '同性', optionC: '都有可能，看感觉', optionD: '对约会没什么兴趣' },
      { text: '你更容易对什么产生好感？', dimension: 'attraction', optionA: '异性的外表和气质', optionB: '同性的外表和气质', optionC: '人的性格魅力，不限性别', optionD: '很难对人产生好感' },
      { text: '看到帅哥/美女，你会？', dimension: 'reaction', optionA: '欣赏异性，觉得好看', optionB: '也会欣赏同性，觉得好看', optionC: '会觉得好看，不限性别', optionD: '没什么特别反应' },
      { text: '你有过暗恋的经历吗？对象是？', dimension: 'experience', optionA: '暗恋过异性', optionB: '暗恋过同性', optionC: '暗恋过不同性别的人', optionD: '没有暗恋过任何人' },
      { text: '你觉得理想的伴侣关系最重要的是？', dimension: 'value', optionA: '性别带来的传统稳定感', optionB: '突破传统的勇气和默契', optionC: '灵魂契合，性别不重要', optionD: '精神层面的深度连接' },
      { text: '你更容易被什么所吸引？', dimension: 'attraction', optionA: '异性的外貌特征', optionB: '同性的外貌特征', optionC: '一个人的整体魅力', optionD: '很难被外貌吸引' },
      { text: '你的梦境中，出现过什么类型的浪漫场景？', dimension: 'dream', optionA: '和异性的浪漫场景', optionB: '和同性的浪漫场景', optionC: '不同性别的都有', optionD: '很少做这种梦' },
      { text: '当朋友谈论crush时，你通常会？', dimension: 'social', optionA: '想到某个异性', optionB: '想到某个同性', optionC: '看情况，不限性别', optionD: '不太关注这些' },
      { text: '你觉得性在你的人生中扮演什么角色？', dimension: 'sex', optionA: '是亲密关系的重要组成部分', optionB: '比较重要', optionC: '不是最重要的', optionD: '可有可无或不太重要' },
      { text: '你对"性别只是一个标签"这句话怎么看？', dimension: 'view', optionA: '不太认同，性别很重要', optionB: '部分认同', optionC: '很认同，性别不该限制爱', optionD: '没想过这个问题' },
      { text: '你更喜欢什么类型的故事结局？', dimension: 'preference', optionA: '男女主角在一起', optionB: '突破传统的有情人在一起', optionC: '真心相爱就该在一起', optionD: '有没有伴侣都很好' },
      { text: '如果朋友向你出柜，你会？', dimension: 'attitude', optionA: '支持但保持自己的看法', optionB: '完全支持', optionC: '觉得这很正常', optionD: '不太理解但尊重' },
      { text: '你觉得自己容易被什么类型的人吸引？', dimension: 'attraction', optionA: '某种特定性别的人', optionB: '某种气质，不限性别', optionC: '主要是内在性格', optionD: '不太确定' },
      { text: '你对柏拉图式恋爱（精神恋爱）的看法是？', dimension: 'relationship', optionA: '不太现实', optionB: '可以理解', optionC: '很美好，值得追求', optionD: '那就是我理想中的恋爱' },
      { text: '你认为自己的性取向是？', dimension: 'identity', optionA: '明确的异性恋', optionB: '明确的同性恋', optionC: '还在探索中', optionD: '不需要被定义' },
      { text: '你更喜欢和什么样的人聊天？', dimension: 'social', optionA: '异性', optionB: '同性', optionC: '看性格，不限性别', optionD: '无所谓，聊得来就行' },
      { text: '在成长过程中，你对同性有过好感吗？', dimension: 'experience', optionA: '从来没有', optionB: '有过一两 次', optionC: '有过好几次', optionD: '这个问题很难回答' },
      { text: '你对"爱超越性别"这句话的感受是？', dimension: 'view', optionA: '不太能理解', optionB: '有一定道理', optionC: '非常认同', optionD: '爱就是爱，不该被定义' },
      { text: '如果你发现自己喜欢上了同性，你会？', dimension: 'reaction', optionA: '感到困惑和不安', optionB: '接受这是可能的', optionC: '坦然接受', optionD: '不需要想这么多' },
      { text: '你觉得自己对人的吸引力感受是？', dimension: 'attraction', optionA: '主要针对异性', optionB: '主要针对同性', optionC: '男女都有可能', optionD: '很难说清楚' },
      { text: '在幻想中，你理想化的亲密关系是？', dimension: 'fantasy', optionA: '和异性在一起的画面', optionB: '和同性在一起的画面', optionC: '两种画面都有过', optionD: '很少有这样的幻想' },
      { text: '你觉得自己在性方面最重要的是？', dimension: 'sex', optionA: '和爱的人发生亲密关系', optionB: '性是爱的一部分', optionC: '精神连接比性更重要', optionD: '性不是必需品' }
    ];
    this.setData({ questions, currentQuestion: questions[0], progress: 0, history: [] });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, scores, history } = this.data;
    const question = questions[currentIndex];

    const newScores = { ...scores };
    const optionToScore = { A: 0, B: 1, C: 2, D: 3 };
    const scoreIndex = optionToScore[option];

    if (question.dimension === 'attraction') {
      if (scoreIndex === 0) newScores.hetero += 2;
      else if (scoreIndex === 1) newScores.homo += 2;
      else if (scoreIndex === 2) newScores.bi += 2;
      else newScores.ace += 2;
    } else if (question.dimension === 'fantasy') {
      if (scoreIndex === 0) newScores.hetero += 2;
      else if (scoreIndex === 1) newScores.homo += 2;
      else if (scoreIndex === 2) newScores.pan += 2;
      else newScores.ace += 1;
    } else if (question.dimension === 'dream' || question.dimension === 'experience') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.bi += 2;
      else newScores.grayAce += 1;
    } else if (question.dimension === 'sex') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.demi += 1;
      else newScores.ace += 2;
    } else if (question.dimension === 'value' || question.dimension === 'view' || question.dimension === 'identity') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.queer += 1;
      else if (scoreIndex === 2) newScores.pan += 2;
      else newScores.questioning += 1;
    } else if (question.dimension === 'reaction' || question.dimension === 'desire') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.bi += 1;
      else newScores.ace += 1;
    } else if (question.dimension === 'social') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.pan += 1;
      else newScores.grayAce += 1;
    } else if (question.dimension === 'relationship') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.bi += 1;
      else if (scoreIndex === 2) newScores.demi += 1;
      else newScores.ace += 2;
    } else if (question.dimension === 'attitude') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.queer += 1;
      else if (scoreIndex === 2) newScores.pan += 1;
      else newScores.grayAce += 1;
    } else {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.bi += 1;
      else newScores.ace += 1;
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

    let newScores = { hetero: 0, homo: 0, bi: 0, pan: 0, ace: 0, grayAce: 0 };
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

    const newScores = { ...scores };
    const optionToScore = { A: 0, B: 1, C: 2, D: 3 };
    const scoreIndex = optionToScore[selectedOption];

    if (question.dimension === 'attraction') {
      if (scoreIndex === 0) newScores.hetero += 2;
      else if (scoreIndex === 1) newScores.homo += 2;
      else if (scoreIndex === 2) newScores.bi += 2;
      else newScores.ace += 2;
    } else if (question.dimension === 'fantasy') {
      if (scoreIndex === 0) newScores.hetero += 2;
      else if (scoreIndex === 1) newScores.homo += 2;
      else if (scoreIndex === 2) newScores.pan += 2;
      else newScores.ace += 1;
    } else if (question.dimension === 'dream' || question.dimension === 'experience') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.bi += 2;
      else newScores.grayAce += 1;
    } else if (question.dimension === 'sex') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.demi += 1;
      else newScores.ace += 2;
    } else if (question.dimension === 'value' || question.dimension === 'view' || question.dimension === 'identity') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.queer += 1;
      else if (scoreIndex === 2) newScores.pan += 2;
      else newScores.questioning += 1;
    } else if (question.dimension === 'reaction' || question.dimension === 'desire') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.bi += 1;
      else newScores.ace += 1;
    } else if (question.dimension === 'social') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.pan += 1;
      else newScores.grayAce += 1;
    } else if (question.dimension === 'relationship') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.bi += 1;
      else if (scoreIndex === 2) newScores.demi += 1;
      else newScores.ace += 2;
    } else if (question.dimension === 'attitude') {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.queer += 1;
      else if (scoreIndex === 2) newScores.pan += 1;
      else newScores.grayAce += 1;
    } else {
      if (scoreIndex === 0) newScores.hetero += 1;
      else if (scoreIndex === 1) newScores.homo += 1;
      else if (scoreIndex === 2) newScores.bi += 1;
      else newScores.ace += 1;
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
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const percentages = {};
    const sortedResults = [];

    for (const key in scores) {
      percentages[key] = Math.round((scores[key] / total) * 100);
      sortedResults.push({ key, score: scores[key], percent: percentages[key] });
    }

    sortedResults.sort((a, b) => b.score - a.score);

    let resultKey = sortedResults[0].key;
    const topScore = sortedResults[0].score;
    const secondScore = sortedResults[1].score;

    if (topScore - secondScore <= 2 && topScore <= 8) {
      resultKey = 'questioning';
    }

    const analysisData = [
      { name: '浪漫吸引', items: ['hetero', 'homo', 'bi', 'pan'], key: this.getHighestKey(['hetero', 'homo', 'bi', 'pan'], scores) },
      { name: '性吸引', items: ['ace', 'grayAce', 'demi'], key: this.getHighestKey(['ace', 'grayAce', 'demi'], scores) },
      { name: '身份认同', items: ['queer', 'questioning'], key: this.getHighestKey(['queer', 'questioning'], scores) }
    ];

    this.setData({
      showResult: true,
      result: this.results[resultKey],
      percentages: percentages,
      analysis: analysisData,
      progress: 100
    });
  },

  getHighestKey(keys, scores) {
    let highest = keys[0];
    for (const key of keys) {
      if (scores[key] > scores[highest]) {
        highest = key;
      }
    }
    return highest;
  },

  restart() {
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      scores: { hetero: 0, homo: 0, bi: 0, pan: 0, ace: 0, grayAce: 0 },
      showResult: false,
      result: {},
      percentages: {},
      analysis: [],
      progress: 0,
      history: [],
      currentQuestion: this.data.questions[0]
    });
  }
})