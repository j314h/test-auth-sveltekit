/**
 * error payload jwt
 */
export interface IPayloadError {
  name?: string;
  message?: string;
  expiredAt?: Date;
}

/**
 * interface payload jwt
 */
export interface IPayloadJwt extends IPayloadError {
  id?: string;
  email?: string;
  role?: string;
  iap?: Date;
  exp?: Date;
}
