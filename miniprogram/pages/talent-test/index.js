Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: '',
    talentScores: [],
    showResult: false,
    progress: 0,
    history: [],
    topTalents: [],
    resultDescription: ''
  },

  talents: [
    { name: '空间', icon: '🎨', color: '#3b82f6' },
    { name: '逻辑', icon: '🧠', color: '#10b981' },
    { name: '人际', icon: '👥', color: '#f59e0b' },
    { name: '语言', icon: '📚', color: '#ef4444' },
    { name: '自然', icon: '🌿', color: '#06b6d4' },
    { name: '动觉', icon: '⚡', color: '#8b5cf6' },
    { name: '音乐', icon: '🎵', color: '#ec4899' },
    { name: '内省', icon: '💭', color: '#6366f1' },
    { name: '美学', icon: '✨', color: '#14b8a6' }
  ],

  onLoad() {
    this.initQuestions();
    this.initTalentScores();
  },

  initQuestions() {
    const questions = [
      {
        text: '当你需要记住一个新地方的路线时，你会？',
        optionA: '在脑海中形成地图',
        optionB: '用逻辑推理方向',
        optionC: '问路或跟着感觉走',
        optionD: '写下来或用导航',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '你最喜欢的活动是？',
        optionA: '绘画或摄影',
        optionB: '解谜或编程',
        optionC: '和朋友聚会',
        optionD: '阅读或写作',
        talentA: '美学',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '学习新技能时，你更倾向于？',
        optionA: '动手实践',
        optionB: '理解原理',
        optionC: '向他人请教',
        optionD: '看书或看视频',
        talentA: '动觉',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '你对什么声音最敏感？',
        optionA: '自然的声音',
        optionB: '有规律的节拍',
        optionC: '人的说话声',
        optionD: '音乐',
        talentA: '自然',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '音乐'
      },
      {
        text: '当你思考问题时，你会？',
        optionA: '想象画面',
        optionB: '分析推理',
        optionC: '考虑他人感受',
        optionD: '内心对话',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '内省'
      },
      {
        text: '你最享受哪种环境？',
        optionA: '艺术展或博物馆',
        optionB: '安静的书房',
        optionC: '热闹的派对',
        optionD: '大自然',
        talentA: '美学',
        talentB: '内省',
        talentC: '人际',
        talentD: '自然'
      },
      {
        text: '你如何表达自己的情感？',
        optionA: '通过艺术创作',
        optionB: '通过逻辑分析',
        optionC: '通过与人交流',
        optionD: '通过音乐或舞蹈',
        talentA: '美学',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '音乐'
      },
      {
        text: '做决定时，你更依赖？',
        optionA: '直觉和感觉',
        optionB: '事实和数据',
        optionC: '他人的建议',
        optionD: '内心的声音',
        talentA: '美学',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '内省'
      },
      {
        text: '你对什么最感兴趣？',
        optionA: '建筑和设计',
        optionB: '科学和技术',
        optionC: '心理学和社交',
        optionD: '文学和诗歌',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '当你放松时，你喜欢？',
        optionA: '运动或跳舞',
        optionB: '冥想或思考',
        optionC: '和朋友聊天',
        optionD: '听音乐或演奏',
        talentA: '动觉',
        talentB: '内省',
        talentC: '人际',
        talentD: '音乐'
      },
      {
        text: '你对哪种信息记忆最深刻？',
        optionA: '图像或画面',
        optionB: '数字或公式',
        optionC: '人名或面孔',
        optionD: '文字或故事',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '你更擅长？',
        optionA: '辨别颜色和形状',
        optionB: '解决复杂问题',
        optionC: '理解他人情绪',
        optionD: '组织语言表达',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '你更喜欢哪种学习方式？',
        optionA: '观察和模仿',
        optionB: '实验和验证',
        optionC: '讨论和分享',
        optionD: '阅读和研究',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '自然'
      },
      {
        text: '你对什么最有创造力？',
        optionA: '视觉艺术',
        optionB: '系统设计',
        optionC: '人际关系',
        optionD: '文字创作',
        talentA: '美学',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '语言'
      },
      {
        text: '你认为最重要的是？',
        optionA: '美感和创意',
        optionB: '真理和逻辑',
        optionC: '爱和连接',
        optionD: '自我认知',
        talentA: '美学',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '内省'
      },
      {
        text: '你更倾向于？',
        optionA: '用身体感知世界',
        optionB: '用头脑分析世界',
        optionC: '用心感受世界',
        optionD: '用灵魂探索世界',
        talentA: '动觉',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '内省'
      },
      {
        text: '你对什么最敏感？',
        optionA: '视觉细节',
        optionB: '逻辑矛盾',
        optionC: '情感变化',
        optionD: '内心感受',
        talentA: '空间',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '内省'
      },
      {
        text: '你更喜欢哪种工作？',
        optionA: '需要动手的',
        optionB: '需要思考的',
        optionC: '需要与人打交道的',
        optionD: '需要独立完成的',
        talentA: '动觉',
        talentB: '逻辑',
        talentC: '人际',
        talentD: '内省'
      }
    ];
    this.setData({ questions, currentQuestion: questions[0], progress: 0, history: [] });
  },

  initTalentScores() {
    const talentScores = this.talents.map(talent => ({
      ...talent,
      score: 0
    }));
    this.setData({ talentScores });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, talentScores, history } = this.data;
    const question = questions[currentIndex];

    const talentKey = `talent${option}`;
    const selectedTalent = question[talentKey];

    const newTalentScores = talentScores.map(talent => {
      if (talent.name === selectedTalent) {
        return { ...talent, score: talent.score + 1 };
      }
      return talent;
    });

    const newHistory = [...history, { selectedOption: option, talentScores: newTalentScores }];

    if (currentIndex < questions.length - 1) {
      this.setData({
        selectedOption: option,
        talentScores: newTalentScores,
        history: newHistory,
        currentIndex: currentIndex + 1,
        currentQuestion: questions[currentIndex + 1],
        selectedOption: '',
        progress: ((currentIndex + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newTalentScores);
    }
    wx.vibrateShort();
  },

  prevQuestion() {
    const { currentIndex, history, questions } = this.data;
    if (currentIndex === 0 || history.length === 0) return;

    const newHistory = [...history];
    const lastHistory = newHistory.pop();

    let newTalentScores = this.talents.map(talent => ({ ...talent, score: 0 }));
    if (newHistory.length > 0) {
      newTalentScores = newHistory[newHistory.length - 1].talentScores;
    }

    this.setData({
      currentIndex: currentIndex - 1,
      currentQuestion: questions[currentIndex - 1],
      selectedOption: lastHistory.selectedOption,
      talentScores: newTalentScores,
      history: newHistory,
      progress: ((currentIndex - 1) / questions.length) * 100
    });
    wx.vibrateShort();
  },

  calculateResult(talentScores) {
    const maxScore = Math.max(...talentScores.map(t => t.score));
    const topTalents = talentScores.filter(t => t.score === maxScore);

    let resultDescription = '';
    if (topTalents.length === 1) {
      resultDescription = `你的核心天赋是${topTalents[0].name}！你在这方面拥有出色的能力，好好发挥你的天赋吧！`;
    } else {
      const talentNames = topTalents.map(t => t.name).join('、');
      resultDescription = `你在${talentNames}等方面都有出色的天赋！你是一个多才多艺的人！`;
    }

    this.setData({
      showResult: true,
      talentScores,
      topTalents,
      resultDescription,
      progress: 100
    });

    setTimeout(() => {
      this.drawRadarChart(talentScores);
    }, 100);
  },

  drawRadarChart(talentScores) {
    const ctx = wx.createCanvasContext('radarChart');
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    const numSides = 9;
    const angleStep = (2 * Math.PI) / numSides;

    ctx.setFillStyle('#1a1a2e');
    ctx.fillRect(0, 0, 300, 300);

    for (let i = 1; i <= 5; i++) {
      const r = (radius / 5) * i;
      ctx.beginPath();
      for (let j = 0; j < numSides; j++) {
        const angle = j * angleStep - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.setStrokeStyle('rgba(255, 255, 255, 0.1)');
      ctx.stroke();
    }

    for (let i = 0; i < numSides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.setStrokeStyle('rgba(255, 255, 255, 0.1)');
      ctx.stroke();
    }

    ctx.beginPath();
    const maxPossibleScore = 6;
    for (let i = 0; i < numSides; i++) {
      const talent = talentScores[i];
      const score = talent.score;
      const r = (radius * score) / maxPossibleScore;
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.setFillStyle('rgba(16, 185, 129, 0.3)');
    ctx.fill();
    ctx.setStrokeStyle('#10b981');
    ctx.setLineWidth(2);
    ctx.stroke();

    for (let i = 0; i < numSides; i++) {
      const talent = talentScores[i];
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + (radius + 25) * Math.cos(angle);
      const y = centerY + (radius + 25) * Math.sin(angle);
      ctx.setFillStyle(talent.color);
      ctx.setFontSize(12);
      ctx.setTextAlign('center');
      ctx.setTextBaseline('middle');
      ctx.fillText(talent.icon, x, y - 10);
      ctx.setFillStyle('#fff');
      ctx.fillText(talent.name, x, y + 8);
    }

    ctx.draw();
  },

  restart() {
    this.initQuestions();
    this.initTalentScores();
    this.setData({
      currentIndex: 0,
      selectedOption: '',
      showResult: false,
      progress: 0,
      history: [],
      topTalents: [],
      resultDescription: ''
    });
  }
})
