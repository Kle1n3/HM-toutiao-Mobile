<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isStatusCode === 1">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="isStatusCode === 2">
        <!-- 文章标题 -->
        <h1 class="article-title">
          {{ articleDetail.title }}
        </h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{ articleDetail.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleDetail.pubdate | relativeTime }}
          </div>
          <UserFollow
            v-model="articleDetail.is_followed"
            :autId="articleDetail.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="content"
          class="article-content markdown-body"
          v-html="articleDetail.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <CommentList
          @replyHandler="replyHandler"
          @totalCount="totalCount = $event"
          :list="commentList"
          :sourceID="articleDetail.art_id"
        />
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :targetID="articleDetail.art_id"
            @newComment="newComment"
          />
        </van-popup>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isPostShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCount" color="#777" />
          <CollectArt
            v-model="articleDetail.is_collected"
            :artId="articleDetail.art_id"
          />
          <LikeArt
            :isAttitude.sync="articleDetail.attitude"
            :artId="articleDetail.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="isStatusCode === 4">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="isStatusCode === 3">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="initData">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <CommentReply
        v-if="isReplyShow"
        @close="isReplyShow = false"
        :currentComment="currentComment"
      />
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetailApi } from "@/api/article";
import { ImagePreview } from "vant";
import UserFollow from "@/components/userFollow";
import CollectArt from "@/components/collectArt";
import LikeArt from "@/components/likeArt";
import CommentList from "./components/comment-list";
import CommentPost from "./components/comment-post";
import CommentReply from "./components/comment-reply";
export default {
  name: "ArticleIndex",
  components: {
    UserFollow,
    CollectArt,
    LikeArt,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    // 使用props获取动态路由的数据
    /* articleId: {
      type: [Number, String],
      required: true,
    }, */
  },
  data() {
    return {
      isStatusCode: 1,
      articleDetail: {},
      article_id: this.$route.params.article_id,
      commentList: [],
      totalCount: "",
      currentComment: {},
      isPostShow: false,
      isReplyShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    async initData() {
      this.isStatusCode = 1;
      try {
        const { data } = await getArticleDetailApi(this.article_id);
        this.articleDetail = data.data;
        this.isStatusCode = 2;
        this.$nextTick(() => {
          const images = this.$refs.content.querySelectorAll("img");
          const imageSrc = Array.from(images).map((item) => item.src);
          images.forEach((item, index) => {
            item.onclick = function () {
              ImagePreview({
                images: imageSrc,
                startPosition: index,
                closeable: true,
                showIndicators: true,
              });
            };
          });
        });
      } catch (error) {
        console.log(error);
        if (error.response && error.response === 404) {
          this.isStatusCode = 4;
        } else {
          this.isStatusCode = 3;
        }
      }
    },
    replyHandler(value) {
      this.currentComment = value;
      this.isReplyShow = true;
    },
    newComment(value) {
      this.commentList.unshift(value);
      this.isPostShow = false;
      this.totalCount++;
    },
  },
};
</script>

<style scoped lang="less">
@import "@/style/github-markdown.css";
.article-container {
  [class*="van-hairline"]::after {
    border: none;
  }
  /deep/.van-nav-bar {
    background-color: #39afea;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>