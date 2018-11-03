<template>
  <div class="background font">
    <form @submit="newSuggestion" report-submit="true">
      <div class="textarea">
        <textarea style="width:100%;" v-model="suggestion" auto-focus />
        </div>
    <div class="btn">
      <button formType="submit">保存</button>
    </div>
    </form>
     <i-message id="message" />
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'
  const {
    $Message
  } = require('../../../static/iview/base/index.js');
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
        // wx.redirectTo({
        //   url: `/pages/${to}/main`,
        //   success: function (res) {
        //     console.log("success")
        //   },
        // })
        wx.navigateBack({
    delta: 1
})
      },
      newSuggestion(e) {
 wx.showLoading({
          mask: true
        })
        this.$http.post(`/feedback/save`, {
          content:this.suggestion,
          formId:e.mp.detail.formId
        }).then(res => {
         if(res.success){
             wx.hideLoading()
           this.toPage('suggestion')
            $Message({
                  content: '保存成功',
                  // type: 'warning'
                });
         }else {
            $Message({
              content: res.message,
              type: 'warning'
            });
          }
        })
      }
    },
    onShow() {
      this.suggestion = ''
    },

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
  position:relative;
  top:10px;


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