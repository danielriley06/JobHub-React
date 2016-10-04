// ------------------------------------
// Action Types
// ------------------------------------
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_BOARD = 'SELECT_BOARD'
export const INVALIDATE_BOARD = 'INVALIDATE_BOARD'

// ------------------------------------
// Actions Creators
// ------------------------------------

export const selectBoard = reddit => ({
  type: SELECT_BOARD,
  reddit
})

export const invalidateBoard = reddit => ({
  type: INVALIDATE_BOARD,
  reddit
})

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

// ------------------------------------
// Async Request
// ------------------------------------

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`http://api.indeed.com/ads/apisearch?publisher=7633080574080109&format=json&q=${jobTitle}&l=${city}%2C+${state}&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
