import { callApi } from '$lib/provider/fetch/fetch.service';
import { createObjectAsFormData } from '$lib/provider/form/form.service';
import { EMethodeFetch } from '$lib/provider/fetch/fetch.type';
import type {
  IPersonPublishReceved,
  IPersonReceved,
} from '$lib/modules/person/person.type';

/**
 * create person
 */
export const createPerson = async (e): Promise<void> => {
  // creation formData
  const formData = createObjectAsFormData(e.target);

  // create
  const person = await callApi<IPersonPublishReceved>(
    'api/person.json',
    EMethodeFetch.POST,
    formData
  );

  if (!person) {
    throw new Error(
      "Une erreur est survenu pendant la création, impossible de creer l'utilisateur"
    );
  }
  console.log(person);

  //goto('/dashboard');
};

/**
 * connexion person
 * @todo: implementer composant erreur à la place du console log
 */
export const login = async (e): Promise<any> => {
  // creation formData
  const formData = createObjectAsFormData(e.target);

  // connexion person
  const response = await callApi<IPersonReceved>(
    'api/login.json',
    EMethodeFetch.POST,
    formData
  );

  // si person exist sinon error
  if (response?.person) {
    return response.person;
  } else {
    console.log(response.error);
    return false;
  }
};
