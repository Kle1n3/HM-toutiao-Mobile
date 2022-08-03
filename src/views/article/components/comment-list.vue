<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <CommentItem
      @replyHandler="$emit('replyHandler', obj)"
      v-for="obj in list"
      :key="obj.com_id"
      :comment="obj"
    />
  </van-list>
</template>
<script>
import { getCommentListApi } from "@/api/article";
import CommentItem from "./comment-item";
export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    type: {
      type: String,
      default: "a",
    },
    sourceID: {
      type: [String, Number],
      required: true,
    },
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结
      offset: null,
      limit: 10,
    };
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getCommentListApi({
          type: this.type,
          source: this.sourceID,
          offset: this.offset,
          limit: this.limit,
        });
        (this.loading = false), this.list.push(...data.data.results);
        if (data.data.results.length < this.limit) {
          this.finished = true;
        } else {
          this.offset = data.data.last_id;
        }
        this.$emit("totalCount", data.data.total_count);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>