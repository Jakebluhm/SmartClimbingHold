
  
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

// creates the store
export default (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */
  
    const middleware = []
    const enhancers = []
  
    /* ------------- Saga Middleware ------------- */
  
    const sagaMiddleware = createSagaMiddleware()
    //middleware.push(sagaMiddleware)
  
    /* ------------- Logger Middleware ------------- */
  
    // const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']
    // if (__DEV__) {
    //   // the logger master switch
    // //  const USE_LOGGING = Config.reduxLogging
    //   // silence these saga-based messages
    //   // create the logger 
    //   const logger = createLogger()
    //       //{
    //  //   predicate: (getState, { type }) =>
    //   //    USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST)),
    //  // })
    //   middleware.push(logger)
    // }
  
    /* ------------- Assemble Middleware ------------- */
  
    //enhancers.push(applyMiddleware(...middleware))
    
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  
    // kick off root saga
    sagaMiddleware.run(rootSaga)
    const action = type => store.dispatch({type})
    // enable redux-persist
    // if (ReduxPersist.active) {
    //   RehydrationServices.updateReducers(store)
    // }
  
    return store
  }