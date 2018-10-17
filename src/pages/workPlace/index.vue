<template>
  <div>
    <div v-if="dataArr.length > 0">
      <i-swipeout v-for="(item,index) in dataArr" :key="index" i-class="i-swipeout-demo-item" :id="item.id" :actions="actions"
        @change="menuClick">
        <view slot="content">
          <div @click="toPage('newPlace',item.id)" slot="content">
            <p>{{item.address}}</p>
            <p>{{item.workTypeName}}</p>
            <p>{{item.beginDate}}</p>
          </div>
        </view>
      </i-swipeout>
    </div>
    <i-modal title="结账" :visible="visible" @ok.stop="handleClose" @cancel.stop="handleClose">
      应收 : $12000
      <i-panel v-if="visible" :hide-border="true">
        <i-input type="digit" :value="realMoney" autofocus placeholder="请填写实收金额" @change="realMoneyChange" />
      </i-panel>
    </i-modal>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        realMoney: '',
        dataArr: [],
        visible: false,
        actions: [{
            name: '结账',
            color: '#fff',
            fontsize: '20',
            width: 100,
            background: 'blue'
          },
          {
            name: '记工',
            width: 100,
            color: '#fff',
            fontsize: '20',
            background: 'orange'
          },
          {
            name: '删除',
            width: 100,
            color: '#fff',
            fontsize: '20',
            background: '#ed3f14'
          }
        ]
      }
    },

    components: {
      VueTabBar
    },

    methods: {
      getAdderssList() {
        this.$http.post('/work/address/list', {
          currentPage: 1,
          pageSize: 10
        }).then(res => {
          this.dataArr = res.info.list
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
      realMoneyChange() {
        this.realMoney = data.target.value
      },
      menuClick(val) {
        console.log(11, val)
        if (val.target.index == 0) {
          this.visible = true
        } else if (val.target.index == 1) {
          this.toPage('remarkTime', val.target.id)
        } else {
          console.log('delete')
        }

      }

    },
    onShow() {
      this.getAdderssList()
    }
  }
</script>

<style lang="stylus" scoped>

</style>