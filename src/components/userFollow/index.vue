<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    :loading="isloading"
    @click="changeFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isloading"
    @click="changeFollow"
    >关注</van-button
  >
</template>

<script>
import { addUserFollowApi, cancelUserFollowApi } from "@/api/article";
export default {
  name: "UserFollow",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    autId: {
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
    async changeFollow() {
      if (!this.$store.getters.token) return this.$toast.fail("请登录");
      this.isloading = true;
      try {
        if (this.value) {
          await cancelUserFollowApi(this.autId);
        } else {
          await addUserFollowApi({
            target: this.autId,
          });
        }
        this.$toast.success(this.value ? "取消成功" : "关注成功");
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