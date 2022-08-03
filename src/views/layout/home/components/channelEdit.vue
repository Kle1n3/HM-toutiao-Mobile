<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEditShow = !isEditShow"
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        >{{ isEditShow ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(obj, index) in myChannels"
        :key="obj.id"
        @click="clickSwitch(obj, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-if="isEditShow && activeIndex !== index"
        ></van-icon>
        <span
          class="text"
          :class="{ active: activeIndex === index }"
          slot="text"
          >{{ obj.name }}</span
        >
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        v-for="obj in recommendChannels"
        :key="obj.id"
        class="grid-item"
        icon="plus"
        :text="obj.name"
        @click="addChannel(obj)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannelsApi,
  addUserChannelApi,
  delUserChannelApi,
} from "@/api/home";
import { mapGetters } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEditShow: false,
    };
  },
  computed: {
    ...mapGetters(["token"]),
    recommendChannels() {
      return this.allChannels.filter((obj) =>
        this.myChannels.every((item) => item.id !== obj.id)
      );
    },
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const { data } = await getAllChannelsApi();
        this.allChannels = data.data.channels;
      } catch (error) {
        console.log(error);
      }
    },
    async addChannel(obj) {
      console.log(obj);
      this.myChannels.push(obj);
      if (this.token) {
        try {
          await addUserChannelApi({
            channels: [
              {
                id: obj.id,
                seq: this.myChannels.length - 1,
              },
            ],
          });
        } catch (error) {
          console.log(error);
          this.$toast.fail("数据线上同步失败！");
        }
      } else {
        console.log(obj);
        setItem("TOUTIAO-USER-CHANNELS", this.myChannels);
      }
    },
    clickSwitch(obj, index) {
      if (this.isEditShow) {
        if (index <= this.activeIndex) {
          this.$emit("delChannel", this.activeIndex - 1);
        }
        this.myChannels.splice(index, 1);
        this.delChannel(obj.id);
      } else {
        this.$emit("changeChannel", index);
      }
    },
    async delChannel(channel_id) {
      if (this.token) {
        try {
          await delUserChannelApi(channel_id);
        } catch (error) {
          console.log(error);
          this.$toast.fail("数据线上同步失败！");
        }
      } else {
        setItem("TOUTIAO-USER-CHANNELS", this.myChannels);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>