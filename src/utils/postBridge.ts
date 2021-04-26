/* eslint-disable @typescript-eslint/ban-types */
/**
 * jsbridge for iframes or windows by `window.postMessage`
 *
 * 消息体所有属性：
 * postbridge
 * type
 * sourceId
 * destId
 * uid
 * method
 * params
 * value
 */

export default class PostBridge {
  static messageType = 'application/x-postbridge-v1+json';

  static currentTarget = window;

  static globalFunctionMap = {} as Record<string, Function>;

  static sourceId = '';

  static sourceMap = {} as Record<string, PostBridge>;

  static validEventSource = [] as Array<PostBridge>;

  static generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  static start(): void {
    PostBridge.sourceId = PostBridge.generateUUID();
    PostBridge.currentTarget.addEventListener(
      'message',
      PostBridge.receiveMessageGateway,
      false
    );
  }

  static receiveMessageGateway(event: MessageEvent): void {
    if (!(event && event.data && event.data.type === PostBridge.messageType)) {
      return;
    }
    const { sourceId } = event.data;
    const sourceMap = PostBridge.sourceMap;
    if (sourceMap[sourceId]) {
      sourceMap[sourceId].receiveMessage(event);
    } else {
      const validEventSource = PostBridge.validEventSource;
      const source = event.source;
      const index = validEventSource.findIndex(item => item.target === source);
      if (index >= 0) {
        sourceMap[sourceId] = validEventSource[index];
        validEventSource.splice(index, 1);
        sourceMap[sourceId].receiveMessage(event);
      }
    }
  }

  static registerMethods(functionMap: Record<string, Function>): void {
    const gfm = PostBridge.globalFunctionMap;
    for (const key in functionMap) {
      if (Object.prototype.hasOwnProperty.call(functionMap, key)) {
        gfm[key] = functionMap[key];
      }
    }
  }

  static unregisterMethods(functionNameArr: string | string[]): void {
    const gfm = PostBridge.globalFunctionMap;
    if (typeof functionNameArr === 'string') {
      delete gfm[functionNameArr];
    } else {
      functionNameArr.forEach(name => delete gfm[name]);
    }
  }

  target: Window;
  options: SafeAny;
  messageId: number;
  origin: string;

  public constructor(target: Window, options = {} as SafeAny) {
    this.target = target;
    this.options = options;
    this.messageId = 1;
    this.origin = options.origin || '*';

    this.receiveMessage = this.receiveMessage.bind(this);

    PostBridge.validEventSource.push(this);
  }

  generateNewMessageId(): number {
    return this.messageId++;
  }

  receiveMessage(event: MessageEvent): void {
    const { postbridge, sourceId, uid, method, params } = event.data;
    const gfm = PostBridge.globalFunctionMap;

    if (postbridge === 'call') {
      // 接受消息-call
      if (method in gfm && typeof gfm[method] === 'function') {
        gfm[method](params, this.options);
      }
    } else if (postbridge === 'request') {
      // 接受消息-request
      if (method in gfm && typeof gfm[method] === 'function') {
        Promise.resolve(gfm[method](params, this.options)).then(value => {
          (event.source as Window).postMessage(
            {
              postbridge: 'response', // 发送消息-response
              type: PostBridge.messageType,
              sourceId: PostBridge.sourceId,
              destId: sourceId,
              uid,
              method,
              value,
            },
            event.origin
          );
        });
      }
    }
  }

  call(method: string, params?: SafeAny): void {
    this.target.postMessage(
      {
        postbridge: 'call', // 发送消息-call
        type: PostBridge.messageType,
        sourceId: PostBridge.sourceId,
        method,
        params,
      },
      this.origin
    );
  }

  request(method: string, params?: SafeAny): Promise<SafeAny> {
    return new Promise((resolve, reject) => {
      const uid = this.generateNewMessageId();
      const sourceId = PostBridge.sourceId;
      const transact = (e: MessageEvent) => {
        // 接受消息-response
        if (
          e.data.destId === sourceId &&
          e.data.uid === uid &&
          e.data.postbridge === 'response'
        ) {
          PostBridge.currentTarget.removeEventListener(
            'message',
            transact,
            false
          );
          resolve(e.data.value);
        }
      };
      PostBridge.currentTarget.addEventListener('message', transact, false);

      setTimeout(() => {
        PostBridge.currentTarget.removeEventListener(
          'message',
          transact,
          false
        );
        reject();
      }, 20000);

      this.target.postMessage(
        {
          postbridge: 'request', // 发送消息-request
          type: PostBridge.messageType,
          sourceId: PostBridge.sourceId,
          uid,
          method,
          params,
        },
        this.origin
      );
    });
  }
}
