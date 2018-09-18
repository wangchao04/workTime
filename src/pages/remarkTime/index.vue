<template>
  <div>
    <div>
      <span>当前工地:111</span>
      <span>每天工资:2222</span>
    </div>
    <p>
      <picker mode="date" :value="selectDay" @change="bindDateChange">
        <span> 请选择日期: {{selectDay}}</span>
      </picker>
    </p>
    <p>
      <span>工作时长:</span>
      <i-input-number :value="workTime" min="0" max="24" step="0.5" @change="workTimeChange" />
    </p>
    <p>
      <span>工作天数:</span>
      <i-radio-group :current="workDay" @change="handleFruitChange">
        <i-radio position="left" value="1天">
        </i-radio>
        <i-radio position="left" value="0.5天">
        </i-radio>
      </i-radio-group>
    </p>
    <i-button type="primary">保存</i-button>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        selectDay: '2016-09-01',
        workTime: 0,
        workDay:''
      }
    },

    components: {
      VueTabBar
    },

    methods: {
      bindDateChange(data) {
        this.selectDay = data.target.value
      },
      workTimeChange(data) {
        this.workTime = data.target.value
      },
      handleFruitChange(data){
        console.log(1,data)
        this.workDay = data.target.value
      }
    },

    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>

</style>