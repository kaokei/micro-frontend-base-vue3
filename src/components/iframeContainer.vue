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
import { IframeManager } from '@kaokei/iframe-manager';

import { PUBLIC_PATH } from '../utils/publicPath';

export default defineComponent({
  setup() {
    let manager: IframeManager;

    const createRouteMeta = (route: RouteLocationNormalized) => {
      const appName = route.params.appName as string;
      return {
        appName: appName,
        path: route.params.path as string,
        publicPath: PUBLIC_PATH[appName],
      };
    };

    onBeforeUnmount(() => {
      manager.destroy();
    });

    onMounted(() => {
      manager = new IframeManager('#all-iframe-container');
      const route = useRoute();
      const meta = createRouteMeta(route);
      manager.sync(meta);
    });

    onBeforeRouteUpdate(to => {
      if (to.params && to.params.appName) {
        manager.sync(createRouteMeta(to));
      }
    });

    return {};
  },
});
</script>
