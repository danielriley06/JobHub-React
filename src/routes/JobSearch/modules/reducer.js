import { FETCH_POSTS } from './actions'

const initialState = [ ]

const ACTION_HANDLERS = {
  [FETCH_POSTS] : (state, action) => ({...state, ...action.posts})
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
