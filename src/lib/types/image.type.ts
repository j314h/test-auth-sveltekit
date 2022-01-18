/**
 * interface des images
 */
export interface IImage {
  stage?: string
  locale?: string
  localizations?: string
  documentInStages?:string
  id?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  handle?: string
  fileName?: string
  height?: string
  width?: string
  size?: string
  mimeType?: string
  createdBy?: string
  updatedBy?: string
  url?: string
}

/**
 * interface image reçu
 */
export interface IImageReceved {
  asset?: IImage;
}

/**
 * interface reçu aprée création
 */
 export interface IImageCreateReceved {
  asset?: IImage;
}
