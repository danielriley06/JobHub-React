import { connect } from 'react-redux'
import { loginUser, signupUser } from '../modules/actions'
import Login from '../components/login'

const mapDispatchToProps = {
  loginUser,
  signupUser
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
