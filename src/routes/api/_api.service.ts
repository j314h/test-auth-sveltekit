import {
  graphqlService,
  graphqlServiceFile,
} from '$lib/provider/graphql/graphql.service';

/**
 * regroupe les fonctions CRUD simple
 * ATTENTION :
 * les fonction getOne et deleteOne
 * sont identique (le code est le meme)
 * mais pour un question de clareté dans le code
 * ailleurs dans l'application utilisé
 * getOne pour récuperer
 * deleteOne pour supprimer
 * comprenez que c'est la request graphql qui va définir
 * votre action final, les fonctions ici sont là
 * pour une meilleur accèssibilité
 * Merci ;-)
 */

/**
 * passe l'etat draft à l'état publier
 * @param id id ciblé
 * @param query requete du model
 * @returns retourne le model publier
 */
export const publish = async <T>(id: string, query: string): Promise<T> => {
  return await graphqlService.request<T>(query, {
    id: { id: id },
  });
};

/**
 * creation d'un model
 * @param data les données pour la creation
 * @param query requete du model
 * @returns le model creer
 */
export const create = async <T, I>(data: I, query: string): Promise<T> => {
  return await graphqlService.request<T>(query, {
    new: data,
  });
};

/**
 * fonction qui recupere un model
 * @param where => propriete de donnée cible
 * @param query => la request
 * @returns => retourne le model ciblé
 */
export const getOne = async <T>(where: string, query: string): Promise<T> => {
  return await graphqlService.request<T>(query, { where });
};

/**
 * fonction qui supprime un model
 * @param where => propriete de donnée cible
 * @param query => la request
 * @returns => retourne le model supprimé
 */
export const deleteOne = async <T>(
  where: string,
  query: string
): Promise<T> => {
  return await graphqlService.request<T>(query, { where });
};

/**
 * fonction qui recupere plusieurs model
 * @param query => la request
 * @returns retourne un tableau du model
 */
export const getAll = async <T>(query: string): Promise<T[]> => {
  return await graphqlService.request<T[]>(query);
};

/************************** CRUD pour le file **********************/

/**
 * creation d'un model
 * @param data les données pour la creation du file
 * @param query requete du model
 * @returns le model creer
 */
export const createFile = async <T, I>(data: I, query: string): Promise<T> => {
  return await graphqlServiceFile.request<T>(query, {
    new: data,
  });
};

/**
 * fonction qui recupere un model
 * @param where => propriete de donnée cible
 * @param query => la request
 * @returns => retourne le model ciblé
 */
export const getOneFile = async <T>(
  where: string,
  query: string
): Promise<T> => {
  return await graphqlServiceFile.request<T>(query, { where });
};

/**
 * fonction qui supprime un model
 * @param where => propriete de donnée cible
 * @param query => la request
 * @returns => retourne le model supprimé
 */
export const deleteOneFile = async <T>(
  where: string,
  query: string
): Promise<T> => {
  return await graphqlServiceFile.request<T>(query, { where });
};

/**
 * fonction qui recupere plusieurs model
 * @param query => la request
 * @returns retourne un tableau du model
 */
export const getAllFile = async <T>(query: string): Promise<T[]> => {
  return await graphqlServiceFile.request<T[]>(query);
};
