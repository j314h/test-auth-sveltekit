/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL: string;
  readonly VITE_GRAPHQL_UPLOAD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
