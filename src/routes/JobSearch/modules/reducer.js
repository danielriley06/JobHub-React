import { FETCH_POSTS, SAVE_POST } from './actions'

const initialState = {}

const ACTION_HANDLERS = {
  [FETCH_POSTS] : (state, action) => ({ ...state, ...action.jobs }),
  [SAVE_POST] : (state, action) => ({ ...state, ...action.jobs })
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
