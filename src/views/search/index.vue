<template>
  <div class="search-container">
    <van-search
      v-model="searchText"
      show-action
      shape="round"
      placeholder="请输入搜索关键词"
      background="#3296fa"
      @focus="isResultsShow = false"
      @search="onSearch"
      @cancel="onCancel"
    />
    <search-result
      :searchText="searchText"
      v-if="isResultsShow"
    ></search-result>
    <search-suggestion
      @search="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></search-suggestion>
    <search-history
      @search="onSearch"
      :searchHistories="searchHistories"
      v-else
    ></search-history>
  </div>
</template>       

<script>
import SearchResult from "./components/search-result";
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "Search",
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion,
  },
  data() {
    return {
      searchText: "",
      isResultsShow: false,
      searchHistories: getItem("TOUTIAO-HISTORY-LIST") || [],
    };
  },

  mounted() {},

  methods: {
    onSearch(value) {
      this.isResultsShow = true;
      this.searchText = value;
      this.searchHistories.unshift(value);
      const setArr = new Set(this.searchHistories);
      this.searchHistories = Array.from(setArr);
      setItem("TOUTIAO-HISTORY-LIST", this.searchHistories);
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>