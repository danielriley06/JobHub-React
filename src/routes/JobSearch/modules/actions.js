import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

// ------------------------------------
// Actions -- JOBS
// ------------------------------------
export function fetchPosts() {
  return function(dispatch) {
    return axios({
      method: 'get',
      url: `https://www.reddit.com/r/reactjs.json`,
      headers: []
    })
    .then(function(response) {
      dispatch(receivePosts(response))
    })
  }
}

function receivePosts(response) {
	return {
		type: 'FETCH_POSTS',
		posts: response.data.data.children.map(child => child.data)
	}
}
