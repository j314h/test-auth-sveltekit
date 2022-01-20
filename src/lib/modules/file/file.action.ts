import { graphqlServiceFile } from '$lib/provider/graphql/graphql.service';
import type { IFileCreateReceved } from './file.type';
import { createObjectAsFormData } from '../../provider/form/form.service';
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
