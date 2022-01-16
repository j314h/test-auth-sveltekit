import { gql } from 'graphql-request';

export const personQuery = {
  /**
   * request creation person
   */
  createPerson: gql`
    mutation createPerson($newPerson: PersonCreateInput!) {
      createPerson(data: $newPerson) {
        id
        stage
        createdAt
        updatedAt
        firstName
        lastName
        userName
        pseudo
        email
      }
    }
  `,

  /**
   * publication de la person
   */
  publishedPerson: gql`
    mutation publishedPerson($id: PersonWhereUniqueInput!) {
      publishPerson(where: $id) {
        id
        email
        userName
        firstName
        lastName
      }
    }
  `,
};
