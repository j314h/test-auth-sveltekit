import { graphqlService } from '$lib/provider/graphql/graphql.service';
import { verifJwt } from '$lib/provider/jwt/jwt.service';
import { ReqGetOnePersonById } from '$lib/query/person.query';
import type { IPersonReceved } from '$lib/types/person.type';
import { ERole } from '$lib/types/role.type';
import config from 'config';
import cookie from 'cookie';
import { getOne } from './routes/api/_api.service';

export const handle = async ({ request, resolve }) => {
  console.log('debut du handle');

  // recuperer les cookie sous forme d'objet
  const cookieApi = cookie.parse(request.headers.cookie);

  // test le cookie si il exist
  if (cookieApi.jwt4368) {
    // vérification expiration + recuperation des données du jwt
    const payload = verifJwt(cookieApi.jwt4368);

    // si payload est expiré
    if (payload.expiredAt) {
      // déconnexion user + suppression token des cookies + suppression header graphql
      delete cookieApi.jwt4368;
    }

    // vérification si le user exist + changement header graphql en fonction du role
    const person = await getOne<IPersonReceved>(
      payload.id,
      ReqGetOnePersonById
    );

    // si le user n'exist pas
    if (!person) {
      console.log('error person not exist');
    }

    // attribut des authorization headers en fonction du role du user connecté
    switch (payload.role) {
      case ERole.ROOT:
        console.log('je suis dans le switch root');
        graphqlService.setHeaders({
          Authorization: `Bearer ${config.get('graphcms.tokenRoot')}`,
        });
        break;
      default:
        console.log('je suis dans le switch default');
        break;
    }

    console.log('creation de la session');
    request.locals.person = person;
  } else {
    graphqlService.setHeaders({
      Authorization: ``,
    });
    request.locals.person = null;
  }

  console.log('fin du handle');
  const response = await resolve(request);

  console.log('RESOLVE : ', response);
  return response;
};

export const getSession = (request) => {
  console.log('je suis dans getSession');

  return request.locals.person
    ? {
        ...request.locals.person,
      }
    : {};
};
