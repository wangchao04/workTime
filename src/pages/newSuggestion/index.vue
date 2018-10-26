<template>
  <div class="background">
    <div class="textarea">
      <textarea style="width:100%;" v-model="suggestion" auto-focus />
      </div>
    <div class="btn">
      <button>保存</button>
    </div>
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        suggestion:''
      }
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

.textarea{
  background #fff;
  border:1px solid #ddd;
  padding:2px;
  width:94%;
  margin:0 auto;

  }
     .btn {
    width: 100%;
    position: fixed;
    bottom: 5px;
    button{
      background $theme;
      color:#FFF;
      width:95%;
    }
  }
</style>