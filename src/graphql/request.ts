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

export const bookmarkDeleteMutation = `
mutation BookmarkDelete($id: Int!) {
  bookmarkDelete(id: $id) {
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

export const categoryDeleteMutation = `
mutation CategoryDelete($id: Int!) {
  categoryDelete(id: $id) {
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

export const loginMutation = `
mutation Login($username: String!, $password: String!, $remember: Boolean) {
  login(username: $username, password: $password, remember: $remember) {
    accessToken
  }
}
`;

export const bookmarkUpdateMutation = `
mutation BookmarkUpdate($id: Int!, $description: String, $url: String, $categoryIds: [Int]) {
  bookmarkUpdate(id: $id, description: $description, url: $url, categoryIds: $categoryIds) {
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

export const categoryUpdateMutation = `
mutation CategoryUpdate($id: Int!, $name: String!) {
  categoryUpdate(id: $id, name: $name) {
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
