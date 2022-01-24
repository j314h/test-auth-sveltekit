import CryptoJS from 'crypto-js';
/**
 * fonction qui hash la string passé en argument
 * @param str une string à hasher
 * @returns retourne un hash
 */
export const encrypt = (str: string): string => {
  return CryptoJS.AES.encrypt(
    str,
    import.meta.env.VITE_CRYPTO_SECRET
  ).toString();
};

/**
 * fonction qui décrypt le hash passé en argument
 * @param hash string hasher
 * @returns retourne le hash en string normal
 */
export const decrypt = (hash: string): string => {
  return CryptoJS.AES.decrypt(
    hash,
    import.meta.env.VITE_CRYPTO_SECRET
  ).toString(CryptoJS.enc.Utf8);
};

/**
 * fonction qui compare une string à un hash
 * @param str string à comparer
 * @param hash string hash venant de la bdd pour comparer
 * @returns return true si verif is ok
 */
export const compareHash = (str: string, hash: string): boolean => {
  // décrypte hash venant de la bdd
  const strHash = decrypt(hash);

  // test si égale
  return strHash === str ? true : false;
};
