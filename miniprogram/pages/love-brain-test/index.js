Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: '',
    score: 0,
    showResult: false,
    result: {},
    progress: 0,
    history: []
  },

  results: {
    0: { emoji: '🧠', type: '理性王者', name: '恋爱脑绝缘体', description: '你在感情中非常理性，不会被爱情冲昏头脑。你懂得保护自己，始终保持独立思考。', tags: ['清醒', '独立', '理智'] },
    1: { emoji: '⚖️', type: '平衡达人', name: '理性恋爱派', description: '你能在感情和理智之间找到平衡，既会投入感情，也能保持自我。', tags: ['平衡', '成熟', '睿智'] },
    2: { emoji: '💕', type: '甜蜜恋人', name: '轻度恋爱脑', description: '你会为爱情付出，但还保有底线。你重视感情，但不会失去自我。', tags: ['浪漫', '真诚', '有原则'] },
    3: { emoji: '💘', type: '爱情至上', name: '中度恋爱脑', description: '爱情在你心中占据重要位置，你愿意为对方付出很多，容易被感情影响。', tags: ['深情', '专一', '投入'] },
    4: { emoji: '🔥', type: '为爱疯狂', name: '重度恋爱脑', description: '你把爱情视为生命的全部，愿意为爱付出一切。建议保持独立空间哦！', tags: ['热烈', '执着', '深情'] }
  },

  onLoad() {
    this.initQuestions();
  },

  initQuestions() {
    const questions = [
      { text: '看到喜欢的人和异性聊天，你会？', optionA: '很生气，直接质问', optionB: '有点吃醋，但不会表现', optionC: '觉得正常，给对方空间', scoreA: 3, scoreB: 2, scoreC: 0 },
      { text: '对方说想你了，你会？', optionA: '立刻放下手头的事去找Ta', optionB: '安排好时间后去找Ta', optionC: '忙完自己的事再说', scoreA: 3, scoreB: 2, scoreC: 0 },
      { text: '吵架后，你会？', optionA: '不管对错，先道歉求和', optionB: '冷静后好好沟通', optionC: '等对方先低头', scoreA: 3, scoreB: 1, scoreC: 0 },
      { text: '朋友约你，但是对方不想让你去，你会？', optionA: '果断推掉朋友的约会', optionB: '和对方商量折中的办法', optionC: '还是会去赴约', scoreA: 3, scoreB: 1, scoreC: 0 },
      { text: '对方忘记重要节日，你会？', optionA: '特别伤心，觉得对方不爱自己了', optionB: '有点失望，提醒对方', optionC: '理解对方，下次一起过', scoreA: 3, scoreB: 2, scoreC: 0 },
      { text: '你会为了对方改变自己的原则吗？', optionA: '会，爱Ta就愿意改变', optionB: '看情况，原则性问题不会', optionC: '不会，坚持自我', scoreA: 3, scoreB: 1, scoreC: 0 },
      { text: '你会经常查对方的手机吗？', optionA: '经常查，想知道Ta的一切', optionB: '偶尔看，但不会刻意', optionC: '不会，给对方空间', scoreA: 3, scoreB: 1, scoreC: 0 },
      { text: '你的未来规划里，对方占多少？', optionA: '全部，我的未来必须有Ta', optionB: '大部分，但也有自己的计划', optionC: '一半一半，各自独立', scoreA: 3, scoreB: 2, scoreC: 1 }
    ];
    this.setData({ questions, currentQuestion: questions[0], progress: 0, history: [] });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, score, history } = this.data;
    const question = questions[currentIndex];

    let newScore = score;
    if (option === 'A') {
      newScore += question.scoreA;
    } else if (option === 'B') {
      newScore += question.scoreB;
    } else {
      newScore += question.scoreC;
    }

    const newHistory = [...history, { selectedOption: option, score: newScore }];

    if (currentIndex < questions.length - 1) {
      this.setData({
        selectedOption: option,
        score: newScore,
        history: newHistory,
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
        progress: ((currentIndex + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScore);
    }
    wx.vibrateShort();
  },

  prevQuestion() {
    const { currentIndex, history, questions } = this.data;
    if (currentIndex === 0 || history.length === 0) return;

    const newHistory = [...history];
    const lastHistory = newHistory.pop();

    let newScore = 0;
    if (newHistory.length > 0) {
      newScore = newHistory[newHistory.length - 1].score;
    }

    this.setData({
      currentIndex: currentIndex - 1,
      currentQuestion: questions[currentIndex - 1],
      selectedOption: lastHistory.selectedOption,
      score: newScore,
      history: newHistory,
      progress: ((currentIndex - 1) / questions.length) * 100
    });
    wx.vibrateShort();
  },

  nextQuestion() {
    if (!this.data.selectedOption && this.data.currentIndex > 0) return;

    const { currentIndex, questions, selectedOption, score } = this.data;
    const question = questions[currentIndex];

    let newScore = score;
    if (selectedOption === 'A') {
      newScore += question.scoreA;
    } else if (selectedOption === 'B') {
      newScore += question.scoreB;
    } else {
      newScore += question.scoreC;
    }

    if (currentIndex < questions.length - 1) {
      this.setData({
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
        score: newScore,
        progress: ((currentIndex + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScore);
    }
    wx.vibrateShort();
  },

  calculateResult(score) {
    let resultKey;
    if (score <= 5) {
      resultKey = 0;
    } else if (score <= 10) {
      resultKey = 1;
    } else if (score <= 15) {
      resultKey = 2;
    } else if (score <= 20) {
      resultKey = 3;
    } else {
      resultKey = 4;
    }

    this.setData({
      showResult: true,
      result: this.results[resultKey],
      progress: 100
    });
  },

  restart() {
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      score: 0,
      showResult: false,
      result: {},
      progress: 0,
      history: [],
      currentQuestion: this.data.questions[0]
    });
  }
})
