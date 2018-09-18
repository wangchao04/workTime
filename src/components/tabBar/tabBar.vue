<template>
  <div>
    <i-tab-bar :fixed="false" :current="current" @change="handleChange">
      <i-tab-bar-item key="index" icon="homepage" current-icon="homepage_fill" title="日历"></i-tab-bar-item>
      <i-tab-bar-item key="workPlace" icon="group" current-icon="group_fill" title="工地"></i-tab-bar-item>
      <i-tab-bar-item key="shouldPay" icon="remind" current-icon="remind_fill" title="应收"></i-tab-bar-item>
      <i-tab-bar-item key="setting" icon="mine" current-icon="mine_fill" title="设置"></i-tab-bar-item>
    </i-tab-bar>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        current: 'index'
      }
    },
    methods: {
      handleChange(val) {
        var _this = this
         _this.current = val.mp.detail.key
        console.log(`/pages/${val.mp.detail.key}/main`)
       wx.switchTab({
         url:`/pages/${val.mp.detail.key}/main`,
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>