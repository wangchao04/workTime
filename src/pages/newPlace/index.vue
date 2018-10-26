<template>
  <div>
    <div class="newPlace">
      <i-cell-group>
        <i-cell title="计时制(必填):">
          <picker slot="footer" v-if="isFromAdd || placeData.status == 1" mode="selector" range-key="name" :value="timeIndex"
            :range="timeWayArray" @change="timeWayChange">
            <input placeholder="请选择计时制" :value="timeWayArray[timeIndex] ? timeWayArray[timeIndex].name : ''" :disabled="true">
          </picker>
          <span v-else slot="footer">{{placeData.payrollSystemName}}</span>
        </i-cell>
        <i-cell title="工作地点(必填):">
          <div style="display:flex" slot="footer" v-if="isFromAdd || placeData.status == 1">
            <input placeholder="请填写工作地点"  v-model="placeData.address" :disabled="false" />
            <!-- <i-icon @click="selectAddress"  type="coordinates" size="28" color="#80848f" /> -->
          </div>
          <span slot="footer" v-else>{{placeData.address}}</span>
        </i-cell>
        <i-cell title="金额(必填):">
          <input slot="footer" placeholder="请填写金额" v-model="placeData.fee" type="digit" :disabled="!(isFromAdd || placeData.status == 1)" />
        </i-cell>
        <i-cell title="工种(必填):">
          <picker slot="footer" v-if="isFromAdd || placeData.status == 1" mode="selector" range-key="name" :range="workerArray"
            :value="workIndex" @change="bindWorkerChange">
            <input placeholder="请选择工种" :value="workerArray[workIndex] ? workerArray[workIndex].name : ''" :disabled="true">
          </picker>
          <span slot="footer" v-else>{{placeData.workTypeName}}</span>
        </i-cell>
        <i-cell title="进场日期(必填):">
          <picker slot="footer" v-if="isFromAdd || placeData.status == 1" mode="date" :value="placeData.beginDate"
            @change="bindDateChange">
            <input :disabled="true" placeholder="请选择进场日期" v-model="placeData.beginDate" />
          </picker>
          <span slot="footer" v-else>{{placeData.beginDate}}</span>
        </i-cell>
        <i-cell title="介绍人:">
          <input slot="footer" placeholder="请填写介绍人" v-model="placeData.introducer" :disabled="!(isFromAdd || placeData.status == 1)" />
        </i-cell>
        <i-cell title="备注:">
          <input slot="footer" placeholder="请填写备注" v-model="placeData.remark" :disabled="!(isFromAdd || placeData.status == 1)" />
        </i-cell>
      </i-cell-group>

    </div>
    <div class="btn" v-if="isFromAdd || placeData.status == 1">
      <button @click="newPlace()">保存</button>
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
        workIndex: -1,
        timeIndex: -1,
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
        timeWayArray: [{
            code: 1,
            name: '小时制'
          },
          {
            code: 2,
            name: '日制'
          },
          {
            code: 3,
            name: '包工制'
          }
        ],
        radioArray: []
      }
    },
    comupted: {

    },
    methods: {
      selectAddress(){
        this.getLocation()
      },
      getLocation() {
        var _this = this
        wx.chooseLocation({
          success: function (res) {
            _this.placeData.address = res.name
          },
          fail:function(res){
            console.log(res)
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
        if (!(this.placeData.address && this.placeData.beginDate && this.placeData.fee &&
            this.placeData.payrollSystem && this.placeData.workType)) {
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
        this.placeData.workType = this.workerArray[data.target.value].code
        this.workIndex = data.target.value
      },
      timeWayChange(data) {
        this.placeData.payrollSystem = this.timeWayArray[data.target.value].code
        this.timeIndex = data.target.value
      }
    },
    onShow() {
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
      
    },
    mounted() {

    }
  }
</script>
<style>
  .i-cell-text {
    width: 100px;
  }
</style>


<style lang="stylus" scoped>
  @import '../../styles/common.styl';
  .bottom-btn {
    position absolute bottom 0 width 100%
  }

  .newPlace {
    input {}
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
</style>