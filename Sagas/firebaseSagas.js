import  Actions  from "../ReduxActions" 
import {put, call, select } from 'redux-saga/effects' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';



// State Variables
export const currentName = state => state.zones.name
export const failedClimbs = state => state.zones.failedClimbs
export const climbingGymName = state => state.zones.climbingGymName
export const routeID = state => state.zones.routeId

 


// can add params
export function* beginClimb() {
    //console.log("-------------------Inside *  beginClimb -------------------")
 
    const currentRouteID = yield select(routeID) 
    var reference = database().ref('/' + currentRouteID);

     const snapshot = yield call( function(){
         return new Promise(function(resolve, reject){
             reference.once('value', function(snap){
                let json =  snap.val()
                //console.log(json["SuccessfulClimbs"])
                climbst = json["SuccessfulClimbs"];
                resolve(climbst)
             })
         }) 
     });
 

     let unixTime = Math.floor( Date.now() / 1000 )
     //console.log(unixTime) ;
 

    const newName = yield select(currentName) 
    const newFailedClimbsValue = yield select(failedClimbs) 
    //console.log(newName)
     database().ref('/' + currentRouteID).update({
         ClimbStartTime: unixTime,
         CurrentClimber:  newName,
         FailedClimbs: newFailedClimbsValue
     })
     .then(() => console.log('Data set.'));
 

     //console.log('---------------------calling  Actions.beginClimb---------------------')

    yield put(Actions.beginClimb(newName, climbst))
  }


export function* sendGymSettingsToFirebase(){
    //console.log("-------------------Inside *  sendGymSettingsToFirebase -------------------")

    // Send data to firebase
    const currentclimbingGymName = yield select(climbingGymName) 
    const currentRouteID = yield select(routeID) 
    database().ref('/' + currentRouteID).update({
        ClimbingGymName: currentclimbingGymName, 
    })
    .then(() => console.log('Data set.'));


    //console.log("Saving currentRouteID")
    //console.log(currentRouteID)
    //Save QR code that is used as root in database for this climbing gym   
    storeData(currentRouteID)
}


const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@RouteID', value)
    } catch (e) {
      // saving error
    }
  }



export function* initFirebaseVariables() {
    //console.log("-------------------Inside *  initFirebaseVariables -------------------")
 
 const currentRouteID = yield select(routeID) 
    var reference = database().ref('/' + currentRouteID);

     const snapshot = yield call( function(){
         return new Promise(function(resolve, reject){
             reference.once('value', function(snap){
                let json =  snap.val()
          
                failedClimbsData = json["FailedClimbs"];
                 
                
                ClimbingGymName = json["ClimbingGymName"]; 

                resolve(failedClimbsData)
             })
         }) 
     });
 
    yield put(Actions.updateFailedClimbs(failedClimbsData))
    yield put(Actions.onClimbingGymNameChange(ClimbingGymName))
    
}


//   var roomRef = firebase.database().ref('/Users/' + userid + '/rooms')
// var rooms = yield call(function() {
//   return new Promise(function(resolve, reject) {
//     roomRef.once('value', function (snap) {
//       var rooms = []
//       var roomkeys = snap.val()
//       for (var roomkey in roomkeys) {
//         firebase.database().ref('/Rooms/' + roomkey).once('value', function (item) {
//           rooms.push(item.val())
//         })
//       }
//       resolve(rooms)
//     })
//   })
// })
// yield put({type: 'LOAD_ROOMS', payload: { rooms: rooms}})