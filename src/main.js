import Vue from 'vue'
import App from './App'
import Fly from 'flyio/dist/npm/wx'


var fly = new Fly()

Vue.prototype.$http = fly

//添加拦截器
fly.interceptors.request.use((config, promise) => {
  // wx.showLoading({
  //   title:'加载中',
  //   mask:true
  // })
  var UID = wx.getStorageSync("UID")
  config.headers["UID"] = UID
  //可以通过promise.reject／resolve直接中止请求
  return config;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    return response.data
  },
  (err, promise) => {
    //promise.resolve("ssss")
    if (err.status == '401') {
      wx.login({
        success(res) {
          fly.get(`/login/code2Session/${res.code}`).then((res) => {
            wx.setStorageSync("UID", res.info.UID)
            return fly.request(err.request);
          })
        }
      })
    }else{
      wx.showToast({
        title:'服务器错误',
        icon:'none'
      })
    }
  }
)



//配置请求基地址
fly.config.baseURL = "https://gongyouhui.top"



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()