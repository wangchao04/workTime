<template>
  <div>
    <div v-if="isFromAdd">
        <i-input :value="alue1" title="工作地点" autofocus placeholder="工作地点" />
        <picker mode="selector" range-key="name" :range="workerArray" :value="selectWorker" @change="bindWorkerChange">
          <span> 请选择工种: {{workerArray[selectWorker].name}}</span>
        </picker>
        <i-panel title="计时制">
          <i-radio-group :current="timeWay" @change="timeWayChange">
            <i-radio position="left" value="天制">
            </i-radio>
            <i-radio position="left" value="小时制">
            </i-radio>
          </i-radio-group>
        </i-panel>
        <i-input :value="fee" type="number" title="金额" />
        <i-input :value="inturducer" title="介绍人" />
        <picker mode="date" :value="selectDay" @change="bindDateChange">
          <span> 请选择进场日期: {{selectDay}}</span>
        </picker>
    </div>
    <div v-if="!isFromAdd">
      工地详情
    </div>
    <i-button v-if="!isFromAdd"  type="primary">保存</i-button>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        selectDay:'',
        inturducer: '',
        fee: 0,
        timeWay: '',
        isFromAdd: true,
        selectWorker: 1,
        workerArray: [{
            name: '瓦工1',
            id: 1
          },
          {
            name: '瓦工2',
            id: 2
          }, {
            name: '瓦工3',
            id: 3
          }, {
            name: '瓦工4',
            id: 4
          }
        ]
      }
    },

    components: {
      VueTabBar
    },

    methods: {
       bindDateChange(data) {
        this.selectDay = data.target.value
      },
      bindWorkerChange(data) {
        this.selectWorker = data.target.value
      },
      timeWayChange(data) {
        this.timeWay = data.target.value
      },
    },
    onLoad(options) {
      if (options.id) {
        this.isFromAdd = false
      } else {
        this.isFromAdd = true
      }
    },
    mounted() {

    }
  }
</script>

<style lang="stylus" scoped>

</style>