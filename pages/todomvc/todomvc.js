// pages/todomvc/todomvc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '', //input内容
    detailsNum: 0,
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
    if (text === '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
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
    this.updateNum();
    this.setSto()
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
  changeStates(e) {
    /**
     * 踩坑指南：在其他方法中，我刚开始使用了event查看target中有我想要的值于是乎我就使用了target
     * 但是在此方法中就报错，info是undefined，查看了半天发现踩了以下的坑
     * event.target返回的是点击的元素节点
     * event.currentTarget返回的是绑定事件的元素
     * 详细内容请查看 https://blog.csdn.net/jingjingshizhu/article/details/80067566
     */

    // const info = e.target.dataset.info;
    const info = e.currentTarget.dataset.info;

    info.isChecked = info.isChecked == 0 ? 1 : 0;
    this.data.list.forEach(item => {
      if (item.id == info.id) {
        item.isChecked = info.isChecked
      }
    })
    this.setData({
      list: this.data.list
    })
    this.updateNum()
    this.setSto()

  },
  /**
   * 删除信息
   */
  delinfo(e) {
    const infoid = e.currentTarget.dataset.delinfo;
    this.data.list.forEach((item, index) => {
      if (infoid == item.id) {
        this.data.list.splice(index, 1)
      }
    })
    this.setData({
      list: this.data.list
    })
    this.updateNum()
    this.setSto()

  },
  /**
   * 全选
   */

  chooseAll() {
    const {
      list
    } = this.data
    /**
     * every方法：所有项都是true 返回true
     * 只要有一项为false，那么就返回false
     */
    const allChecked = list.every(item => item.isChecked);
    list.forEach(item => {
      item.isChecked = !allChecked
    })
    const a = list.forEach(item => item.hobby)

    this.setData({
      list
    })
    this.updateNum()
    this.setSto()

  },
  /**
   * 清除已选中的
   */
  clear() {
    const {
      list
    } = this.data;
    const incomplete = list.filter(item => item.isChecked == 0)
    this.setData({
      list: incomplete
    })
    this.setSto()

  },
  /**
   * 更新数据数量
   */
  updateNum() {
    const {
      list
    } = this.data;
    let leftNum = 0;
    list.forEach(item => {
      if (item.isChecked == 0) {
        leftNum++
      }
    })
    this.setData({
      detailsNum: leftNum
    })
  },
  /**
   * 存储数据
   */
  setSto(){
    wx.setStorageSync('aa', this.data.list,)
  },
  /**
   * 
   */
  getSto(){
   let list = wx.getStorageSync('aa')
   
   this.setData({
     list
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  /**
   * 回车增加
   */
  enterVal(e) {
    this.addInfo()


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
    this.getSto()
    this.updateNum()

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