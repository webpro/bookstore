import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const loggedInUser = gql`
  query LoggedInUser {
    loggedInUser {
      id
      email
      firstName
    }
  }
`;

const withUser = graphql(loggedInUser, {
  options: () => ({
    fetchPolicy: 'network-only'
  }),
  props: ({ data: { loggedInUser }, loading, error }) => {
    const id = loggedInUser ? loggedInUser.id : null;
    const label = loggedInUser ? loggedInUser.firstName || loggedInUser.email : null;
    return { user: { loading, error, id, label } };
  }
});

export default component => withUser(component);
