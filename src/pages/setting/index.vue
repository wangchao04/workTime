<template>
  <div>
    <div>
      <i-card title="唐哲" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <view slot="content">手机号:13334567890</view>
        <!-- <view slot="footer">尾部内容</view> -->
      </i-card>
      <i-cell-group>
        <i-cell title="绑定手机" is-link url="/pages/dashboard/index"></i-cell>
        <i-cell title="使用帮助" is-link url="/pages/dashboard/index"></i-cell>
      </i-cell-group>
      
    </div>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {

      }
    },

    components: {
      VueTabBar
    },

    methods: {

    },

    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>

</style>