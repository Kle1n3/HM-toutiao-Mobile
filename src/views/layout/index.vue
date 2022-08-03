<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item
        icon-prefix="toutiao"
        replace
        to="/home"
        icon="toutiao toutiao-shouye"
        >首页</van-tabbar-item
      >
      <van-tabbar-item
        icon-prefix="toutiao"
        replace
        to="/qa"
        icon="toutiao toutiao-wenda"
        >问答</van-tabbar-item
      >
      <van-tabbar-item
        icon-prefix="toutiao"
        replace
        to="/video"
        icon="toutiao toutiao-shipin"
        >视频</van-tabbar-item
      >
      <van-tabbar-item
        icon-prefix="toutiao"
        replace
        to="/my"
        icon="toutiao toutiao-wode"
        >{{ token ? "我的" : "未登录" }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["token"]),
  },
};
</script>


<style lang="less" scoped>
</style>