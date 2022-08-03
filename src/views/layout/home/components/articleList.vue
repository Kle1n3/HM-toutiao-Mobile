<template>
  <div>
    <van-pull-refresh
      v-model="isLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :articleItem="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from "@/api/home";
import ArticleItem from "./articleItem.vue";
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      successText: "",
      timestamp: Date.now(),
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp,
        });
        this.loading = false;
        this.list.push(...data.data.results);
        if (!data.data.pre_timestamp) return (this.finished = true);
        this.timestamp = data.data.pre_timestamp;
      } catch (error) {
        console.log(error);
        this.error = true;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        this.isLoading = false;
        this.list.unshift(...data.data.results);
        this.successText = `成功更新了${data.data.results.length}条数据`;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>