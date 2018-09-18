<template>
  <div>
    <div class="calendarWrap">
        <Calendar :events="events"  :clean="true" @select="select" ref="calendar"  />
    </div>
    <i-button @click="toPage('newPlace')" type="primary">新建工地</i-button>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        events: {
          '2018-9-7': '今日备注',
          '2018-9-8': '一条很长的明日备注'
        },
      }
    },

    components: {
      Calendar,
      VueTabBar
    },

    methods: {
      select(val) {
        console.log(val)
      },
       toPage(to) {
        wx.navigateTo({
          url: `/pages/${to}/main`,
          success: function (res) {
            console.log("success")
          },
        })
      },
    },

    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
.calendarWrap
  height 80vh
</style>