import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsIfNeeded, openJob, closeJob } from '../modules/actions/getJobs'
import { updateJob, createJob } from '../modules/actions/postJobs'
import JobProspectTable from '../components/JobProspectTable'
import JobProspectModalForm from '../components/JobProspectModal'

class App extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  handleOpen = (listItem) => {
    const { dispatch } = this.props
    dispatch(openJob(listItem))
    console.log(listItem)
  }

  handleClose = (data) => {
    const { dispatch } = this.props
    dispatch(updateJob(data))
  }

  render() {
    const { jobs, isFetching, lastUpdated, open } = this.props
    const isEmpty = jobs.length === 0
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <JobProspectModalForm open={open} onSubmit={data => { this.handleClose(data) }} />
              <JobProspectTable jobs={jobs} lastUpdated={lastUpdated} handleOpen={this.handleOpen} handleClose={this.handleClose} state={this.state} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobprospects.jobs.items,
    isFetching: state.jobprospects.jobs.isFetching,
    lastUpdated: state.jobprospects.jobs.lastUpdated,
    open: state.jobprospects.setActiveJob.open
  }
}

export default connect(mapStateToProps)(App)
