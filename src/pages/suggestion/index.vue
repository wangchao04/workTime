<template>
  <div class="background ">
    <div v-if="list.length == 0" class="noContant">
      <p>暂无历史反馈</p>
      <div class="btn">
        <button @click="toPage('newSuggestion')">反馈</button>
      </div>
    </div>
    <div v-else>
      <i-collapse :name="itemIndex" >
        <i-collapse-item v-for="(item,index) in list" :title="item.content" :name="item.index" :key="item.index" @click="clickItem()">
          <view slot="content">
           huifu
          </view>
        </i-collapse-item>
      </i-collapse>
    </div>
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        list: [],
        itemIndex:-1,
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
      getSuggestList() {
        this.$http.post(`/feedback/list`, {
          currentPage: 1,
          pageSize: 10000
        }).then(res => {
          this.list = res.info.list
        })
      },
      clickItem(){
        console.log(1)
      }
    },
    onShow() {
      this.getSuggestList()
    },

    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../styles/common.styl';



  .btn {
    button {
      background rgba(221, 221, 221, 0.5);
      // color: #FFF;
      font-size: 13px;
      width: 60px;
    }
  }
</style>