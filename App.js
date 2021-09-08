/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React  from 'react';
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
  return ( 
      <SecondScreenContainer>
        
      </SecondScreenContainer> 
      
  );
}
export default App; 