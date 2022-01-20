import { graphqlServiceFile } from './../../provider/graphql/graphql.service';
import type { IFileCreateReceved } from './file.type';
import { callApi } from '$lib/provider/fetch/fetch.service';
import { createObjectAsFormData } from '../../provider/form/form.service';
import { EMethodeFetch } from '$lib/provider/fetch/fetch.type';

/**
 * create image
 */
export const createFile = async (e): Promise<void> => {
  // creation du formData
  const formData = createObjectAsFormData(e.target);

  //create
  const file = await callApi<IFileCreateReceved>(
    graphqlServiceFile,EMethodeFetch.POST,formData
  );
};
