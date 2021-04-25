<template>
  <a-layout>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <template v-for="route in routes">
          <a-menu-item :key="route.meta?.pagePath" v-if="route.meta?.pagePath">
            <router-link :to="route.meta?.pagePath">
              <component :is="route.meta?.icon"></component>
              <span>{{ route.meta?.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <router-view />
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { routes } from "@/router";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const currentKeys = ref<string[]>([]);
    const router = useRouter();

    router.afterEach((to) => {
      currentKeys.value = [to.meta?.pagePath as string];
    });

    return {
      selectedKeys: currentKeys,
      routes,
    };
  },
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
  },
});
</script>
<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
