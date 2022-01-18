import type { IPerson } from '$lib/types/person.type';
import type { IResponseVite } from 'src/global';
import { cryptoService } from '$lib/provider/crypto/crypto.service';
import {
  createAndPublishPerson,
  createUserNamePropertie,
} from './_person.service';

/**
 * creation user dans graphcms
 * @description
 * => parse les données du body
 * => hash password
 * => creation de la proprieter userName
 * => creation + publication person dans la bdd
 * si vous avez besoin de connecter l'utilisateur
 * au moment de la creation il suffis de rajouter
 * la fonction de creationheader venant de cookie.service depuis provider
 * implementer là avant le return contenu dans le try
 * et ajouter la variable reçus à l'objet de retour
 * cela permet d'ajouter directement à la creation le jwt en cookie
 * (l'utilisateur est connecté des la creation de son compte)
 * @param {body} => corp de la request (il à été stringify donc il faut le parse)
 * @returns retourne body vite
 */
export const post = async ({
  body,
}: {
  body: string;
}): Promise<IResponseVite> => {
  try {
    // parse json les données reçus dans body
    const data = JSON.parse(body) as IPerson;
    // hash password
    data.password = cryptoService.encrypt(data.password);
    // creation du userName
    data.userName = createUserNamePropertie(data.firstName, data.lastName);
    // creation et publication person dans bdd
    const person = await createAndPublishPerson(data);

    return {
      status: 200,
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
