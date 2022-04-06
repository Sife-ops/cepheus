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
`;

export const categoriesQuery = `
query Categories {
  categories {
    id
    name
    bookmarks {
      id
      url
      description
    }
  }
}
`;

export const categoryAddMutation = `
mutation CategoryAdd($name: String!) {
  categoryAdd(name: $name) {
    id
    name
    bookmarks {
      id
      url
      description
    }
  }
}
`;

export const bookmarkAddMutation = `
mutation BookmarkAdd($description: String!, $url: String!, $categoryIds: [Int]) {
  bookmarkAdd(description: $description, url: $url, categoryIds: $categoryIds) {
    id
    url
    description
    categories {
      id
      name
    }
  }
}
`;
