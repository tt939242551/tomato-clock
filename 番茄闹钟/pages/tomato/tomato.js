
Page({
  timer:'',
  tomato: {},
  data: {
    defalutSecond: 1500,
    time: '',
    timerStatus: 'stop',
    finishConfirmVisible: false,
    againButtonVisible: false,
    confirmVisible: false,
  },
  onLoad(){
    wx.vibrateLong()
  },
  onShow(){ 
    if(this.data.defalutSecond){
      this.startTimer()
    }
    
  },
  startTimer() {
    this.setData({ timerStatus: 'stop' })
    this.changeTime()
    this.timer = setInterval(() => {
      this.data.defalutSecond = this.data.defalutSecond - 1
      this.changeTime()
      if (this.data.defalutSecond <= 0) {
        wx.vibrateLong()
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        this.clearTimer()
        return 
      }
    }, 1000)
  },
  clearTimer(){
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus : 'start'})
  },
  showConfirm(){//放弃时弹出
    this.setData({confirmVisible : true})
    this.clearTimer()
  },
  //完成时的操作
  confirmFinish(event){
    this.clearTimer()
    let content = event.detail
    this.setData({ finishConfirmVisible: false })
    if (content){
      wx.reLaunch({ url: '/pages/home/home' }) 
    }     
  }, 

  //放弃时的操作
  confirmAbandon(event){
    wx.reLaunch({ url : '/pages/home/home'})    
  },
  hideAbandon() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  againTimer(){
    this.defalutSecond = 1500
    this.setData({defalutSecond: this.defalutSecond})
    this.startTimer()
    this.setData({ againButtonVisible : false})
  },
  changeTime(){
    let m = Math.floor(this.data.defalutSecond/60)
    let s =Math.floor(this.data.defalutSecond%60)
    if(s === 0){
      s = '00'
    }
    if((s + '').length === 1){
      s = '0' + s
    }
    if((m + '').length === 1 ){
      m = '0' +m
    }
    this.setData({time  : `${m} : ${s}`})
  },
})