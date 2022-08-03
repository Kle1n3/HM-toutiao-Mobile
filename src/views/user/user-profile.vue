<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
    <van-cell
      @click="$refs.picFile.click()"
      class="avatar-cell"
      title="头像"
      is-link
      center
    >
      <input type="file" ref="picFile" @change="uploadPic" hidden />
      <van-image class="avatar" round fit="cover" :src="userProfile.photo" />
    </van-cell>
    <van-cell
      @click="isUpdateName = true"
      title="昵称"
      :value="userProfile.name"
      is-link
    />
    <van-cell
      @click="isUpdateGender = true"
      title="性别"
      :value="userProfile.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      @click="isUpdateBirthday = true"
      title="生日"
      :value="userProfile.birthday"
      is-link
    />
    <!-- /个人信息 -->

    <!-- 更新头像 -->
    <van-popup v-model="isUpdatePhoto" style="height: 100%" position="bottom">
      <UpdateUserPhoto
        @uploadPhoto="userProfile.photo = $event"
        :img="previewIMG"
        @close="isUpdatePhoto = false"
      />
    </van-popup>
    <!-- 更新昵称 -->
    <van-popup v-model="isUpdateName" style="height: 100%" position="bottom">
      <UpdateUserName
        v-if="isUpdateName"
        v-model="userProfile.name"
        @close="isUpdateName = false"
      />
    </van-popup>
    <!-- 更新性别 -->
    <van-popup v-model="isUpdateGender" position="bottom">
      <UpdateUserGender
        v-if="isUpdateGender"
        v-model="userProfile.gender"
        @close="isUpdateGender = false"
      />
    </van-popup>
    <!-- 更新生日 -->
    <van-popup v-model="isUpdateBirthday" position="bottom">
      <UpdateUserBirthday
        v-if="isUpdateBirthday"
        v-model="userProfile.birthday"
        @close="isUpdateBirthday = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileApi } from "@/api/userInfo";
import UpdateUserPhoto from "./components/update-photo.vue";
import UpdateUserName from "./components/update-name.vue";
import UpdateUserGender from "./components/update-gender.vue";
import UpdateUserBirthday from "./components/update-birthday.vue";
export default {
  name: "UserProfile",
  components: {
    UpdateUserPhoto,
    UpdateUserName,
    UpdateUserGender,
    UpdateUserBirthday,
  },
  props: {},
  data() {
    return {
      userProfile: {},
      isUpdatePhoto: false,
      isUpdateName: false,
      isUpdateGender: false,
      isUpdateBirthday: false,
      previewIMG: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initData();
  },

  methods: {
    async initData() {
      try {
        const { data } = await getUserProfileApi();
        this.userProfile = data.data;
      } catch (error) {
        this.$toast.fail("获取用户资料失败！");
        console.log(error);
      }
    },
    uploadPic() {
      const imgFile = this.$refs.picFile.files[0];
      const imgURL = URL.createObjectURL(imgFile);
      this.previewIMG = imgURL;
      this.isUpdatePhoto = true;
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>