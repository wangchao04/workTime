<template>
  <div>
    <i-modal title="授权" :show-ok="false" :show-cancel="false" :visible="visible">
      <view>工友汇需要您的授权</view>
      <i-button open-type="getUserInfo" @getuserinfo="bindUserInfo">授权</i-button>
    </i-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible:true
      }
    },

    components: {

    },
    methods: {
      bindUserInfo(val){
        console.log(val.target.rawData)
        if(val.target.rawData){
          this.visible = false
           wx.switchTab({
             url:'/pages/index/main'
           })
        }
      }
    },

    onShow() {
    },
    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>

</style>