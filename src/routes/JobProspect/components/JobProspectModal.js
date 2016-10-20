import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'jobTitle', 'jobCity', 'jobState' ]
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

const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
  <SelectField
    fullWidth
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children} />
)

const JobProspectModalForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <Dialog
        title="Dialog With Actions"
        modal={true}
        open={props.state.open}
      >
      <form onSubmit={handleSubmit}>
        <Paper zDepth={1} rounded={false}>
          <Field name='jobTitle' component={renderTextField} label='Job Title' />
          <Divider />
          <Field name='jobCity' component={renderTextField} label='City' />
          <Divider />
          <Field name='jobState' component={renderTextField} label='State Abbrev.' />
          <Divider />
          <Field name='searchRadius' component={renderSelectField} label='Search Radius'>
            <MenuItem value={'5'} primaryText='5 miles' />
            <MenuItem value={'10'} primaryText='10 miles' />
            <MenuItem value={'25'} primaryText='25 miles (Default)' />
            <MenuItem value={'50'} primaryText='50 miles' />
            <MenuItem value={'100'} primaryText='100 miles' />
          </Field>
        </Paper>
        <div>
          <RaisedButton
            label='Search Indeed.com'
            type='Submit'
            secondary
            fullWidth
            style={{ marginTop: '12' }}
            disabled={pristine || submitting}
          />
        </div>
      </form>
    </Dialog>
  )
}

export default reduxForm({
  form: 'JobProspectModalForm',  // a unique identifier for this form
  validate
})(JobProspectModalForm)
