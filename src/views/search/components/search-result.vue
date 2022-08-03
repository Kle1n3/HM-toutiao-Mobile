<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsApi } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      try {
        const { data } = await getSearchResultsApi({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        this.list = data.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        this.page++;
        const { data } = await getSearchResultsApi({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText,
        });
        this.loading = false;
        if (data.data.results.length < this.per_page)
          return (this.finished = true);
        this.list.push(...data.data.results);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>