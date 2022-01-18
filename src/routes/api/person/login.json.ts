import { cryptoService } from '$lib/provider/crypto/crypto.service';
import { personQuery } from '$lib/query/person.query';
import type { IPerson, IPersonReceved } from '$lib/types/person.type';
import type { IResponseVite } from 'src/global';
import { apiService } from '../_api.service';
import { cookieService } from '../_cookie.service';

export const post = async ({
  body,
}: {
  body: string;
}): Promise<IResponseVite> => {
  try {
    console.log('connexion user');
    // parse json les données
    const data = JSON.parse(body) as IPerson;

    // recuperation person avec email
    const { person } = await apiService.getEmail<IPersonReceved>(
      data.email,
      personQuery.getOnePersonByEmail
    );

    // compare mot de passe
    cryptoService.compareHash(data.password, person.password);

    // creation headers
    const headers = cookieService.createCookieHeadersApiVite(person);

    return {
      status: 200,
      headers,
      body: {
        person,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: error.error,
      },
    };
  }
};
