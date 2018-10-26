<template>
  <div>
    <div class="">
      <i-cell-group>
        <i-cell title="支付人姓名:">
          <input slot="footer" v-model="actualData.payName" />
        </i-cell>
        <i-cell title="实收金额:">
          <input slot="footer" v-model="actualData.paidInFee" type="digit" />
        </i-cell>
        <i-cell title="实收时间:">
          <picker slot="footer" mode="date" :value="actualData.paidDate" @change="bindDateChange">
            <input :disabled="true" v-model="actualData.paidDate" />
          </picker>
        </i-cell>
        <i-cell title="备注:">
          <input slot="footer" v-model="actualData.remark" />
        </i-cell>
      </i-cell-group>
    </div>
    <div class="btn">
      <button @click="save()">保存</button>
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
        actualData: {
          payName: '',
          paidInFee: '',
          paidDate: '',
          remark: '',
          workId: '',
          receivablesId:''
        },
      }
    },
    comupted: {

    },
    methods: {
      save() {
        if (!(this.actualData.payName && this.actualData.paidInFee && this.actualData.paidDate)) {
          $Message({
            content: '请将表单填写完整',
            // type: 'warning'
          });
          return
        }

        this.$http.post('/official/receipts/save', this.actualData).then(res => {
          if (res.success) {
            for (let i in this.actualData) {
              this.actualData[i] = null
            }
            wx.switchTab({
              url: `/pages/shouldPay/main`,
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
        this.actualData.paidDate = data.target.value
      },
    },
    onShow() {
      var id = this.$mp.page.options.id
      var receivablesNo = this.$mp.page.options.receivablesNo
      this.actualData.workId = id && id != 'undefined' ? id : null
      this.actualData.receivablesId = receivablesNo && receivablesNo != 'undefined' ? receivablesNo : null
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../styles/common.styl';
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
</style>