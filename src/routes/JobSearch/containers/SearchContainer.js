import { connect } from 'react-redux'
import { fetchPosts } from '../modules/actions'
import SearchList from '../components/SearchList'

const mapDispatchToProps = {
  fetchPosts
}

const mapStateToProps = (state) => ({
  posts: state.posts
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
