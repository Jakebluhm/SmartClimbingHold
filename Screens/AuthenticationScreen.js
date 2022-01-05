import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Actions from '../Redux/ReduxActions'
import {
    Button, 
    StyleSheet,
    Text,
    View, 
    
  } from 'react-native';
  import { GoogleSignin } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth'; 

  GoogleSignin.configure({
    webClientId: "92548175051-6v5dc7ke9if58ps1kki9ku3ssi9seq30.apps.googleusercontent.com",
  });
 
  const s = require('../Styles/StyleSheet');

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
 




  export  class AuthenticationScreen extends React.Component { 
 
    static propTypes = {
        authenticationIsLoading: PropTypes.bool.isRequired,
        userAuthenticated: PropTypes.bool.isRequired,

        setAuthenticationIsLoading: PropTypes.func.isRequired,
        setUserAuthenticated: PropTypes.func.isRequired,
    }




  // Handle user state changes
  onAuthStateChanged(user) {
    console.log('--------------onAuthStateChanged---------')
    console.log('user')
    console.log(user)
    if(user){
        //console.log('USER SIGNED IN')

        this.props.setUserAuthenticated(true);
        this.props.setAuthenticationIsLoading(false);
        
    }
    else{
        //console.log('NO USER SIGNED IN') 

        this.props.setUserAuthenticated(false);
        this.props.setAuthenticationIsLoading(false);
    }

  }

    constructor() {
        super() 
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this)  

        const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
 

    //     auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           //console.log('user is logged');
    //         }
    //         else{
    //             //console.log('Auto Sign in failed');
    //         }
    //   });

    
    }

    render()
    {
        //console.log('----------------------- AuthenticationScreen.js render()------------------------')
        const { authenticationIsLoading } = this.props
        //console.log('authenticationIsLoading')
        //console.log(authenticationIsLoading)

        return ( 
            <View style={[s.emptyContainer, { flexDirection: "column" }]}> 
                { authenticationIsLoading  ? 
                    <View style={[ { flexDirection: "column" }]}> 
                        <Text style={s.welcome}>SHOW LOADING SCREEN - AUTHENTICATION</Text> 
                    </View>
                : 
                    <View style={[s.container, { flexDirection: "column" }]}>
                        <Text style={s.welcome}>Please Sign-In</Text> 
                        <Button
                            title="Google Sign-In"
                            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                        />
                        
                    </View> 
                }
            </View>  
             
        );
    }

  } 



  function mapStateToProps(state) { 
 
    return {
        //climbTime: state.route.climbTime, 
        authenticationIsLoading: state.route.authenticationIsLoading,
        userAuthenticated: state.route.userAuthenticated,
    };
  }
  
  const mapDispatchToProps = {
   //beginClimbRequest: Actions.beginClimbRequest, 
   setAuthenticationIsLoading: Actions.setAuthenticationIsLoading,
    setUserAuthenticated: Actions.setUserAuthenticated,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen)