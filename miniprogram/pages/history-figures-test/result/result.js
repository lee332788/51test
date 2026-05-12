Page({
  data: {
    scores: {},
    preference: 'random',
    matchedFigure: {},
    matchRate: 0,
    dimensions: [],
    figureList: []
  },

  dimensionConfig: [
    { key: 'boundary', name: '边界感', icon: '🔒', color: '#6366f1', description: '处理个人与他人关系、保持自我的能力' },
    { key: 'judgment', name: '判断力', icon: '⚖️', color: '#10b981', description: '分析情况、做出明智决策的能力' },
    { key: 'action', name: '行动力', icon: '⚡', color: '#f59e0b', description: '执行决策、达成目标的行动能力' },
    { key: 'relationship', name: '关系感知', icon: '🤝', color: '#ec4899', description: '理解他人、维护关系的能力' },
    { key: 'stability', name: '稳定性', icon: '🛡️', color: '#8b5cf6', description: '应对压力、保持冷静的心理素质' }
  ],

  figures: {
    male: [
      {
        id: 'caocao',
        name: '曹操',
        dynasty: '东汉末年',
        emoji: '👑',
        profile: { boundary: 75, judgment: 95, action: 90, relationship: 60, stability: 85 },
        introduction: '曹操，东汉末年著名政治家、军事家、文学家。挟天子以令诸侯，统一北方，建立魏国基业。他的政治手腕、军事才能和文学素养都极为出众，是三国时期最重要的人物之一。',
        matchReason: '你具有出色的判断力和决断力，善于在复杂的局势中做出正确的决策。你的行动力强，能够迅速抓住机遇并采取行动。',
        realityAnalysis: '你在现实生活中是一个有野心、有谋略的人。做事果断，善于把握大局，具有领导才能。',
        currentState: '你目前正处于事业上升期，有能力实现自己的目标和理想。'
      },
      {
        id: 'liubei',
        name: '刘备',
        dynasty: '三国',
        emoji: '⚔️',
        profile: { boundary: 65, judgment: 75, action: 70, relationship: 98, stability: 90 },
        introduction: '刘备，蜀汉开国皇帝，以仁德著称。他出身贫寒，却能聚集关羽、张飞、诸葛亮等人才，从一无所有到三分天下有其一，靠的是出众的人格魅力和用人智慧。',
        matchReason: '你具有极高的人际关系能力，能够吸引和团结人才。你为人宽厚，重情重义，具有强大的领导魅力。',
        realityAnalysis: '你在现实生活中是一个重感情、有人格魅力的人。善于与人相处，能够得到他人的信任和支持。',
        currentState: '你目前人际关系良好，身边有一帮可靠的朋友支持你。'
      },
      {
        id: 'sunquan',
        name: '孙权',
        dynasty: '三国',
        emoji: '🌊',
        profile: { boundary: 80, judgment: 85, action: 80, relationship: 80, stability: 95 },
        introduction: '孙权，东吴开国皇帝，年少时就继承父兄基业。他善于识人用人，能屈能伸，在曹操和刘备之间纵横捭阖，建立了稳固的江东基业。',
        matchReason: '你具有出色的平衡能力和稳定性，能够在复杂的局势中找到平衡点。你善于用人，也懂得审时度势。',
        realityAnalysis: '你在现实生活中是一个稳重、靠谱的人。行事稳妥，善于平衡各种关系。',
        currentState: '你目前状态稳定，能够很好地处理各种复杂的局面。'
      },
      {
        id: 'lvbu',
        name: '吕布',
        dynasty: '三国',
        emoji: '🗡️',
        profile: { boundary: 40, judgment: 50, action: 98, relationship: 55, stability: 50 },
        introduction: '吕布，三国时期著名武将，被称为"人中吕布，马中赤兔"。他武艺超群，但反复无常，先后背叛丁原、董卓，最终被曹操所擒。',
        matchReason: '你具有极强的行动力和个人能力，在专业领域可能有出色的表现。但在判断和稳定性方面可能需要加强。',
        realityAnalysis: '你在现实生活中是一个能力出众的人，但有时可能缺乏长远的规划和稳定性。',
        currentState: '你目前可能需要更多地关注长远发展，增强规划能力。'
      },
      {
        id: 'zhugeliang',
        name: '诸葛亮',
        dynasty: '三国',
        emoji: '📜',
        profile: { boundary: 90, judgment: 98, action: 80, relationship: 85, stability: 95 },
        introduction: '诸葛亮，蜀汉丞相，著名政治家、军事家。他未出茅庐而知天下三分，鞠躬尽瘁死而后已，是智慧与忠诚的化身。他的隆中对、出师表流传千古。',
        matchReason: '你具有卓越的判断力和智慧，能够看清事物的本质。你忠诚可靠，原则性强，具有出色的规划能力。',
        realityAnalysis: '你在现实生活中是一个有智慧、靠谱的人。做事周全，考虑长远，值得信赖。',
        currentState: '你目前状态稳定，能够很好地规划和处理各种事情。'
      },
      {
        id: 'sunwukong',
        name: '孙悟空',
        dynasty: '神话',
        emoji: '🐵',
        profile: { boundary: 55, judgment: 70, action: 98, relationship: 75, stability: 70 },
        introduction: '孙悟空，中国古典名著《西游记》中的主角，齐天大圣。他神通广大，大闹天宫，后保唐僧西天取经，历经九九八十一难，终成正果。',
        matchReason: '你具有超凡的行动力和创造力，敢于挑战权威，敢于创新。你为人正直，有正义感。',
        realityAnalysis: '你在现实生活中是一个充满活力和创造力的人。敢想敢干，能够突破常规。',
        currentState: '你目前正处于一个充满可能性的时期，可以大胆尝试新事物。'
      },
      {
        id: 'zheng',
        name: '郑成功',
        dynasty: '明末清初',
        emoji: '⚔️',
        profile: { boundary: 85, judgment: 80, action: 90, relationship: 70, stability: 75 },
        introduction: '郑成功，明末清初著名的军事家、抗清名将。其父郑芝龙为海商集团首领。郑成功以厦门、金门为根据地，组织抗清力量，曾一度打到南京城下。后驱逐荷兰殖民者，收复台湾，建立郑氏政权。',
        matchReason: '你具有强烈的民族气节和坚定的意志，面对困境能够果断行动，具有强大的执行力。同时你也懂得审时度势，在必要时做出战略性调整。',
        realityAnalysis: '你在现实生活中是一个有担当、有魄力的人。面对困难不轻易退缩，善于组织和协调资源，具有领导能力。',
        currentState: '你目前处于积极进取的状态，有明确的目标和方向，正朝着自己的理想努力前进。'
      },
      {
        id: 'suwu',
        name: '苏武',
        dynasty: '西汉',
        emoji: '🏔️',
        profile: { boundary: 95, judgment: 85, action: 75, relationship: 70, stability: 98 },
        introduction: '苏武，西汉著名外交家、忠臣的代表人物。天汉元年，奉命出使匈奴，被扣留十九年。在北海牧羊十九年，历尽艰辛，始终持汉节不改，最终得以归汉。',
        matchReason: '你具有坚定的信念和原则，面对困境能够保持初心，不轻易妥协。你的心理承受能力极强，能够在逆境中保持稳定。',
        realityAnalysis: '你在现实生活中是一个值得信赖的人，行事有原则，重承诺。即使面对压力也能坚持自己的立场。',
        currentState: '你目前心理状态稳定，能够冷静面对生活中的各种挑战，保持内心的平静与坚定。'
      },
      {
        id: 'yuefei',
        name: '岳飞',
        dynasty: '南宋',
        emoji: '🗡️',
        profile: { boundary: 98, judgment: 80, action: 95, relationship: 75, stability: 85 },
        introduction: '岳飞，南宋著名抗金名将，中国历史上著名的民族英雄。其母姚氏在岳飞背上刺"精忠报国"四字。岳飞率领岳家军北伐，屡建奇功，后被秦桧以"莫须有"罪名陷害。',
        matchReason: '你具有强烈的责任感和正义感，行事果断，行动力强。面对不公会勇敢站出来，具有坚定的信念。',
        realityAnalysis: '你在现实生活中是一个正直、有担当的人。做事认真负责，具有很强的执行力。',
        currentState: '你目前充满正能量，正为了自己的理想和目标努力奋斗。'
      },
      {
        id: 'guojia',
        name: '郭子仪',
        dynasty: '唐朝',
        emoji: '🛡️',
        profile: { boundary: 75, judgment: 90, action: 85, relationship: 85, stability: 90 },
        introduction: '郭子仪，唐朝著名军事家、政治家。被皇帝称为"尚父"，是唐代中兴名将。安史之乱中平叛有功，后多次率军平定叛乱，官至太尉、中书令，封汾阳王。',
        matchReason: '你具有出色的判断力和人际交往能力，能够在复杂的局势中做出正确决策。同时你的人际关系处理得当，具有很高的情商。',
        realityAnalysis: '你在现实生活中是一个成熟稳重的人，善于处理各种复杂的人际关系，在团队中能够发挥调和作用。',
        currentState: '你目前状态良好，能够在各种关系中游刃有余，保持内心的稳定。'
      },
      {
        id: 'lvseng',
        name: '吕洞宾',
        dynasty: '唐代',
        emoji: '☯️',
        profile: { boundary: 80, judgment: 90, action: 70, relationship: 75, stability: 85 },
        introduction: '吕洞宾，唐代著名的道教仙人，八仙之一。相传为科举不第，后遇钟离权点化成仙。民间传说中，他云游四方，悬壶济世，是智慧与正义的化身。',
        matchReason: '你具有深刻的洞察力和判断力，能够看透事物的本质。你不拘泥于世俗，具有超然的人生态度。',
        realityAnalysis: '你在现实生活中是一个有智慧的人，看问题比较通透，不容易被表象迷惑。',
        currentState: '你目前处于一种淡泊从容的状态，能够以平和的心态面对生活中的起起落落。'
      },
      {
        id: 'liyuan',
        name: '李世民',
        dynasty: '唐朝',
        emoji: '👑',
        profile: { boundary: 70, judgment: 95, action: 90, relationship: 80, stability: 85 },
        introduction: '李世民，唐朝第二位皇帝，年号贞观。他发动玄武门之变夺取皇位，在位期间开创贞观之治，是历史上著名的明君。他善于纳谏，知人善任，开创了大唐盛世。',
        matchReason: '你具有卓越的判断力和决策能力，能够在关键时刻做出正确的选择。你的行动力强，且善于处理人际关系。',
        realityAnalysis: '你在现实生活中是一个有领导力的人，善于组织和协调，能够带领团队达成目标。',
        currentState: '你目前正处于事业的上升期，有明确的目标和规划，正在朝着自己的理想迈进。'
      },
      {
        id: 'zhaokuangyin',
        name: '赵匡胤',
        dynasty: '北宋',
        emoji: '⚔️',
        profile: { boundary: 75, judgment: 90, action: 92, relationship: 70, stability: 80 },
        introduction: '赵匡胤，北宋开国皇帝，宋太祖。他通过陈桥兵变建立宋朝，结束了五代十国的混乱局面。在位期间加强中央集权，推行文治天下，为宋代三百年的繁荣奠定基础。',
        matchReason: '你具有强大的行动力和决断力，敢于抓住机遇。同时你也懂得审时度势，在适当的时机做出正确的决策。',
        realityAnalysis: '你在现实生活中是一个有魄力的人，善于抓住机遇，有较强的领导能力。',
        currentState: '你目前正处于人生的关键时期，有魄力去实现自己的目标。'
      },
      {
        id: 'suqin',
        name: '苏秦',
        dynasty: '战国',
        emoji: '🎭',
        profile: { boundary: 70, judgment: 90, action: 85, relationship: 95, stability: 80 },
        introduction: '苏秦，战国时期著名的纵横家、外交家。他以合纵之术游说六国，身挂六国相印，联合抗秦，成为历史上最成功的外交家之一。',
        matchReason: '你具有出色的人际交往能力和判断力，能够准确把握他人心理。你善于沟通和协调，具有很高的社交智慧。',
        realityAnalysis: '你在现实生活中是一个社交达人，人脉广泛，善于处理复杂的人际关系。',
        currentState: '你目前社交活跃，能够很好地处理各种人际问题。'
      }
    ],
    female: [
      {
        id: 'wuzetian',
        name: '武则天',
        dynasty: '唐朝',
        emoji: '👸',
        profile: { boundary: 95, judgment: 98, action: 90, relationship: 75, stability: 92 },
        introduction: '武则天，唐高宗皇后，中国历史上唯一的正统女皇帝。她在位期间推行科举制度，重视农业生产，打击门阀士族，推动社会进步。她的政治才能和手腕在历史上首屈一指。',
        matchReason: '你具有极强的判断力和决断力，能够在复杂的局势中看清本质并做出正确决策。你的心理素质极佳，面对压力能够保持冷静。',
        realityAnalysis: '你在现实生活中是一个有主见、有魄力的人。做事果断，具有很强的领导能力。',
        currentState: '你目前正处于人生的黄金时期，有能力去实现自己的目标和理想。'
      },
      {
        id: 'qinhiang',
        name: '秦良玉',
        dynasty: '明朝',
        emoji: '⚔️',
        profile: { boundary: 90, judgment: 85, action: 95, relationship: 80, stability: 88 },
        introduction: '秦良玉，明朝著名女将，忠贞侯。她的丈夫马千乘被害后，秦良玉代领夫职，率领白杆兵南征北战，立下赫赫战功，是中国历史上为数不多的女性军事将领。',
        matchReason: '你具有坚定的意志和强大的行动力，面对困难不退缩。你的原则性强，能够坚守底线。',
        realityAnalysis: '你在现实生活中是一个坚强独立的人，做事有担当，能够独当一面。',
        currentState: '你目前状态稳定，正在为自己的目标努力奋斗。'
      },
      {
        id: 'liuru',
        name: '刘琨',
        dynasty: '西晋',
        emoji: '🎵',
        profile: { boundary: 88, judgment: 75, action: 85, relationship: 70, stability: 80 },
        introduction: '刘琨，西晋著名的军事将领、诗人。他与祖逖一起闻鸡起舞，立志报国。八王之乱后，他据守并州，抵抗匈奴、鲜卑入侵，以一曲胡笳退敌兵，留下"吹散胡兵"的传说。',
        matchReason: '你具有坚定的信念和强烈的责任感，面对困境能够坚守志向。你的意志坚强，不轻言放弃。',
        realityAnalysis: '你在现实生活中是一个有理想、有追求的人，即使遇到困难也不会轻易放弃。',
        currentState: '你目前可能处于一个需要坚持的阶段，但你的内心是坚定的。'
      },
      {
        id: 'mulan',
        name: '花木兰',
        dynasty: '南北朝',
        emoji: '🌸',
        profile: { boundary: 92, judgment: 80, action: 90, relationship: 75, stability: 95 },
        introduction: '花木兰，中国古代著名的巾帼英雄。相传她女扮男装，替父从军，在军中征战十二年，建立功勋而不知她是女子。归来后，天子嘉奖她的孝心，封她为官。',
        matchReason: '你具有坚定的责任感和强大的行动力，能够为了重要的目标做出牺牲。你的心理承受能力很强。',
        realityAnalysis: '你在现实生活中是一个有担当的人，能够为了家庭和社会承担责任。',
        currentState: '你目前正在承担重要的责任，可能有一定的压力，但你能够很好地应对。'
      },
      {
        id: 'lijun',
        name: '李清照',
        dynasty: '南宋',
        emoji: '📚',
        profile: { boundary: 80, judgment: 85, action: 60, relationship: 90, stability: 75 },
        introduction: '李清照，南宋著名女词人，婉约派的代表人物。她出身书香门第，与丈夫赵明诚志趣相投，共同收藏金石书画。丈夫去世后，她独自面对战乱，晚年生活凄凉，但创作不辍。',
        matchReason: '你具有细腻的情感和深刻的人际感知能力，能够敏锐地察觉他人的情感变化。你的内心世界丰富。',
        realityAnalysis: '你在现实生活中是一个感情丰富、细腻的人，善于理解和感受。',
        currentState: '你目前内心世界丰富，可能正经历一些情感上的波动。'
      },
      {
        id: 'qinyijun',
        name: '秦宜禄妻',
        dynasty: '三国',
        emoji: '👁️',
        profile: { boundary: 60, judgment: 75, action: 70, relationship: 95, stability: 65 },
        introduction: '秦宜禄妻，三国时期杜氏之美貌女子。原为吕布部下秦宜禄之妻，后被曹操和刘备争夺。她以绝世美貌著称，但命运坎坷，最终不知所终。',
        matchReason: '你对他人的情感变化非常敏感，具有很强的人际感知能力。你重视感情和人际关系。',
        realityAnalysis: '你在现实生活中是一个重感情的人，非常在意他人的看法和感受。',
        currentState: '你目前可能过于在意他人的看法，需要更多地关注自己的内心。'
      },
      {
        id: 'banchao',
        name: '班昭',
        dynasty: '东汉',
        emoji: '📖',
        profile: { boundary: 85, judgment: 90, action: 75, relationship: 80, stability: 85 },
        introduction: '班昭，东汉著名的史学家、文学家。她是班固的妹妹，班固去世后，她奉旨续写《汉书》。她也是著名的女教师，晚年著《女诫》教导女子。',
        matchReason: '你具有出色的判断力和学识，能够理性地分析问题。你的原则性强，注重品德修养。',
        realityAnalysis: '你在现实生活中是一个理性、有智慧的人，做事有分寸。',
        currentState: '你目前心态平和，能够以理性的态度面对生活。'
      },
      {
        id: 'xiangyu',
        name: '虞姬',
        dynasty: '秦末',
        emoji: '💃',
        profile: { boundary: 88, judgment: 70, action: 75, relationship: 95, stability: 70 },
        introduction: '虞姬，秦末楚汉争霸时期西楚霸王项羽的宠姬。她随项羽征战多年，在项羽被困垓下时，以剑舞《和项王歌》，随后自刎而亡，成为忠贞的象征。',
        matchReason: '你对感情非常投入，具有强烈的忠诚度。你重视人际关系，愿意为重要的人付出一切。',
        realityAnalysis: '你在现实生活中是一个重感情的人，对家人和朋友非常忠诚。',
        currentState: '你目前正处于一段重要的感情关系中，对这段关系非常投入。'
      },
      {
        id: 'diaochan',
        name: '貂蝉',
        dynasty: '三国',
        emoji: '🌙',
        profile: { boundary: 70, judgment: 90, action: 80, relationship: 95, stability: 80 },
        introduction: '貂蝉，中国古代四大美女之一。她是王允的义女，以连环计离间董卓和吕布，为铲除国贼立下大功。她既有美貌，又有智慧和勇气。',
        matchReason: '你具有出色的智慧和人际交往能力，善于处理复杂的关系。你有勇气，也有策略。',
        realityAnalysis: '你在现实生活中是一个有智慧、有魅力的人，能够巧妙地处理各种问题。',
        currentState: '你目前处于一个需要智慧和策略的时期，你的能力能够得到充分发挥。'
      },
      {
        id: 'zhenji',
        name: '甄宓',
        dynasty: '三国',
        emoji: '🌹',
        profile: { boundary: 85, judgment: 75, action: 60, relationship: 90, stability: 80 },
        introduction: '甄宓，三国时期著名美人。原为袁绍儿媳，后被曹丕所纳。她美貌绝伦，贤淑有德，是曹植《洛神赋》中洛神的原型。',
        matchReason: '你具有良好的品德修养和人际关系能力，为人贤淑善良。你富有魅力，能够吸引他人。',
        realityAnalysis: '你在现实生活中是一个有魅力、善良的人，能够与人和谐相处。',
        currentState: '你目前人际关系良好，能够得到他人的喜爱和尊重。'
      }
    ]
  },

  onLoad(options) {
    const { scores, preference } = options;
    const scoresObj = JSON.parse(decodeURIComponent(scores));
    const pref = preference || 'random';

    this.setData({
      scores: scoresObj,
      preference: pref
    });

    this.matchFigure(scoresObj, pref);
    this.prepareDimensionData(scoresObj);
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  matchFigure(scores, preference) {
    let figureList = [];

    if (preference === 'male') {
      figureList = this.figures.male;
    } else if (preference === 'female') {
      figureList = this.figures.female;
    } else {
      figureList = [...this.figures.male, ...this.figures.female];
    }

    let bestMatch = null;
    let bestScore = -1;

    figureList.forEach(figure => {
      const similarity = this.calculateSimilarity(scores, figure.profile);
      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = figure;
      }
    });

    this.setData({
      matchedFigure: bestMatch,
      matchRate: Math.round(bestScore),
      figureList: figureList
    });
  },

  calculateSimilarity(scores, profile) {
    let totalDiff = 0;
    const keys = ['boundary', 'judgment', 'action', 'relationship', 'stability'];

    keys.forEach(key => {
      const diff = Math.abs(scores[key] - profile[key]);
      totalDiff += diff;
    });

    const maxDiff = 500;
    const similarity = ((maxDiff - totalDiff) / maxDiff) * 100;
    return similarity;
  },

  prepareDimensionData(scores) {
    const dimensions = this.dimensionConfig.map(dim => ({
      ...dim,
      score: scores[dim.key]
    }));

    this.setData({ dimensions });
  },

  shareResult() {
    const { matchedFigure, matchRate } = this.data;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });

    wx.showToast({
      title: '点击右上角分享',
      icon: 'none'
    });
  },

  saveResult() {
    const { matchedFigure, matchRate, dimensions } = this.data;

    const resultData = {
      figure: matchedFigure,
      rate: matchRate,
      dimensions: dimensions,
      timestamp: new Date().toISOString()
    };

    try {
      const history = wx.getStorageSync('historyResults') || [];
      history.unshift(resultData);
      if (history.length > 20) {
        history.pop();
      }
      wx.setStorageSync('historyResults', history);

      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
    } catch (e) {
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
    }
  },

  restartTest() {
    wx.redirectTo({
      url: '/pages/history-figures-test/index'
    });
  }
})