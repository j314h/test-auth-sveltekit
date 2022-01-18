import type { IPerson } from '$lib/types/person.type';
import * as cookie from 'cookie';
import { jwtService } from '$lib/provider/jwt/jwt.service';

export const cookieService = {
  /**
   * fonction qui crere un set-cookie pour le headers
   * @param data => les donnée à introduire dans le jwt
   * @returns retourne un header set-cookie
   */
  createCookieHeadersApiVite: (person: IPerson): any => {
    return {
      'Set-Cookie': cookie.serialize(
        'jwt4368',
        jwtService.createJwt({
          id: person.id,
          email: person.email,
          role: person.role,
        }),
        {
          httpOnly: true,
          maxAge: 60,
          sameSite: 'strict',
          path: '/',
        }
      ),
    };
  },
};
