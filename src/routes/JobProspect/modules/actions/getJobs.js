import axios from 'axios'

export const REQUEST_JOBS = 'REQUEST_JOBS'
export const RECEIVE_JOBS = 'RECEIVE_JOBS'
export const INVALIDATE_JOB = 'INVALIDATE_JOB'
export const OPEN_JOB = 'OPEN_JOB'


export const openJob = (listItem) => ({
  type: OPEN_JOB,
  id: listItem.id,
  job: listItem
})

export const invalidateReddit = () => ({
  type: INVALIDATE_JOB
})

export const requestPosts = () => ({
  type: REQUEST_JOBS
})

export const receivePosts = (response) => ({
  type: RECEIVE_JOBS,
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
