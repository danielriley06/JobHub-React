import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import SvgIcon from 'material-ui/SvgIcon'
import {grey50} from 'material-ui/styles/colors'
import {Tabs, Tab} from 'material-ui/Tabs'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow'

const styles = {
  largeIcon: {
    width: 72,
    height: 72
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = [ 'email', 'password' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    fullWidth
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
        <Field name='email' component={renderTextField} label='Email' />
        <Field name='password' type='password' component={renderTextField} label='Password' />
        <FlatButton
          type='Submit'
          backgroundColor="#a4c639"
          hoverColor="#8AA62F"
          fullWidth
          style={{ marginTop: '12', height: '100px', width: '100%', borderRadius: '0px' }}
          buttonStyle={{height: '100px'}}
          icon={<AvPlayArrow color={grey50} style={styles.largeIcon}/>}
        />
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm)
