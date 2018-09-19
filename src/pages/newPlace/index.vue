<template>
  <div>
    <div v-if="isFromAdd">
      <i-panel>
        <i-input :value="wprkPlace"  placeholder="请填写工作地点" @change="wprkPlaceChange"/>
      </i-panel>
      <i-panel>
        <i-input :value="fee" type="digit" placeholder="请输入金额" @change="feeChange"/>
      </i-panel>
      <i-panel>
        <i-input :value="inturducer" placeholder="请填写介绍人" @change="inturducerChange"/>
      </i-panel>
      <i-panel>
        <picker mode="selector" range-key="name" :range="workerArray" :value="selectWorker" @change="bindWorkerChange">
          <i-input :disabled="true" :value="workerArray[selectWorker] ? workerArray[selectWorker].name :''" placeholder="请选择工种" />
        </picker>
      </i-panel>
      <i-panel>
        <picker mode="date" :value="selectDay" @change="bindDateChange">
          <i-input :disabled="true" :value="selectDay" placeholder="请选择进场日期" />
        </picker>
      </i-panel>
      <i-panel title="计时制:">
        <i-radio-group :current="timeWay" @change="timeWayChange">
          <i-radio position="left" value="天制">
          </i-radio>
          <i-radio position="left" value="小时制">
          </i-radio>
        </i-radio-group>
      </i-panel>
    </div>
    <div v-if="!isFromAdd">
       <i-panel>
         <i-input value="111" title="工作地点:" :disabled="true"/>
      </i-panel>
      <i-panel>
       <i-input value="111" title="金额:" :disabled="true"/>
      </i-panel>
      <i-panel>
        <i-input value="111" title="介绍人:" :disabled="true"/>
      </i-panel>
      <i-panel>
        <i-input value="111" title="工种:" :disabled="true"/>
      </i-panel>
      <i-panel>
        <i-input value="111" title="进场日期:" :disabled="true"/>
      </i-panel>
      <i-panel>
        <i-input value="111" title="计时制:" :disabled="true"/>
      </i-panel>
    </div>
    <div class="bottom-btn" v-if="isFromAdd">
         <i-button  type="primary">保存</i-button>
    </div>
    <!-- <VueTabBar></VueTabBar> -->
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        wprkPlace:'',
        selectDay: '',
        inturducer: '',
        fee: '',
        timeWay: '',
        isFromAdd: true,
        selectWorker: '',
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
    comupted:{

    },
    components: {
      VueTabBar
    },

    methods: {
      wprkPlaceChange(data){
        this.wprkPlace = data.target.value
      },
       feeChange(data){
        this.fee = data.target.value
      },
      inturducerChange(data){
        this.inturducer = data.target.value
      },
      bindDateChange(data) {
        this.selectDay = data.target.value
      },
      bindWorkerChange(data) {
        console.log(data)
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
  .bottom-btn{
    position absolute
    bottom 0
    width 100%
  }
</style>