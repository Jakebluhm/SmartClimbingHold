
import React from 'react';
import PropTypes from 'prop-types'
import Actions from '../Redux/ReduxActions'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClimbingGymActions from '../Redux/PasscodeRedux'
import {PasscodeCreationStates} from '../Lib/PasscodeCreationStates'
import Immutable from 'seamless-immutable'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet, 
    Text,
    useColorScheme,
    Image,
    View,
    TextInput,
    TouchableOpacity 
    
  } from 'react-native'; 
import database from '@react-native-firebase/database';
import Leaderboard from '../Components/Leaderboard'
import RecentNameContainer from '../Containers/RecentNameContainer'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import SeamlessImmutable from 'seamless-immutable';
import { debounce } from 'lodash'; 
import PercentageCircle from 'react-native-percentage-circle';



const s = require('../Styles/StyleSheet'); 
export const routeID = state => state.route.routeId

function convertToMMSS(seconds) {
  var time;
  if(seconds%60 > 9){
      time = Math.floor(seconds/60) + ":" + (seconds%60)
  }
  else{
      time = Math.floor(seconds/60) + ":0" + (seconds%60)
  }
  return time;
}
 
 
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
        buttonCooldown: PropTypes.bool.isRequired, 
        allClimbData: PropTypes.object,
        //passcodeState: PropTypes.number.isRequired,

        updateSuccessfulClimbs: PropTypes.func.isRequired,
        updateFailedClimbs: PropTypes.func.isRequired,
        beginClimbRequest: PropTypes.func.isRequired,
        firebaseDataRequest: PropTypes.func.isRequired,
        onNameChange: PropTypes.func.isRequired,
        updateLeaderBoard: PropTypes.func.isRequired,
        onRouteIdChange: PropTypes.func.isRequired,
        changeAllClimbData:  PropTypes.func.isRequired,
        tempPasscodeChanged: PropTypes.func.isRequired, 
        setPasscodeState: PropTypes.func.isRequired,
        setIsButtonCoolingDown: PropTypes.func.isRequired,
    }

    async getData(){
      //console.log('-----------------------------getData() in SecondScreen-------------')
    try {
      const value = await AsyncStorage.getItem('@RouteID')
      if(value !== null) {
        // value previously stored
          //console.log('RouteID') 
          //console.log(value)
        this.props.onRouteIdChange(value) 
      } 
      else{
          //console.log('No RouteID saved')
      }
    } catch(e) {
      // error reading value
    }
  }
 
    onButtonPress(){   
        this.props.setIsButtonCoolingDown(true)
        setTimeout(() => this.props.setIsButtonCoolingDown(false), 5000)
        //console.log("Start Climb pressed");
        //console.log("this.props"); 
        this.props.beginClimbRequest();
        this.props.updateFailedClimbs(this.props.failedClimbs + 1) 
        
    }
 
 
    render()
    {
        //console.log("-----------------render()---------------------") ;
        //console.log("this.props") ;
        //console.log(this.props) ;
        const {climbingGymName, name, climbTime, leaderboard, successfulClimbs, recentClimbers, failedClimbs, buttonCooldown, allClimbData } = this.props
        var climbPercentage = 0.0
        console.log('buttonCooldown')
        console.log(buttonCooldown)
        if(successfulClimbs + failedClimbs > 0)
        {
          climbPercentage =  successfulClimbs / (successfulClimbs + failedClimbs) * 100.0
        }
        else{
          climbPercentage = 0.0
        } 
 

        // Calculate Current Climbers Top 3 Climbs
        //Throw all climbs into array with name, climbTime, dateTime
        var climberDateTimes = []
        try{
          for(const climbTime in allClimbData[name] ){   
            climberDateTimes.push({climbTime:allClimbData[name][climbTime]}) 
          } 
          //console.log(climberDateTimes)
          var top3ClimbsForCurrentClimber = climberDateTimes.slice(0, 3);
          console.log('length')
          console.log(top3ClimbsForCurrentClimber.length)
          const length = top3ClimbsForCurrentClimber.length

          var top1 = (length >= 1)?  convertToMMSS(top3ClimbsForCurrentClimber[0]['climbTime']) : 'Empty'
          var top2 = (length >= 2)?  convertToMMSS(top3ClimbsForCurrentClimber[1]['climbTime']) : 'Empty'
          var top3 = (length >= 3)?  convertToMMSS(top3ClimbsForCurrentClimber[2]['climbTime']) : 'Empty' 
          console.log('--------------------------top3ClimbsForCurrentClimber=====================')
          console.log('length')
          console.log(top3ClimbsForCurrentClimber.length)

        }
        catch(err){
          // Add art here as place holder until a climb is completed
          console.log('-----error occured: ')
          console.log(err)
        }









        
        return (  
          <View style={s.container}>
            <View style={s.verticalHalfLeft}>
              
            <View style={s.tableContainer}>  
              <Leaderboard leaderboardData={leaderboard}/> 
            </View>
              
            </View>
 
            <View style={s.verticalHalfRight}>
              <View style={s.nameContainer}> 
                <View style={s.nameBox}>   
 
                  {/* NAME HEADING */}  
                  <View style={s.nameBoxTitle}>  
                    <View style={s.iconContainer}>
                      <Image style={s.nameIcon} source={require('../Assets/ClimberNameIcon.png')} />
                    </View>
                    <Text style={s.heading}>
                        Climber Name  
                    </Text> 
                  </View>

                 {/* NAME ENTRY */} 
                  <View style={s.nameEntry}> 
                    <TextInput 
                      style={s.nameInput} 
                      onChangeText={text => {   
                        var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                        this.props.onNameChange(cleanText)  
                        }}
                      value={name} 
                      placeholder="Enter Name"
                      keyboardType="default"
                      >
                    </TextInput> 
                    <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}   disabled={!(name.length > 0) || buttonCooldown}  onPress={this.onButtonPress}> 
                      <View style={s.iconContainer}>
                        <Image source={require('../Assets/ClimbButton.png')} resizeMode='contain' style={s.climbButtonImage} />
                      </View>
                  </TouchableOpacity>
                  </View> 

                  {/* RECENT NAMES */}
                  <View style={s.nameBoxRecents}> 
                    <Text style={s.body}>
                          Select from recents
                    </Text> 
                    <View style={s.recentNameContainer}>
                      <LinearGradient colors={['#ffffff', '#c4c4c4']} style={s.recentNameContainer}>
                        <RecentNameContainer names={recentClimbers}></RecentNameContainer> 
                      </LinearGradient> 
                    </View>
                  </View>


                  
                </View>
            
              </View>
              <View style={s.climberHighlightsContainer}>
                <View style={s.climberHighlightsBox}>


                        <View style={s.climberHighlightsTitle}>
                          <View style={s.iconContainer}>
                            <Image style={s.stopWatchIcon} source={require('../Assets/StopWatchIcon.png')} />
                          </View>
                          <Text style={s.heading}>
                              {name}'s top climbs
                          </Text> 
                        </View>


                        <View style={s.climberHighlightContent}> 

                          <View style={s.climberHighlightContainer}>
                          <LinearGradient colors={['#ffffff', '#c4c4c4']} style={s.recentNameContainer}>
                            <View style={s.climberHighlight}>
                              <View style={s.medal}> 
                                <View style={s.metalContainer}> 
                                  <Image style={s.metalIcon} source={require('../Assets/GoldMetalIcon.png')} />
                                </View>
                              </View> 
                              <View style={s.timeContent}>
                              <Text style={s.time}>
                                {top1}
                              </Text> 
                              </View> 
                            </View> 
                            </LinearGradient> 
                          </View> 


                          <View style={s.climberHighlightContainer}>
                          <LinearGradient colors={['#ffffff', '#c4c4c4']} style={s.recentNameContainer}>
                            <View style={s.climberHighlight}>
                              <View style={s.medal}>
                                <View style={s.metalContainer}> 
                                  <Image style={s.metalIcon} source={require('../Assets/SilverMetalIcon.png')} />
                                </View> 
                              </View>  
                              <View style={s.timeContent}>
                                <Text style={s.time}>
                                  {top2}
                                </Text>  
                              </View>  
                            </View> 
                            </LinearGradient> 
                          </View>


                          <View style={s.climberHighlightContainer}>
                          <LinearGradient colors={['#ffffff', '#c4c4c4']} style={s.recentNameContainer}>
                            <View style={s.climberHighlight}>
                              <View style={s.medal}>
                                <View style={s.metalContainer}> 
                                  <Image style={s.metalIcon} source={require('../Assets/BronzeMetalIcon.png')} /> 
                                </View> 
                              </View> 
                              <View style={s.timeContent}>
                                <Text style={s.time}>
                                  {top3}
                                </Text>  

                              </View> 

                            </View> 
                            </LinearGradient> 
                          </View> 


                        </View>



                {/* <Text style={s.heading1}>
                          {name}'s Top Climbs
                </Text> 
                <Text style={s.heading1}>
                  {top1}
                </Text> 
                <Text style={s.heading1}>
                  {top2}
                </Text> 
                <Text style={s.heading1}>
                  {top3}
                </Text>  */}
              
                </View>
            
              </View>
              <View style={s.routeStatsContainer}>
                <View style={s.routeStatsContainerLeft}>
                  <View style={s.routeStat}>

                    <View style={s.routeStatTitle}>
                      <View style={s.iconContainer}>
                        <Image style={s.checkIcon} source={require('../Assets/CheckIcon.png')} />
                      </View>
                      <Text style={s.heading1}>
                          SUCCESSFUL CLIMBS
                      </Text>  
                    </View>

                    <View style={s.routeStatContent}>
                      <Text style={s.successfulClimbsFont}>
                        {successfulClimbs} 
                      </Text>   
                    </View>

                    <View style={s.routeStatDescription}> 
                      <Text style={s.body}>
                            Total completed climbs
                      </Text> 
                  
                    </View>
                
                  </View>
                </View>
                <View style={s.routeStatsContainerRight}>
                  <View style={s.routeStat}>
                    <View style={s.routeStatTitle}>
                      <View style={s.iconContainer}>
                        <Image style={s.checkIcon} source={require('../Assets/PercentIcon.png')} />
                      </View>
                      <Text style={s.heading1}>
                          SUCCESS RATE
                      </Text>  
                  
                    </View> 
                    <View style={s.routeStatContent1}>
                      <PercentageCircle radius={65} percent={climbPercentage.toFixed(0)} color={'#008047'} borderWidth={6} bgcolor={'#000000'} innerColor={'#ffffff'} textStyle={s.successfulClimbsFont} ></PercentageCircle>  
                  
                    </View> 
                  </View>
                </View>
              </View> 
            </View>
          


            {/* <View style={s.containerTop}>
              <View style={s.horizontalContainer}> 
                 
                
                <View style={s.verticalContainer}> 
                  
                  <Text style={s.welcome}>
                      <Icon name="person" style={{flex:1, paddingBottom:1}} size={25} color="#000" />Climber Name
                  </Text> 
                  <TextInput
                    style={s.nameInput} 
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
              <Button style={s.button} disabled={!(name.length > 0) || buttonCooldown} color="#F98455" title="Start Climb" onPress={this.onButtonPress} /> 
            </View> */}
            
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
        console.log('component will unmount')
        this.firebaseRefClimberData.off();
        try{
          this._unsubscribe();
      }
      catch(err){
          console.log(err) 
      }
      }

      async componentDidMount(){  
        try{
          this._unsubscribe = this.props.navigation.addListener('focus', () => {
              console.log('Home Screen did foucs')
              if(this.props.passcodeState == PasscodeCreationStates.UNLOCKED){
                this.props.tempPasscodeChanged(''); 
                this.props.setPasscodeState(PasscodeCreationStates.SAVED)  
              }
            });
          }
          catch(err){
              console.log(err)
          }
      // this._unsubscribe = this.props.navigation.addListener('focus', () => {
      //   console.log('Home Screen did foucs')
      // });
        console.log('compenentDidMount in SecondScreen..js   ')
        
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

      //console.log("-----componentDidMount------");
      this.props.firebaseDataRequest();
    }


      onFirebaseSuccessfulClimbsChanged = snapshot => {
 
        //console.log("-----onFirebaseSuccessfulClimbsChanged------");  
         //console.log(snapshot.val())  
 
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
                    //console.log(climbData);
                    allClimbs.push({name:childSnapshot.key, time:climbData})
                })
        })
        console.log("-----allClimbs------");
        console.log(allClimbs);
        const sorted = allClimbs.sort(compare)
        console.log("-----sorted------");
        console.log(sorted);
        const top5Climbers = sorted.slice(0,20) 
        //console.log("-----top5Climbers------");
        //console.log(top5Climbers);
        this.props.updateLeaderBoard(top5Climbers) 
        this.props.changeAllClimbData(snapshot.val()) 
        
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
    //console.log("-----------------mapStateToProps()---------------------") ;
    
    //console.log("state")
    //console.log(state)
    return {
        climbTime: state.route.climbTime,
        name: state.route.name,
        leaderboard: state.route.leaderboard,
        successfulClimbs: state.route.successfulClimbs,
        failedClimbs: state.route.failedClimbs,
        recentClimbers: state.route.recentClimbers,
        climbingGymName: state.route.climbingGymName,
        activeClimber: state.route.activeClimber, 
        routeId: state.route.routeId,
        passcodeState: state.climbingGym.passcodeState,
        buttonCooldown: state.route.buttonCooldown,
        allClimbData: state.route.allClimbData, 
    };
  }
  
  const mapDispatchToProps = {
    beginClimbRequest: Actions.beginClimbRequest,
    firebaseDataRequest: Actions.firebaseDataRequest, 
    onNameChange: Actions.onNameChange,
    updateLeaderBoard: Actions.updateLeaderBoard,     
    updateSuccessfulClimbs: Actions.updateSuccessfulClimbs,  
    updateFailedClimbs: Actions.updateFailedClimbs,       
    tempPasscodeChanged:  ClimbingGymActions.tempPasscodeChanged,
    onRouteIdChange: Actions.onRouteIdChange,
    changeAllClimbData: Actions.changeAllClimbData,
    setPasscodeState: ClimbingGymActions.setPasscodeState,
    setIsButtonCoolingDown: Actions.setIsButtonCoolingDown,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen)








