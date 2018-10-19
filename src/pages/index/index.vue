<template>
  <div>
    <div class="calendarWrap">
      <Calendar :events="events" :clean="true" @prev="selectMounth" @next="selectMounth" @select="select" ref="calendar" />
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
 // import Calendar from 'mpvue-calendar'
  import VueTabBar from '../../components/card.vue'
  import Calendar from '../../components/calendar/mpvue-calendar.vue'
  import {formatTime} from '../../utils/index.js'

  export default {
    data() {
      return {
        tileContent:[{date: '2018-9-20', className: 'holiday', content: '.'}],
        userData: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        events: {},
      }
    },

    components: {
      Calendar,
      VueTabBar
    },
    methods: {
      bindGetUserInfo: function (e) {

      },
      selectMounth(mounth,year) {
        var selectMounth = year + '-' + mounth
        console.log(mounth,year)
        this.getMonth(selectMounth)

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
      getMonth(value) {
        this.$http.post('/work/log/queryMonth', {
          date: value
        }).then(res => {
          res.info.forEach(ele => {
            this.$set(this.events,ele.days,'备注')
          });
        })
      }
    },
    onReachBottom() {
      console.log('searchScrollLower')
    },
    onPullDownRefresh() {
      console.log('PullDownRefresh');
    },
    onShow(){
      var data = new Date()
      var mounth = data.getMonth() + 1
      var params = data.getFullYear() + '-' + mounth
      this.getMonth(params)



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
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          if (res.authSetting['scope.userInfo']) {
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

    },
    mounted() {
      
    }
  }
</script>

<style lang="stylus" scoped>
  .calendarWrap {
    height 80vh
  }
  .holiday{
    color red
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