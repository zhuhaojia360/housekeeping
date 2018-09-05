//app.js

var app = getApp()

App({
  onLaunch: function() {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //1、登录，获取code
    wx.login({
      success: function(res) {
        var that = this
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        var errMsg = res.errMsg
        if (code) {
          console.log('获取用户凭证：' + code);
          //2、获取用户信息
          wx.getUserInfo({
            success: function(msg) {
              var userNick = msg.userInfo.nickName; //用户昵称
              var avataUrl = msg.userInfo.avataUrl; //用户头像地址
              var gender  = msg.userInfo.gender; //用户性别
              var city = msg.userInfo.city; //用户所在城市
              var province = msg.userInfo.province; //用户所在省份
              var country = msg.userInfo.country; //用户所在国家
              var language = msg.userInfo.language; //用户的语言
              that.globalData.userInfo = msg.userInfo;
              console.log({
                code: code,
                encryptedData: msg.encryptedData,
                iv: msg.iv
              })
              // ------------发送凭证-----------
              wx.request({
                url: 'https://www.zhuhaojia360.com/onLogin.php',
                method: 'POST',
                data: {
                  //用于解密、验证的信息
                  code: res.code,
                  encryptedData: msg.encryptedData,
                  iv: msg.iv,
                  //用于用户注册的信息
                  userNick: userNick,
                  avataUrl: avataUrl,
                  gender: gender,
                  city: city,
                  province: province,
                  country: country,
                  language: language
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  //'Accept': 'application/json'
                },
                success: function(data) {
                  console.log('wx.request success:' + data);
                  console.log(res.data);
                  wx.setStorageSync('name',res.data.name); //将获取的信息写入本地缓存
                  wx.setStorageSync('openid',res.data.openid);
                  wx.setStorageSync('imgUrl',res.data.imgUrl);
                  wx.setStorageSync('sex', res.data.sex);
                  //添加详细操作
                  if(data.data.status == 0){
                    var _userInfo = data.data.userInfo
                    console.log(_userInfo)
                  }else{
                    console.log('解密失败')
                  }
                },
                fail: function(res) {
                  console.log('wx.request fail:' + res)
                  console.log('系统错误')
                },
                complete: function(res) {
                  console.log('wx.request complete:' + res);
                }
              })
            },
            fail: function(res) {
              console.log(res)
              console.log('获取用户信息失败:'+res.errMsg)
            },
            complete: function(res) {
              console.log('getUserInfo complete!');
            }
          })
        } else {
          console.log('获取用户登录状态失败：' + errMsg)
        }
      },
      fail: function () {
        console.log('登录失败')
      }
    })

    // 获取用户信息
    /**wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })**/
  },

  globalData: {
    userInfo: null
  }
})