import type {
  IPerson,
  IPersonCreateReceved,
  IPersonPublishReceved,
} from '$lib/types/person.type';
import type { IResponseVite } from 'src/global';
import { apiService } from '../_api.service';
import { personQuery } from '../../../lib/query/person.query';
import { cryptoService } from '$lib/provider/crypto/crypto.service';

/**
 * creation user dans graphcms
 * @param {body} => corp de la request
 * @returns retourne body vite
 */
export const post = async ({
  body,
}: {
  body: string;
}): Promise<IResponseVite> => {
  try {
    // parse json les données
    const data = JSON.parse(body) as IPerson;

    // hash password
    data.password = cryptoService.encrypt(data.password);

    // creation du userName
    data.userName = `${data.firstName} ${data.lastName}`;

    // creation
    const { createPerson } = await apiService.create<
      IPersonCreateReceved,
      IPerson
    >(data, personQuery.createPerson);

    // publication
    const { publishPerson } = await apiService.publish<IPersonPublishReceved>(
      createPerson.id,
      personQuery.publishedPerson
    );

    // creation headers
    const headers = apiService.createCookieHeadersApiVite(publishPerson);

    return {
      status: 200,
      headers,
      body: {
        publishPerson,
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
