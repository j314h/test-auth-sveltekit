import {
  graphqlCms,
  graphqlService,
} from '$lib/provider/graphql/graphql.service';
import { verifJwt } from '$lib/provider/jwt/jwt.service';
import { ReqGetOnePersonById } from '$lib/modules/person/person.query';
import type { IPerson, IPersonReceved } from '$lib/modules/person/person.type';
import { ERole } from '$lib/modules/role/role.type';
import cookie from 'cookie';
import { getOne } from './routes/api/_api.service';
import type { IPayloadJwt } from '$lib/provider/jwt/jwt.type';

/**
 * fonction qui test les données contenue dans le jwt et retourne le payload + le person
 * @param payload => les données du jwt
 * @returns
 */
const testPayloadJwt = async (
  payload: IPayloadJwt
): Promise<{ person: IPersonReceved; payload: IPayloadJwt }> => {
  // vérification si le user exist + changement header graphql en fonction du role
  const person = await getOne<IPersonReceved>(payload.id, ReqGetOnePersonById);

  // si le user exist on retourne le payload et le person recuperé
  if (person) {
    return {
      person: person,
      payload,
    };
  } else {
    throw new Error(person.error);
  }
};

/**
 * fonction qui creer les authorisations pour graphcms
 * @param person => la person connecté
 */
const setAuthorisationGraphcms = (person: IPerson): void => {
  // attribut des authorization headers en fonction du role du user connecté
  switch (person.role) {
    case ERole.ROOT:
      graphqlService.setHeaders({
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_ROOT}`,
      });
      graphqlCms.setheader(import.meta.env.VITE_TOKEN_ROOT);
      break;
    default:
      graphqlService.setHeaders({
        Authorization: ``,
      });
      break;
  }
};

/**
 * fonction qui s'execute à chaque request serveur
 */
export const handle = async ({ request, resolve }) => {
  console.log('debut du handle');

  // recuperer les cookie sous forme d'objet
  const cookieApi = cookie.parse(request.headers.cookie ?? '');

  // test le cookie si il exist
  if (cookieApi.jwt4368) {
    // vérification expiration + recuperation des données du jwt
    // si cela est expirer le cookie sera retirer automatiquement
    const payload = verifJwt(cookieApi.jwt4368);

    // test payload
    const responseTestPayload = await testPayloadJwt(payload);

    // on set les authorisation de request graphcms en fonction du role
    setAuthorisationGraphcms(responseTestPayload.person.person);

    // on met la person dans la session
    request.locals.person = responseTestPayload.person;
  } else {
    // si pas de cookie on efface le token d'authorisation
    // et on efface le person dans la session
    graphqlService.setHeaders({
      Authorization: ``,
    });
    request.locals.person = null;
  }

  console.log('fin du handle');
  const response = await resolve(request);
  return response;
};

/**
 * fonction qui creer des données dans la session
 * @param request => la request en cours
 * @returns => retourne l'objet session
 */
export const getSession = (request) => {
  return request.locals.person
    ? {
        ...request.locals.person,
      }
    : {};
};
