<template>
  <div class="background font">
    <div v-if="dataArr.length == 0" class="noContant">
      暂无应收
    </div>
    <i-cell-group>
      <i-cell class="contant" v-for="(item,index) in dataArr" :key="index">
        <p>
          <span>工地:</span>
          <span> {{item.workName}}</span>
        </p>
        <p>
          <span>实收/应收:</span>
          <span> {{item.paidInAccount}}/{{item.receivables}}</span>
        </p>
        <p>
          <span>实收生成时间:</span>
          <span> {{item.paymentDate}}</span>
        </p>
        <div class="box">
          <div class="text">{{item.statusName}}</div>
        </div>
        <i-icon @click="selectedItem = item; actionVisible = true" slot="footer" type="other" size="28" color="#80848f" />
      </i-cell>
    </i-cell-group>
    <div>
      <i-action-sheet :visible="actionVisible" :actions="actions" @cancel="handleClickCancel" @clickItem="handleClickItem" />
    </div>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        dataArr: [],
        selectedItem: {},
        actions: [{
          name: '收款'
        }],
        actionVisible: false
      }
    },

    components: {
      VueTabBar
    },

    methods: {
      // 修改了static/iview/action-sheet文件
      handleClickItem(event) {
        switch (event.target.name) {
          case '收款':
            this.toPage('actualPay', this.selectedItem.workId, this.selectedItem.id)
            break
        }
        this.actionVisible = false
      },
      handleClickCancel() {
        this.actionVisible = false
      },
      toPage(to, data, data2) {
        wx.navigateTo({
          url: `/pages/${to}/main?id=${data}&receivablesNo=${data2}`,
          success: function (res) {
            console.log("success")
          },
        })
      },
      // 获取应收列表
      getShouldPayList() {
         wx.showLoading({
          mask: true
        })
        this.$http.post('/receivable/list', {
          currentPage: 1,
          pageSize: 10000
        }).then(res => {
           wx.hideLoading()
          this.dataArr = res.info.list
        })
      }
    },

    onShow() {
      this.getShouldPayList()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../styles/common.styl';

  .contant {
    p {
      span:nth-child(1) {
        width: 90px;
        display: inline-block;
        text-align: right;

      }
    }

    .box {
      width: 160rpx;
      height: 160rpx;
      background-color: $theme;
      color: #fff;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      position: absolute;
      right: -100rpx;
      top: -100rpx;
      text-align: center;

    }

    .text {
      position: absolute;
      bottom: 0;
      font-size 10px;
      left:25px;
    }
  }
</style>