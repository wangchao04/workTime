<template>
  <div>
    <div class="newPlace">
      <i-cell-group>
        <i-cell title="计时制:">
          <radio-group slot="footer" v-if="isFromAdd || placeData.status == 1" class="radio-group" @change="timeWayChange">
            <label class="radio" v-for="(item, index) in radioArray" :key="item.code">
              <radio :value="item.code" :checked="placeData.payrollSystem == item.code" /> {{item.name}}
            </label>
          </radio-group>
          <input slot="footer" v-else v-model="placeData.payrollSystemName" :disabled="true">
        </i-cell>
        <i-cell title="工作地点:">
          <input slot="footer" v-if="isFromAdd || placeData.status == 1" @click="getLocation()" v-model="placeData.address"
            :disabled="true" />
          <input slot="footer" v-else v-model="placeData.address" :disabled="true" />
        </i-cell>
        <i-cell title="金额:">
          <input slot="footer" v-model="placeData.fee" type="digit" :disabled="!(isFromAdd || placeData.status == 1)" />
        </i-cell>
        <i-cell title="介绍人:">
          <input slot="footer" v-model="placeData.introducer" :disabled="!(isFromAdd || placeData.status == 1)" />
        </i-cell>
        <i-cell title="备注:">
          <input slot="footer" v-model="placeData.remark" :disabled="!(isFromAdd || placeData.status == 1)" />
        </i-cell>
        <i-cell title="工种:">
          <picker slot="footer" v-if="isFromAdd || placeData.status == 1" mode="selector" range-key="name" :range="workerArray"
            :value="placeData.workType" @change="bindWorkerChange">
            <input :disabled="true" :value="workerArray[placeData.workType] ? workerArray[placeData.workType].name : ''" />
          </picker>
          <input slot="footer" v-else v-model="placeData.workTypeName" :disabled="true">
        </i-cell>
        <i-cell title="进场日期:">
          <picker slot="footer" v-if="isFromAdd || placeData.status == 1" mode="date" :value="placeData.beginDate"
            @change="bindDateChange">
            <input :disabled="true" v-model="placeData.beginDate" />
          </picker>
          <input slot="footer" v-else v-model="placeData.beginDate" :disabled="true">
        </i-cell>
      </i-cell-group>

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
        workId: '',
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
      getLocation() {
        var _this = this
        wx.chooseLocation({
          success: function (res) {
            _this.placeData.address = res.name
            console.log(1, _this.placeData.address)
          }
        })
      },
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
        this.$http.get(`/work/address/queryByPk/${this.workId}/`).then(res => {
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
          if (res.success) {
            wx.switchTab({
              url: `/pages/workPlace/main`,
              success: function (res) {
                $Message({
                  content: '保存成功',
                  // type: 'warning'
                });
              },
            })
          } else {
            $Message({
              content: res.message,
              type: 'warning'
            });
          }
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
    onShow() {

    },
    mounted() {
      this.getWorkTypeList()
      this.getPayrollSystemList()
      this.workId = this.$mp.page.options.id ? this.$mp.page.options.id : ''
      if (this.workId) {
        this.isFromAdd = false
        this.getPlaceById()
      } else {
        this.isFromAdd = true
        for (let i in this.placeData) {
          this.placeData[i] = null
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bottom-btn {
    position absolute bottom 0 width 100%
  }

  .newPlace {
    input {
      width: 70vw;
    }
  }
</style>