import type { IPerson } from '$lib/modules/person/person.type';
import { createJwt } from '../jwt/jwt.service';
import cookie from 'cookie';

/**
 * fonction qui creer un set-cookie pour le headers
 * @param data => les donnée à introduire dans le jwt
 * @returns retourne un header set-cookie
 */
export const createCookieHeadersApiVite = (person: IPerson): any => {
  return {
    'Set-Cookie': cookie.serialize(
      'jwt4368',
      createJwt({
        id: person.id,
        email: person.email,
        role: person.role,
      }),
      {
        httpOnly: true,
        maxAge: 60 * 60, // temps de validité du cookie (1h)
        sameSite: 'strict',
        path: '/',
      }
    ),
  };
};

/**
 * fonction qui supprime le cookie jwt4368
 * @returns header set-cookie
 */
export const deleteCookie = (): any => {
  return {
    'Set-Cookie': cookie.serialize('jwt4368', '', {
      expire: new Date(0),
      path: '/',
    }),
  };
};
