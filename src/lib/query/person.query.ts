import { gql } from 'graphql-request';

export const personQuery = {
  /**
   * request creation person
   */
  createPerson: gql`
    mutation createPerson($new: PersonCreateInput!) {
      createPerson(data: $new) {
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
        role
        avatar {
          id
          fileName
          url
        }
        role
      }
    }
  `,

  getOnePersonById: gql`
    query getOnePerson($where: ID!) {
      person(where: { id: $where }) {
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
        role
        avatar {
          id
          fileName
          url
        }
        role
      }
    }
  `,

  getOnePersonByEmail: gql`
    query getOnePerson($where: String!) {
      person(where: { email: $where }) {
        id
        firstName
        lastName
        userName
        pseudo
        email
        password
        adresse
        codePost
        city
        phoneNumber
        stage
        role
        avatar {
          id
          fileName
          url
        }
      }
    }
  `,
};
