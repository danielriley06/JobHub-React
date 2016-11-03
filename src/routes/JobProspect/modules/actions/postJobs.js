import axios from 'axios'

export const POST_JOBS_REQUEST = 'POST_JOBS'
export const POST_JOBS_SUCCESS = 'POST_JOBS_SUCCESS'
export const POST_JOBS_FAILURE = 'POST_JOBS_FAILURE'
export const CLOSE_JOB = 'CLOSE_JOB'

function initiateJobPost (data) {
  return {
    type: POST_JOBS_REQUEST,
    data
  }
}

function jobPostSuccess (response) {
  return {
    type: POST_JOBS_SUCCESS
  }
}

function jobPostError (message) {
  return {
    type: POST_JOBS_FAILURE,
    isPosting: false,
    message
  }
}

export const closeJob = () => ({
  type: CLOSE_JOB
})

export function updateJob (data) {
  var job = { company:`${data.company}`, city:`${data.city}`, state:`${data.state}`, url:`${data.url}`, jobtitle:`${data.jobtitle}`, jobkey:`${data.jobkey}`, status:`${data.status}` }

  return function (dispatch) {
    axios({
      method: 'patch',
      url: `/api/jobs/${data.id}`,
      headers: { 'Content-Type':'application/json', 'Authorization':localStorage.getItem('auth_token') },
      data: job
    })
    .then(function (response) {
      console.log(response)
      dispatch(jobPostSuccess(response))
      dispatch(closeJob())
      // refresh prospect list
    })
    .catch(function (error) {
      jobPostError(error)
    })
  }
}

export function createJob (data) {
  var job = { company:`${data.company}`, city:`${data.city}`, state:`${data.state}`, url:`${data.url}`, jobtitle:`${data.jobtitle}`, jobkey:`${data.jobkey}` }
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/api/jobs',
      headers: { 'Content-Type':'application/json', 'Authorization':localStorage.getItem('auth_token') },
      data: job
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
