<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back(1)" />
    <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号码"
        :rules="rules.mobile"
      />
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #button>
          <van-button
            v-if="isTimeShow"
            size="small"
            type="primary"
            native-type="button"
            ><van-count-down
              :time="59 * 1000"
              format="ss s"
              @finish="isTimeShow = false"
          /></van-button>
          <van-button v-else size="small" type="primary" @click="sendMsgFn"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendMsgApi, userLoginApi } from "@/api/Login";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      isTimeShow: false,
      user: {
        mobile: "",
        code: "",
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码" },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码" },
        ],
      },
    };
  },
  methods: {
    ...mapMutations(["getUserInfo"]),
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await userLoginApi(this.user);
        this.getUserInfo(data.data);
      } catch (error) {}
      this.$toast.clear();
      const url = this.$route.query.url;
      if (url) {
        this.$router.replace(url);
      } else {
        this.$router.push({
          path: "/my",
        });
      }
    },
    async sendMsgFn() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (error) {
        this.$toast.fail(error.message);
        console.log(error);
        return;
      }
      this.isTimeShow = true;
      try {
        const res = await sendMsgApi(this.user.mobile);
        this.$toast.success("验证码发送成功");
      } catch (error) {
        const { response } = error;
        this.$toast.fail(response.data.message);
      }
    },
  },
};
</script>


<style lang="less" >
.login-container {
  .van-nav-bar {
    background-color: #39afea;
  }
  .van-nav-bar__title {
    font-weight: 700;
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
  .van-button--info {
    background-color: #39afea;
    border: #39afea;
  }
  .van-button--primary {
    background-color: #39afea;
    border: #39afea;
  }
  .van-count-down {
    color: #fff;
    padding: 0 32px;
  }
}
</style>