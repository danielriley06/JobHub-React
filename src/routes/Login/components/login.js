import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import LoginForm from './loginForm'
import SignupForm from './signupForm'
import { Field, reduxForm } from 'redux-form'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {Tabs, Tab} from 'material-ui/Tabs'



const Login = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <Card style={{width: '450px'}}>
      <Tabs>
        <Tab label="Login">
          <CardHeader
            style={{background: 'rgba(241,241,241,.8)', minHeight: '100px'}}
            title="JobHub Login"
          />
          <LoginForm onSubmit={data => {props.loginUser(data)}}/>
        </Tab>
        <Tab label="Sign Up">
          <CardHeader
            style={{background: 'rgba(241,241,241,.8)', minHeight: '100px'}}
            title="JobHub Signup"
          />
          <SignupForm onSubmit={data => {props.signupUser(data)}}/>
        </Tab>
      </Tabs>
    </Card>
  )
}


export default Login
