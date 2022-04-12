
import React from 'react';
import { connect } from 'react-redux'
import Actions from '../Redux/ReduxActions'
import ClimbingGymActions from '../Redux/PasscodeRedux'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {onSigOut} from './AuthenticationScreen'

import { 
    Text, 
    Button,
    View,
    Image, 
    TextInput,
    Pressable, 
  } from 'react-native';
  import auth, { firebase } from '@react-native-firebase/auth'; 
  import { GoogleSignin } from '@react-native-google-signin/google-signin';
import  CreatePasscodeScreenContainer  from '../Components/CreatePasscodeScreen'; 
import { NavigationEvents } from 'react-navigation';
import { PasscodeCreationStates } from '../Lib/PasscodeCreationStates';
import { Divider } from 'react-native-paper';
import { AuthModes } from '../Lib/AuthModes';
import AuthActions from '../Redux/AuthenticationRedux'

  const s = require('../Styles/StyleSheet');

 
  

export  class GymSettingsScreen extends React.Component  
{ 
    static propTypes = {
        climbingGymName: PropTypes.string.isRequired, 
        routeId: PropTypes.string.isRequired,  
        passcode: PropTypes.string.isRequired,  
        passcodeState: PropTypes.number.isRequired,

        onClimbingGymNameChange: PropTypes.func.isRequired,
        saveGymSettingsRequest: PropTypes.func.isRequired,
        onRouteIdChange: PropTypes.func.isRequired,
        routeIdSaved:  PropTypes.func.isRequired,
        setUserAuthenticated: PropTypes.func.isRequired,
        resetClimberDataRequest: PropTypes.func.isRequired,

        passcodeChanged: PropTypes.func.isRequired, 
        tempPasscodeChanged: PropTypes.func.isRequired, 
        setPasscodeState: PropTypes.func.isRequired,
        setAuthMode: PropTypes.func.isRequired, 
        setInvalidLogin: PropTypes.func.isRequired,
        onConfirmPasswordChange: PropTypes.func.isRequired, 
        onPasswordChange: PropTypes.func.isRequired, 
        onEmailChange: PropTypes.func.isRequired, 
    }

    async  onSigOut() {
      console.log('--------onSigOut() in AuthenticationScreen.js---------')
        try{

            
            await firebase.auth().signOut();
            GoogleSignin.revokeAccess()      .then(() => {

                this.props.setUserAuthenticated(false) 
                this.props.setAuthMode(AuthModes.NONE)
                this.props.setInvalidLogin('')
                this.props.onEmailChange('')
                this.props.onPasswordChange('')
                this.props.onConfirmPasswordChange('')
              })
            // Sign-out successful.
          //console.log('--------onSigOut() in AuthenticationScreen.js----   SUCCESSFUL-----')
            
        }
         catch (error){
             
            //console.log('--------onSigOut() in AuthenticationScreen.js----   ERROR!!-----')
            //console.log(error)
          }
      } 

      async removeItemValue(key) {
      //console.log('-----------------------------removeItemValue() in CreatePasscodeScreen-------------')
        try {
            await AsyncStorage.removeItem(key); 
            this.props.tempPasscodeChanged('');
            this.props.passcodeChanged(''); 
            this.props.setPasscodeState(PasscodeCreationStates.ENTER_FIRST_PASSCODE)  
          //console.log('successfully removed value')
            return true;
        }
        catch(exception) {
          //console.log('error removing value')
          //console.log(exception)
            return false;
        }
    }

    onSaveButtonPress(){  
        this.props.saveGymSettingsRequest();
        this.props.routeIdSaved(true);
        
    }


    onResetClimberData(){   
      //console.log('reset climber data pressed')
        this.props.resetClimberDataRequest()
    }

    componentDidMount(){
        try{
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
          //console.log('Gym Settings Screen did foucs')
          });
        }
        catch(err){
          //console.log(err)
        }
    }

    
    componentWillUnmount(){
        try{
            this._unsubscribe();
        }
        catch(err){
          //console.log(err)
        }
    }
 
    constructor() 
    {
        super() 
        this.onSaveButtonPress = this.onSaveButtonPress.bind(this)  
        this.onResetClimberData = this.onResetClimberData.bind(this)  
        
    }

    render()
    { 
        const {climbingGymName, routeId,  passcodeState } = this.props  

        return ( 
            <View style={s.container}>
            { (passcodeState != PasscodeCreationStates.UNLOCKED)?
                <View style={[s.verticalContainer, {alignItems:'center', justifyContent:'center', borderWidth:  3, borderLeftColor:  'red'}]}>
                    <CreatePasscodeScreenContainer></CreatePasscodeScreenContainer>  
                </View>
                  :
                <View style={s.container}>
                    <View style={s.verticalHalfLeft}>
                        <View style={s.settingsLeftContainer}>
                            
                            <View style={s.settingsEntryContainer}>  
                                <Text style={s.settingsHeading}>
                                    Climbing Gym Name
                                </Text>
                                <Text style={s.settingsBody} numberOfLines={1}>
                                    Name of climbing gym visable to climbers
                                </Text> 
                                <TextInput 
                                style={s.settingsInput} 
                                editable={passcodeState == PasscodeCreationStates.UNLOCKED} 
                                onChangeText={text => {    
                                    var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                    this.props.onClimbingGymNameChange(cleanText) 
                                    }}
                                value={climbingGymName} 
                                placeholder="Enter Climbing Gym Name"
                                keyboardType="default"
                                >
                                </TextInput>   
                            </View>
                            <View style={[s.settingsEntryContainer, {paddingTop:38}]}>          
                                <Text style={s.settingsHeading}>
                                    Route ID
                                </Text>
                                <Text style={s.settingsBody}>
                                    Unique code assigned to this climbing route printed on user manual
                                </Text> 

                                <TextInput 
                                style={s.settingsInput} 
                                editable={passcodeState == PasscodeCreationStates.UNLOCKED} 
                                onChangeText={text => {   
                                    var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                    this.props.onRouteIdChange(cleanText)   
                                    this.props.routeIdSaved(false);
                                    }}
                                value={routeId} 
                                placeholder="Enter Route ID or Scan QR Code"
                                keyboardType="default"
                                >
                                </TextInput>  
                            </View>

                            <View style={s.horizontalContainerFlexEnd}>  
                                <Pressable style={{flexDirection:"row", paddingTop:70,  alignItems:'center',justifyContent:'center'}}   disabled={passcodeState != PasscodeCreationStates.UNLOCKED}  onPress={this.onSaveButtonPress}> 
                                    <View style={s.iconContainer}>
                                        <Image source={require('../Assets/Settings/SaveButton.png')}   resizeMode='contain' style={s.saveButton} />
                                    </View>
                                </Pressable> 
                            </View>
    
                            
                            <Divider style={{width:920/2, alignSelf:'center'}} ></Divider>

                            <Text style={[s.settingsHeading, {paddingTop:10}]}>
                                Route Management
                            </Text>
                            <View style={s.horizontalContainerFlexBetween}>  
                                <Text style={s.settingsBody}>
                                    Deletes all climbing data. Reset the route when a new route is created.
                                </Text> 
                                <Pressable style={{flexDirection:"row",    alignItems:'center',justifyContent:'center'}}   disabled={passcodeState != PasscodeCreationStates.UNLOCKED}  onPress={this.onResetClimberData}> 
                                    <View style={s.iconContainer}>
                                        <Image source={require('../Assets/Settings/ResetRouteButton.png')}   resizeMode='contain' style={s.ResetRouteButton} />
                                    </View>
                                </Pressable> 
                            </View> 

                        </View>
                    </View>


                    <Divider  style={{width: 1, height: '100%',  alignSelf:'center'}} ></Divider>

                    <View style={s.verticalHalfRight}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center',  alignSelf:'center', paddingBottom:25 }}>
                            <Image source={require('../Assets/Logo/HungLogo.png')}     style={s.settingsLogo} />
                        </View> 
                        <View style={{flex:1.5 }}>
                            <Text style={[s.settingsHeading]}>
                                Hung Smart Hold Management 
                            </Text>
                            <View style={s.horizontalContainerFlexBetween1}>  
                                <Pressable style={{flexDirection:"row",    alignItems:'center',justifyContent:'center'}}   disabled={passcodeState != PasscodeCreationStates.UNLOCKED}  onPress={() => this.onSigOut().then(() => console.log('Signed out!'))}> 
                                    <View style={s.iconContainer}>
                                        <Image source={require('../Assets/Settings/SignOutButton.png')}   resizeMode='contain' style={s.SignoutButton} />
                                    </View>
                                </Pressable> 
                                <Text style={s.settingsBody}>
                                    Sign out of Google. Note: You must be signed into a Google account for climbing data to be saved.
                                </Text> 
                            </View> 
                            
                            <Divider style={{width:920/2, alignSelf:'center'}} ></Divider>

                            <View style={[s.horizontalContainerFlexBetween1]}>  
                                <Pressable style={{flexDirection:"row",    alignItems:'center',justifyContent:'center',}}   disabled={passcodeState != PasscodeCreationStates.UNLOCKED}                         
                                 onPress={() => this.removeItemValue('@Passcode').then(() => {
                                  //console.log('PAsscode Reset!') 
                                })}> 
                                    <View style={s.iconContainer}>
                                        <Image source={require('../Assets/Settings/ResetPasscodeButton.png')}   resizeMode='contain' style={s.ResetPasscodeButton} />
                                    </View>
                                </Pressable> 
                                <Text style={s.settingsBody}>
                                    Change the passcode that is needed for entry into Gym Settings Screen.
                                </Text> 
                            </View> 

                        </View>  
                        <View style={{flex:1 }}>
                        </View> 
                    </View>
 
            </View> 
    }
    </View>
 
        );
    } 


}

 

  function mapStateToProps(state) { 
    return {
        climbingGymName: state.route.climbingGymName,
        routeId: state.route.routeId,
        passcode : state.climbingGym.passcode, 
        passcodeState: state.climbingGym.passcodeState
    };
  }
  
  const mapDispatchToProps = {    
    onClimbingGymNameChange: Actions.onClimbingGymNameChange,
    saveGymSettingsRequest: Actions.saveGymSettingsRequest,
    onRouteIdChange: Actions.onRouteIdChange,
    routeIdSaved: Actions.routeIdSaved,
    setUserAuthenticated: Actions.setUserAuthenticated,
    resetClimberDataRequest: Actions.resetClimberDataRequest,
    passcodeChanged: ClimbingGymActions.passcodeChanged,
    tempPasscodeChanged:  ClimbingGymActions.tempPasscodeChanged,
    setPasscodeState: ClimbingGymActions.setPasscodeState, 
    setAuthMode: AuthActions.setAuthMode,
    setInvalidLogin: AuthActions.setInvalidLogin,
    onConfirmPasswordChange: AuthActions.onConfirmPasswordChange,
    onPasswordChange: AuthActions.onPasswordChange,
    onEmailChange: AuthActions.onEmailChange,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GymSettingsScreen)




    /* <View style={[s.container, { flexDirection: "column" }]}>
                    <View style={[s.gymSettingsContainer]}>
                        <Text style={s.GymSettingsText}>
                            <Icon name="domain" style={{flex:1, paddingBottom:1}} size={25} color="#000" />Climbing Gym Name
                        </Text> 
                        <TextInput
                            editable={passcodeState == PasscodeCreationStates.UNLOCKED}
                            style={s.input}
                            onChangeText={text => {   
                                var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                this.props.onClimbingGymNameChange(cleanText) 
                                }}
                            value={climbingGymName} 
                            placeholder="Enter Climbing Gym Name"
                            keyboardType="default"
                        /> 

                        <Text style={s.GymSettingsText}>
                            <Icon name="qr-code" style={{flex:1, paddingBottom:1}} size={25} color="#000" />Route ID
                        </Text> 
                        <TextInput
                            editable={passcodeState == PasscodeCreationStates.UNLOCKED}
                            style={s.input} 
                            onChangeText={text => {   
                                var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                this.props.onRouteIdChange(cleanText)   
                                this.props.routeIdSaved(false);
                                }}
                            value={routeId} 
                            placeholder="Enter Route ID or Scan QR Code"
                            keyboardType="default"
                        /> 
                    <View style={{flex:1, alignItems:'center' }}>
                        <View style={s.horizontalContainerCentered}>
                            <Button style={s.button} disabled={passcodeState != PasscodeCreationStates.UNLOCKED} color="#F98455" title="Save" onPress={this.onSaveButtonPress} /> 
                            <Button style={s.button} disabled={passcodeState != PasscodeCreationStates.UNLOCKED} color="#F98455" title="Reset Climber Data" onPress={this.onResetClimberData} /> 
                        </View>
                    </View>     
                    </View>
                        <View style={s.containerEnd}>
                        
                        <Button
                            disabled={passcodeState != PasscodeCreationStates.UNLOCKED}
                            title="Sign Out"
                            onPress={() => this.onSigOut().then(() => console.log('Signed out!'))}
                        />
                        </View>
                   
                </View>
                <View style={[s.container, { flexDirection: "column" }]}>
                    <CreatePasscodeScreenContainer></CreatePasscodeScreenContainer>
                </View>  */