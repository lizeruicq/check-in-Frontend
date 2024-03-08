<template>
    <header class="bg-wt">
        <div class="fx headerInfo">
        <div class="wecom">
          <!-- <img src="@/assets/wecom-temp.png" width="268" height="22" alt=""> -->
        </div>
        <div class="fx-al-ct" v-if="isToken && userInfo">
            <!-- <img
              class="headIcon"
              :src="userInfo.icon"
              :onerror="onerrorImg"
              alt=""
            /> -->
            <div>{{ userInfo.name || "admin" }}</div>
          <span class="vline"></span>
          <div class="back" @click="goLogin()">退出登录
            <!-- <img src="@/assets/out.png" alt="" style="width:19px;height: 15px;" class="out"/> -->
          </div>
        </div>
        </div>
    </Header>
</template>

<script setup>
import { onMounted, ref, nextTick, watchEffect } from "vue";
import defaultImage from "@/assets/icon.jpeg";
import { useUserStore } from "@/store";
import {TOKEN_NAME} from "@/config/global"
import { useRouter } from "vue-router"
const store = useUserStore();
const router = useRouter();
const isToken = ref(true);
const userInfo = ref({

    icon: defaultImage,
    name: "admin"
  
});

onMounted(() => {
  isToken.value = sessionStorage.getItem(TOKEN_NAME) ? true : false;
  console.log(isToken.value +"|||"+userInfo.value)
});

watchEffect(() => {
  userInfo.value = store.getUserInfo;
});
const onerrorImg = () => {
  userInfo.value.icon = defaultImage;
};

const goLogin = () => {
  router.push("/login");
  store.logout();
};

</script>
<style lang="scss" scoped>
header {
position: fixed;
  top: 0;
  z-index: 998;
  padding-left: 226px;
  width: calc(100% - 150px);
  background-color: var(--color-white);
  text-align: left;
  padding: 18px 0;
  font-size: 14px;
  .wecom{
    margin: 4px 10px 0 0;
  }


  .back {
    position: relative;
    cursor: pointer;
    margin-left: 10px;
  }

  .headerInfo {
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    .line {
      padding: 0 5px;
    }
  }
  .headIcon {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-right: 13px;
    &:hover{
      // 透明度80%
      opacity: 0.8;
    }
  }


}






</style>