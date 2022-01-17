import { gql } from 'graphql-request';

export const personQuery = {
  /**
   * request creation person
   */
  createPerson: gql`
    mutation createPerson($newPerson: PersonCreateInput!) {
      createPerson(data: $newPerson) {
        id
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
        firstName
        lastName
        userName
        pseudo
        email
        adresse
        codePost
        city
        phoneNumber
        stage
        avatar {
          id
          fileName
          url
        }
        role
      }
    }
  `,

  getOnePerson: gql`
    query getPerson($id: ID!) {
      person(where: { id: $id }) {
        id
        firstName
        lastName
        userName
        pseudo
        email
        adresse
        codePost
        city
        phoneNumber
        stage
        avatar {
          id
          fileName
          url
        }
        role
      }
    }
  `,
};
