import { gql } from 'apollo-angular';

export const GET_COUNTRIES = gql`
  query {
    countries {
      name
    }
  }
`;
