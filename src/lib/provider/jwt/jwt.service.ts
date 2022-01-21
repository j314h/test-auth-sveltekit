import jwt from 'jsonwebtoken';
import type { IPayloadJwt } from '$lib/provider/jwt/jwt.type';

/**
 * creation d'un token signé
 * @param payload => donnée à mettre dans le token
 * @returns return token
 */
export const createJwt = (payload: IPayloadJwt): string => {
  const token = jwt.sign({ ...payload }, import.meta.env.VITE_JWT_SECRET, {
    expiresIn: 60 * 60,
  }) as string;
  return token;
};

/**
 * vérification du token si valide dans le temps et si il est signé correctement
 * @param token token à vérifier
 * @returns retourne la valeur contenue dans le token
 */
export const verifJwt = (token: string): IPayloadJwt => {
  return jwt.verify(
    token,
    import.meta.env.VITE_JWT_SECRET,
    (err, value: IPayloadJwt) => {
      if (err) {
        return err;
      }
      return value;
    }
  );
};
