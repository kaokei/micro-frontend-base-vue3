<template>
  <a-layout>
    <a-layout-sider
      theme="dark"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo">微前端演示demo</div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <template v-for="menu in menuList">
          <a-menu-item v-if="menu.pagePath" :key="menu.key">
            <router-link :to="menu.pagePath">
              <component :is="menu.icon"></component>
              <span>{{ menu.title }}</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu v-else :key="menu.key">
            <template #title>
              <span>
                <component :is="menu.icon"></component>
                <span>{{ menu.title }}</span>
              </span>
            </template>
            <template v-if="menu.children">
              <a-menu-item v-for="submenu in menu.children" :key="submenu.key">
                <router-link :to="submenu.pagePath">
                  <span>{{ submenu.title }}</span>
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
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
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PRELOAD_IFRAME } from '@/utils/publicPath';
import { IframeManager } from '@kaokei/iframe-manager';

const menuList = [
  {
    key: '1',
    title: '首页',
    pagePath: '/',
    icon: UserOutlined,
  },
  {
    key: '2',
    title: '关于我',
    pagePath: '/about',
    icon: UserOutlined,
  },
  {
    key: '3',
    title: 'demo-vue3',
    icon: UserOutlined,
    children: [
      {
        key: '3-1',
        title: '首页',
        pagePath: '/subapp/demo-vue3/',
      },
      {
        key: '3-2',
        title: '关于我',
        pagePath: '/subapp/demo-vue3/about',
      },
    ],
  },
  {
    key: '4',
    title: 'demo-vue2',
    icon: UserOutlined,
    children: [
      {
        key: '4-1',
        title: '首页',
        pagePath: '/subapp/demo-vue2/',
      },
      {
        key: '4-2',
        title: '关于我',
        pagePath: '/subapp/demo-vue2/about',
      },
    ],
  },
  {
    key: '5',
    title: 'demo-react',
    icon: UserOutlined,
    children: [
      {
        key: '5-1',
        title: 'Home',
        pagePath: '/subapp/demo-react/',
      },
      {
        key: '5-2',
        title: 'About',
        pagePath: '/subapp/demo-react/about',
      },
      {
        key: '5-3',
        title: 'Dashboard',
        pagePath: '/subapp/demo-react/dashboard',
      },
    ],
  },
  {
    key: '6',
    title: 'demo-angular',
    icon: UserOutlined,
    children: [
      {
        key: '6-1',
        title: 'Welcome',
        pagePath: '/subapp/demo-angular/welcome',
      },
      {
        key: '6-2',
        title: 'Monitor',
        pagePath: '/subapp/demo-angular/welcome/monitor',
      },
      {
        key: '6-3',
        title: 'Workplace',
        pagePath: '/subapp/demo-angular/welcome/workplace',
      },
      {
        key: '6-4',
        title: 'Form',
        pagePath: '/subapp/demo-angular/form',
      },
    ],
  },
];

export default defineComponent({
  setup() {
    const currentKeys = ref<string[]>([]);
    const router = useRouter();

    router.afterEach(to => {
      const path = to.path;
      menuList.forEach(menu => {
        if (menu.pagePath === path) {
          currentKeys.value = [menu.key];
        } else if (menu.children) {
          menu.children.forEach(submenu => {
            if (submenu.pagePath === path) {
              currentKeys.value = [menu.key, submenu.key];
            }
          });
        }
      });
    });

    onMounted(() => {
      IframeManager.preload('#all-iframe-container', PRELOAD_IFRAME);
    });

    return {
      selectedKeys: currentKeys,
      menuList,
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
  overflow: initial;
  background: #fff;
  padding: 16px;
  border-radius: 2px;
  min-height: calc(100vh - 166px);
}
.my-footer {
  text-align: center;
  color: rgb(240 242 245);
  background: #41b883;
}

#all-iframe-container ::v-deep(iframe) {
  min-height: calc(100vh - 204px);
}
</style>

<style>
.fixed-iframe {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
