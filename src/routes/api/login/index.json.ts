import { createCookieHeadersApiVite } from '$lib/provider/cookie/cookie.service';
import { cryptoService } from '$lib/provider/crypto/crypto.service';
import { personQuery } from '$lib/query/person.query';
import type { IPerson, IPersonReceved } from '$lib/types/person.type';
import type { IResponseVite } from 'src/global';
import { getOne } from '../_api.service';

export const post = async ({
  body,
}: {
  body: string;
}): Promise<IResponseVite> => {
  try {
    // parse json les données
    const data = JSON.parse(body) as IPerson;

    // recuperation person avec email
    const { person } = await getOne<IPersonReceved>(
      data.email,
      personQuery.getOnePersonByEmail
    );

    // compare mot de passe
    const resCompare = cryptoService.compareHash(
      data.password,
      person.password
    );

    // si mot de passe pas ok
    if (!resCompare) {
      throw new Error('Mot de passe incorrecte !');
    }

    // creation headers
    const headers = createCookieHeadersApiVite(person);

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
