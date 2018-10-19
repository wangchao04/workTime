<template>
  <div>
    <div>
      <i-cell-group>
        <i-cell @click="toPage('placeView',item.id)" v-for="(item,index) in dataArr" :key="index" :title="item.address">
          <p>{{item.workTypeName}}</p>
          <p>{{item.beginDate}}</p>
          <p>{{item.statusName}}</p>
          <i-icon v-if="item.status == 1" @click="selectedItem = item; actionVisible = true" slot="footer" type="other"
            size="28" color="#80848f" />
        </i-cell>
      </i-cell-group>
    </div>
    <div>
      <i-action-sheet :visible="actionVisible" :actions="actions" @cancel="handleClickCancel" @clickItem="handleClickItem" />
    </div>
    <i-modal title="结账" :visible="visible" @ok.stop="handleOk" @cancel.stop="handleClose">
    </i-modal>
    <i-modal title="删除确认" :visible="deleteVisible" @cancel.stop="handleClose" @ok.stop="deleteOk">
      <view>删除后无法恢复哦</view>
    </i-modal>
    <i-message id="message" />
    <!-- <VueTabBar></VueTabBar> -->
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
        deleteVisible: false,
        actionVisible: false,
        selectedItem: {},
        realMoney: '',
        dataArr: [],
        visible: false,
        actions: [{
            name: '编辑',
          },
          {
            name: '记工'
          },
          {
            name: '收款'
          },
          {
            name: '结账',
          },
          {
            name: '删除',
            color: '#ed3f14'
          }
        ]
      }
    },

    computed: {

    },

    components: {
      VueTabBar
    },

    methods: {
      deleteOk() {
        this.$http.post('/work/address/openOrClose', {
          active: 0,
          ids: [this.selectedItem.workId]
        }).then(res => {
          if (res.success) {
            this.getAdderssList()
            this.deleteVisible = false
            this.actionVisible = false
              $Message({
                content: '删除成功',
                // type: 'warning'
              });
          } else {
            $Message({
              content: res.message,
              type: 'warning'
            });
          }
        })
      },
      handleClickCancel() {
        this.actionVisible = false
      },
      // 修改了static/iview/action-sheet文件
      handleClickItem(event) {
        switch (event.target.name) {
          case '编辑':
            this.toPage('newPlace', this.selectedItem.workId)
            this.actionVisible = false
            break
          case '记工':
            if (this.selectedItem.payrollSystem == 3) {
              $Message({
                content: '包工制无需记工',
                type: 'warning'
              });
            } else {
              this.toPage('remarkTime', this.selectedItem.workId)
              this.actionVisible = false
            }
            break
          case '收款':
            this.toPage('actualPay', this.selectedItem.workId)
            this.actionVisible = false
            break
          case '结账':
            this.visible = true
            break
          case '删除':
            this.deleteVisible = true
            break
        }
      },
      getAdderssList() {
        this.$http.post('/work/address/list', {
          currentPage: 1,
          pageSize: 10
        }).then(res => {
          if (res.success) {
            this.dataArr = res.info.list
          }
        })
      },
      toPage(to, data) {
        wx.navigateTo({
          url: `/pages/${to}/main?id=${data}`,
          success: function (res) {
            console.log("success")
          },
        })
      },
      handleClose() {
        this.visible = false
      },
      // 结账
      handleOk() {
        this.$http.post('/receivable/save', {
          workId: this.selectedItem.workId
        }).then(res => {
          if (res.success) {
            this.visible = false
             this.actionVisible = false
            $Message({
              content: '结账成功',
            });
          } else {
            $Message({
              content: res.message,
              type: 'warning'
            });
          }
        })
      }
    },
    onShow() {
      this.getAdderssList()
    }
  }
</script>

<style lang="stylus" scoped>

</style>