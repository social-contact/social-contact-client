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
    }
  }
}

declare module "crypto-js/md5";
