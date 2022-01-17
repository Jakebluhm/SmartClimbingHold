
import React from 'react';
import { connect } from 'react-redux'
import Actions from '../Redux/ReduxActions'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {onSigOut} from './AuthenticationScreen'

import { 
    Text, 
    Button,
    View,
    TextInput, 
  } from 'react-native';
  import auth, { firebase } from '@react-native-firebase/auth'; 
  import { GoogleSignin } from '@react-native-google-signin/google-signin';
import  CreatePasscodeScreenContainer  from '../Components/CreatePasscodeScreen'; 
import { NavigationEvents } from 'react-navigation';
import { PasscodeCreationStates } from '../Lib/PasscodeCreationStates';

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
    }

    async  onSigOut() {
        console.log('--------onSigOut() in AuthenticationScreen.js---------')
        try{

            
            await firebase.auth().signOut();
            GoogleSignin.revokeAccess();
            auth().
            // Sign-out successful.
            console.log('--------onSigOut() in AuthenticationScreen.js----   SUCCESSFUL-----')
            this.props.setUserAuthenticated(false)
            
        }
         catch (error){
             
              console.log('--------onSigOut() in AuthenticationScreen.js----   ERROR!!-----')
              console.log(error)
          }
      } 

    onSaveButtonPress(){  
        this.props.saveGymSettingsRequest();
        this.props.routeIdSaved(true);
        
    }


    onResetClimberData(){   
        console.log('reset climber data pressed')
        this.props.resetClimberDataRequest()
    }

    componentDidMount(){
        try{
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log('Gym Settings Screen did foucs')
          });
        }
        catch(err){
            console.log(err)
        }
    }

    
    componentWillUnmount(){
        try{
            this._unsubscribe();
        }
        catch(err){
            console.log(err)
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
            <View style={[s.container, { flexDirection: "row" }]}>
                <View style={[s.container, { flexDirection: "column" }]}>
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
                </View> 
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
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GymSettingsScreen)