<template>
  <router-view/>
</template>

<script setup lang="ts">

import {useWxSDK} from "@/utils/wechat/useWxSDK";
import {useVisitUrlStore} from "@/store/modules/visitUrlStore";

const {isiOSWechat} = useWxSDK();
if (isiOSWechat()) {
  const url = window.location.href.split("#")[0];
  useVisitUrlStore().addVisitUrl(url);
}
</script>
<style></style>
