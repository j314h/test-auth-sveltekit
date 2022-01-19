import { createCookieHeadersApiVite } from '$lib/provider/cookie/cookie.service';
import type { IPerson } from '$lib/types/person.type';

export const post = async ({ body }) => {
  // parse json les données
  const person = JSON.parse(body) as IPerson;
  // creation headers
  const headers = createCookieHeadersApiVite(person);

  return {
    status: 200,
    ...headers,
  };
};
