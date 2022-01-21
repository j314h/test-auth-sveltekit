/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHCMS: string;
  readonly VITE_GRAPHCMS_UPLOAD: string;
  readonly VITE_TOKEN_ROOT: string;
  readonly VITE_CRYPTO_SECRET: string;
  readonly VITE_JWT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
