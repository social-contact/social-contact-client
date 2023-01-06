/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      WEBPACK_DEV_SERVER_URL: string;
      ELECTRON_NODE_INTEGRATION: boolean;
    }
  }
}

declare module "crypto-js/md5";
declare module "socket.io-client";
