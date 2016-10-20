// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import ModalLayout from '../layouts/ModalLayout/ModalLayout'
import JobProspectGridList from './JobProspect'
import SearchRoute from './JobSearch'
import LoginRoute from './Login'

function requireAuth (store, replace) {
  const token = localStorage.getItem('auth_token')
  if (!token) replace('/login')
}


export const createRoutes = (store) => ({
  path: '/',
  childRoutes: [
    // Authenticated
    {
      component: CoreLayout,
      onEnter: requireAuth,
      indexRoute: JobProspectGridList(store),
      childRoutes: [
        SearchRoute(store)
      ]
    },
    // Not-authenticated
    {
      component: ModalLayout,
      childRoutes: [
        LoginRoute(store)
      ]
    }
  ]
})

export default createRoutes
