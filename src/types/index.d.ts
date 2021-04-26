declare module 'qrcodejs2' {
  export default any;
}

declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export default value;
}

// 项目中可以使用SafeAny，但是不要滥用SafeAny
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeAny = any;
