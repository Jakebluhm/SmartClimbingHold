
import React from 'react';
import { connect } from 'react-redux'
import Actions from '../ReduxActions'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {onSigOut} from './AuthenticationScreen'

import { 
    Text, 
    Button,
    View,
    TextInput, 
  } from 'react-native';


  const s = require('../Styles/StyleSheet');


  

export  class GymSettingsScreen extends React.Component 
{ 
    static propTypes = {
        climbingGymName: PropTypes.string.isRequired, 
        routeId: PropTypes.string.isRequired, 

        onClimbingGymNameChange: PropTypes.func.isRequired,
        saveGymSettingsRequest: PropTypes.func.isRequired,
        onRouteIdChange: PropTypes.func.isRequired,
        routeIdSaved:  PropTypes.func.isRequired,
    }



    onSaveButtonPress(){  
        this.props.saveGymSettingsRequest();
        this.props.routeIdSaved(true);
        
    }


    async componentDidMount(){
        
    }

    constructor() 
    {
        super() 
        this.onSaveButtonPress = this.onSaveButtonPress.bind(this)  
    }

    render()
    { 
        const {climbingGymName, routeId } = this.props
        
        return (  
        <View style={[s.container, { flexDirection: "column" }]}>
            <Text style={s.welcome}>
                <Icon name="domain" style={{flex:1, paddingBottom:1}} size={25} color="#000" />Climbing Gym Name
            </Text> 
            <TextInput
                style={s.input}
                onChangeText={text => {   
                    var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                    this.props.onClimbingGymNameChange(cleanText) 
                    }}
                value={climbingGymName} 
                placeholder="Enter Climbing Gym Name"
                keyboardType="default"
            /> 

            <Text style={s.welcome}>
                <Icon name="qr-code" style={{flex:1, paddingBottom:1}} size={25} color="#000" />Route ID
            </Text> 
            <TextInput
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


            <View style={s.containerEnd}>
              <Button style={s.button} disabled={false} color="#F98455" title="Save" onPress={this.onSaveButtonPress} /> 
            </View>
            <Button
                title="Sign Out"
                onPress={() => onSigOut().then(() => console.log('Signed out!'))}
            />
        </View>

        );
    } 


}

 

  function mapStateToProps(state) { 
    return {
        climbingGymName: state.zones.climbingGymName,
        routeId: state.zones.routeId,
    };
  }
  
  const mapDispatchToProps = {    
    onClimbingGymNameChange: Actions.onClimbingGymNameChange,
    saveGymSettingsRequest: Actions.saveGymSettingsRequest,
    onRouteIdChange: Actions.onRouteIdChange,
    routeIdSaved: Actions.routeIdSaved,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(GymSettingsScreen)