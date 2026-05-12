Page({
  data: {
  },

  onLoad() {
  },

  goToAnswerBook() {
    wx.navigateTo({
      url: '/pages/answer-book/index'
    });
    wx.vibrateShort();
  },

  goToTest(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `/pages/${page}/index`
    });
    wx.vibrateShort();
  }
})
