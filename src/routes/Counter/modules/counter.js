import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

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


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */





// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_POSTS] : (state, action) => [state, {posts: action.posts}]
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { }
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
