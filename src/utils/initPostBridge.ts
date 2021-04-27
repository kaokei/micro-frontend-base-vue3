import { PostBridge } from '@kaokei/post-bridge';
import router from '../router';
import { message } from 'ant-design-vue';

PostBridge.registerMethods({
  pushState(route = {} as SafeAny) {
    if (route.appName && route.path) {
      const path = route.path;
      const newPath1 = path[0] === '/' ? path : '/' + path;
      const newPath2 = `/subapp/${route.appName}${newPath1}`;
      router.push(newPath2);
    } else {
      throw new Error('没有提供appName和path');
    }
  },
  replaceState(route = {} as SafeAny) {
    if (route.appName && route.path) {
      const path = route.path;
      const newPath1 = path[0] === '/' ? path : '/' + path;
      const newPath2 = `/subapp/${route.appName}${newPath1}`;
      router.push(newPath2);
    } else {
      throw new Error('没有提供appName和path');
    }
  },
  go(args: SafeAny) {
    router.go(args);
  },
  resetScroll() {
    window.scrollTo(0, 0);
  },
  messageSuccess(msg: string) {
    message.success(msg);
  },
  messageInfo(msg: string) {
    message.info(msg);
  },
  messageWarning(msg: string) {
    message.warning(msg);
  },
  messageError(msg: string) {
    message.error(msg);
  },
});

PostBridge.start();
