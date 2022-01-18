import { graphqlService } from '$lib/provider/graphql/graphql.service';
import { ERole } from '$lib/types/role.type';

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
};
