
import { combineReducers,  createStore } from 'redux' 
import rootSaga from '../Sagas/'
import configureStore from './CreateStore'
export default () => {
  /* ------------- Assemble The Reducers ------------- */
  console.log("Creating store")
  const rootReducer = combineReducers({
    zones: require('../ReduxActions').reducer,
 
  })

  return configureStore(rootReducer, rootSaga)
} 