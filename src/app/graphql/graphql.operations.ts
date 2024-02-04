import { gql } from 'apollo-angular';

const GET_COUNTRIES = gql`
  query {
    countries {
      name
    }
  }
`;

export { GET_COUNTRIES };
