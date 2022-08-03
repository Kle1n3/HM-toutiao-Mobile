<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button :disabled="message.length === 0" class="post-btn" @click="post"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postCommentApi } from "@/api/article";
export default {
  name: "CommentPost",
  props: {
    targetID: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      message: "",
      articleId: this.$route.params.article_id,
    };
  },
  created() {},
  methods: {
    async post() {
      if (!this.$store.getters.token) return this.$toast.fail("请登录");
      try {
        const { data } = await postCommentApi({
          target: this.targetID,
          content: this.message,
          art_id: this.type === "a" ? null : this.articleId,
        });
        this.message = "";
        this.$toast.success("评论成功");
        this.$emit("newComment", data.data.new_obj);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>