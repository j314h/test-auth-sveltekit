import { callApi } from '$lib/provider/fetch/fetch.service';
import { createObjectAsFormData } from '$lib/provider/form/form.service';
import { EMethodeFetch } from '$lib/provider/fetch/fetch.type';
import type { IPersonReceved } from '$lib/modules/person/person.type';

/**
 * create person
 */
export const createPerson = async (e): Promise<any> => {
  // creation formData
  const formData = createObjectAsFormData(e.target);

  // create
  const response = await callApi<IPersonReceved>(
    'api/person.json',
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
