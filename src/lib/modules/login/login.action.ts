import { callApi } from '$lib/provider/fetch/fetch.service';
import { EMethodeFetch } from '$lib/provider/fetch/fetch.type';
import { createObjectAsFormData } from '$lib/provider/form/form.service';
import type { IPersonReceved } from '../person/person.type';

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
