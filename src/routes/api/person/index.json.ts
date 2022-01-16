import type {
  IPerson,
  IPersonCreateReceved,
  IPersonPublishReceved,
} from '$lib/types/person.type';
import type { IResponseVite } from 'src/global';
import { apiService } from '../_api.service';
import { personQuery } from './query/person.query';

/**
 * creation user dans graphcms
 * @param param0 => corsp de la request
 * @returns => retourne body
 */
export const post = async ({ body }): Promise<IResponseVite> => {
  try {
    // parse json les données
    const data = JSON.parse(body);

    // creation
    const { createPerson } = await apiService.create<
      IPersonCreateReceved,
      IPerson
    >(data, personQuery.createPerson);
    console.log('PERSON : ', createPerson);

    // publication
    const { publishPerson } = await apiService.publish<IPersonPublishReceved>(
      createPerson.id,
      personQuery.publishedPerson
    );
    console.log('PUBLISH : ', publishPerson);

    return {
      status: 200,
      body: {
        createPerson,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error,
      },
    };
  }
};
