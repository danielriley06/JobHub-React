import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsIfNeeded, openJob, closeJob } from '../modules/actions/getJobs'
import { updateJob, createJob } from '../modules/actions/postJobs'
import JobProspectTable from '../components/JobProspectTable'
import JobProspectModalForm from '../components/JobProspectModal'
import JobProspectMetrics from '../components/JobProspectMetrics'
import Spinner from 'react-spinkit'

class App extends Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  componentDidUpdate () {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  handleOpen = (listItem) => {
    const { dispatch } = this.props
    dispatch(openJob(listItem))
  }

  handleClose = (data) => {
    const { dispatch } = this.props
    dispatch(updateJob(data))
  }

  render () {
    const { jobs, isFetching, lastUpdated, open } = this.props
    const isEmpty = jobs.length === 0
    return (
      <div>
        {isEmpty
          ? (isFetching ?
            <div className='center'>
              <Spinner spinnerName='three-bounce' noFadeIn />
            </div> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div className='container-fluid'>
              <div className='row flex-items-xs-center'>
                <JobProspectModalForm open={open} onSubmit={data => { this.handleClose(data) }} />
                <JobProspectMetrics jobs={jobs} />
                <JobProspectTable jobs={jobs} lastUpdated={lastUpdated} handleOpen={this.handleOpen} handleClose={this.handleClose} state={this.state} />
              </div>
            </div>
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
