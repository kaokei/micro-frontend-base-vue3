import PostBridge from './postBridge';
import router from '../router';
import { message } from 'ant-design-vue';

PostBridge.registerMethods({
  pushState(path = '') {
    const route = router.currentRoute.value;
    const name = String(route.name);
    const newPath1 = path[0] === '/' ? path : '/' + path;
    const newPath2 = `/subapp/${name}${newPath1}`;
    router.push(newPath2);
  },
  replaceState(path = '') {
    const route = router.currentRoute.value;
    const name = String(route.name);
    const newPath1 = path[0] === '/' ? path : '/' + path;
    const newPath2 = `/subapp/${name}${newPath1}`;
    router.replace(newPath2);
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
