import { gql } from 'graphql-request';

/**
 * request creation du file
 */
export const ReqCreateFile = gql`
  mutation createAsset($new: AssetCreateInput!) {
    createAsset(where: {data: $new}) {
      id
    }
  }
`

/**
 * request modification du file
 */
export const ReqUpdateFile = gql`
mutation updateFile($where: ID!, $data: AssetUpdateInput  ) {
  updateAsset(where: { id: $where }, data: $data) {
    id
  }
}
`

/**
 * resquest effacement du file
 */
export const ReqDeleteFile = gql`
  mutation deleteAsset($where: ID) {
  deleteAsset(where:{id: $where}){
  }
}
`