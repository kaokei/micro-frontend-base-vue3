<template>
  <a-layout>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo">微前端演示demo</div>
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
      <a-layout-header class="my-header" />
      <a-layout-content class="my-main">
        <router-view />
        <div id="all-iframe-container"></div>
      </a-layout-content>
      <a-layout-footer class="my-footer">
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
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { routes } from '@/router';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const currentKeys = ref<string[]>([]);
    const router = useRouter();

    router.afterEach(to => {
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
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  padding-left: 8px;
  font-size: 18px;
  border-radius: 2px;
}
.my-header {
  padding: 0;
  background: #fff;
}
.my-main {
  margin: 16px;
  overflow: 'initial';
  min-height: calc(100vh - 166px);
  background: #fff;
  padding: 16px;
  border-radius: 2px;
}
.my-footer {
  text-align: center;
  color: rgb(240 242 245);
  background: #41b883;
}
</style>
