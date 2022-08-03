<template>
  <van-loading v-if="isloading" color="#1989fa" />
  <van-icon
    v-else
    :color="value ? '#39afea' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="changeCollect"
  />
</template>

<script>
import { addCollectArtApi, cancelCollectArtApi } from "@/api/article";
export default {
  name: "CollectArt",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    artId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      isloading: false,
    };
  },

  mounted() {},

  methods: {
    async changeCollect() {
      if (!this.$store.getters.token) return this.$toast.fail("请登录");
      this.isloading = true;
      try {
        if (this.value) {
          await cancelCollectArtApi(this.artId);
        } else {
          await addCollectArtApi({
            target: this.artId,
          });
        }
        this.$toast.success(this.value ? "取消成功" : "收藏成功");
        this.$emit("input", !this.value);
      } catch (error) {
        this.$toast.fail("操作失败！");
        console.log(error);
      }
      this.isloading = false;
    },
  },
};
</script>

<style lang="less" scoped>
</style>