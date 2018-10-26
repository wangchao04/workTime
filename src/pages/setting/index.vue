<template>
  <div>
    <!-- <div>
      <i-card title="唐哲" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <view slot="content">手机号:13334567890</view>
       
      </i-card>
      <i-cell-group>
        <i-cell title="绑定手机" is-link url="/pages/dashboard/index"></i-cell>
        <i-cell title="使用帮助" is-link url="/pages/dashboard/index"></i-cell>
      </i-cell-group>

    </div> -->
    <div class="top">
      <div class="profile">
        <img :src="userData.profile" alt="">
      </div>
      <p>{{userData.name}}</p>
    </div>
    <div class="tabbarWrap">
      <i-badge count="23" overflow-count="100">
        <p>
          <i-icon type="activity" size="28" color="#F4A900" />
          <span>开工中</span>
        </p>
      </i-badge>
      <i-badge count="23" overflow-count="100">
        <p>
          <i-icon type="activity" size="28" color="#F4A900" />
          <span>结账中</span>
        </p>
      </i-badge>
      <i-badge count="23" overflow-count="100">
        <p>
          <i-icon type="activity" size="28" color="#F4A900" />
          <span>已完工</span>
        </p>
      </i-badge>
    </div>
    <div class="list">
      <i-cell @click="toPage('suggestion')" title="意见反馈" is-link>
        <i-icon  slot="icon" type="activity" size="20" color="#F4A900" />
      </i-cell>
    </div>
  </div>
</template>

<script>
  import VueTabBar from '../../components/tabBar/tabBar.vue'

  export default {
    data() {
      return {
        userData: {
          profile: '',
          name: '',
        }

      }
    },

    components: {
      VueTabBar
    },

    methods: {
      toPage(to) {
        wx.navigateTo({
          url: `/pages/${to}/main`,
          success: function (res) {
            console.log("success")
          },
        })
      },
      handleChange() {

      }
    },
    onShow() {
      this.userData.profile = wx.getStorageSync("avatarUrl")
      this.userData.name = wx.getStorageSync("nickName")
    },

    mounted() {

    }
  }
</script>
<style lang="stylus" scoped>
  @import '../../styles/common.styl';


  .top {
    background $theme;
    font-size: 15px;

    .profile {
      text-align center;

      img {
        width: 80px;
        height: 80px;
        margin: 20px 0 5px;
        border-radius: 50%;
      }
    }

    p {
      text-align: center;
      color: #fff;
      padding-bottom: 20px;

    }
  }

  .tabbarWrap {
    padding: 40rpx 0;
    display: flex;
    justify-content: space-around;

    p {
      text-align: center;

      span {
        display block;
        font-size 13px;
      }
    }
  }
</style>