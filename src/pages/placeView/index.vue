<template>
  <div>
    <div class="">
      <i-cell-group>
        <i-cell title="计时制:">
          <input slot="footer"  v-model="placeData.payrollSystemName" :disabled="true">
        </i-cell>
        <i-cell title="工作地点:">
          <input slot="footer" v-model="placeData.address" :disabled="true" />
        </i-cell>
        <i-cell title="金额:">
          <input slot="footer" v-model="placeData.fee" type="digit" :disabled="true" />
        </i-cell>
        <i-cell title="介绍人:">
          <input slot="footer" v-model="placeData.introducer" :disabled="true" />
        </i-cell>
        <i-cell title="备注:">
          <input slot="footer" v-model="placeData.remark" :disabled="true" />
        </i-cell>
        <i-cell title="工种:">
          <input slot="footer" v-model="placeData.workTypeName" :disabled="true">
        </i-cell>
        <i-cell title="进场日期:">
          <input slot="footer" v-model="placeData.beginDate" :disabled="true">
        </i-cell>
      </i-cell-group>
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
      }
    },
    comupted: {

    },
    methods: {
      getPlaceById() {
        this.$http.get(`/work/address/queryByPk/${this.workId}/`).then(res => {
          this.placeData = res.info
        })
      },
    },
    onShow() {
      this.workId = this.$mp.page.options.id ? this.$mp.page.options.id : ''
      this.getPlaceById()
    }
  }
</script>

<style lang="stylus" scoped>
  .bottom-btn {
    position absolute bottom 0 width 100%
  }
</style>