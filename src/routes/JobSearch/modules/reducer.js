import { FETCH_POSTS, SAVE_POST, FETCH_POSTS_SUCCESS } from './actions'

const initialState = { results:[], isFetching: false }

const ACTION_HANDLERS = {
  [FETCH_POSTS] : (state, action) => ({ ...state, ...action }),
  [SAVE_POST] : (state, action) => ({ ...state, ...action.jobs }),
  [FETCH_POSTS_SUCCESS] : (state, action) => ({ ...state, ...action })
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
