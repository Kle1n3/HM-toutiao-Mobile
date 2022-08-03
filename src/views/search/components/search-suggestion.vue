<template>
  <div class="search-suggestion">
    <van-cell
      @click="$emit('search', item)"
      icon="search"
      v-for="(item, index) in list"
      :key="index"
    >
      <template #title>
        <span v-html="highLight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from "@/api/search";
export default {
  name: "SearchSuggestion",
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
      timer: null,
    };
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        } else {
          this.timer = setTimeout(() => {
            this.initData();
          }, 500);
        }
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    async initData() {
      try {
        const { data } = await getSearchSuggestionApi({ q: this.searchText });
        if (data.data.options.length === 1 && data.data.options[0] === null) {
          this.list = [];
        } else {
          this.list = data.data.options;
        }
      } catch (error) {
        console.log(error);
      }
    },
    highLight(text) {
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(
        reg,
        `<span style='color:red'>${this.searchText}</span>`
      );
    },
  },
};
</script>

<style scoped lang="less"></style>