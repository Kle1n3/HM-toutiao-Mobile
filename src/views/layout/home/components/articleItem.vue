<template>
  <div>
    <van-cell class="article-item" :to="'/article/' + articleItem.art_id">
      <template #title>
        <div class="title van-multi-ellipsis--l2">
          {{ articleItem.title }}
        </div>
      </template>
      <template #label>
        <div slot="">
          <div v-if="articleItem.cover.type === 3" class="cover-wrap">
            <div
              class="cover-item"
              v-for="(img, index) in articleItem.cover.images"
              :key="index"
            >
              <van-image class="cover-item-img" fit="cover" :src="img" />
            </div>
          </div>
          <div class="label-info-wrap">
            <span>{{ articleItem.aut_name }}</span>
            <span>{{ articleItem.comm_count }}评论</span>
            <span>{{ articleItem.pubdate | relativeTime }}</span>
          </div>
        </div>
      </template>
      <van-image
        v-if="articleItem.cover.type === 1"
        slot="default"
        class="right-cover"
        fit="cover"
        :src="articleItem.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    articleItem: {
      type: Object,
      required: true,
    },
  },
};
</script>


<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>