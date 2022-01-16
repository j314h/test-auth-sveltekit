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
}

/**
 * interface person reçus apres creation
 */
export interface IPersonCreateReceved {
  createPerson?: IPerson;
}

/**
 * interface person reçus apres publication
 */
export interface IPersonPublishReceved {
  publishPerson?: IPerson;
}
