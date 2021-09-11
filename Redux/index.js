
import { combineReducers, configureStore, createStore } from 'redux' 

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  console.log("Creating store")
  const rootReducer = combineReducers({
    zones: require('../ReduxActions').reducer,
 
  })

  return createStore(rootReducer)
} 