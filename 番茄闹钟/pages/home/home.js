
const {http} = require('../../lib/http.js')
Page({
  updateIndex: '',
  description:'',
  data: {
    lists: [
      {
        "id": 67,
        "description": "我要完成任务1"
      },
      {
        "id": 85,
        "description": "我要完成任务2"
      },
      {
        "id": 9,
        "description": "我要完成任务3"
      },
      {
        "id": 3,
        "description": "我要完成任务4"
      }
    ] ,
    visibleConfirm: false,
    newTodos:'',
    visibleUpdate: false,
    aftercompleted: false,
    selectCompleted:'',
    selectTab: '',
  },
  onShow(){
    
    if(!this.data.lists.length){
      this.setData({selectTab: ''})
    }
    
  },

  confirmCreate(event){
     console.log(event.detail)
   
          let todo = event.detail
          this.data.lists = todo.concat(this.data.lists)
          this.setData({ lists: this.data.lists })
          this.hideConfirm()
    
    
  
  }, 
  updateTodos(event){//更新
    
    let { index } = event.currentTarget.dataset
    this.updateIndex = index
    let description = this.data.lists[index].description
    this.setData({ newTodos: description,visibleUpdate : true})
  },
  confirmUpdate(event) {//确认更新
    let description = event.detail 
    this.data.lists[this.updateIndex].description = description
    this.setData({ lists: this.data.lists })   
    if (description){
       this.hideUpdate()
       wx.showToast({
         title: '修改成功',
         icon: 'success',
         duration: 1000
       })  
   }
  this.hideUpdate()
   
  },
  hideUpdate(){
    this.setData({ visibleUpdate : false})
  },
  destroyTodo(event){//删除
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    this.setData({ selectTab : index})
    setTimeout(()=>{
      console.log(event.detail) 
      console.log(event.currentTarget.dataset.description)      
      this.data.lists[index].description = event.currentTarget.dataset.description
        this.setData({ lists: this.data.lists })
        this.setData({selectTab : ''})
        wx.showToast({
          title: '确认完成',
          icon: 'success',
          duration: 1000
        
      })
    },1000)
    
    
    
  },
  showConfirm(){ //显示创建confirm
    this.setData({ visibleConfirm : true})
  },
  cancelCreate(){//取消创建
    this.hideConfirm()
  },
  hideConfirm() {
    this.setData({ visibleConfirm: false })
  }

})