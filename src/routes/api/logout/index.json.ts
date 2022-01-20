import { deleteCookie } from '$lib/provider/cookie/cookie.service';
import type { IResponseVite } from 'src/global';

export const get = (): IResponseVite => {
  const headers = deleteCookie();
  return {
    status: 200,
    headers,
    body: {
      deconnect: true,
    },
  };
};
