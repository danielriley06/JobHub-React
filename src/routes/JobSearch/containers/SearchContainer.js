import { connect } from 'react-redux'
import { fetchPosts, savePost } from '../modules/actions'
import SearchList from '../components/SearchList'

const mapDispatchToProps = {
  fetchPosts,
  savePost
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
