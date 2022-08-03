<template>
  <van-picker
    title="选择性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    :default-index="defaultIndex"
  />
</template>

<script>
import { updateUserProfileApi } from "@/api/userInfo";
export default {
  name: "UpdateGender",
  props: {
    value: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },

  mounted() {},

  methods: {
    async onConfirm(value, index) {
      try {
        await updateUserProfileApi({
          gender: index,
        });
        this.$toast.success("修改成功");
        this.$emit("input", index);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
    onCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
</style>