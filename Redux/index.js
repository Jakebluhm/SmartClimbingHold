
import { combineReducers, configureStore, createStore } from 'redux' 

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    zones: require('../ReduxActions').reducer,
 
  })

  return createStore(rootReducer)
} 