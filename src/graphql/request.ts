export const loginMutation = `
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
  }
}
`;

