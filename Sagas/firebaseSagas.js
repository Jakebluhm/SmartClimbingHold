import  Actions  from "../Redux/ReduxActions" 
import {put, call, select } from 'redux-saga/effects' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';



// State Variables
export const currentName = state => state.route.name
export const currentClimberName = state => state.route.currentClimberName
export const failedClimbs = state => state.route.failedClimbs
export const climbingGymName = state => state.route.climbingGymName
export const routeID = state => state.route.routeId
export const passcode = state => state.route.passcode
export const climberFailsFlag = state => state.route.failedClimbOnClick

 
 
export function* incrementClimbersFailedClimbs() {
//console.log("-------------------Inside *  incrementClimbersFailedClimbs -------------------")

  //   const name = yield select(currentClimberName)

  // //console.log('name')
    
  // //console.log(name)
  //   const currentRouteID = yield select(routeID) 
  //   var climberFailures = 0
  //   //var reference = database().ref('/' + currentRouteID + '/ClimberData/' + currentClimberName).push()
  //   const snapshot = yield call( function(){
  //     return new Promise(function(resolve, reject){
  //       database().ref('/' + currentRouteID + '/ClimberData/' + name + '/Failures').once("value").then(snapshot => {
  //           if(snapshot.val()){
  //           console.log('---------------Failures Exists!!-------')
  //           console.log('snapshot.val()')
  //           console.log(snapshot.val())

  //             //console.log('------------------------Updating Existing Route-------') 
            

  //               database().ref('/' + currentRouteID + '/ClimberData/' + name).update({
  //                   Failures: snapshot.val() + 1, 
  //               })
  //               .then(() => console.log('Failures set.'));
        
  //               climberFailures = snapshot.val() + 1
  //               resolve(climberFailures)

  //           } 
  //           else{
  //               // Populate initial data for new climbing set
  //             //console.log('------------------------This Climber Failures key does not exist-------') 
  //               newRoute = true;

  //             //console.log('------------------------Creating Failure-------') 
  //               database().ref('/' + currentRouteID + '/ClimberData/' + name ).set({
  //                   Failures: 1, 
        
  //               })
  //               .then(() => console.log('Failures set to 1.'));

  //               climberFailures = 1
  //               resolve(climberFailures)

  //           }
  //       });
  //     }) 
  //   });
  //   console.log('climberFailures DONT INCREMENT HERE')
  //   console.log(climberFailures)
    //yield put(Actions.setCurrentClimberFailures(climberFailures))

}


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





     const name = yield select(currentClimberName)
     const incrementFailedClimbsFlag = yield select(climberFailsFlag)
     var failValue = 0;
       var climberFailures = 0 
       //var reference = database().ref('/' + currentRouteID + '/ClimberData/' + currentClimberName).push()
       try{
       const snapshot = yield call( function(){
         return new Promise(function(resolve, reject){
           database().ref('/' + currentRouteID + '/ClimberData/' + name + '/Failures').once("value").then(snapshot => {
               if(snapshot.val()){
               console.log('---------------Failures Exists!!-------')
               console.log('snapshot.val()')
               console.log(snapshot.val())
   
                 console.log('------------------------Updating Existing Route-------') 
               
                 if(incrementFailedClimbsFlag){
                  climberFailures = snapshot.val() + 1
                 }
                 else{
                  climberFailures = snapshot.val()
                 }

   
                   database().ref('/' + currentRouteID + '/ClimberData/' + name).update({
                       Failures: climberFailures, 
                   })
                   .then(() => console.log('Failures set.'));

                   resolve(climberFailures)
   
               } 
               else{
                   // Populate initial data for new climbing set
                 console.log('------------------------This Climber Failures key does not exist-------') 
                   newRoute = true;
                   if(incrementFailedClimbsFlag){
                    climberFailures =  1
                   }
                   else{
                    climberFailures = 0
                   }
                 //console.log('------------------------Creating Failure-------') 
                   database().ref('/' + currentRouteID + '/ClimberData/' + name ).set({
                       Failures: climberFailures,  
                   })
                   .then(() => console.log('Initilized Climebrs Failures .'));
    
                   resolve(climberFailures)
   
               }
           });
         }) 
       });
       console.log('climberFailures')
       console.log(climberFailures)
       console.log('incrementFailedClimbsFlag')
       console.log(incrementFailedClimbsFlag)
       
        yield put(Actions.setCurrentClimberFailures(climberFailures))
       

      }
      catch(err){
        console.log('Error getting failures')
        console.log(err)
      }















 

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


  console.log('-------------------- failedClimbOnClick to true--------------------------')
    yield put(Actions.setFailedClimbOnClick(true))
    yield put(Actions.beginClimb(newName, climbst))
  }


export function* sendGymSettingsToFirebase(){
  //console.log("-------------------Inside *  sendGymSettingsToFirebase -------------------")
    var newRoute = false;
    // Send data to firebase
    const currentclimbingGymName = yield select(climbingGymName) 
    const currentRouteID = yield select(routeID)  
    const currentPasscode = yield select(passcode) 
    let unixTime = Math.floor( Date.now() / 1000 )

    database().ref('/' + currentRouteID + '/SuccessfulClimbs').once("value").then(snapshot => {
        if(snapshot.val()){
          //console.log('---------------This route ID already Exists!!-------')
            //console.log('snapshot.val()')
            //console.log(snapshot.val())

          //console.log('------------------------Updating Existing Route-------') 
        

            database().ref('/' + currentRouteID).update({
                ClimbingGymName: currentclimbingGymName, 
            })
            .then(() => console.log('Data set.'));
    



        }
        else{
            // Populate initial data for new climbing set
          //console.log('------------------------This route ID DOES NOT Exist!!!!!!-------') 
            newRoute = true;

          //console.log('------------------------Creating New Route-------') 
            database().ref('/' + currentRouteID).set({
                ClimbStartTime: unixTime, 
                ClimbingGymName: currentclimbingGymName, 
                CurrentClimber: "",
                FailedClimbs:0,
                SuccessfulClimbs:0,
                Passcode:currentPasscode,
    
            })
            .then(() => console.log('Data set.'));


        }
    });

    if(newRoute){
        // console.log('------------------------Creating New Route-------') 
        // database().ref('/' + currentRouteID).set({
        //     ClimbingGymName: currentclimbingGymName, 
        //     CurrentClimber: "",
        //     FailedClimbs:0,
        //     SuccessfulClimbs:0

        // })
        // .then(() => console.log('Data set.'));
    }
    else{
        // console.log('------------------------Updating Existing Route-------') 
        

        // database().ref('/' + currentRouteID).update({
        //     ClimbingGymName: currentclimbingGymName, 
        // })
        // .then(() => console.log('Data set.'));


    }
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
  //console.log('---READING FIREBASE IN initFirebaseVariables-----')
    const snapshot = yield call( function(){
        return new Promise(function(resolve, reject){
            reference.once('value', function(snap){

                if(!snap.val()){
                //console.log('NODE IS EMPTY IN initFirebaseVariables')

                }

                let json =  snap.val()
        
                failedClimbsData = json["FailedClimbs"]; 
                currentPasscode = json["Passcode"]
                ClimbingGymName = json["ClimbingGymName"]; 
 
                resolve(failedClimbsData)
            })
        }) 
    }); 
//console.log('-------done READING FIREBASE IN initFirebaseVariables-----')
//console.log("ClimbingGymName")
//console.log(ClimbingGymName)
//console.log("failedClimbsData") 
//console.log(failedClimbsData)
 

    yield put(Actions.updateFailedClimbs(failedClimbsData))
    yield put(Actions.onClimbingGymNameChange(ClimbingGymName))
        
}


export function* setClimberData(){
  //console.log("-------------------Inside *  setClimberData -------------------")
 
    const currentRouteID = yield select(routeID)  

    database().ref('/' + currentRouteID + '/ClimberData').remove()
    .then(() => console.log('climber data removed'));
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