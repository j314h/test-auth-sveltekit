/**
 * interface des Files
 */
 export interface IFile {
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
 * interface File reçu
 */
export interface IFileReceved {
  asset?: IFile;
}

/**
 * interface reçu aprée création
 */
 export interface IFileCreateReceved {
  asset?: IFile;
}