import { gql } from "@apollo/client";

const USER_FRAGMENT = gql`
  fragment UserDetail on User {
    id
    name
    email
    token
  }
`;

export const REGISTER_USER = gql`
  ${USER_FRAGMENT}
  mutation register($creds: UserInfoInput) {
    register(creds: $creds) {
      ...UserDetail
    }
  }
`;

export const LOGIN_USER = gql`
  ${USER_FRAGMENT}
  mutation login($creds: ContactInput!) {
    login(creds: $creds) {
      ...UserDetail
    }
  }
`;
