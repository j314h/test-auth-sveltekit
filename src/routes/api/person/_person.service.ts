import { ReqCreatePerson, ReqPublishedPerson } from '$lib/query/person.query';
import type {
  IPerson,
  IPersonCreateReceved,
  IPersonPublishReceved,
} from '$lib/types/person.type';
import { create, publish } from '../_api.service';

/**
 * fonction qui creer et qui publie une person
 * @description
 * => creation person et récuperation de l'id de la person
 * => utilisation de l'id de la person
 * pour mettre l'etat "publish" dans la bdd
 * @param data => les données de person à creer
 * @returns retourne la person publié
 */
export const createAndPublishPerson = async (
  data: IPerson
): Promise<IPerson> => {
  // creation
  const { createPerson } = await create<IPersonCreateReceved, IPerson>(
    data,
    ReqCreatePerson
  );

  // publication
  const { publishPerson } = await publish<IPersonPublishReceved>(
    createPerson.id,
    ReqPublishedPerson
  );

  return publishPerson;
};

/**
 * fonction qui creer la proprieter username
 * la proprieter userName n'est pas dans le formulaire
 * et elle est requise pour la creation d'une person
 * il faut donc quelle soit creer automatiquement
 * @param first => prénom
 * @param last => nom
 * @returns retourne le prénom + le nom
 */
export const createUserNamePropertie = (
  first: string,
  last: string
): string => {
  return `${first} ${last}`;
};
