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

const PUBLIC_PATH = {
  'demo-vue3': {
    localhost: 'http://localhost:8081/',
    vercel: 'https://vue3-subapp.vercel.app/',
  },
  'demo-vue2': {
    localhost: 'http://localhost:8082/',
    vercel: 'https://vue2-subapp.vercel.app/',
  },
  'demo-react': {
    localhost: 'http://localhost:8083/',
    vercel: 'https://react-subapp.vercel.app/',
  },
} as Record<string, { localhost: string; vercel: string }>;

export default defineComponent({
  setup() {
    let manager: IframeManager;
    const hostType =
      location.host.indexOf('localhost') >= 0 ? 'localhost' : 'vercel';

    const createRouteMeta = (route: RouteLocationNormalized) => {
      const appName = route.params.appName as string;
      return {
        appName: appName,
        path: route.params.path as string,
        publicPath: PUBLIC_PATH[appName][hostType],
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
