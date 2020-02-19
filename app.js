//app.js
import * as echarts from 'ec-canvas/echarts';
import util from 'utils/util';

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log('login',res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // 登录成功后存token
        // wx.setStorage({
        //   key:'KtcNGbsFV35gHldcjgWd0g==',
        //   data:'oQdm84n33zYoU8MqXzBQoT4rdu_M'
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
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
      },
      fail: res => {
        // console.log('fail')
      }
    })
    util.checkUpdateVersion();
    wx.getStorage({
      'key': 'token',
      success: (res) => {
        this.globalData.token = res.data
      }
    })

    //获取设备指定样式
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })
  },
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function () {
        return val;
      }
    })
  },
  globalData: {
    token: null,
    userInfo: null,
    // m1环境域名
    url: 'https://smart-city-yiwudev.ynimg.cn/gateway/gateway/', 
    // 生产环境域名
    // url: 'https://smart-city.1556.com.cn/gateway/gateway/',
    // d2环境域名
    // url: 'http://172.17.101.77:20150/',
    // 图片域名
    imgUrl: 'https://qizhiniao-dev.oss-cn-beijing.aliyuncs.com/img/'
  }
})