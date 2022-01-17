import { graphqlService } from '$lib/provider/graphql/graphql.service';
import { ERole } from '$lib/types/role.type';
import { jwtService } from '$lib/provider/jwt/jwt.service';
import cookie from 'cookie';
import type { IPerson } from '$lib/types/person.type';

export const apiService = {
  /**
   * passe l'etat draft à l'état publier
   * @param id id ciblé
   * @param query requete du model
   * @param person personCurrent
   * @returns retourne le model publier
   */
  publish: async <T>(id: string, query: string): Promise<T> => {
    return await graphqlService(ERole.ROOT).request<T>(query, {
      id: { id: id },
    });
  },

  /**
   * creation d'un model
   * @param data les données pour la creation
   * @param query requete du model
   * @param person personCurrent
   * @returns le model creer
   */
  create: async <T, I>(data: I, query: string): Promise<T> => {
    return await graphqlService(ERole.ROOT).request<T>(query, {
      newPerson: data,
    });
  },

  /**
   * fonction qui récupere un model avec son id
   * @param id id ciblé du model
   * @param query la request du model
   * @returns le model ciblé
   */
  getId: async <T>(id: string, query: string): Promise<T> => {
    return await graphqlService().request<T>(query, { id });
  },

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
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        }
      ),
    };
  },
};
