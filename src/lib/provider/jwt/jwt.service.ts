import jwt from 'jsonwebtoken';
import config from 'config';
import type { IPayloadJwt } from '$lib/types/jwt.type';

export const jwtService = {
  /**
   * creation d'un token signé
   * @param payload => donnée à mettre dans le token
   * @returns return token
   */
  createJwt: (payload: IPayloadJwt): string => {
    const token = jwt.sign({ ...payload }, config.get('jwt.secret'), {
      expiresIn: 60 * 60,
    }) as string;
    return token;
  },

  /**
   * vérification du token si valide dans le temps et si il est signé correctement
   * @param token token à vérifier
   * @returns retourne la valeur contenue dans le token
   */
  verifJwt: (token: string): IPayloadJwt => {
    return jwt.verify(
      token,
      config.get('jwt.secret'),
      (err, value: IPayloadJwt) => {
        if (err) {
          return err;
        }
        return value;
      }
    );
  },

  verifPayload: (payload: IPayloadJwt): boolean => {
    const test = true;
    return test ? true : false;
  },
};
