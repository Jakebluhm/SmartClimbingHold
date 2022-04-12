import { take } from 'lodash'
import {fork, takeEvery, takeLatest, all} from 'redux-saga/effects' 
import {Actions} from '../Redux/ReduxActions'

import {beginClimb, initFirebaseVariables, sendGymSettingsToFirebase, setClimberData, incrementClimbersFailedClimbs} from './firebaseSagas'
 


export default function* root() { 
    yield all([
      takeEvery(Actions.BEGIN_CLIMB_REQUEST, beginClimb),
      takeEvery(Actions.FIREBASE_DATA_REQUEST, initFirebaseVariables ),
      takeEvery(Actions.SAVE_GYM_SETTINGS_REQUEST, sendGymSettingsToFirebase), 
      takeEvery(Actions.RESET_CLIMBER_DATA_REQUEST ,setClimberData),
      takeEvery(Actions.SET_CURRENT_CLIMBER_FAILURES_REQUEST, incrementClimbersFailedClimbs)
    ])                  
  } 