
import React from 'react';
import PropTypes from 'prop-types'
import Actions from '../ReduxActions'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity
    
  } from 'react-native';

  import database from '@react-native-firebase/database';
  import Leaderboard from '../Components/Leaderboard'
import RecentNameContainer from '../Containers/RecentNameContainer';

import Icon from 'react-native-vector-icons/MaterialIcons';

const s = require('../Styles/StyleSheet'); 
export const routeID = state => state.zones.routeId

export  class SecondScreen extends React.Component { 
    // this will be a fixed reference you can use to attach/detach the listener
    firebaseRefClimberData;
    firebaseRefSuccessfulClimbs;


    static propTypes = {
        leaderboard: PropTypes.array.isRequired,
        recentClimbers: PropTypes.array.isRequired,
        climbTime: PropTypes.number.isRequired,
        successfulClimbs: PropTypes.number.isRequired,
        failedClimbs: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired, 
        climbingGymName: PropTypes.string.isRequired, 
        activeClimber: PropTypes.bool.isRequired,
        routeId: PropTypes.string.isRequired,  

        updateSuccessfulClimbs: PropTypes.func.isRequired,
        updateFailedClimbs: PropTypes.func.isRequired,
        beginClimbRequest: PropTypes.func.isRequired,
        firebaseDataRequest: PropTypes.func.isRequired,
        onNameChange: PropTypes.func.isRequired,
        updateLeaderBoard: PropTypes.func.isRequired,
        onRouteIdChange: PropTypes.func.isRequired,
    }

    async getData(){
      console.log('-----------------------------getData() in SecondScreen-------------')
    try {
      const value = await AsyncStorage.getItem('@RouteID')
      if(value !== null) {
        // value previously stored
          console.log(' RouteID ') 
          console.log(value)
        this.props.onRouteIdChange(value) 
      }
      else{
          console.log('No RouteID saved')
      }
    } catch(e) {
      // error reading value
    }
  }
 
    onButtonPress(){   
        console.log("Start Climb pressed") ;
        //console.log("this.props") ;
        //console.log(this.props) ;
        this.props.beginClimbRequest();
        this.props.updateFailedClimbs(this.props.failedClimbs + 1) 
        
    }

  
 
    render()
    {
        console.log("-----------------render()---------------------") ;
        console.log("this.props") ;
        console.log(this.props) ;
        const {climbingGymName, name, climbTime, leaderboard, successfulClimbs, recentClimbers, failedClimbs } = this.props
        var climbPercentage = 0.0
        if(successfulClimbs + failedClimbs > 0)
        {
          climbPercentage =  successfulClimbs / (successfulClimbs + failedClimbs) * 100.0
        }
        else{
          climbPercentage = 0.0
        }
        
        return (  
          <View style={[s.container, { flexDirection: "column" }]}>
            <View style={s.containerTop}>
              <View style={s.horizontalContainer}> 
                <Text style={s.welcome}>{climbingGymName}</Text> 
                
                <View style={s.verticalContainer}>
                  
                  <Text style={s.welcome}>
                      <Icon name="person" style={{flex:1, paddingBottom:1}} size={25} color="#000" />Climber Name
                  </Text> 
                  <TextInput
                    style={s.input}
                    onChangeText={text => {   
                      var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                      this.props.onNameChange(cleanText) 
                       }}
                    value={name} 
                    placeholder="Enter Name"
                    keyboardType="default"
                  /> 
                </View>   
                <RecentNameContainer names={recentClimbers}></RecentNameContainer> 
              </View> 
            </View> 
            <View style={s.containerMiddle}>
              <View style={s.horizontalContainer}>
                <View style={s.tableContainer}> 
                  <Leaderboard leaderboardData={leaderboard}/> 
                </View>
                <View style={s.tableContainer}>
                  <View style={s.InfoContainer} > 
                    <Text style={s.infoGraphic}  > 
                    Successful Climbs:      {successfulClimbs}   
                    </Text>
                    <Text  style={s.infoGraphic} >  
                    Success Rate:      {climbPercentage.toFixed(1)}%  
                    </Text> 
                  </View>
                </View>
              </View>
            </View>

            <View style={s.containerEnd}>
              <Button style={s.button} disabled={!(name.length > 0)} color="#F98455" title="Start Climb" onPress={this.onButtonPress} /> 
            </View>
            
          </View>

            
        );
    }
    
    //Handlers 

    constructor() {
        super()
        this.onButtonPress = this.onButtonPress.bind(this) 



    }
 

    componentWillUnmount() {
        // detach all listeners to this reference when component unmounts (very important!)
        this.firebaseRefClimberData.off();
      }

      async componentDidMount(){  

        await this.getData();

        const currentRouteID = this.props.routeId//'abc123'
         

        // assign a reference to this component's firebaseRefClimberData member
        this.firebaseRefClimberData = database().ref(
          '/'+currentRouteID+'/ClimberData'
        );
  
        // grab the data from the server and call this.onFrebaseClimberDataChanged every time it changes
        this.firebaseRefClimberData.on("value", this.onFrebaseClimberDataChanged);
      
        this.firebaseRefSuccessfulClimbs = database().ref(
          '/'+currentRouteID+'/SuccessfulClimbs/'
        );
  
        // grab the data from the server and call this.onFrebaseClimberDataChanged every time it changes
        this.firebaseRefSuccessfulClimbs.on("value", this.onFirebaseSuccessfulClimbsChanged);

      console.log("-----componentDidMount------");
      this.props.firebaseDataRequest();
    }


      onFirebaseSuccessfulClimbsChanged = snapshot => {
 
        console.log("-----onFirebaseSuccessfulClimbsChanged------");  
         console.log(snapshot.val())  
 
        this.props.updateSuccessfulClimbs(snapshot.val())
         
      };

    onFrebaseClimberDataChanged = snapshot => {
        var leaders = [
            {name:"Jake", time:1}, 
            {name:"climber1", time:12},
            {name:"climber2", time:13},
            {name:"climber3", time:14},
            {name:"climber4", time:15},
        ];

        var allClimbs = []

        console.log("-----onFrebaseClimberDataChanged------");
        console.log(snapshot)
        snapshot.forEach(childSnapshot => {
                console.log(childSnapshot.key) 
                
                let climbs = childSnapshot.val() 
 
                Object.values(climbs).map(climbData =>{
                    console.log(climbData);
                    allClimbs.push({name:childSnapshot.key, time:climbData})
                })
        })
        console.log("-----allClimbs------");
        console.log(allClimbs);
        const sorted = allClimbs.sort(compare)
        console.log("-----sorted------");
        console.log(sorted);
        const top5Climbers = sorted.slice(0,20) 
        console.log("-----top5Climbers------");
        console.log(top5Climbers);
        this.props.updateLeaderBoard(top5Climbers) 
         
      };



}

function compare( a, b ) {
    if ( a.time < b.time ){
      return -1;
    }
    if ( a.time > b.time ){
      return 1;
    }
    return 0;
  }




 
 
  function mapStateToProps(state) {
    console.log("-----------------mapStateToProps()---------------------") ;
    
    console.log("state")
    console.log(state)
    return {
        climbTime: state.zones.climbTime,
        name: state.zones.name,
        leaderboard: state.zones.leaderboard,
        successfulClimbs: state.zones.successfulClimbs,
        failedClimbs: state.zones.failedClimbs,
        recentClimbers: state.zones.recentClimbers,
        climbingGymName: state.zones.climbingGymName,
        activeClimber: state.zones.activeClimber, 
        routeId: state.zones.routeId,
    };
  }
  
  const mapDispatchToProps = {
    beginClimbRequest: Actions.beginClimbRequest,
    firebaseDataRequest: Actions.firebaseDataRequest, 
    onNameChange: Actions.onNameChange,
    updateLeaderBoard: Actions.updateLeaderBoard,     
    updateSuccessfulClimbs: Actions.updateSuccessfulClimbs,  
    updateFailedClimbs: Actions.updateFailedClimbs,       
    onRouteIdChange: Actions.onRouteIdChange,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen)








