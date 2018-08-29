// pages/order/order.js
var that;
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cityMap: '长沙',
    chooseService: '日常保洁',
    chooseFilter: '岳麓区',
    serviceOpen: false,
    filterOpen: false,
    serviceShow: false,
    filterShow: false,
    firstOpen: null,
    isfull: false,
    shownavindex: '',
    service: [],
    filter: [],
    index: 0,
    technician_list: [],
    has_more: true,
    current_page: 1, //当前页码
    sum_page: 1, //总页码，后台会返回
    page_size: 5, //每页显示多少条数据
    loadingTip: '上拉加载更多',
    refreshService: false
  },

  clickMap: function () {
    wx.showToast({
      title: '更多地区待开通中...',
      icon: 'none',
      duration: 3000
    })
  },

  serviceList: function (e) {
    if (this.data.serviceOpen) {
      this.setData({
        serviceOpen: false,
        filterOpen: false,
        serviceShow: false,
        filterShow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.service,
        serviceOpen: true,
        filterOpen: false,
        serviceShow: false,
        filterShow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },

  filterList: function (e) {
    if (this.data.filterOpen) {
      this.setData({
        serviceOpen: false,
        filterOpen: false,
        serviceShow: true,
        filterShow: false,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.filter,
        serviceOpen: false,
        filterOpen: true,
        serviceShow: true,
        filterShow: false,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },

  selectService: function (e) {
    this.setData({
      serviceOpen: false,
      filterOpen: false,
      serviceShow: false,
      filterShow: true,
      isfull: false,
      chooseService: e.currentTarget.dataset.service,
      page_index: 0,
      technician_list: [],
      has_more: true
    });
    that.filterService();
  },

  selectFilter: function (e) {
    this.setData({
      serviceOpen: false,
      filterOpen: false,
      serviceShow: true,
      filterShow: false,
      isfull: false,
      chooseFilter: e.currentTarget.dataset.filter,
      page_index: 0,
      technician_list: [],
      has_more: true
    });
    that.filterService();
  },

  hidebg: function (e) {
    this.setData({
      serviceOpen: false,
      filterOpen: false,
      serviceShow: true,
      filterShow: true,
      isfull: false,
      shownavindex: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    that = this;
    /*wx.setClipboardData({
      data: 'zuolinyoushe',
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) //data
          }
        })
      }
    })*/
    var firstOpen = wx.getStorageSync('firstOpen')
    if (!firstOpen) {
      that.setData({
        firstOpen: true,
        isfull: false
      })
      wx.getStorageSync('firstOpen', true)
    }
    console.log(firstOpen)
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    this.setData({
      service: ['全部服务', '保姆月嫂', '日常保洁', '新房开荒', '管道疏通', '家电清洗'],
      filter: ['全部区域', '岳麓区', '开福区', '芙蓉区', '天心区', '雨花区', '望城区', '长沙县']
    })
    that.filterService();
  },

  filterService: function (e) {
    var service = that.data.chooseService;
    var filter = that.data.chooseFilter;
    var page = that.data.current_page;
    var page_size = that.data.page_size;
    var sum_page = that.data.sum_page;
    wx.showLoading({
      title: '加载中....',
    })
    wx.request({
      url: 'https://www.zhuhaojia360.com/technician_list_select.php',
      data: {
        service: service,
        filter: filter
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        //打印数据
        console.log(res.data);
        console.log('submit success');
        var technician_list_temp = that.data.technician_list
        console.log(technician_list_temp);
        if (res.statusCode == 200) { //http网络请求，200代表成功
          if (page == 1) {
            technician_list_temp = []
          }
          var technician_list = res.data
          console.log(technician_list);
          if (technician_list.length < page_size) {
            that.setData({
              technician_list: technician_list_temp.concat(technician_list),
              has_more: false,
              loadingTip: '没有更多数据'
            })
          } else {
            that.setData({
              technician_list: technician_list_temp.concat(technician_list),
              has_more: true,
              page: that.data.page + 1,
              loadingTip: '上拉加载更多'
            })
          }
        } else {
          wx.showToast({
            title: '加载数据失败',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        console.log('submit fail');
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },

  openNow: function () {
    this.setData({
      isfull: false,
      firstOpen: false
    })
    wx.setStorage({
      key: 'firstOpen',
      data: 'false'
    })
  },

  showDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var objectId = that.data.technician_list[index].id;
    wx.navigateTo({
      url: '../technicianDetail/technicianDetail?showTelephone=false&showBottom=true&objectId=' + objectId,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (that.data.has_more) {
      that.filterService()
    } else {
      wx.showToast({
        title: '没有更多数据'
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.data.page = 1
    that.filterService();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    /*if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '找家教 就来蜂鸟家教',
      path: '/pages/booking/booking',
      imageUrl: '../../images/shareImage.png',
      success: function (res) {
        var currentUser = Bmob.User.current();
        var user = Bmob.Object.extend("_User");
        var queryUser = new Bmob.Query(user);
        queryUser.get(currentUser.id, {
          success: function (result) {
            result.set("applyNumberLimit", "6");
            result.save();
            wx.showToast({
              title: '申请次数提升为6次！',
              icon: 'success',
              duration: 3000
            })
          },
          error: function (object, error) {
            // 查询失败
            console.log("升级失败")
          }
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }*/
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

})