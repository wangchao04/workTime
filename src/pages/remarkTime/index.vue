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
          <input :value="selectDay" :disabled="true" placeholder="请选择进场日期" />
        </picker>
      </i-panel>
    </p>
    <p>
      <i-panel>
        <input v-model="workTime" type="digit" placeholder="请填写工作时长"/>
      </i-panel>

    </p>
    <p>
      <i-panel title="工作天数:">
        <radio-group class="radio-group" @change="handleFruitChange">
          <label class="radio" v-for="(item, index) in radioArray" :key="item.code">
            <radio :value="item.code"/> {{item.name}}
          </label>
        </radio-group>
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
        workDay: '',
        radioArray:[{
          code:1,
          name:'1天'
        },
        {
          code:2,
          name:'0.5天'
        }]
      }
    },

    components: {
      VueTabBar
    },

    methods: {
      bindDateChange(data) {
        this.selectDay = data.target.value
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