import React, { Component } from 'react'
import { View } from 'react-native'
import NavigationRouter from './NavigationRouter'
 
 

export default class Root extends Component {
  render() {
    return (
      <View  > 
        <NavigationRouter />
      </View>
    )
  }
} 