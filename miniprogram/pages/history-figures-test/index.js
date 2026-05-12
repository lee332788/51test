Page({
  data: {
    selectedPreference: ''
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  selectPreference(e) {
    const value = e.currentTarget.dataset.value;
    this.setData({ selectedPreference: value });
    wx.vibrateShort();
  },

  startTest() {
    if (!this.data.selectedPreference) {
      wx.showToast({
        title: '请先选择人物方向',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/history-figures-test/quiz/quiz?preference=${this.data.selectedPreference}`
    });
  }
})