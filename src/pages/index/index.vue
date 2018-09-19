<template>
  <div>
    <div class="calendarWrap">
      <Calendar :events="events" :clean="true" @select="select" ref="calendar" />
    </div>
    <div  @click="toPage('newPlace')" class="addPlace">
      <i-icon type="add" size="30" color="#fff" />
    </div>
    <p class="addPlaceText">创建工地</p>
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
  .calendarWrap {
    height 80vh
  }

  .bottom-btn {
    position absolute bottom 0 width 100%
  }

  .addPlace {
    background: #3b75fb;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

  }

  .addPlaceText {
    text-align: center;
    font-size 13px
    color #3b75fb
  }
</style>