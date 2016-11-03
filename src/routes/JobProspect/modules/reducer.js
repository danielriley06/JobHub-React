import { combineReducers } from 'redux'
import {
  INVALIDATE_JOB, REQUEST_JOBS, RECEIVE_JOBS,
  OPEN_JOB
} from './actions/getJobs'
import {
  POST_JOBS_REQUEST, POST_JOBS_SUCCESS, POST_JOBS_FAILURE, CLOSE_JOB
} from './actions/postJobs'


const jobs = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_JOB:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_JOBS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_JOBS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: [...action.posts],
        lastUpdated: action.receivedAt
      }
    case POST_JOBS_REQUEST:
      return {
        ...state,
        isPosting: true
      }
    case POST_JOBS_SUCCESS:
      return {
        ...state,
        isPosting: false,
        didInvalidate: true
      }
    case POST_JOBS_FAILURE:
        return {
          ...state,
          isPosting: false,
          message: action.message
        }
    default:
      return state
  }
}

const setActiveJob = (state = {
          open: false,
          id: null,
          initialValues: {
            id: null,
            jobkey: null,
            url: null,
            company: null,
            jobtitle: null,
            city: null,
            state: null,
            snippet: null,
            contact_name: null,
            contact_email: null,
            notes:  null
            }
          }, action) => {
  switch (action.type) {
    case OPEN_JOB:
      return {
        ...state,
        open: true,
        id: action.id,
        initialValues: {
          id: action.job.id,
          jobkey: action.job.jobkey,
          url: action.job.url,
          company: action.job.company,
          jobtitle: action.job.jobtitle,
          city: action.job.city,
          state: action.job.state,
          snippet: action.job.snippet,
          contact_name: null,
          contact_email: null,
          notes:  null,
          status: action.job.status
        }
      }
    case CLOSE_JOB:
      return {
        ...state,
        open: false,
        id: null,
        initialValues: {
          id: null,
          jobkey: null,
          url: null,
          company: null,
          jobtitle: null,
          city: null,
          state: null,
          snippet: null,
          contact_name: null,
          contact_email: null,
          notes:  null
          }
      }
    default:
      return state
  }
}




const rootReducer = combineReducers({
  jobs,
  setActiveJob
})

export default rootReducer
