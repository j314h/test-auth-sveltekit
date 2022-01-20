import type { IError } from '../error/error.type';
import type { IImage } from '../image/image.type';

/**
 * interface person
 */
export interface IPerson {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  pseudo?: string;
  email?: string;
  password?: string;
  adresse?: string;
  codePost?: string;
  city?: string;
  phoneNumber?: string;
  avatar?: IImage;
  role?: string;
}

/**
 * interface person
 */
export interface IPersonReceved extends IError {
  person?: IPerson;
}

/**
 * interface person reçus apres creation
 */
export interface IPersonCreateReceved extends IError {
  createPerson?: IPerson;
}

/**
 * interface person reçus apres publication
 */
export interface IPersonPublishReceved extends IError {
  publishPerson?: IPerson;
}
