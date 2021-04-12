export const getPosts = state => state.SearchPage.posts;
export const getSearchQuery = state => state.SearchPage.query;
export const getFetching = state => state.SearchPage.loading;
export const getError = state => state.SearchPage.error;
export const getHasMore = state => state.SearchPage.hasMore;
export const getPageNumber = state => state.SearchPage.pageNumber;