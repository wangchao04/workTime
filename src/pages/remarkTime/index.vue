<template>
  <div>
    <div>
      <i-panel>
        <i-input value="111" title="当前工地:" :disabled="true" />
      </i-panel>
      <i-panel>
        <i-input value="111" title="每天工资:" :disabled="true" />
      </i-panel>
    </div>
    <p>
      <i-panel>
        <picker mode="date" :value="selectDay" @change="bindDateChange">
          <i-input :value="selectDay" :disabled="true" placeholder="请选择进场日期" />
        </picker>
      </i-panel>
    </p>
    <p>
      <i-panel>
        <i-input :value="workTime" type="digit" placeholder="请填写工作时长" @change="workTimeChange"/>
      </i-panel>

    </p>
    <p>
      <i-panel title="工作天数:">
        <i-radio-group :current="workDay" @change="handleFruitChange">
          <i-radio position="left" value="1天">
          </i-radio>
          <i-radio position="left" value="0.5天">
          </i-radio>
        </i-radio-group>
      </i-panel>
    </p>
    <div class="bottom-btn">
          <i-button type="primary">保存</i-button>
    </div>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        selectDay: '',
        workTime: '',
        workDay: ''
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
      handleFruitChange(data) {
        console.log(1, data)
        this.workDay = data.target.value
      }
    },

    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>
.bottom-btn{
    position absolute
    bottom 0
    width 100%
  }
</style>