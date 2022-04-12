
import {createReducer, createActions} from 'reduxsauce'
import  Immutable  from 'seamless-immutable'; 
import {PasscodeCreationStates} from '../Lib/PasscodeCreationStates'


const {Types, Creators} = createActions({
 
    passcodeChanged: ['code'], 
    tempPasscodeChanged: ['code'],
    setPasscodeState: ['pcState'],

})

export const Actions = Types;
export default Creators;


/* ------------------ Initial State -------------------*/
export const INITIAL_STATE = new Immutable({ 
    passcode: "", 
    tempPasscode:"",
    passcodeState: PasscodeCreationStates.LOADING,
 
}); 
 
 
const passcodeChanged = (state, action) => {
  //console.log("-------------------Inside  passcodeChanged -------------------")
 
  //console.log(action.code)
    return  state.merge({ passcode: action.code }) 
}

const tempPasscodeChanged = (state, action) => {
  //console.log("-------------------Inside  tempPasscodeChanged -------------------")

  //console.log(action.code)
    return  state.merge({ tempPasscode: action.code }) 
}


const setPasscodeState = (state, action) => {
  //console.log("-------------------Inside  setPasscodeState -------------------")

  //console.log(action.pcState)
    return  state.merge({ passcodeState: action.pcState }) 
}


   
 


export const reducer = createReducer(INITIAL_STATE, {
    //[Types.BEGIN_CLIMB]: refreshData, 
    [Types.PASSCODE_CHANGED]: passcodeChanged, 
    [Types.SET_PASSCODE_STATE]:setPasscodeState,  
    [Types.TEMP_PASSCODE_CHANGED]:tempPasscodeChanged,
})


