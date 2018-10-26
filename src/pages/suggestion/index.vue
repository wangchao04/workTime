<template>
  <div>
    <div class="noContant">
      暂无历史反馈
    </div>
    <div class="btn">
      <button @click="toPage('newSuggestion')">新增反馈</button>
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

  .noContant {
    text-align: center;
    margin-top: 40vh;
    color: rgba(0, 0, 0, 0.5);
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