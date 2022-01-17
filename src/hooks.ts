import { jwtService } from '$lib/provider/jwt/jwt.service';
import cookie from 'cookie';

export const handle = async ({ request, resolve }) => {
  // recuperer les cookie sous forme d'objet
  const cookieApi = cookie.parse(request.headers.cookie);

  // test le cookie si il exist
  if (cookieApi.jwt4368) {
    // vérification expiration + recuperation des données du jwt
    const payload = jwtService.verifJwt(cookieApi.jwt4368);

    if (payload.expiredAt) {
      // déconnexion user + suppression token des cookies + suppression header graphql
    }

    // vérification si le user exist + changement header graphql en fonction du role

    console.log('PAYLOAD : ', payload);
  }

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
