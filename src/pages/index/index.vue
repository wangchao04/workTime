<template>
  <div>
    <div class="calendarWrap">
      <Calendar :events="events" :clean="true" @prev="selectMounth" @next="selectMounth" @select="select" ref="calendar" />
    </div>

    <div>
      <div @click="toPage('newPlace')" class="addPlace">
        <i-icon type="add" size="30" color="#fff" />
      </div>
      <p class="addPlaceText">创建工地</p>
    </div>

    <i-drawer mode="bottom" :visible="showDrawer" @close="showDrawer = false">
      <div class="demo-container">
        <p>{{selectData}}</p>
        <div class="selectPlace">
          <span>请选择工地:</span>
          <div>
            <picker style="overflow:hidden;" slot="footer" range-key="address" :range="placeList" :value="placeIndex"
              @change="bindWorkerChange">
              {{placeList[placeIndex] ? placeList[placeIndex].address :'暂无'}}
            </picker>
            <i-icon type="enter" size="28" color="#F4A900" />
          </div>
        </div>
        <div class="noPlace" v-if="placeList.length == 0">
          <p>未检测到工地,让我们来创建第一个工地</p>
          <div>
            <div @click="toPage('newPlace')" class="addPlace">
              <i-icon type="add" size="30" color="#fff" />
            </div>
            <p class="addPlaceText">创建工地</p>
          </div>
        </div>
        <div v-if="placeList.length > 0" class="placeCont">
          <p class="placeTitle">
            <span>{{placeData.payrollSystemName}}</span>
            <span v-if="placeData.payrollSystem == 1">{{placeData.fee}}/小时</span>
            <span v-if="placeData.payrollSystem == 2">{{placeData.fee}}/天</span>
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
            <picker mode="selector" @change="timeHourSelect">
              <input :disabled="true" placeholder="请选择小时" :value="remarkTime.workHour" />
            </picker>
            <picker mode="selector" @change="timeMinSelect">
              <input :disabled="true" placeholder="请选择分钟" :value="remarkTime.workMin" />
            </picker>
          </p>
          <p style="margin-top:20px;">
            <i-button>确认</i-button>
          </p>
          <!-- <p>工作天数</p> -->
        </div>
      </div>
    </i-drawer>

  </div>
</template>

<script>
  // import Calendar from 'mpvue-calendar'
  import VueTabBar from '../../components/card.vue'
  import Calendar from '../../components/calendar/mpvue-calendar.vue'
  import {
    formatTime
  } from '../../utils/index.js'

  export default {
    data() {
      return {
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
          hour: ''
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
        this.showDrawer = true
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
            this.$set(this.events, ele.days, '备注')
          });
        })
      },
      getPlaceList() {
        this.$http.post('/work/address/getSelectAddress/').then(res => {
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

    &>span {
      flex: 1;
    }

    &>div {
      display: flex;
      white-space: nowrap;
      overflow: hidden;

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

  .addPlace {
    background: $theme;
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
    font-size 13px color $theme
  }
</style>