import config from 'config';
import CryptoJS from 'crypto-js';

export const cryptoService = {
  /**
   * fonction qui hash la string passé en argument
   * @param str une string à hasher
   * @returns retourne un hash
   */
  encrypt: (str: string): string => {
    return CryptoJS.AES.encrypt(str, config.get('crypto.secret')).toString();
  },

  /**
   * fonction qui décrypt le hash passé en argument
   * @param hash string hasher
   * @returns retourne le hash en string normal
   */
  decrypt: (hash: string): string => {
    return CryptoJS.AES.decrypt(hash, config.get('crypto.secret')).toString(
      CryptoJS.enc.Utf8
    );
  },

  /**
   * fonction qui compare une string à un hash
   * @param str string à comparer
   * @param hash string hash venant de la bdd pour comparer
   * @returns return true si verif is ok
   */
  compareHash: (str: string, hash: string): boolean => {
    // décrypte hash venant de la bdd
    const strHash = cryptoService.decrypt(hash);

    // test si égale
    return strHash === str ? true : false;
  },
};
