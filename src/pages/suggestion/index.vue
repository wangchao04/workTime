<template>
  <div class="background font">
    <div v-if="list.length == 0" class="noContant">
      <p>暂无历史反馈</p>
      <div class="btn">
        <button @click="toPage('newSuggestion')">反馈</button>
      </div>
    </div>
    <div v-else class="content">
      <!-- <i-collapse :name="itemIndex">
        <i-collapse-item i-class="suggestitem" style="background:#fff;" v-for="(item,index) in list" :title="item.content" :name="item.index" :key="item.index" @click="clickItem()">
          <view slot="content">
            huifu
          </view>
        </i-collapse-item>
      </i-collapse> -->
      <div v-for="(item,index) in list">
        <p>
          Q: {{item.content}}
        </p>

        <div v-if="item.feedBackVo">
          {{item.feedBackVo.content}}
        </div>
        <div v-else>
         暂无回复
        </div>
      </div>
      <div class="button">
        <button @click="toPage('newSuggestion')">反馈</button>
      </div>
    </div>
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        list: [],
        itemIndex: -1,
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
        wx.showLoading({
          mask: true
        })
        this.$http.post(`/feedback/list`, {
          currentPage: 1,
          pageSize: 10000
        }).then(res => {
          wx.hideLoading()
          this.list = res.info.list
        })
      },
      clickItem() {
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

  .content {
    padding:10rpx 15px;
    padding-bottom 60px;


    &>div {
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;

      p {
        margin-bottom: 10px;
        font-size: 15px;
      }

      &>div {
        color: #8c8c8c;
        margin-bottom: 10px;
        font-size: 14px;

      }
    }
  }

  .button {
    width: 92%;
    position: fixed;
    bottom: 5px;

    button {
      background $theme;
      color: #FFF;
      width: 95%;
    }
  }


  .btn {
    button {
      background rgba(221, 221, 221, 0.5);
      // color: #FFF;
      font-size: 13px;
      width: 60px;
    }
  }
</style>