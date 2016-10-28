import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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

let JobProspectModalForm = props => {
  const { handleSubmit, pristine, reset, submitting, open, initialValues } = props
  return (
    <Dialog
        title="Job Prospect"
        modal={true}
        open={open}
        autoScrollBodyContent={true}
      >
      <form onSubmit={handleSubmit}>
        <div className='col-xs-6'>
          <Field name='status' component={renderSelectField} label='Status'>
            <MenuItem value={'Saved'} primaryText='Saved' />
            <MenuItem value={'Applied'} primaryText='Applied' />
            <MenuItem value={'Interviewing'} primaryText='Interviewing' />
            <MenuItem value={'Closed'} primaryText='Closed' />
          </Field>
          <Field name='company' component={renderTextField} label='Company' />
          <Field name='jobtitle' component={renderTextField} label='Job Title' />
          <Field name='city' component={renderTextField} label='City' />
          <Field name='state' component={renderTextField} label='State Abbrev.' />
          <Field name='contact_name' component={renderTextField} label='Contact Name' />
          <Field name='contact_email' component={renderTextField} label='Contact Email' />
        </div>
        <div className='col-xs-6'>
          <a href={props.initialValues.url} target="_blank">
            <RaisedButton
              label='Open Job Post'
              fullWidth
              primary
              style={{ marginTop: '12' }}
            />
          </a>

          <p>
          Job Post Snippet:<br/> {props.initialValues.snippet}
          </p>

          <Field name="notes" component={renderTextField} label="Notes" multiLine={true} rows={4}/>
        </div>
        <div>
          <RaisedButton
            label='Save and Close'
            type='Submit'
            secondary
            fullWidth
            style={{ marginTop: '12' }}
          />
        </div>
      </form>
    </Dialog>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
JobProspectModalForm = reduxForm({
  form: 'JobProspectModalForm',
  enableReinitialize: true  // a unique identifier for this form
})(JobProspectModalForm)

// You have to connect() to any reducers that you wish to connect to yourself
JobProspectModalForm = connect(
  state => ({
    initialValues: state.jobprospects.setActiveJob.initialValues // pull initial values from account reducer
  })             // bind account loading action creator
)(JobProspectModalForm)

export default JobProspectModalForm
