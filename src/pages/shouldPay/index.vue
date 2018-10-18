<template>
  <div>
    <i-cell-group>
      <i-cell v-for="(item,index) in dataArr" :key="index" title="" is-link>
         {{item.remark}}
      </i-cell>
    </i-cell-group>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        dataArr: []
      }
    },

    components: {
      VueTabBar
    },

    methods: {
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