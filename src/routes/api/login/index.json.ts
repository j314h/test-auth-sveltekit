import { createCookieHeadersApiVite } from '$lib/provider/cookie/cookie.service';
import { compareHash } from '$lib/provider/crypto/crypto.service';
import { personQuery } from '$lib/query/person.query';
import type { IPerson, IPersonReceved } from '$lib/types/person.type';
import type { IResponseVite } from 'src/global';
import { getOne } from '../_api.service';

/**
 * fonction de connexion person
 * @description
 * => parse les données du body
 * => recuperer la person via son email depuis la bdd
 * => test si person recuperer existe
 * => test si le mot de passe fournis correspond au mot de passe contenu dans la bdd
 * => enleve le password de l'objet person recuperer
 * => creation du header avec le cookie
 * @param {body} => les données venant du form
 * @returns
 */
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
    // si l'utilisateur n'existe pas
    if (!person) {
      throw new Error("L'utilisateur est inconnu !");
    }
    const res = compareHash(data.password, person.password);
    // si mot de passe pas ok
    if (!res) {
      throw new Error('Mot de passe incorrecte !');
    }

    // on supprime password du person
    delete person.password;

    // creation headers
    const headers = createCookieHeadersApiVite(person);

    return {
      status: 200,
      headers,
      body: {
        ...person,
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
