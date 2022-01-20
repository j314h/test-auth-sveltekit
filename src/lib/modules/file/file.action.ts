import { graphqlServiceFile } from './../../provider/graphql/graphql.service';
import type { IFileCreateReceved } from './file.type';
import { callApi } from '$lib/provider/fetch/fetch.service';
import { createObjectAsFormData } from '../../provider/form/form.service';
import { EMethodeFetch } from '$lib/provider/fetch/fetch.type';
import { ReqCreateFile } from './file.query';

/**
 * create image
 */
export const createFileAction = async (e): Promise<void> => {
  // creation du formData
  const formData = createObjectAsFormData(e.target);

  //create
  const file = await graphqlServiceFile.request<IFileCreateReceved>(
    ReqCreateFile,
    { new: formData }
  );

  console.log(file);
};
