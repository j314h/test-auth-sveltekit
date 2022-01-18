import { GraphQLClient } from 'graphql-request';
import config from 'config';
import { ERole } from '$lib/types/role.type';

// url api graphql dans graphcms
const graphqlContentUrl = config.get('graphcms.contentUrl') as string;
const graphqlUplaod = config.get('graphcms.asset') as string;
/**
 * creation du client pour les requests
 * si pas d'argument le header sera paramettrer en mode public
 * @param role => le role du user
 * @returns => retourne le client pour les request de la bdd
 */
export const graphqlService = (role: ERole = ERole.CLIENT): GraphQLClient => {
  // init token
  let token: string;

  // on configure le token pour l'en-tete en fonction du role donné
  switch (role) {
    case ERole.ROOT:
      token = `Bearer ${config.get('graphcms.tokenRoot')}`;
      break;
    default:
      token = ``;
      break;
  }

  // retourne le client
  return new GraphQLClient(graphqlContentUrl, {
    headers: {
      authorization: `${token}`,
    },
  });
};



