/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHCMS: string;
  readonly VITE_GRAPHCMS_UPLOAD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
