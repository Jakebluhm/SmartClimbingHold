import {fork, takeEvery, takeLatest, all} from 'redux-saga/effects' 
import {Actions} from '../ReduxActions'

import {beginClimb, initFirebaseVariables, sendGymSettingsToFirebase} from './firebaseSagas'
 


export default function* root() { 
    yield all([
      takeEvery(Actions.BEGIN_CLIMB_REQUEST, beginClimb),
      takeEvery(Actions.FIREBASE_DATA_REQUEST, initFirebaseVariables ),
      takeEvery(Actions.SAVE_GYM_SETTINGS_REQUEST, sendGymSettingsToFirebase), 
    ])                  
  } 