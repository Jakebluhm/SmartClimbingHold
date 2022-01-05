/**
 * @format
 */
 import React  from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json'; 

//import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import createStore from './Redux';
 
import SecondScreenContainer from './Screens/SecondScreen'

const store = createStore()
// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   rootElement
// );


const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )


AppRegistry.registerComponent(appName, () => RNRedux );
