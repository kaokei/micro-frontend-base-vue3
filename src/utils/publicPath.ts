const LOCALHOST = {
  'demo-vue3': 'http://localhost:8081/',
  'demo-vue2': 'http://localhost:8082/',
  'demo-react': 'http://localhost:8083/',
  'demo-angular': 'http://localhost:4200/',
} as Record<string, string>;

const VERCEL = {
  'demo-vue3': 'https://vue3-subapp.vercel.app/',
  'demo-vue2': 'https://vue2-subapp.vercel.app/',
  'demo-react': 'https://react-subapp.vercel.app/',
  'demo-angular': 'https://angular-subapp.vercel.app/',
} as Record<string, string>;

export const PUBLIC_PATH =
  location.host.indexOf('localhost') >= 0 ? LOCALHOST : VERCEL;

const PRELOAD_IFRAME_DATA = [
  {
    appName: 'demo-vue3',
    path: '',
  },
  {
    appName: 'demo-vue2',
    path: '',
  },
  {
    appName: 'demo-react',
    path: '',
  },
  {
    appName: 'demo-angular',
    path: 'welcome',
    disableIframeResizer: true,
  },
];

export const PRELOAD_IFRAME = PRELOAD_IFRAME_DATA.map(item => ({
  ...item,
  publicPath: PUBLIC_PATH[item.appName],
}));
