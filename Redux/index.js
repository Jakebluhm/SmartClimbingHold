
import { combineReducers,  createStore } from 'redux' 
import rootSaga from '../Sagas/'
import configureStore from './CreateStore'
export default () => {
  /* ------------- Assemble The Reducers ------------- */
  console.log("Creating store") 
  const rootReducer = combineReducers({
    route: require('./ReduxActions').reducer,
    climbingGym: require('./PasscodeRedux').reducer,
 
  })

  return configureStore(rootReducer, rootSaga)
}  