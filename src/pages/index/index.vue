<template>
  <div>
    <div class="calendarWrap">
      <Calendar :events="events" :clean="true" @select="select" ref="calendar" />
    </div>
    <div @click="toPage('newPlace')" class="addPlace">
      <i-icon type="add" size="30" color="#fff" />
    </div>

    <p class="addPlaceText">创建工地</p>
    <div>{{userData.nickName}}</div>
    <div>{{userData.province}}</div>

    <button v-if="canIUse" open-type="openSetting" @getuserinfo="bindGetUserInfo">授权登录</button>

    <view wx:else>请升级微信版本</view>
    <VueTabBar></VueTabBar>
  </div>
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import VueTabBar from '../../components/card.vue'

  export default {
    data() {
      return {
        code: '',
        userData: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        events: {
          '2018-9-7': '今日备注',
          '2018-9-8': '一条很长的明日备注'
        },
      }
    },

    components: {
      Calendar,
      VueTabBar
    },

    methods: {
      login() {
        var _this = this
        wx.login({
          success(res) {
            console.log('code', res)
            _this.$http.get(`/login/code2Session/${res.code}`).then((res) => {
              console.log('登录成功', res)
              wx.setStorage({
                key: "UID",
                data: res.info.UID
              })
            })
          }
        })
      },
      bindGetUserInfo: function (e) {

      },

      select(val) {
        console.log(val)
      },
      toPage(to) {
        wx.navigateTo({
          url: `/pages/${to}/main`,
          success: function (res) {
            console.log("success")
          },
        })
      },
      getMonth(){
        this.$http.post('/work/log/queryMonth',{
           date: "2018-09"
        }).then(res => {
          console.log('月份',res.info)
        })
      }
    },

    mounted() {
      this.getMonth()
     // this.login()
      var _this = this
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          // 已经授权，可以直接调用 userLocation 获取地理位置
          if (res.authSetting['userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                wx.getLocation({
                  success: function (res) {
                    console.log(res)
                  }
                })
                // wx.chooseLocation({
                //   success:function(res){
                //     console.log(res)
                //   }
                // })
                // wx.openLocation()
              }
            })
          }
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                // alert(res.userInfo)
                _this.userData = res.userInfo
                console.log(res.userInfo)
              }
            })
          }
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .calendarWrap {
    height 80vh
  }

  .bottom-btn {
    position absolute bottom 0 width 100%
  }

  .addPlace {
    background: #3b75fb;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

  }

  .addPlaceText {
    text-align: center;
    font-size 13px color #3b75fb
  }
</style>