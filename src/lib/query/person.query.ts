import { gql } from 'graphql-request';

/**
 * request creation person
 */
export const ReqCreatePerson = gql`
  mutation createPerson($new: PersonCreateInput!) {
    createPerson(data: $new) {
      id
    }
  }
`;

/**
 * publication de la person
 */
export const ReqPublishedPerson = gql`
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
`;

/**
 * request recupere person via l'id
 */
export const ReqGetOnePersonById = gql`
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
`;

/**
 * request recupere person via l'email
 */
export const ReqGetOnePersonByEmail = gql`
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
`;
