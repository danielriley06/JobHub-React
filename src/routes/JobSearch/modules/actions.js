import axios from 'axios'


export const FETCH_POSTS = 'FETCH_POSTS'
export const SAVE_POST = 'SAVE_POST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'


function requestPosts () {
  return {
  type: 'FETCH_POSTS',
  isFetching: true
  }
}

function receivePosts (response) {
  return {
    type: 'FETCH_POSTS_SUCCESS',
    isFetching: false,
    results: response.data.results
  }
}

export const fetchPosts = (data) => dispatch => {
  dispatch(requestPosts())
  return axios({
    method: 'get',
    url: `https://crossorigin.me/http://api.indeed.com/ads/apisearch?publisher=7633080574080109&format=json&q=${data.jobTitle}&l=${data.jobCity}%2C+${data.jobState}&sort=&radius=${data.searchRadius}&st=&jt=&start=&limit=100&fromage=&filter=&latlong=1&co=us&chnl=&userip=localhost:3000&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`
  })
    .then(function (response) {
      dispatch(receivePosts(response))
    })
}

export function savePost (data) {
  var job = {company:`${data.company}`, city:`${data.city}`, state:`${data.state}`, url:`${data.url}`, jobtitle:`${data.jobtitle}`, jobkey:`${data.jobkey}`, snippet:`${data.snippet}`}
  return function(dispatch) {
    axios({
      method: 'post',
      url: '/api/jobs',
      headers: {'Content-Type':'application/json','Authorization':localStorage.getItem('auth_token')},
      data: job
    })
    .then(function (response) {
      console.log(response)

    })
    .catch(function (error) {
      console.log(error);
    })
  }
}
