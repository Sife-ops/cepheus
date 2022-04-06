import * as t from 'io-ts';

export interface MutationOptions {
  entity: 'bookmark' | 'category';
  json: string;
}

export interface QueryOptions {
  entity: 'bookmarks' | 'categories';
}

// todo: move to request.ts?
export const BookmarkAddInput = t.type({
  url: t.string,
  description: t.string,
  categoryIds: t.array(t.number),
});

export const BookmarkQueryResponse = t.type({
  id: t.union([t.number, t.null]),
  url: t.string,
  description: t.string,
  categories: t.array(
    t.type({
      id: t.number,
      name: t.string,
    })
  ),
});

export const BookmarkUpdateInput = t.type({
  id: t.number,
  url: t.union([t.string, t.undefined]),
  description: t.union([t.string, t.undefined]),
  categoryIds: t.union([t.array(t.number), t.undefined]),
});

export const BookmarksQueryResponse = t.array(BookmarkQueryResponse);

export const CategoryAddInput = t.type({
  name: t.string,
});

export const CategoryQueryResponse = t.type({
  id: t.union([t.number, t.null]),
  name: t.string,
  bookmarks: t.array(
    t.type({
      id: t.number,
      url: t.string,
      description: t.string,
    })
  ),
});

export const CategoryUpdateInput = t.type({
  id: t.number,
  name: t.string,
});

export const CategoriesQueryResponse = t.array(CategoryQueryResponse);

export const DeleteInput = t.type({
  id: t.number,
});
