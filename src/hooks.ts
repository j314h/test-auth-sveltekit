import { graphqlService } from '$lib/provider/graphql/graphql.service';
import { verifJwt } from '$lib/provider/jwt/jwt.service';
import { ReqGetOnePersonById } from '$lib/query/person.query';
import type { IPersonReceved } from '$lib/types/person.type';
import { ERole } from '$lib/types/role.type';
import config from 'config';
import cookie from 'cookie';
import { getOne } from './routes/api/_api.service';

export const handle = async ({ request, resolve }) => {
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
  } else {
    graphqlService.setHeaders({
      Authorization: ``,
    });
  }

  console.log('fin');

  // on reconstruit la sortie
  const reponse = await resolve(request);

  // on retourne la request en cours apres modification
  return reponse;
};

export const getSession = (request) => {
  return {
    user: {},
  };
};
