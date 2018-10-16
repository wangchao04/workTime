<template>
  <div>
    <div>
      <i-panel title="工作地点:">
        <input v-model="placeData.address" :disabled="!(isFromAdd || placeData.status == 1)" />
      </i-panel>
      <i-panel title="金额:">
        <input v-model="placeData.fee" type="digit" :disabled="!(isFromAdd || placeData.status == 1)" />
      </i-panel>
      <i-panel title="介绍人:">
        <input v-model="placeData.introducer" :disabled="!(isFromAdd || placeData.status == 1)" />
      </i-panel>
      <i-panel title="备注:">
        <input v-model="placeData.remark" :disabled="!(isFromAdd || placeData.status == 1)" />
      </i-panel>
      <i-panel title="工种:">
        <picker v-if="isFromAdd || placeData.status == 1" mode="selector" range-key="name" :range="workerArray" :value="placeData.workType"
          @change="bindWorkerChange">
          <input :disabled="true" :value="workerArray[placeData.workType] ? workerArray[placeData.workType].name : ''" />
        </picker>
        <input v-else v-model="placeData.workTypeName" :disabled="true">
      </i-panel>
      <i-panel title="进场日期:">
        <picker v-if="isFromAdd || placeData.status == 1" mode="date" :value="placeData.beginDate" @change="bindDateChange">
          <input :disabled="true" v-model="placeData.beginDate" />
        </picker>
        <input v-else v-model="placeData.beginDate" :disabled="true">
      </i-panel>
      <i-panel title="计时制:">
        <radio-group v-if="isFromAdd || placeData.status == 1" class="radio-group" @change="timeWayChange">
          <label class="radio" v-for="(item, index) in radioArray" :key="item.code">
            <radio :value="item.code" :checked="placeData.payrollSystem == item.code" /> {{item.name}}
          </label>
        </radio-group>
        <input v-else v-model="placeData.payrollSystemName" :disabled="true">
      </i-panel>
    </div>
    <div class="bottom-btn" v-if="isFromAdd || placeData.status == 1">
      <i-button @click="newPlace()" type="primary">保存</i-button>
    </div>
    <i-message id="message" />
  </div>
</template>

<script>
  const {
    $Message
  } = require('../../../static/iview/base/index.js');
  export default {
    data() {
      return {
        placeId: '',
        placeData: {
          address: '',
          beginDate: '',
          introducer: '',
          remark: '',
          fee: '',
          payrollSystem: '', // 计时制
          workType: '' // 工种
        },
        isFromAdd: true,
        workerArray: [],
        radioArray: []
      }
    },
    comupted: {

    },
    methods: {
      getWorkTypeList() {
        this.$http.post(`/enum/work/type`).then(res => {
          this.workerArray = res.info
        })
      },
      getPayrollSystemList() {
        this.$http.post(`/enum/payroll/system`).then(res => {
          this.radioArray = res.info
        })
      },
      getPlaceById() {
        this.$http.get(`/work/address/queryByPk/${this.placeId}/`).then(res => {
          this.placeData = res.info
        })
      },
      newPlace() {
        if (!(this.placeData.address && this.placeData.beginDate && this.placeData.introducer && this.placeData.fee &&
            this.placeData.payrollSystem && this.placeData.workType)) {
          console.log(33, this.placeData)
          $Message({
            content: '请将表单填写完整',
            // type: 'warning'
          });
          return
        }

        this.$http.post('/work/address/save', this.placeData).then(res => {
          wx.switchTab({
            url: `/pages/workPlace/main`,
            success: function (res) {
              console.log("success")
            },
          })
        })
      },

      bindDateChange(data) {
        this.placeData.beginDate = data.target.value
      },
      bindWorkerChange(data) {
        this.placeData.workType = data.target.value
      },
      timeWayChange(data) {
        this.placeData.payrollSystem = data.target.value
      },
      chooseLocation() {
        wx.chooseLocation({
          success: function (res) {
            console.log(res)
          }
        })
      }
    },
    onLoad(options) {
      this.getWorkTypeList()
      this.getPayrollSystemList()
      if (options.id) {
        this.placeId = options.id
        this.isFromAdd = false
        this.getPlaceById()
      } else {
        this.isFromAdd = true
        for (let i in this.placeData) {
          this.placeData[i] = null
        }
      }
    },
    mounted(options) {

      var _this = this
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              wx.getLocation({
                success: function (res) {
                  console.log(res)
                }
              })
            }
          })
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .bottom-btn {
    position absolute bottom 0 width 100%
  }
</style>