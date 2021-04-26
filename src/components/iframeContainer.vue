<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import {
  onBeforeRouteUpdate,
  useRoute,
  RouteLocationNormalized,
} from 'vue-router';
import { IframeManager } from '@/utils/iframe.manager';

export default defineComponent({
  setup() {
    let manager: IframeManager;

    const createRouteMeta = (route: RouteLocationNormalized) => {
      const meta = route.meta;
      meta.path = route.params.path;
      return meta;
    };

    onBeforeUnmount(() => {
      manager.destroy();
    });

    onMounted(() => {
      manager = new IframeManager('#all-iframe-container');
      manager.sync(createRouteMeta(useRoute()));
    });

    onBeforeRouteUpdate(to => {
      console.log('onBeforeRouteUpdate to :>> ', to);
      if (to.meta && to.meta.appName && to.meta.publicPath) {
        manager.sync(createRouteMeta(to));
      }
    });

    return {};
  },
});
</script>
