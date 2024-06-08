<template>
  <div>
    <van-overlay :show="loadingPage" @click="loadingPage = false" >
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>
<script lang="ts" setup name="componentsLoading">
import { computed, ref } from 'vue'
const props = defineProps({
  show: { type: Boolean, required: true, default: false},
});
const loadingPage = computed(() => {
  return props.show;
});
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>