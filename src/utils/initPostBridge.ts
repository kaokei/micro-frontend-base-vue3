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
  fixIframe(_: SafeAny, options: SafeAny) {
    const iframeItem = options.iframeItem;
    const iframe = iframeItem.iframe;
    const rect = iframeItem.iframe.getBoundingClientRect();
    const rectObj = {
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
      x: rect.x,
      y: rect.y,
      viewWidth: document.documentElement.clientWidth || window.innerWidth,
      viewHeight: document.documentElement.clientHeight || window.innerHeight,
    };
    console.log('source rect :>> ', rectObj);
    iframe.parentNode.style.height = `${rect.height}px`;
    iframe.className = 'fixed-iframe';
    return rectObj;
  },
  unfixIframe(_: SafeAny, options: SafeAny) {
    const iframeItem = options.iframeItem;
    const iframe = iframeItem.iframe;
    iframe.className = '';
    iframe.parentNode.style.height = 'auto';
  },
});

PostBridge.start();
