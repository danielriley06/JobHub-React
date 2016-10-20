import axios from 'axios'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const selectReddit = () => ({
  type: SELECT_REDDIT
})

export const invalidateReddit = () => ({
  type: INVALIDATE_REDDIT
})

export const requestPosts = () => ({
  type: REQUEST_POSTS
})

export const receivePosts = (response) => ({
  type: RECEIVE_POSTS,
  posts: response.data.map(index => index),
  receivedAt: Date.now()
})

const fetchPosts = () => dispatch => {
  dispatch(requestPosts())
  return axios({
    method: 'get',
    url: `api/jobs`,
    headers: {'Content-Type':'application/json','Authorization':localStorage.getItem('auth_token')}
  })
  .then(function (response) {
    console.log(response)
    dispatch(receivePosts(response))
  })
}

const shouldFetchPosts = (state) => {
  const posts = state.jobsList
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = ()=> (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts())
  }
}
