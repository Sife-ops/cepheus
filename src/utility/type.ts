import * as t from 'io-ts';

export interface MutationOptions {
  entity: 'bookmark' | 'category';
  json: string;
}

export interface QueryOptions {
  entity: 'bookmarks' | 'categories';
}

// todo: move to request.ts?
export const BookmarkInput = t.type({
  url: t.string,
  description: t.string,
  categoryIds: t.array(t.number),
});

export const BookmarkResponse = t.type({
  id: t.number,
  url: t.string,
  description: t.string,
  categories: t.array(
    t.type({
      id: t.number,
      name: t.string,
    })
  ),
});

export const BookmarksResponse = t.array(BookmarkResponse);

export const CategoryInput = t.type({
  name: t.string,
});

export const CategoryResponse = t.type({
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

export const CategoriesResponse = t.array(CategoryResponse);

export const DeleteInput = t.type({
  id: t.number,
});
