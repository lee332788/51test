Page({
  data: {
    preference: '',
    questions: [],
    currentIndex: 0,
    currentQuestion: {},
    selectedOption: '',
    answers: [],
    progress: 0,
    dimensionScores: {
      boundary: 0,
      judgment: 0,
      action: 0,
      relationship: 0,
      stability: 0
    }
  },

  dimensions: ['boundary', 'judgment', 'action', 'relationship', 'stability'],

  onLoad(options) {
    this.setData({ preference: options.preference || 'random' });
    this.initQuestions();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  initQuestions() {
    const questions = [
      {
        text: '在团队合作中，你通常扮演什么角色？',
        optionA: '领导者，统筹全局',
        optionB: '协调者，促进沟通',
        optionC: '执行者，完成任务',
        optionD: '观察者，提供建议',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 2 },
        scoreB: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 4, relationship: 2, stability: 4 },
        scoreD: { boundary: 3, judgment: 4, action: 1, relationship: 3, stability: 3 }
      },
      {
        text: '面对困难决策时，你更倾向于？',
        optionA: '果断做出决定',
        optionB: '权衡利弊后决定',
        optionC: '听取多方意见',
        optionD: '等待更多信息',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 1, stability: 2 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 2, stability: 3 },
        scoreC: { boundary: 2, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 1, relationship: 2, stability: 4 }
      },
      {
        text: '当你设定目标时，你通常？',
        optionA: '设定高远目标并努力实现',
        optionB: '设定实际可行的目标',
        optionC: '边做边调整目标',
        optionD: '不设定具体目标',
        scoreA: { boundary: 3, judgment: 3, action: 4, relationship: 2, stability: 2 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 2, stability: 4 },
        scoreC: { boundary: 2, judgment: 3, action: 3, relationship: 3, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 2, relationship: 3, stability: 3 }
      },
      {
        text: '处理冲突时，你的第一反应是？',
        optionA: '直接面对并解决',
        optionB: '冷静分析原因',
        optionC: '寻求第三方帮助',
        optionD: '暂时回避',
        scoreA: { boundary: 4, judgment: 2, action: 4, relationship: 2, stability: 2 },
        scoreB: { boundary: 3, judgment: 4, action: 2, relationship: 3, stability: 3 },
        scoreC: { boundary: 2, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 1, relationship: 2, stability: 4 }
      },
      {
        text: '你更看重工作中的什么？',
        optionA: '个人成就和突破',
        optionB: '稳定和安全',
        optionC: '良好的人际关系',
        optionD: '创造性和自由',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 1, stability: 1 },
        scoreB: { boundary: 3, judgment: 3, action: 2, relationship: 2, stability: 4 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 3, judgment: 2, action: 3, relationship: 2, stability: 2 }
      },
      {
        text: '当别人对你期望很高时，你会？',
        optionA: '努力达到甚至超越期望',
        optionB: '坦诚说明自己的极限',
        optionC: '寻求支持和建议',
        optionD: '感到压力想要逃避',
        scoreA: { boundary: 3, judgment: 3, action: 4, relationship: 3, stability: 2 },
        scoreB: { boundary: 4, judgment: 4, action: 2, relationship: 2, stability: 3 },
        scoreC: { boundary: 2, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 1, judgment: 2, action: 1, relationship: 2, stability: 2 }
      },
      {
        text: '你如何处理规则与情理的冲突？',
        optionA: '坚持规则，规则至上',
        optionB: '具体情况具体分析',
        optionC: '优先考虑人情',
        optionD: '左右为难',
        scoreA: { boundary: 4, judgment: 4, action: 3, relationship: 1, stability: 3 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 3 },
        scoreC: { boundary: 1, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 1, relationship: 3, stability: 2 }
      },
      {
        text: '在陌生环境中，你通常会？',
        optionA: '主动探索新领域',
        optionB: '观察一段时间再行动',
        optionC: '依靠当地人的指导',
        optionD: '等待他人先行动',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 1 },
        scoreB: { boundary: 3, judgment: 4, action: 2, relationship: 2, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 1, relationship: 3, stability: 4 }
      },
      {
        text: '你对自己的未来规划如何？',
        optionA: '有清晰的长远规划',
        optionB: '有短期目标，灵活调整',
        optionC: '随遇而安',
        optionD: '走一步看一步',
        scoreA: { boundary: 4, judgment: 4, action: 3, relationship: 2, stability: 3 },
        scoreB: { boundary: 3, judgment: 3, action: 3, relationship: 2, stability: 4 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 3, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 2, relationship: 3, stability: 2 }
      },
      {
        text: '当团队目标与个人目标冲突时，你选择？',
        optionA: '牺牲个人目标成全团队',
        optionB: '寻找双赢方案',
        optionC: '坚持个人目标',
        optionD: '暂时观望',
        scoreA: { boundary: 2, judgment: 3, action: 3, relationship: 4, stability: 3 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 3 },
        scoreC: { boundary: 4, judgment: 3, action: 3, relationship: 1, stability: 2 },
        scoreD: { boundary: 2, judgment: 2, action: 1, relationship: 2, stability: 3 }
      },
      {
        text: '你如何看待失败？',
        optionA: '成功的垫脚石',
        optionB: '需要反思的教训',
        optionC: '难以接受的打击',
        optionD: '运气不好而已',
        scoreA: { boundary: 3, judgment: 3, action: 4, relationship: 2, stability: 2 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 3, stability: 2 },
        scoreD: { boundary: 2, judgment: 2, action: 2, relationship: 2, stability: 2 }
      },
      {
        text: '在决策前，你通常会考虑多少因素？',
        optionA: '全面考虑所有因素',
        optionB: '重点考虑关键因素',
        optionC: '只考虑主要因素',
        optionD: '凭直觉决定',
        scoreA: { boundary: 3, judgment: 4, action: 2, relationship: 3, stability: 3 },
        scoreB: { boundary: 4, judgment: 4, action: 3, relationship: 2, stability: 3 },
        scoreC: { boundary: 3, judgment: 3, action: 4, relationship: 2, stability: 2 },
        scoreD: { boundary: 2, judgment: 2, action: 3, relationship: 2, stability: 2 }
      },
      {
        text: '你更愿意与什么样的人合作？',
        optionA: '能力强、有魄力的人',
        optionB: '可靠稳重的人',
        optionC: '友善热情的人',
        optionD: '独立自主的人',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 2 },
        scoreB: { boundary: 3, judgment: 3, action: 2, relationship: 3, stability: 4 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 3, judgment: 3, action: 3, relationship: 2, stability: 3 }
      },
      {
        text: '面对压力时，你的应对方式是？',
        optionA: '迎难而上',
        optionB: '制定计划逐步解决',
        optionC: '向他人倾诉',
        optionD: '暂时放松转移注意力',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 2 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 2, stability: 4 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 2, judgment: 2, action: 2, relationship: 2, stability: 2 }
      },
      {
        text: '你更喜欢什么样的工作方式？',
        optionA: '快节奏、高挑战',
        optionB: '稳定有序、循序渐进',
        optionC: '灵活自由、创新空间大',
        optionD: '协作配合、团队为主',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 1 },
        scoreB: { boundary: 3, judgment: 3, action: 2, relationship: 2, stability: 4 },
        scoreC: { boundary: 3, judgment: 3, action: 3, relationship: 2, stability: 2 },
        scoreD: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 }
      },
      {
        text: '当你的观点与大多数人不同，你会？',
        optionA: '坚持己见并说服他人',
        optionB: '保留意见',
        optionC: '顺应多数',
        optionD: '私下表达不同看法',
        scoreA: { boundary: 4, judgment: 4, action: 3, relationship: 1, stability: 2 },
        scoreB: { boundary: 3, judgment: 4, action: 2, relationship: 3, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 3, judgment: 3, action: 2, relationship: 3, stability: 4 }
      },
      {
        text: '你如何看待规则和制度的必要性？',
        optionA: '非常必要，是秩序的保障',
        optionB: '必要时需要灵活变通',
        optionC: '规则束缚创造力',
        optionD: '因情况而定',
        scoreA: { boundary: 4, judgment: 4, action: 2, relationship: 2, stability: 4 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 4, relationship: 2, stability: 1 },
        scoreD: { boundary: 3, judgment: 3, action: 3, relationship: 3, stability: 3 }
      },
      {
        text: '在资源有限时，你优先考虑什么？',
        optionA: '效率最大化',
        optionB: '公平分配',
        optionC: '关系和谐',
        optionD: '安全稳妥',
        scoreA: { boundary: 4, judgment: 4, action: 4, relationship: 1, stability: 2 },
        scoreB: { boundary: 3, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 3, judgment: 3, action: 2, relationship: 2, stability: 4 }
      },
      {
        text: '你倾向于如何表达自己的想法？',
        optionA: '直接明确地表达',
        optionB: '委婉含蓄地表达',
        optionC: '通过行动展示',
        optionD: '视情况而定',
        scoreA: { boundary: 4, judgment: 3, action: 3, relationship: 2, stability: 3 },
        scoreB: { boundary: 2, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreC: { boundary: 3, judgment: 3, action: 4, relationship: 3, stability: 2 },
        scoreD: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 3 }
      },
      {
        text: '当机会来临时，你通常会？',
        optionA: '立即抓住机会',
        optionB: '评估风险后再决定',
        optionC: '与信任的人商量',
        optionD: '谨慎观望',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 1 },
        scoreB: { boundary: 3, judgment: 4, action: 3, relationship: 2, stability: 3 },
        scoreC: { boundary: 2, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreD: { boundary: 2, judgment: 3, action: 1, relationship: 2, stability: 4 }
      },
      {
        text: '你更重视结果还是过程？',
        optionA: '结果导向',
        optionB: '过程同样重要',
        optionC: '享受过程',
        optionD: '两者兼顾',
        scoreA: { boundary: 4, judgment: 4, action: 4, relationship: 1, stability: 2 },
        scoreB: { boundary: 3, judgment: 3, action: 3, relationship: 3, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 3, relationship: 4, stability: 3 },
        scoreD: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 3 }
      },
      {
        text: '面对批评，你的反应是？',
        optionA: '理性分析，有则改之',
        optionB: '虚心接受',
        optionC: '有些难过但会反思',
        optionD: '坚持自己认为对的',
        scoreA: { boundary: 3, judgment: 4, action: 3, relationship: 3, stability: 4 },
        scoreB: { boundary: 3, judgment: 3, action: 3, relationship: 4, stability: 3 },
        scoreC: { boundary: 2, judgment: 2, action: 2, relationship: 3, stability: 3 },
        scoreD: { boundary: 4, judgment: 3, action: 2, relationship: 2, stability: 2 }
      },
      {
        text: '你认为什么是成功的关键？',
        optionA: '坚定的意志和行动力',
        optionB: '良好的人际关系',
        optionC: '准确的判断力',
        optionD: '持续的学习能力',
        scoreA: { boundary: 4, judgment: 3, action: 4, relationship: 2, stability: 3 },
        scoreB: { boundary: 2, judgment: 3, action: 2, relationship: 4, stability: 3 },
        scoreC: { boundary: 3, judgment: 4, action: 3, relationship: 2, stability: 3 },
        scoreD: { boundary: 3, judgment: 3, action: 3, relationship: 3, stability: 4 }
      }
    ];

    this.setData({
      questions,
      currentQuestion: questions[0],
      progress: 0,
      answers: new Array(questions.length).fill(null)
    });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, answers } = this.data;
    const question = questions[currentIndex];

    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;

    this.setData({
      selectedOption: option,
      answers: newAnswers
    });

    wx.vibrateShort();

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        this.nextQuestion();
      } else {
        this.calculateResult();
      }
    }, 300);
  },

  nextQuestion() {
    const { currentIndex, questions, answers } = this.data;
    if (currentIndex >= questions.length - 1) return;

    const newIndex = currentIndex + 1;
    this.setData({
      currentIndex: newIndex,
      currentQuestion: questions[newIndex],
      selectedOption: answers[newIndex] || '',
      progress: ((newIndex + 1) / questions.length) * 100
    });
  },

  prevQuestion() {
    const { currentIndex, questions, answers } = this.data;
    if (currentIndex === 0) return;

    const newIndex = currentIndex - 1;
    this.setData({
      currentIndex: newIndex,
      currentQuestion: questions[newIndex],
      selectedOption: answers[newIndex] || '',
      progress: ((newIndex + 1) / questions.length) * 100
    });
    wx.vibrateShort();
  },

  calculateResult() {
    const { questions, answers } = this.data;
    const dimensionScores = {
      boundary: 0,
      judgment: 0,
      action: 0,
      relationship: 0,
      stability: 0
    };

    answers.forEach((answer, index) => {
      if (answer) {
        const question = questions[index];
        const scoreKey = `score${answer}`;
        const scores = question[scoreKey];
        this.dimensions.forEach(dim => {
          dimensionScores[dim] += scores[dim];
        });
      }
    });

    const maxScore = 16;
    const normalizedScores = {};
    this.dimensions.forEach(dim => {
      normalizedScores[dim] = Math.round((dimensionScores[dim] / maxScore) * 100);
    });

    this.setData({ dimensionScores: normalizedScores });

    wx.navigateTo({
      url: `/pages/history-figures-test/result/result?scores=${encodeURIComponent(JSON.stringify(normalizedScores))}&preference=${this.data.preference}`
    });
  }
})