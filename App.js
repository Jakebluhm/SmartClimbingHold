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
  View,
} from 'react-native';

import {Actions} from './ReduxActions'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';   

import SecondScreenContainer from './Screens/SecondScreen'
import { Provider } from 'react-redux'

import createStore from './Redux'
import Root from './Root';


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



const App: () => Node = () =>  {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {

    auth()
    .createUserWithEmailAndPassword('bluhmj96@gmail.com', 'jake31')
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });


    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }


  return ( 
      <SecondScreenContainer climbTime={0}  name={'jake'} simpleRead={Actions.simpleRead} >
        
      </SecondScreenContainer> 
      
  );
}
export default App; 