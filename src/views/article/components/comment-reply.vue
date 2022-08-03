<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        currentComment.reply_count === 0
          ? '暂无回复'
          : currentComment.reply_count + '条回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <van-cell title="当前评论项"></van-cell>
      <CommentItem :comment="currentComment" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="回复列表"></van-cell>
      <CommentList
        type="c"
        :sourceID="currentComment.com_id"
        :list="replyList"
      />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :targetID="currentComment.com_id"
        type="c"
        @newComment="newComment"
      />
    </van-popup>

    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import CommentList from "./comment-list";
import CommentPost from "./comment-post";
export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },
  props: {
    currentComment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      replyList: [],
      isPostShow: false,
    };
  },
  methods: {
    newComment(value) {
      this.replyList.unshift(value);
      this.isPostShow = false;
      this.currentComment.reply_count++;
    },
  },
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>