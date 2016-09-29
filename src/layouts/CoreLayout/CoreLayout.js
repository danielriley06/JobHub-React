import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

export const CoreLayout = ({ children }) => (

  <MuiThemeProvider muiTheme={getMuiTheme({userAgent: navigator.userAgent})}>
    <div>
      <Header />
      <div className='container-fluid text-center'>
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
