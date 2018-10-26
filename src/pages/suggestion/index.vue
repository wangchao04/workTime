<template>
  <div>
    <div class="noContant">
      暂无历史反馈
    </div>
    <div class="btn">
      <button  @click="toPage('newSuggestion')">反馈</button>
    </div>

  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {}
    },

    components: {
      VueTabBar
    },

    methods: {
      toPage(to) {
        wx.navigateTo({
          url: `/pages/${to}/main`,
          success: function (res) {
            console.log("success")
          },
        })
      },
    },
    onShow() {},

    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../styles/common.styl';
  .btn {
    button {
      background rgba(221,221,221,0.5);
     // color: #FFF;
      font-size:13px;
       width: 60px;
    }
  }
</style>