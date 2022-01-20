import { IFile } from './../types/file.type';
import { gql } from 'graphql-request';


export const ReqCreateFile = gql`
  mutation createFile($new: IFile!) {
    createFile(data: $new) {
      id
    }
  }
`