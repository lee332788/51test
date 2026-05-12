Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: '',
    scores: { beijing: 0, shanghai: 0, hangzhou: 0, chengdu: 0, shenzhen: 0, xian: 0 },
    showResult: false,
    result: {},
    progress: 0,
    history: []
  },

  results: {
    beijing: { city: '北京', icon: '🏛️', name: '古都现代融合', description: '你既有传统底蕴又有现代追求，北京的历史厚重与创新活力最适合你。', tags: ['大气', '包容', '有理想'] },
    shanghai: { city: '上海', icon: '🌆', name: '时尚都市达人', description: '你追求精致生活，热爱时尚与繁华，上海的摩登气质与你完美契合。', tags: ['精致', '时尚', '国际化'] },
    hangzhou: { city: '杭州', icon: '🌿', name: '诗意栖居者', description: '你向往诗意与宁静，杭州的山水画卷与人文气息正是你的心之所向。', tags: ['优雅', '诗意', '自然'] },
    chengdu: { city: '成都', icon: '🐼', name: '乐享生活家', description: '你懂得享受生活，乐观随性，成都的慢节奏与烟火气最适合你。', tags: ['安逸', '乐观', '美食家'] },
    shenzhen: { city: '深圳', icon: '🚀', name: '创新开拓者', description: '你充满活力与闯劲，深圳的创新氛围与拼搏精神与你完美匹配。', tags: ['创新', '活力', '敢闯'] },
    xian: { city: '西安', icon: '🏺', name: '历史传承者', description: '你热爱历史与文化，西安的千年底蕴与古风魅力深深吸引着你。', tags: ['怀旧', '文化', '有底蕴'] }
  },

  onLoad() {
    this.initQuestions();
  },

  initQuestions() {
    const questions = [
      { text: '你更喜欢哪种气候？', optionA: '四季分明，秋高气爽', optionB: '温和湿润，四季常青', optionC: '阳光充足，温暖舒适', scores: { A: 'beijing,xian', B: 'hangzhou,chengdu', C: 'shenzhen,shanghai' } },
      { text: '周末你更倾向于：', optionA: '看展、逛博物馆', optionB: '逛街、品尝美食', optionC: '公园散步、亲近自然', optionD: '咖啡馆发呆、看书', scores: { A: 'beijing,xian', B: 'chengdu,shanghai', C: 'hangzhou,shenzhen', D: 'hangzhou,chengdu' } },
      { text: '你对生活节奏的偏好是：', optionA: '快节奏，充实有活力', optionB: '慢节奏，悠闲自在', optionC: '适中，张弛有度', scores: { A: 'shenzhen,shanghai', B: 'chengdu,hangzhou', C: 'beijing,xian' } },
      { text: '你更看重城市的：', optionA: '历史文化底蕴', optionB: '经济发展机会', optionC: '自然环境宜居', scores: { A: 'beijing,xian', B: 'shanghai,shenzhen', C: 'hangzhou,chengdu' } },
      { text: '你喜欢的饮食风格是：', optionA: '丰盛大气，口味多元', optionB: '精致细腻，讲究格调', optionC: '麻辣鲜香，无辣不欢', optionD: '清淡鲜美，注重原味', scores: { A: 'beijing,xian', B: 'shanghai,shenzhen', C: 'chengdu', D: 'hangzhou' } },
      { text: '你理想的居住环境是：', optionA: '高楼林立，都市繁华', optionB: '古城风韵，文化浓厚', optionC: '山水相依，风景如画', scores: { A: 'shanghai,shenzhen', B: 'beijing,xian', C: 'hangzhou,chengdu' } }
    ];
    this.setData({ questions, currentQuestion: questions[0], progress: 0, history: [] });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, scores, history } = this.data;
    const question = questions[currentIndex];

    const newScores = { ...scores };
    const targetCities = question.scores[option].split(',');
    targetCities.forEach(city => {
      newScores[city]++;
    });

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

    let newScores = { beijing: 0, shanghai: 0, hangzhou: 0, chengdu: 0, shenzhen: 0, xian: 0 };
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
    const targetCities = question.scores[selectedOption].split(',');
    targetCities.forEach(city => {
      newScores[city]++;
    });

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
    let maxScore = 0;
    let resultCity = 'beijing';
    
    Object.keys(scores).forEach(city => {
      if (scores[city] > maxScore) {
        maxScore = scores[city];
        resultCity = city;
      }
    });

    this.setData({
      showResult: true,
      result: this.results[resultCity],
      progress: 100
    });
  },

  restart() {
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      scores: { beijing: 0, shanghai: 0, hangzhou: 0, chengdu: 0, shenzhen: 0, xian: 0 },
      showResult: false,
      result: {},
      progress: 0,
      history: [],
      currentQuestion: this.data.questions[0]
    });
  }
})