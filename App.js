/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */ 
import React, { useState, useEffect } from 'react';
import { Component} from 'react';
import type {Node} from 'react'; 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
} from 'react-native';

import Actions from './Redux/ReduxActions'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';   

import SecondScreenContainer from './Screens/SecondScreen'
import GymSettingsScreenContainer from './Screens/GymSettingsScreen'
import InitialScreenContainer from './Screens/InitialScreen'
import { Provider } from 'react-redux'

import createStore from './Redux'
import Root from './Root';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import auth from '@react-native-firebase/auth'; 
import HooksContainer from './HooksContainer';
//const store = createStore()

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   }; 
//   return ( 
//     <Provider store={store}>
//       <App >
//         Sec
//       </App>
//     </Provider>
//   )
// };
 
//export default App; 

 
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}


// function SmartClimbHoldNavigator({ navigation }) {
//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       // do something
//     });

//     return unsubscribe;
//   }, [navigation]);

//   return <ProfileContent />;
// }


const App = () =>  {
 
  return ( 


    <InitialScreenContainer></InitialScreenContainer> 
 
  );
}
export default App; 