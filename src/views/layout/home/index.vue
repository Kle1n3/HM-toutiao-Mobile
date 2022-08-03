<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id"
        ><ArticleList :channel="obj"></ArticleList
      ></van-tab>

      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <template v-slot:nav-right>
        <div slot="nav-right" class="placeholder"></div>
        <!-- 右侧按钮 -->
        <div slot="nav-right" class="hamburger-btn" @click="isEdit = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isEdit"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :myChannels="channels"
        @changeChannel="changeChannel"
        @delChannel="delChannel"
        :activeIndex="active"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelsApi } from "@/api/home";
import { getItem } from "@/utils/storage";
import ArticleList from "@/views/layout/home/components/articleList";
import ChannelEdit from "@/views/layout/home//components/channelEdit.vue";
export default {
  name: "Home",
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [],
      isEdit: false,
    };
  },

  created() {
    this.initData();
  },
  methods: {
    async initData() {
      if (this.$store.getters.token) {
        try {
          const { data } = await getChannelsApi();
          this.channels = data.data.channels;
        } catch (error) {
          console.log(error);
        }
      } else {
        const localChannels = getItem("TOUTIAO-USER-CHANNELS");
        console.log(localChannels);
        if (localChannels) {
          this.channels = localChannels;
        } else {
          try {
            const { data } = await getChannelsApi();
            this.channels = data.data.channels;
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    changeChannel(index) {
      this.active = index;
      this.isEdit = false;
    },
    delChannel(index) {
      this.active = index;
    },
  },
};
</script>


<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;

  .van-nav-bar {
    background-color: #39afea;
  }
  .van-hairline--bottom::after {
    border: none;
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>