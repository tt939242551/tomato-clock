var app = getApp()
Page({
  updateIndex: '',
  description: '',
  data: {
    lists: [{
        "id": 1,
        "description": "我要完成任务1"
      },
      {
        "id": 2,
        "description": "我要完成任务2"
      },
      {
        "id": 3,
        "description": "我要完成任务3"
      },
      {
        "id": 4,
        "description": "我要完成任务4"
      }
    ],
    visibleConfirm: false,
    newTodos: '',
    visibleUpdate: false,
    aftercompleted: false,
    selectCompleted: '',
    selectTab: '',
  },
  onShow() {

  },

  confirmCreate(event) {
    if (event.detail){
      let todo = {}
      todo.id = this.data.lists.length + 1
      todo.description = event.detail
      this.data.lists = this.data.lists.concat(todo)
      this.setData({
        lists: this.data.lists
      })
      this.hideConfirm()
      wx.showToast({
        title: '创建成功',
        icon: 'success',
        duration: 1000
      })
    }
    this.hideConfirm()
    
  },
  updateTodos(event) { //更新
  if (event.currentTarget.dataset.id){
    let {
      index
    } = event.currentTarget.dataset
    this.updateIndex = index
    let description = this.data.lists[index].description
    this.setData({
      newTodos: description,
      visibleUpdate: true
    })
  }
  },
  confirmUpdate(event) { //确认更新
    let description = event.detail
    if (description){
      this.data.lists[this.updateIndex].description = description
      this.setData({
        lists: this.data.lists
      })
      if (description) {
        this.hideUpdate()
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 1000
        })
      }
    }
    this.hideUpdate()

  },
  hideUpdate() {
    this.setData({
      visibleUpdate: false
    })
  },
  confirm(){
    app.globalData.data.push(this.data.lists[this.data.selectTab])
    this.data.lists[this.data.selectTab].id = 0
    this.setData({ 
      aftercompleted: false ,
      lists: this.data.lists
    }) 
    setTimeout(() => {
      wx.showToast({
        title: '完成任务',
        icon: 'success',
        duration: 800
      })
    }, 800)
  },
  cancel(){
    this.setData({ aftercompleted: false }) 
  },
  destroyTodo(event) { //删除
    if (event.currentTarget.dataset.id){
    this.setData({ aftercompleted: true })
    let id = event.currentTarget.dataset.id
    this.setData({ selectCompleted: id })
    let index = event.currentTarget.dataset.index
    this.data.selectTab = index
    }  
  },
  showConfirm() { //显示创建confirm
    this.setData({
      visibleConfirm: true
    })
  },
  cancelCreate() { //取消创建
    this.hideConfirm()
  },
  hideConfirm() {
    this.setData({
      visibleConfirm: false
    })
  }

})