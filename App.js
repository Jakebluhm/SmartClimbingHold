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

import Actions from './ReduxActions'

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

const App: () => Node = () =>  {
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;

  //AsyncStorage.clear().then // For debug use only

  // console.log('-----------------------------getData() in App-------------')
  // var QRSaved = false
  // try 
  // {
  //   const value = AsyncStorage.getItem('@RouteID') 
  //   if(value !== null)  
  //   {
  //     // value previously stored
  //     console.log('value exists')
  //     QRSaved = true
  //   }
  //   else
  //   {
  //       console.log('No RouteID saved')
  //   }
  // } 
  // catch(e) 
  // {
  //   // error reading value
  // }
 


  // if (!user) {

  //   auth()
  //   .signInWithEmailAndPassword('bluhmj96@gmail.com', 'jake31')//createUserWithEmailAndPassword
  //   .then(() => {
  //     console.log('User account created & signed in!');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/email-already-in-use') {
  //       console.log('That email address is already in use!');
  //     }
  
  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }
  
  //     console.error(error);
  //   });


  //   return (
  //     <View>
  //       <Text>Login</Text>
  //     </View>
  //   );
  // } 

  // var initialScreen = ""
  // if(QRSaved)
  // {
  //   initialScreen = "Home"
  // }
  // else
  // {
  //   initialScreen = "Gym Settings"
  // }
  return ( 


    <InitialScreenContainer></InitialScreenContainer>
      
  );
}
export default App; 