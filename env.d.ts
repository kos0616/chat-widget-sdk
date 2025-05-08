/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** global常數 */
/** 建立的時間 */
declare const BUILD_TIME: string;
