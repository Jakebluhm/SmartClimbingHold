
  
import React from 'react'
import { connect } from 'react-redux'

import { Scene, Router } from 'react-native-router-flux' 

// screens identified by the router
import SecondScreenContainer from './Screens/SecondScreen'

const NavigationRouter = () => (
    <Router  >
      <Scene key="root" >
        <Scene initial key="secondScreenContainer"  component={SecondScreenContainer} />
 
      </Scene>
    </Router>
  )
  
  export default NavigationRouter