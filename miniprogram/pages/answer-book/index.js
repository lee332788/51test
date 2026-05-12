Page({
  data: {
    showAnswer: false,
    answer: '',
    isAnimating: false
  },

  answers: [
    '相信你的直觉，它会指引你走向正确的方向',
    '现在正是行动的最佳时机',
    '保持耐心，美好的事物需要时间沉淀',
    '追随内心的声音，而非他人的期待',
    '放下过去，前方有更美的风景等着你',
    '你所寻求的答案，其实就在你心中',
    '勇敢迈出第一步，剩下的路会自然展开',
    '信任宇宙的安排，一切都是最好的选择',
    '此刻的困惑，终将化作未来的智慧',
    '倾听内心深处真正的渴望',
    '不要害怕改变，它是成长的必经之路',
    '你已经拥有了所需的一切力量',
    '保持善良，好运会悄然降临',
    '给自己一些时间，答案会慢慢浮现',
    '相信一切都是最好的安排'
  ],

  onLoad() {
    const cachedAnswers = wx.getStorageSync('answerBookAnswers');
    if (cachedAnswers) {
      this.answers = cachedAnswers;
    }
  },

  getAnswer() {
    if (this.data.isAnimating) return;

    this.setData({
      isAnimating: true,
      showAnswer: false
    });

    wx.vibrateShort();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.answers.length);
      this.setData({
        answer: this.answers[randomIndex],
        showAnswer: true,
        isAnimating: false
      });
      wx.vibrateShort();
    }, 1500);
  }
})