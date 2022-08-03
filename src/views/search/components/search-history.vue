<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isEdit === true">
        <span @click="searchHistories.splice(0)">全部删除</span>
        <span @click="isEdit = false">完成</span>
      </template>
      <van-icon @click="isEdit = true" v-else name="delete" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="clickHandler(item, index)"
    >
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickHandler(val, ind) {
      if (this.isEdit) {
        this.searchHistories.splice(ind, 1);
      } else {
        this.$emit("search", val);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>