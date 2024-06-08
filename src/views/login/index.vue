<template>
  <div class="app-container">

  </div>
</template>
<script lang="ts" setup name="Login">
import { computed, h, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStoreHook } from "@/store/modules/user";
import { PageEnum } from "@/router/pageEnum";
import { getAuthUrl } from "@/api/authApi";
const router = useRouter();
onMounted(async () => {
  const userStore = useUserStoreHook();
  if (!userStore.getToken) {
    const { code, redirect } = router.currentRoute.value.query;
    if (code) {
      try {
        await userStore.login({
          code: code,
          goHome: true
        });
      } catch (error) {
        console.log("error", error)
      }
    } else {
      getAuthUrl({
        redirectUri: window.location.href
      }).then((res: any) => {
        window.location.href = res.url;
      });
    }
  } else {
    router.push(PageEnum.BASE_HOME);
  }
});
</script>
<style lang="less" scoped></style>
