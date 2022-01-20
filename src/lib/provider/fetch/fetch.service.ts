import type { EMethodeFetch } from '$lib/types/fetch.type';
/**
 * fonction qui creer et retourne un headers simple
 * @returns => retourne un header simple
 */
export const headersSample = function (): HeadersInit {
  return {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

/**
 * fonction qui creer une config pour les request fetch post ou put
 * @param header => header simple ou auth
 * @param data => le formDate du formulaire
 * @returns => retourne une config pour fetch
 */
export const configRequest = function (
  method: EMethodeFetch,
  header: HeadersInit,
  data?
): RequestInit {
  const configNotBody = {
    method: method,
    credentials: 'include' as RequestCredentials,
    withCredentials: true,
    headers: header,
    mode: 'cors' as RequestMode,
  };

  const configBody = {
    method: method,
    credentials: 'include' as RequestCredentials,
    withCredentials: true,
    headers: header,
    mode: 'cors' as RequestMode,
    body: JSON.stringify(data),
  };

  const config = {
    POST: configBody,
    PUT: configBody,
    PATCH: configBody,
    GET: configNotBody,
    DELETE: configNotBody,
  };

  return config[`${method}`];
};

/**
 * fonction qui créer un request universel qui sera déterminé par les parametre
 * @param url => url de la request
 * @param method => la methode "post" , "get" etc ... utiliser les enum
 * @param header => header de la request utiliser les fonctions fournis par le service
 * @param data => les données à envoyer
 * @returns
 */
export const callApi = async function <T>(
  url: string,
  method: EMethodeFetch,
  data?,
  header: HeadersInit = {}
): Promise<T> {
  const response: T = await (
    await fetch(url, configRequest(method, header, data))
  ).json();

  return response;
};
