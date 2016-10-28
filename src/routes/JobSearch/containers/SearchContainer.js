import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, savePost } from '../modules/actions'
import SearchList from '../components/SearchList'

class JobSearch extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleClick = (data) => {
    const { dispatch } = this.props
    dispatch(fetchPosts(data))
  }

  handleSave = (data) => {
    const { dispatch } = this.props
    dispatch(savePost(data))
  }

  render() {
    const { jobs, isFetching } = this.props
    const isEmpty = jobs.length === 0
    return (
      <div className='row'>
        <SearchList jobs={jobs} handleClick={data => { this.handleClick(data) }} handleSave={data => { this.handleSave(data) }} isFetching={isFetching} isEmpty={isEmpty} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.results,
    isFetching: state.jobs.isFetching
  }
}

export default connect(mapStateToProps)(JobSearch)
