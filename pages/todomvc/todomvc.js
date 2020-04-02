// pages/todomvc/todomvc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    list: [{
      hobby: '学习',
      isChecked: 1,
      id: 1
    }, {
      hobby: '唱歌',
      isChecked: 0,
      id: 2
    }]
  },
  /**
   * 添加信息
   */
  addInfo() {
    const {
      list,
      text
    } = this.data;
    //对id进行处理
    let id;
    //判断是否为空值
    if(text === ''){
      wx.showToast({
        title: '内容不能为空',
        icon:'none',
        duration: 2000
      })
      return;
    }
    if (list.length === 0) {
      id = 0
    } else {
      id = list[list.length - 1].id + 1
    }
    this.setData({
      list: [...list, {
        hobby: text,
        isChecked: 0,
        id: id
      }],
      text: ''
    })

  },
  /**
   * 获取文本框内容
   */
  getVal(e) {
    this.setData({
      text: e.detail.value
    })
  },
  /**
   * 改变状态
   */
  changeChecked(e) {
    const info = e.target.dataset.info;
    info.isChecked = info.isChecked == 0 ? 1 : 0;
    this.data.list.forEach(item => {
      if (item.id == info.id) {
        item.isChecked = info.isChecked
      }
    })
    this.setData({
      list: this.data.list
    })
  },
  /**
   * 删除信息
   */
  delinfo(e){
    const infoid = e.target.dataset.delinfo;
    this.data.list.forEach((item,index)=>{
      if(infoid == item.id){
        this.data.list.splice(index,1)
      }
    })
    this.setData({
      list:this.data.list
    })    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})