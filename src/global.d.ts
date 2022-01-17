/// <reference types="@sveltejs/kit" />

/** response server vite  */
export interface IResponseVite {
  status?: number;
  headers?: HeadersInit;
  body?: {};
  error?: string;
}
