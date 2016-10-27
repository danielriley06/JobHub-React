import { connect } from 'react-redux'
import { fetchPosts, savePost } from '../modules/actions'
import SearchList from '../components/SearchList'

const mapDispatchToProps = {
  fetchPosts,
  savePost
}

const mapStateToProps = (state) => ({
  jobs: state.jobs
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
