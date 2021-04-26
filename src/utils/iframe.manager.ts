import { iframeResizer } from 'iframe-resizer';
import PostBridge from './postBridge';

const IFRAME_POOLS = {} as Record<string, SafeAny>; // 注意这里的iframe默认永远不会被销毁

class IframeItem {
  public routeMeta: SafeAny;
  public container: SafeAny;
  public status: SafeAny;
  public appended: SafeAny;
  public postBridge: SafeAny;
  public iframe: SafeAny;
  public origin: SafeAny;

  constructor(routeMeta: SafeAny, container: SafeAny) {
    this.onload = this.onload.bind(this);

    this.routeMeta = routeMeta;
    this.container = container;

    this.status = 'created'; // iframe状态
    this.appended = false; // iframe是否已经添加到document
    this.postBridge = null; // 与iframe通信的对象

    this.iframe = this.createIframe(); // 创建一个空壳iframe
    this.origin = this.createOrigin(); // 控制通信的origin
  }

  createIframe() {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('width', '100%');
    iframe.addEventListener('load', this.onload);
    return iframe;
  }

  createOrigin() {
    const { publicPath } = this.routeMeta;
    if (
      publicPath.indexOf('http://') === 0 ||
      publicPath.indexOf('https://') === 0
    ) {
      const last = publicPath.indexOf('/', 8);
      return publicPath.slice(0, last);
    } else {
      return '*';
    }
  }

  getFullPath(routeMeta: SafeAny) {
    const { publicPath, path } = routeMeta;
    console.log('fullpath :>> ', `${publicPath}${path || ''}`);
    return `${publicPath}${path || ''}`;
  }

  sync(routeMeta: SafeAny) {
    console.log('sync2 :>> ', routeMeta);
    this.routeMeta = routeMeta;
    if (this.status === 'loaded') {
      console.log('status1 :>> ');
      this.postBridge &&
        this.postBridge.call('replaceState', routeMeta.path || '');
    } else {
      console.log('status2 :>> ');
      this.setStatusLoading();
      this.iframe.setAttribute('src', this.getFullPath(routeMeta));
    }
  }

  onload() {
    console.log('onload :>> ');
    this.setStatusLoaded();
    // onload之后才能创建postBridge对象
    this.postBridge = new PostBridge(this.iframe.contentWindow, this.routeMeta);
    iframeResizer({ log: false, checkOrigin: false }, this.iframe); // 同步iframe的高度自适应内容高度
  }

  setStatusCreated() {
    this.status = 'created';
  }
  setStatusLoading() {
    this.status = 'loading';
  }
  setStatusLoaded() {
    this.status = 'loaded';
  }
  appendIframe() {
    if (!this.appended) {
      this.appended = true;
      this.container.appendChild(this.iframe);
    }
  }
  removeIframe() {
    if (this.appended) {
      this.appended = false;
      this.container.removeChild(this.iframe);
    }
  }
}

export class IframeManager {
  public container: SafeAny;
  public pool: SafeAny;

  constructor(selector: string) {
    this.container = document.querySelector(selector);
    this.pool = IFRAME_POOLS[selector] || {}; // 当前manager对应的池子
    IFRAME_POOLS[selector] = IFRAME_POOLS[selector] || this.pool; // 把当前manager对应的池子放到全局对象中
  }

  getIframeItem(routeMeta: SafeAny): IframeItem {
    const { name } = routeMeta;
    if (!this.pool[name]) {
      const iframeItem = new IframeItem(routeMeta, this.container);
      this.pool[name] = iframeItem;
    }
    return this.pool[name];
  }

  sync(routeMeta: SafeAny): void {
    console.log('sync1 :>> ', routeMeta);
    const currentIframeItem = this.getIframeItem(routeMeta);
    currentIframeItem.sync(routeMeta);
    currentIframeItem.appendIframe();
    this.showIframeItem(currentIframeItem);
  }

  showIframeItem(iframeItem: IframeItem): void {
    for (const key in this.pool) {
      if (Object.prototype.hasOwnProperty.call(this.pool, key)) {
        const curItem = this.pool[key];
        curItem.iframe.style.display = curItem === iframeItem ? '' : 'none';
      }
    }
    this.container.style.display = '';
  }

  destroy(): void {
    this.container.style.display = 'none';
  }
}
