import React from 'react'
import './ModalLayout.scss'
import '../../styles/core.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export const ModalLayout = ({ children }) => (

  <MuiThemeProvider>
    <div>
      <div className='loginContainer'>
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)

ModalLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default ModalLayout
