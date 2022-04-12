
import React from 'react';
import { connect } from 'react-redux'
import Actions from '../Redux/ReduxActions'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigationContainerRef  } from '@react-navigation/native';
import SecondScreenContainer from './SecondScreen'
import GymSettingsScreenContainer from './GymSettingsScreen'
import AuthenticationScreenContainer from './AuthenticationScreen'
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import NavigatorContainer from '../NavigationContainer';

import { 
    Text, 
    Button,
    View,
    TextInput, 
  } from 'react-native';

  const s = require('../Styles/StyleSheet');


  
const Drawer = createDrawerNavigator();




export  class InitialScreen extends React.Component 
{ 

    static propTypes = { 
        routeId: PropTypes.string.isRequired, 
        isLoading: PropTypes.bool.isRequired,
        routeIdSet: PropTypes.bool.isRequired,
        authenticationIsLoading: PropTypes.bool.isRequired,  
        climbingGymName: PropTypes.string.isRequired, 

        setIsLoading: PropTypes.func.isRequired,
        onRouteIdChange: PropTypes.func.isRequired,
        userAuthenticated: PropTypes.bool.isRequired,
        routeIdSaved:  PropTypes.func.isRequired,
    } 

    async getData(){
        //console.log('-----------------------------getData() in InitialScreen-------------')
        try {
          const value = await AsyncStorage.getItem('@RouteID') 
          if(value !== null) {
            // value previously stored
            //console.log(' RouteID ') 
            //console.log(value)
            this.props.onRouteIdChange(value) 
            this.props.setIsLoading(false) 
            this.props.routeIdSaved(true);
          }
          else{
            //console.log('No RouteID saved') 
            this.props.setIsLoading(false)
          }
        } catch(e) {
            //console.log(' error in getData  InitialScreen') 
            //console.log(e)
        }
    }

    async componentDidMount(){ 
        await this.getData();
        
        //this.props.navigation.navigate('Home')
    } 

 

    constructor()  
    {
        super()   
    }

    

    render()
    { 
        //console.log('----------------------- initialScreenjs render()------------------------')
        const { isLoading, routeId, routeIdSet, authenticationIsLoading, userAuthenticated, climbingGymName} = this.props
      //console.log('---routeId.length')
      //console.log(routeId.length)
        //console.log('---isLoading')
        //console.log(isLoading)
      //console.log('---routeIdSet')
      //console.log(routeIdSet)
        //console.log('---userAuthenticated')
        //console.log(userAuthenticated)

        const HomeScreeName = (climbingGymName.length > 0)? climbingGymName : "Home"
        
        //const navigationRef = useNavigationContainerRef();
        return (  
            <View style={[s.emptyContainer, { flexDirection: "column" }]}>
                { !userAuthenticated  ? 
                    <AuthenticationScreenContainer></AuthenticationScreenContainer>  
                : 
                
                    <View style={[s.emptyContainer, { flexDirection: "column" }]}> 
                        {isLoading ?
                            <View style={[ { flexDirection: "column" }]}> 
                                    <Text style={s.welcome}>SHOW LOADING SCREEN - ROUTE ID</Text> 
                            </View>
                            :
                            <View style={[s.emptyContainer, { flexDirection: "column" }]}>
                                    { routeId.length >= 6 && routeIdSet ? 
                                        <NavigationContainer
                                        // ref={navigationRef} 
                                        // onReady={() => {
                                        //   routeNameRef.current = navigationRef.getCurrentRoute().name;
                                        // }}
                                        // onStateChange={async () => {
                                        //   const previousRouteName = routeNameRef.current;
                                        //   const currentRouteName = navigationRef.getCurrentRoute().name;
                                  
                                        //   if (previousRouteName !== currentRouteName) {
                                        //   //console.log('currentRouteName')
                                        //   //console.log(currentRouteName)
                                        //   }
                                  
                                        //   // Save the current route name for later comparison
                                        //   routeNameRef.current = currentRouteName;
                                        // }}
                                      > 
                                            <Drawer.Navigator initialRouteName="Home">
                                                <Drawer.Screen name={HomeScreeName} component={SecondScreenContainer} /> 
                                                <Drawer.Screen name="Gym Settings" component={GymSettingsScreenContainer} />  
                                            </Drawer.Navigator> 
                                        </NavigationContainer> 
                                        //<NavigatorContainer></NavigatorContainer>
                                        :
                                        <GymSettingsScreenContainer>

                                        </GymSettingsScreenContainer>
                                    }
                            </View> 
                        }
                    </View>
                }
            </View>
        ); 
    } 


}

  function mapStateToProps(state) { 
    return { 
         routeId: state.route.routeId,
         isLoading: state.route.isLoading,
         routeIdSet: state.route.routeIdSet,
         authenticationIsLoading: state.route.authenticationIsLoading,
         userAuthenticated: state.route.userAuthenticated, 
         climbingGymName: state.route.climbingGymName,
    };
  }
  
  const mapDispatchToProps = {    
    // onClimbingGymNameChange: Actions.onClimbingGymNameChange,
    // saveGymSettingsRequest: Actions.saveGymSettingsRequest,
    // onRouteIdChange: Actions.onRouteIdChange,
    setIsLoading: Actions.setIsLoading,
    onRouteIdChange: Actions.onRouteIdChange,
    routeIdSaved: Actions.routeIdSaved,

  }


  export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen)