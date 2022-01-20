import { IFileCreateReceved } from './file.type';
import { callApi } from '$lib/provider/fetch/fetch.service';
import { createObjectAsFormData } from '../../provider/form/form.service';

/**
 * create image
 */
export const createFile = async (e): Promise<void> => {
  // creation du formData
  const formData = createObjectAsFormData(e.target);

  //create
  /* conte file = await callApi<IFileCreateReceved>(
    
  ) */
};
