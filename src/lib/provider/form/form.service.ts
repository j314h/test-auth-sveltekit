export const formService = {
  /**
   * fonction qui creer un objet via un formData
   * @param target formElement
   * @returns object from formData
   */
  createObjectAsFormData: <T>(target: HTMLFormElement): T => {
    const formData = new FormData(target);
    const data = {} as T;
    formData.forEach((v, k) => {
      data[k] = v;
    });

    return data;
  },
};
