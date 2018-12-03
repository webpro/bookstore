import { fromEvent } from 'graphcool-lib';
import { FACEBOOK_API_VERSION } from '../../constants';

export default async event => {
  console.log(event);

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');
    const { facebookToken } = event.data;
    const facebookUser = await getFacebookUser(facebookToken);
    const user = await getGraphcoolUser(api, facebookUser.id).then(r => r.User);
    let userId = null;

    if (!user) {
      userId = await createGraphcoolUser(api, facebookUser);
    } else {
      userId = user.id;
    }

    const token = await graphcool.generateNodeToken(userId, 'User');
    return {
      data: {
        id: userId,
        token
      }
    };
  } catch (e) {
    console.log(e);
    return {
      error: 'An unexpected error occured during authentication.'
    };
  }
};

async function getFacebookUser(facebookToken) {
  const endpoint = `https://graph.facebook.com/${FACEBOOK_API_VERSION}/me?fields=id%2Cemail%2Cfirst_name&access_token=${facebookToken}`;
  const data = await fetch(endpoint).then(response => response.json());

  if (data.error) {
    throw new Error(JSON.stringify(data.error));
  }

  return data;
}

async function getGraphcoolUser(api, facebookUserId) {
  const query = `
    query getUser($facebookUserId: String!) {
      User(facebookUserId: $facebookUserId) {
        id
      }
    }
  `;
  const variables = {
    facebookUserId
  };
  return api.request(query, variables);
}

async function createGraphcoolUser(api, facebookUser) {
  const mutation = `
    mutation createUser($facebookUserId: String!, $email: String, $firstName: String) {
      createUser(
        facebookUserId: $facebookUserId
        email: $email
        firstName: $firstName
      ) {
        id
      }
    }
  `;
  const variables = {
    facebookUserId: facebookUser.id,
    email: facebookUser.email,
    firstName: facebookUser.first_name
  };
  return api.request(mutation, variables).then(r => r.createUser.id);
}
