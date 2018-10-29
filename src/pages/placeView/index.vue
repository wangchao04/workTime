<template>
  <div>
    <div class="head">
      <span class="placeHead">{{firstLetter}}</span>
      <span style="flex:1;">{{placeData.address}}</span>
    </div>
    <div>
      <i-tabs :current="current" color="#F4A900" @change="handleChange">
        <i-tab key="tab1" title="详情"></i-tab>
        <i-tab key="tab2" title="工时明细"></i-tab>
      </i-tabs>
    </div>
    <div class="" v-if="current == 'tab1'">
      <i-cell-group>
        <i-cell title="计时制:">
          <input slot="footer" v-model="placeData.payrollSystemName" :disabled="true">
        </i-cell>
        <i-cell title="金额:">
          <input slot="footer" v-model="placeData.fee" type="digit" :disabled="true" />
        </i-cell>
        <i-cell title="介绍人:">
          <input slot="footer" v-model="placeData.introducer" :disabled="true" />
        </i-cell>
        <i-cell title="备注:">
          <input slot="footer" v-model="placeData.remark" :disabled="true" />
        </i-cell>
        <i-cell title="工种:">
          <input slot="footer" v-model="placeData.workTypeName" :disabled="true">
        </i-cell>
        <i-cell title="进场日期:">
          <input slot="footer" v-model="placeData.beginDate" :disabled="true">
        </i-cell>
      </i-cell-group>
    </div>
    <div v-if="current == 'tab2'">
      <div v-if="remarkTimeList.length == 0" class="noContant">暂无记录</div>
      <div v-else>
        <i-cell-group>
          <i-cell v-for="(item,index) in remarkTimeList" :key="index">
            <div class="itemContent">
              <span>{{item.workTime}} {{item.week}}</span>
              <span>{{item.fee}}</span>
              <span>{{item.woekLoad}}</span>
            </div>
          </i-cell>
        </i-cell-group>
      </div>
    </div>
    <i-message id="message" />
  </div>
</template>

<script>
  const {
    $Message
  } = require('../../../static/iview/base/index.js');
  export default {
    data() {
      return {
        remarkTimeList: [],
        current: 'tab1',
        firstLetter: '',
        workId: '',
        placeData: {
          address: '',
          beginDate: '',
          introducer: '',
          remark: '',
          fee: '',
          payrollSystem: '', // 计时制
          workType: '' // 工种
        },
      }
    },
    comupted: {

    },
    methods: {
      handleChange(val) {
        this.current = val.target.key
      },
      getPlaceById() {
        this.$http.get(`/work/address/queryByPk/${this.workId}/`).then(res => {
          this.placeData = res.info
          this.firstLetter = this.placeData.address.charAt(0)
        })
      },
      getRemarkTimeList() {
        this.$http.post(`/work/log/list/${this.workId}/`).then(res => {
          this.remarkTimeList = res.info
        })
      }
    },
    onShow() {
      this.workId = this.$mp.page.options.id ? this.$mp.page.options.id : ''
      this.getPlaceById()
      this.getRemarkTimeList()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../../styles/common.styl';

  .bottom-btn {
    position absolute bottom 0 width 100%
  }

  .head {
    padding: 0 20px;
    display: flex;
    align-items: center;

  }

  .placeHead {
    font-size: 30px;
    border: 1px solid #ddd;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    margin-right: 20px;

  }
  .itemContent{
    display flex;
    span{
      width:33.33%;
      text-align center;
    }
    }
</style>