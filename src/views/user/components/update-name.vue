<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updateName"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserProfileApi } from "@/api/userInfo";
export default {
  name: "UpdateName",
  components: {},
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      message: this.value,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async updateName() {
      if (this.message.length === 0) return this.$$toast.fail("请输入昵称");
      try {
        await updateUserProfileApi({
          name: this.message,
        });
        this.$toast.success("修改成功");
        this.$emit("input", this.message);
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>