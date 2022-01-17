import { fetchService } from '$lib/provider/fetch/fetch.service';
import { formService } from '$lib/provider/form/form.service';
import { EMethodeFetch } from '$lib/types/fetch.type';
import type { IPersonPublishReceved } from '$lib/types/person.type';

export const personAction = {
  /**
   * create person
   */
  createPerson: async (e): Promise<void> => {
    // creation formData
    const formData = formService.createObjectAsFormData(e.target);

    // create
    const { publishPerson } = await fetchService.callApi<IPersonPublishReceved>(
      'api/person.json',
      EMethodeFetch.POST,
      formData
    );

    if (!publishPerson) {
      throw new Error(
        "Une erreur est survenu pendant la création, impossible de creer l'utilisateur"
      );
    }
    console.log(publishPerson);
  },
};
