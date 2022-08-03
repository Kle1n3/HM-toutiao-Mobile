<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import { updateUserProfileApi } from "@/api/userInfo";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
    };
  },

  mounted() {},

  methods: {
    async onConfirm(value) {
      const birthday = dayjs(value).format("YYYY-MM-DD");
      try {
        await updateUserProfileApi({
          birthday: birthday,
        });
        this.$toast.success("修改成功");
        this.$emit("input", birthday);
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