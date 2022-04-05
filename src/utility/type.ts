import * as t from 'io-ts';

export interface AddOptions {
  entity: 'bookmark' | 'category';
  json: string;
}

export const Category = t.type({
  name: t.string,
});

export const Bookmark = t.type({
  url: t.string,
  description: t.string,
  categories: t.array(Category),
});

export const BookmarkInput = t.type({
  url: t.string,
  description: t.string,
  categoryIds: t.array(t.number),
});
