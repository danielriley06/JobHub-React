import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, savePost } from '../modules/actions'
import { fetchPostsIfNeeded } from '../../JobProspect/modules/actions/getJobs'
import SearchList from '../components/SearchList'
import SearchForm from '../components/SearchForm'

class JobSearch extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    prospects: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  handleClick = (data) => {
    const { dispatch } = this.props
    dispatch(fetchPosts(data))
  }

  handleSave = (data) => {
    const { dispatch } = this.props
    dispatch(savePost(data))
  }

  isSaved = (jobkey) => {
    for (var i = 0; i < this.props.prospects.length; i++) {
      if (this.props.prospects[i].jobkey === jobkey) {
        return true
      }
    }
  }

  render () {
    const { jobs, isFetching } = this.props
    const isEmpty = jobs.length === 0
    return (
      <div className='row'>
        <div className='col-xs-12 col-lg-3'>
          <SearchForm onSubmit={data => { this.handleClick(data) }} />
        </div>
        <SearchList jobs={jobs} handleClick={data => { this.handleClick(data) }} handleSave={data => { this.handleSave(data) }} isFetching={isFetching} isEmpty={isEmpty} isSaved={this.isSaved.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.results,
    isFetching: state.jobs.isFetching,
    prospects: state.jobprospects.jobs.items
  }
}

export default connect(mapStateToProps)(JobSearch)
