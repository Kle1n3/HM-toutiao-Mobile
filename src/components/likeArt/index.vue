<template>
  <van-loading v-if="isloading" color="#1989fa" />
  <van-icon
    v-else
    :color="isAttitude === 1 ? '#39afea' : '#777'"
    :name="isAttitude === 1 ? 'good-job' : 'good-job-o'"
    @click="changeCollect"
  />
</template>

<script>
import { addLikeArtApi, cancelLikeArtApi } from "@/api/article";
export default {
  name: "LikeArt",
  props: {
    isAttitude: {
      type: Number,
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
          await cancelLikeArtApi(this.artId);
        } else {
          await addLikeArtApi({
            target: this.artId,
          });
        }
        this.$toast.success(this.isAttitude === 1 ? "取消成功" : "点赞成功");
        this.$emit("update:isAttitude", this.isAttitude === 1 ? 0 : 1);
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