import { graphqlService } from '$lib/provider/graphql/graphql.service';
import { jwtService } from '$lib/provider/jwt/jwt.service';
import { personQuery } from '$lib/query/person.query';
import type { IPersonReceved } from '$lib/types/person.type';
import { ERole } from '$lib/types/role.type';
import config from 'config';
import cookie from 'cookie';
import { apiService } from './routes/api/_api.service';

export const handle = async ({ request, resolve }) => {
  // recuperer les cookie sous forme d'objet
  const cookieApi = cookie.parse(request.headers.cookie);

  // test le cookie si il exist
  if (cookieApi.jwt4368) {
    // vérification expiration + recuperation des données du jwt
    const payload = jwtService.verifJwt(cookieApi.jwt4368);

    // si payload est expiré
    if (payload.expiredAt) {
      console.log('error cookie');
      // déconnexion user + suppression token des cookies + suppression header graphql
      delete cookieApi.jwt4368;
      console.log('COOKIE : ', cookieApi);
    }

    console.log('PAYLOAD : ', payload.id);

    // vérification si le user exist + changement header graphql en fonction du role
    const person = await apiService.getOne<IPersonReceved>(
      payload.id,
      personQuery.getOnePersonById
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
  }

  console.log('fin');

  // on reconstruit la sortie
  const reponse = await resolve(request);
  console.log('RESPONSE : ', reponse);

  // on retourne la request en cours apres modification
  return reponse;
};

export const getSession = (request) => {
  return {
    user: {},
  };
};
