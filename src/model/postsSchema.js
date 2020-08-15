export const POSTS_SCHEMA = 'posts';
export const PostsSchema = {
  name: POSTS_SCHEMA,
  properties: {
    userId: 'int',
    id: 'int',
    title: 'string',
    body: 'string',
  },
};
