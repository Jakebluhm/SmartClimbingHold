
import {createReducer, createActions} from 'reduxsauce'
import  Immutable  from 'seamless-immutable';  
import { AuthModes } from '../Lib/AuthModes';

const {Types, Creators} = createActions({
 
    setAuthMode: ['mode'],  
    onEmailChange: ['email'],
    setEmailEntryActive: ['active'],
    onPasswordChange: ['password'],
    setPasswordEntryActive: ['active'],
    onConfirmPasswordChange: ['password'],
    setConfirmPasswordEntryActive: ['active'],
    setInvalidLogin:['invalid']

})

export const Actions = Types;
export default Creators;


/* ------------------ Initial State -------------------*/
export const INITIAL_STATE = new Immutable({ 
    authMode: AuthModes.NONE,  
    email: '',
    emailEntryActive: false,
    password: '',
    passwordEntryActive: false,
    confirmPassword: '',
    confirmPasswordEntryActive: false,
    invalidLogin: '',
 
}); 
 
 
const setAuthMode = (state, action) => {
  console.log("-------------------Inside  setAuthMode -------------------")

  console.log(action.mode)
  return  state.merge({ authMode: action.mode }) 
} 

const onEmailChange = (state, action) => {
  console.log("-------------------Inside  onEmailChange -------------------")

  console.log(action.email)
  return  state.merge({ email: action.email }) 
} 

const setEmailEntryActive = (state, action) => {
  console.log("-------------------Inside  setEmailEntryActive -------------------")

  console.log(action.active)
  return  state.merge({ emailEntryActive: action.active }) 
} 

const onPasswordChange = (state, action) => {
  console.log("-------------------Inside  onPasswordChange -------------------")

  console.log('action.passsword')
  console.log(action.password)
  return  state.merge({ password: action.password }) 
} 

const setPasswordEntryActive = (state, action) => {
  console.log("-------------------Inside  setPasswordEntryActive -------------------")

  console.log(action.active)
  return  state.merge({ passwordEntryActive: action.active }) 
} 

const onConfirmPasswordChange = (state, action) => {
  console.log("-------------------Inside  onConfirmPasswordChange -------------------")

  console.log('action.passsword')

  console.log(action.password)
  return  state.merge({ confirmPassword: action.password }) 
} 

const setConfirmPasswordEntryActive = (state, action) => {
  console.log("-------------------Inside  setConfirmPasswordEntryActive -------------------")

  console.log(action.active)
  return  state.merge({ confirmPasswordEntryActive: action.active }) 
} 

const setInvalidLogin = (state, action) => {
  console.log("-------------------Inside  setInvalidLogin -------------------")

  console.log(action.invalid)
  return  state.merge({ invalidLogin: action.invalid }) 
} 


export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_AUTH_MODE]: setAuthMode,  
    [Types.ON_EMAIL_CHANGE]: onEmailChange,  
    [Types.SET_EMAIL_ENTRY_ACTIVE]: setEmailEntryActive,
    [Types.ON_PASSWORD_CHANGE]: onPasswordChange,  
    [Types.SET_PASSWORD_ENTRY_ACTIVE]: setPasswordEntryActive,
    [Types.ON_CONFIRM_PASSWORD_CHANGE]: onConfirmPasswordChange,  
    [Types.SET_CONFIRM_PASSWORD_ENTRY_ACTIVE]: setConfirmPasswordEntryActive,
    [Types.SET_INVALID_LOGIN]: setInvalidLogin
})


