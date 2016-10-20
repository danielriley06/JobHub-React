import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsIfNeeded } from '../modules/actions'
import JobProspectTable from '../components/JobProspectTable'

class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  state = { open: false }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const { posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <JobProspectTable posts={posts} lastUpdated={lastUpdated} handleOpen={this.handleOpen} handleClose={this.handleClose} state={this.state} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.jobprospects.posts.items,
    isFetching: state.jobprospects.posts.isFetching,
    lastUpdated: state.jobprospects.posts.lastUpdated
  }
}

export default connect(mapStateToProps)(App)
