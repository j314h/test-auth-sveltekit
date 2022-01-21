import { createObjectAsFormData } from '$lib/provider/form/form.service';
import { graphqlServiceFile } from '$lib/provider/graphql/graphql.service';
import { ReqCreateFile } from './file.query';
import type { IFileCreateReceved } from './file.type';

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
