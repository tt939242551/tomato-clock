var app = getApp()

Page({
  data: {
   
    tomatoes: null,
   
  },
  onShow: function () {
    this.fetchTomatoes()
 
  },
  fetchTomatoes() { //完成的任务
    this.data.tomatoes = app.globalData.data
    this.setData({ tomatoes: this.data.tomatoes })
  }

})