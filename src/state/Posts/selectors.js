export const getPosts = state => state.Posts.posts;
export const getFetching = state => state.Posts.loading;
export const getError = state => state.Posts.error;
export const getHasMore = state => state.Posts.hasMore;
export const getPageNumber = state => state.Posts.pageNumber;