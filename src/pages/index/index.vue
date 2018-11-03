<template>
  <div class="font">
    <div class="calendarWrap">
      <Calendar arrowLeft="/static/images/left.png" arrowRight="/static/images/right.png" :events="events" :clean="true"
        @prev="selectMounth" @next="selectMounth" @select="select" ref="calendar" />
    </div>

    <div class="btn">
      <button @click="toPage('newPlace')">创建工地</button>
    </div>

    <i-drawer mode="bottom" :visible="showDrawer" @close="close">
      <div class="demo-container">
        <p style="text-align:center;">{{selectData}}</p>
        <div class="selectPlace">
          <span>请选择工地:</span>
          <div>
            <picker :disabled="placeList.length == 0" style="overflow:hidden;" slot="footer" range-key="address" :range="placeList"
              :value="placeIndex" @change="bindWorkerChange">
              {{placeList[placeIndex] ? placeList[placeIndex].address :'暂无'}}
            </picker>
            <i-icon v-if="placeList.length > 0" type="enter" size="28" color="#F4A900" />
          </div>
        </div>
        <div class="noPlace" v-if="placeList.length == 0">
          <p>
            <div>未检测到工地</div>
            <div>让我们来创建第一个工地</div>
          </p>

          <div class="btn" style="position:relative">
            <button @click="toPage('newPlace')">创建工地</button>
          </div>
        </div>
        <div v-if="placeList.length > 0" class="placeCont">
          <p class="placeTitle">
            <span>{{placeData.payrollSystemName}}</span>
            <span v-if="placeData.payrollSystem == 1">{{placeData.fee}}元/小时</span>
            <span v-if="placeData.payrollSystem == 2">{{placeData.fee}}元/天</span>
          </p>
          <p style="text-align:center;" v-if="placeData.payrollSystem == 3">包工制无需记工</p>
          <p style="text-align:center;" v-if="placeData.payrollSystem == 2">
            <radio-group slot="footer" class="radio-group" @change="handleFruitChange">
              <label class="radio" v-for="(item, index) in radioArray" :key="item.code">
                <radio :value="item.code" /> {{item.name}}
              </label>
            </radio-group>
          </p>
          <p style="text-align:center;display:flex;margin-top:20px;" v-if="placeData.payrollSystem == 1">
            <picker :value="hourIndex" :range="hourArr" mode="selector" @change="timeHourSelect">
              <input :disabled="true" placeholder="请选择小时" :value="remarkTime.hr" />小时
            </picker>
            <picker :value="minIndex" :range="minArr" mode="selector" @change="timeMinSelect">
              <input :disabled="true" placeholder="请选择分钟" :value="remarkTime.mi" />分钟
            </picker>
          </p>
          <p v-if="placeData.payrollSystem != 3" style="margin-top:20px;">
            <button class="sureBtn" @click="sureRemarkTime">确认</button>
          </p>
          <!-- <p>工作天数</p> -->
        </div>
      </div>
    </i-drawer>
    <i-message id="message" />
  </div>
</template>

<script>
  // import Calendar from 'mpvue-calendar'
  import VueTabBar from '../../components/card.vue'
  import Calendar from '../../components/calendar/mpvue-calendar.vue'
  import {
    formatTime
  } from '../../utils/index.js'
  const {
    $Message
  } = require('../../../static/iview/base/index.js');
  export default {
    data() {
      return {
        hourIndex: 0,
        minIndex: 0,
        hourArr: [],
        minArr: [],
        radioArray: [{
            code: 1,
            name: '1天'
          },
          {
            code: 0.5,
            name: '0.5天'
          }
        ],
        placeIndex: 0,
        remarkTime: {
          workId: '',
          hour: '',
          hr: '',
          mi: '',
          workTime: ''
        },
        placeData: {},
        placeList: [],
        selectData: '',
        showDrawer: false,
        actionVisible: false,
        tileContent: [{
          date: '2018-9-20',
          className: 'holiday',
          content: '.'
        }],
        events: {},
      }
    },

    components: {
      Calendar,
      VueTabBar
    },
    methods: {
      close() {
        this.showDrawer = false
        for (let i in this.remarkTime) {
          this.remarkTime[i] = ''
        }
      },
      sureRemarkTime() {
        this.close()
        this.$http.post(`/work/log/save`, this.remarkTime).then(res => {
          if (res.success) {
            $Message({
              content: '记工成功',
              // type: 'warning'
            });
          } else {
            $Message({
              content: res.message,
              type: 'warning'
            });
          }
        })
      },
      timeHourSelect(data) {
        this.remarkTime.hr = data.target.value
      },
      timeMinSelect(data) {
        this.remarkTime.mi = data.target.value
      },
      handleFruitChange(data) {
        this.placeData.hour = data.target.value
      },
      timeSelect(val) {
        this.remarkTime.hour = val.target.value
      },
      getPlaceById(val) {
        this.$http.get(`/work/address/queryByPk/${val}/`).then(res => {
          this.placeData = res.info
        })
      },
      bindWorkerChange(data) {
        this.remarkTime.workId = this.placeList[data.target.value].id
        this.placeIndex = data.target.value
        this.getPlaceById(this.remarkTime.workId)
        this.remarkTime.hour = ''
      },
      bindGetUserInfo: function (e) {

      },
      selectMounth(mounth, year) {
        var selectMounth = year + '-' + mounth
        console.log(mounth, year)
        this.getMonth(selectMounth)

      },
      select(val) {
        this.selectData = val[0] + '-' + val[1] + '-' + val[2]
        this.remarkTime.workTime = this.selectData
        var date = new Date(this.selectData);
        var allTime = date.getTime();
        var nowTime = new Date().getTime()
        console.log(allTime, nowTime)
        this.showDrawer = allTime <= nowTime
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
            this.$set(this.events, ele.days, '备注')
          });
        })
      },
      getPlaceList() {
        this.$http.post('/work/address/getSelectAddress/', {}).then(res => {
          this.placeList = res.info
          this.remarkTime.workId = res.info[0].id
          this.getPlaceById(this.remarkTime.workId)
        })
      },
      userlogin() {
        var _this = this
        wx.login({
          success(res) {
            _this.$http.get(`/login/code2Session/${res.code}`).then((res) => {
              wx.setStorageSync("UID", res.info.UID)
              var data = new Date()
              var mounth = data.getMonth() + 1
              var params = data.getFullYear() + '-' + mounth
              _this.getMonth(params)
              _this.getPlaceList()
            })
          }
        })
      }
    },
    onReachBottom() {
      console.log('searchScrollLower')
    },
    onPullDownRefresh() {
      console.log('PullDownRefresh');
    },
    onShow() {
      this.showDrawer = false
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
                wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl)
                wx.setStorageSync("nickName", res.userInfo.nickName)
                _this.userlogin()
              }
            })
          } else { // 未授权跳转登录
            _this.toPage('login')
          }
        }
      })

    },
    mounted() {
      this.hourArr = []
      this.minArr = []
      for (let i = 0; i < 24; i++) {
        this.hourArr.push(i)
      }
      for (let j = 0; j < 60; j++) {
        this.minArr.push(j)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../styles/common.styl';

  .demo-container {
    box-sizing: border-box;
    width 100vw;
    height 100vh;
    background #fff;
    padding: 5px 10px;

  }

  .noPlace {
    margin-top 20px;
    text-align center;

    &>p {
      margin-bottom 10vh;
    }
  }

  .selectPlace {
    border-bottom: 1px solid #ddd;
    padding-bottom 5px;
    display: flex;
    align-items: center;

    &>span {
      flex: 1;
    }

    &>div {
      display: flex;
      white-space: nowrap;
      overflow: hidden;
      align-items: center;

    }

    span {
      white-space: nowrap;
    }
  }

  .placeCont {
    .placeTitle {
      display flex;
      justify-content space-around;
      margin 10px 0;

      span {
        width: 50%;
        text-align: center;
      }
    }
  }

  .calendarWrap {
    height 80vh
  }

  .bottom-btn {
    position absolute bottom 0 width 100%
  }

  .btn {
    width: 100%;
    position: fixed;
    bottom: 5px;

    button {
      background $theme;
      color: #FFF;
      width: 95%;
    }
  }

  .addPlaceText {
    text-align: center;
    font-size 13px color $theme
  }

  .sureBtn {
    background $theme;
    color: #fff;
  }
</style>