import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUserId, updateUsername} from '../../redux/reducer'
import axios from 'axios'

class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      loginUsername: '',
      loginPassword: '',
      loginError: false,
      loginErrorMessage: 'Username or password is incorrect. Please try again.'
    }
  }
  render(){
    return(
      <>
        <h1>Login</h1>
        <form>
          <input type="text"/>
          <input type="text"/>
          <button>Login</button>
        </form>
      </>
    )
    
  }
}