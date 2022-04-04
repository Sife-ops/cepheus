export const loginMutation = `
mutation Login($username: String!, $password: String!, $remember: Boolean) {
  login(username: $username, password: $password, remember: $remember) {
    accessToken
  }
}
`;

export const bookmarksQuery = `
query Bookmarks {
  bookmarks {
    id
    url
    description
    categories {
      id
      name
    }
  }
}
`
