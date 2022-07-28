
import React from 'react';
import {
    Button, 
    StyleSheet,
    Text,
    Animated,
    View, 
    SafeAreaView,

  } from 'react-native';
import { connect } from 'react-redux'
import Actions from '../Redux/ReduxActions'
import ClimbingGymActions from '../Redux/PasscodeRedux'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {PasscodeCreationStates} from '../Lib/PasscodeCreationStates'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Icon from 'react-native-vector-icons/Entypo';
import {NavigationEvents} from 'react-navigation';
import { useNavigation, useIsFocused   } from '@react-navigation/native';
const s = require('../Styles/StyleSheet');

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('@Passcode', value)
    } catch (e) {
      //console.log('error in storeData() in CreatePasscodeScreen.js')
      //console.log(e)
    }
  }

export  class CreatePasscodeScreen extends React.Component  
{
 

    static propTypes = { 
        passcode: PropTypes.string.isRequired,
        tempPasscode: PropTypes.string.isRequired,
        passcodeState: PropTypes.number.isRequired,

        passcodeChanged: PropTypes.func.isRequired, 
        tempPasscodeChanged: PropTypes.func.isRequired, 
        setPasscodeState: PropTypes.func.isRequired,
    }

    
    async getData(){
        //Read in saved pass code and if not present change state to first pass code entry
      //console.log('-----------------------------getData() in CreatePasscodeScreen-------------')
        try {
          const value = await AsyncStorage.getItem('@Passcode') 
          if(value !== null) { 
            // value previously stored
          //console.log('READING value FOR PASSCODE') 
          //console.log(value) 
            this.props.passcodeChanged(value)
            this.props.setPasscodeState(PasscodeCreationStates.SAVED)  
          }
          else{ 
          //console.log('PAsscode was null setting state to ENTER FIRST PASSCODE') 
            this.props.setPasscodeState(PasscodeCreationStates.ENTER_FIRST_PASSCODE)  
          }
        } 
        catch(e) 
        { 
          //console.log('ERROR READING value FOR PASSCODE') 

          //console.log(e) 
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

    componentDidUpdate(){ 
        const {passcode, passcodeState, tempPasscode} = this.props
      //console.log('--=============-componentDidUpdate createPAsscodeScreen')
      //console.log('passcodeState') 
      //console.log(passcodeState)
      //console.log('tempPasscode') 
      //console.log(tempPasscode)
      //console.log('passcode') 
      //console.log(passcode)

        if(passcodeState == PasscodeCreationStates.ENTER_FIRST_PASSCODE && tempPasscode.length == 4){
            
          //console.log('Setting state to confirm passcode????????')
            this.props.setPasscodeState(PasscodeCreationStates.CONFIRM_PASSCODE)  
        }
        else if(passcodeState == PasscodeCreationStates.CONFIRM_PASSCODE && tempPasscode == passcode && passcode.length == 4){ 
          //console.log('Clearing temp and saving new passcode setting to unlocked???????')
            this.props.tempPasscodeChanged('');
            storeData(passcode).then(() => this.props.setPasscodeState(PasscodeCreationStates.UNLOCKED)  )
        }
        else if(passcodeState == PasscodeCreationStates.CONFIRM_PASSCODE && tempPasscode != passcode && tempPasscode.length == 4  && passcode.length == 4){ 
          //console.log('New passcodes do not match go back to enter first passcode')
            this.props.tempPasscodeChanged('');
            this.props.setPasscodeState(PasscodeCreationStates.ENTER_FIRST_PASSCODE)  
        }
        else if(passcodeState == PasscodeCreationStates.SAVED && tempPasscode != passcode && tempPasscode.length == 4  && passcode.length == 4){ 
          //console.log('Passcode incorrect')
            this.props.tempPasscodeChanged(''); 
        }
        else if(passcodeState == PasscodeCreationStates.SAVED && tempPasscode == passcode && passcode.length == 4){
          //console.log('Setting passcode to unlocked????????')
            this.props.setPasscodeState(PasscodeCreationStates.UNLOCKED)  
        }

        
    }
 
    
    startShake = () => {
        Animated.sequence([
          Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
     }

    async componentDidMount(){ 
      //console.log('---componentDidMount createPAsscodeScreen')
        await this.getData();
        //const navigation = useNavigation();

        // this.willFocusListener = navigation.addListener('focus', (e) => {
        //     // Prevent default action
        //   //console.log('pleeeeeeeeeeeeease')
        //   });
         
    } 

    constructor() {
      //console.log('---constructor createPAsscodeScreen')
        //this.shakeAnimation = new Animated.Value(0);
        super() 
    }

 
    render()
    { 
        
 
      //console.log('------render CreatePasscodeScreen.js-------')
 
        const { passcode, passcodeState, tempPasscode} = this.props 
 
        var passcodeView = null 

      //console.log('tempPasscode')
      //console.log(tempPasscode)
      //console.log('passcode')
      //console.log(passcode)
      //console.log('passcodeState')
      //console.log(passcodeState)


        switch (passcodeState) {
            case PasscodeCreationStates.LOADING:
              //console.log('PasscodeCreationStates.LOADING')
                passcodeView = <Text style={s.welcome}>SHOW LOADING SCREEN - PASSCODE</Text> 
                break;
            case PasscodeCreationStates.ENTER_FIRST_PASSCODE:
              //console.log('PasscodeCreationStates.ENTER_FIRST_PASSCODE')
                passcodeView = 
                    <View style={[s.verticalContainer, {alignItems:'center', paddingTop:0 }]}>
                        <Text style={s.GymSettingsText}>
                            <Icon name="lock" style={{flex:1, paddingBottom:1}} size={25} color="#000" /> Enter New Passcode
                        </Text> 
                        <SmoothPinCodeInput style={{  } }
                            cellStyle={{
                                borderBottomWidth: 3,
                                borderColor: 'gray',
                            }}
                            cellStyleFocused={{
                                borderColor: 'black',
                            }}
                            value={tempPasscode}
                            autoFocus={true}
                            codeLength={4}
                            cellSize={100}
                            cellSpacing={30}
                            textStyle={s.passcodeText} 
                            onTextChange={tempPasscode => {
                                this.props.tempPasscodeChanged(tempPasscode);
                            }}
                        />  
                    </View>
                break;
            case PasscodeCreationStates.CONFIRM_PASSCODE:
              //console.log('PasscodeCreationStates.CONFIRM_PASSCODE')
                passcodeView = 
                <View style={[s.verticalContainer, {alignItems:'center', paddingTop:0 }  ]}>
                    <Text style={s.GymSettingsText}>
                        <Icon name="lock" style={{flex:1, paddingBottom:1}} size={25} color="#000" /> Enter Re-Enter Passcode
                    </Text> 
                    <SmoothPinCodeInput style={{  } }
                        cellStyle={{
                            borderBottomWidth: 3,
                            borderColor: 'gray',
                        }}
                        cellStyleFocused={{
                            borderColor: 'black',
                        }}
                        value={passcode}
                        autoFocus={true}
                        codeLength={4}
                        cellSize={100}
                        cellSpacing={30}
                        textStyle={s.passcodeText} 
                        onTextChange={passcode => {
                            this.props.passcodeChanged(passcode);
                        }}
                    /> 
                </View>
                break; 
            case PasscodeCreationStates.SAVED: 

                passcodeView = 
                <View style={[s.verticalContainer, {alignItems:'center', paddingTop:0 }]}>
                    <Text style={s.GymSettingsText}>
                        <Icon name="lock" style={{flex:1, paddingBottom:1}} size={25} color="#000" /> Enter Passcode
                    </Text> 
                    <SmoothPinCodeInput style={{  } }
                        cellStyle={{
                            borderBottomWidth: 3,
                            borderColor: 'gray',
                        }}
                        cellStyleFocused={{
                            borderColor: 'black',
                        }}
                        value={tempPasscode}
                        autoFocus={true}
                        cellSize={100}
                        codeLength={4}
                        cellSpacing={30}
                        textStyle={s.passcodeText} 
                        onTextChange={tempPasscode => {
                            this.props.tempPasscodeChanged(tempPasscode);
                        }}
                    />
                </View>
                break;

            case PasscodeCreationStates.UNLOCKED: 

                passcodeView = 
                <Button
                        title="Reset Passcode"
                        onPress={() => this.removeItemValue('@Passcode').then(() => {
                           //console.log('PAsscode Reset!')
                            // this.props.tempPasscodeChanged('');
                            // this.props.passcodeChanged('');
                            //this.props.setPasscodeState(PasscodeCreationStates.ENTER_FIRST_PASSCODE)  
                        })}
                    />
                break;    
 
        }

 


        return ( 

            <View style={ { paddingTop:0 , 1234}}> 
                {passcodeView}
            </View> 
        );

    }  

}


function mapStateToProps(state) {  
 
    return { 
        passcode : state.climbingGym.passcode,
        tempPasscode: state.climbingGym.tempPasscode,
        passcodeState: state.climbingGym.passcodeState
    };
  }
  
  const mapDispatchToProps = { 
   passcodeChanged: ClimbingGymActions.passcodeChanged,
   tempPasscodeChanged:  ClimbingGymActions.tempPasscodeChanged,
   setPasscodeState: ClimbingGymActions.setPasscodeState
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CreatePasscodeScreen)











 