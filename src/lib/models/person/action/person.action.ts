import { goto } from '$app/navigation';
import { callApi } from '$lib/provider/fetch/fetch.service';
import { createObjectAsFormData } from '$lib/provider/form/form.service';
import { EMethodeFetch } from '$lib/types/fetch.type';
import type { IPersonPublishReceved } from '$lib/types/person.type';

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
