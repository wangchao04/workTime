<template>
  <div>
    <i-cell-group>
      <i-cell v-for="(item,index) in dataArr" :key="index">
        {{item.remark}}
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
            this.toPage('actualPay', this.selectedItem.workId,this.selectedItem.receivablesNo)
            break
        }
        this.actionVisible = false
      },
      handleClickCancel() {
        this.actionVisible = false
      },
      toPage(to, data,data2) {
        wx.navigateTo({
          url: `/pages/${to}/main?id=${data}&receivablesNo=${data2}`,
          success: function (res) {
            console.log("success")
          },
        })
      },
      // 获取应收列表
      getShouldPayList() {
        this.$http.post('/receivable/list', {
          currentPage: 1,
          pageSize: 10
        }).then(res => {
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

</style>