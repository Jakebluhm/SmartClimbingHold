import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Actions from '../Redux/ReduxActions'
import AuthActions from '../Redux/AuthenticationRedux'
import LinearGradient from 'react-native-linear-gradient';
import {
    Button,  
    ImageBackground,
    StyleSheet,
    Text,
    Pressable, 
    TextInput,
    View,
    Animated, 
    Image, 
    
  } from 'react-native';
  import { GoogleSignin } from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth'; 
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { AuthModes } from '../Lib/AuthModes';

import LottieView from 'lottie-react-native';

import EmailActive from '../Assets/Username_Active State.svg'
import EmailNormal from '../Assets/Username_Default state.svg'
import PasswordActive from '../Assets/Password_Active State.svg'
import ConfirmPasswordActive from '../Assets/Password_Active State.svg'
import PasswordNormal from '../Assets/Password_Deafualt state.svg' 

import BackgroundAnimation from '../Animations/BackgroundAnimation'

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
 

  const AnimatedComponent = (props)=>{

    // Need to create state first. Setter is not used in this case
    const [value] = useState(new Animated.Value(props.value))

    useEffect(()=>{
        Animated.timing(value, {
            toValue: 100,
            duration: 10,
        }).start() // < Don't forget to start!
    }, [props.value]) // < Run animation only when props.value changed

    // Apply animated property to your style
    return (
        <Animated.View style={{ transform: [{ scaleY: value }], width:500, backgroundColor:'#000000'}} />
    )
}

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}



  export  class AuthenticationScreen extends React.Component { 
 
    static propTypes = {
        authenticationIsLoading: PropTypes.bool.isRequired,
        userAuthenticated: PropTypes.bool.isRequired,
        authMode: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        emailEntryActive: PropTypes.bool.isRequired,
        password: PropTypes.string.isRequired,
        passwordEntryActive: PropTypes.bool.isRequired,
        confirmPassword: PropTypes.string.isRequired,
        confirmPasswordEntryActive: PropTypes.bool.isRequired,
        invalidLogin: PropTypes.bool.isRequired,

        setAuthenticationIsLoading: PropTypes.func.isRequired, 
        setUserAuthenticated: PropTypes.func.isRequired, 
        setAuthMode: PropTypes.func.isRequired, 
        onEmailChange: PropTypes.func.isRequired, 
        setEmailEntryActive: PropTypes.func.isRequired, 
        onPasswordChange: PropTypes.func.isRequired, 
        setPasswordEntryActive: PropTypes.func.isRequired, 
        onConfirmPasswordChange: PropTypes.func.isRequired, 
        setConfirmPasswordEntryActive: PropTypes.func.isRequired, 
        setInvalidLogin: PropTypes.func.isRequired,
    }




  // Handle user state changes
  onAuthStateChanged(user) {
  //console.log('--------------onAuthStateChanged---------')
  //console.log('user')
  //console.log(user)
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
        
        this.onLoginPress = this.onLoginPress.bind(this) 
        this.onSignupPress = this.onSignupPress.bind(this) 
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this)

    //     auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           //console.log('user is logged');
    //         }
    //         else{
    //             //console.log('Auto Sign in failed');
    //         }
    //   });

    
    } 

    onLoginPress(){
      console.log("onLoginPress()") 
      this.props.setAuthMode(AuthModes.LOGIN)
    }
    onLoginSubmit(){

      
      const {  email, password} = this.props 
      console.log("onLoginSubmit()")  


      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        this.props.setInvalidLogin('')
        this.props.onEmailChange('')
        this.props.onPasswordChange('')
        this.props.onConfirmPasswordChange('')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          this.props.setInvalidLogin('Email address is already in use.')
          this.props.onPasswordChange('')
        }

        else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          this.props.setInvalidLogin('Invalid login credentials.')
          this.props.onPasswordChange('')
        }

        else if (error.code === 'auth/user-not-found') {
          console.log('An acconunt with this email does not exist!');
          this.props.setInvalidLogin('Invalid login credentials.')
          this.props.onPasswordChange('')
        }

        else if (error.code === 'auth/wrong-password') {
          console.log('Incorrect password!');
          this.props.setInvalidLogin('Incorrect password.')
          this.props.onPasswordChange('')
        }

        else{ 
          console.log('Unseen error!');
          this.props.setInvalidLogin('An error occured.')
          this.props.onPasswordChange('')
        }

        console.error(error);
      });
    }
    
    onSignUpSubmit(){
      console.log("onSignUpSubmit()")  

      const {  email, password, confirmPassword} = this.props 

      

      console.log('this.props.password')
      console.log(this.props.password)
      console.log('this.props.confirmPassword')
      console.log(this.props.confirmPassword)

      if(this.props.password == this.props.confirmPassword){
        console.log('Passwords Match!!') 

        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          this.props.setInvalidLogin('')
          this.props.onEmailChange('')
          this.props.onPasswordChange('')
          this.props.onConfirmPasswordChange('')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            this.props.setInvalidLogin('Email address is already in use.')
            this.props.onPasswordChange('')
            this.props.onConfirmPasswordChange('')
          }

          else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            this.props.setInvalidLogin('Invalid login credentials.')
            this.props.onPasswordChange('')
            this.props.onConfirmPasswordChange('')
          }

          else if (error.code === 'auth/weak-password') {
            console.log('Password should be at least 6 characters!');
            this.props.setInvalidLogin('Password must be at least 6 characters.')
            this.props.onPasswordChange('')
            this.props.onConfirmPasswordChange('')
          }

          else{
            console.log('Unseen error!');
            this.props.setInvalidLogin('An error occured.')
            this.props.onPasswordChange('')
            this.props.onConfirmPasswordChange('')

          }

          console.error(error);
        });


      }
      else{
        console.log('Passwords DO NO Match')
        
        this.props.setInvalidLogin('Passwords do not match.')
        this.props.onPasswordChange('')
        this.props.onConfirmPasswordChange('')
      }
      
    }

    onSignupPress(){
      console.log("onSignupPress()")
      this.props.setAuthMode(AuthModes.SIGNUP)
    }



    render()
    {
        console.log('----------------------- AuthenticationScreen.js render()------------------------')
        const { authenticationIsLoading, authMode, email, invalidLogin, emailEntryActive, passwordEntryActive, password, confirmPassword, confirmPasswordEntryActive} = this.props 
        console.log('authMode')
        console.log(authMode)
        console.log('emailEntryActive')
        console.log(emailEntryActive)
        console.log('confirmPasswordEntryActive')
        console.log(confirmPasswordEntryActive)
        console.log('password')
        console.log(password)
        console.log('confirmPassword')
        console.log(confirmPassword)
        console.log('invalidLogin')
        console.log(invalidLogin)
        console.log('invalidLogin.length')
        console.log(invalidLogin.length)

        return ( 
            <View style={ { flex: 1,   flexDirection: "column" }}> 
                  { authenticationIsLoading  ? 
                      <View style={[ { flexDirection: "column" }]}> 
                          <Text style={s.welcome}>SHOW LOADING SCREEN - AUTHENTICATION</Text> 
                      </View>
                  : 
                  <View style={ { flex: 1,   flexDirection: "column" }}> 
                    { (authMode == AuthModes.NONE) &&
                      <View style={{flex: 1}}>
                      <View style={{ zIndex:2, flex: 1, alignItems: 'center', justifyContent: 'center',    }}>
                      <View style={ { flex: 1, alignItems:'center', justifyContent:'center', paddingTop:50,  paddingBottom:25, flexDirection: "column",   }}>
                        
                          <View style={ { flex:1,   paddingTop:50,  paddingBottom:25, paddingRight:98, paddingLeft:98,     borderRadius: 16,    backgroundColor: 'rgba(255, 255, 255, 0.26)',}}>
                            
                            <View style={{paddingTop:18, paddingBottom:160,  alignSelf:'center',}}>
                              <Image source={require('../Assets/Logo/HungLogo.png')} style={s.settingsLogo} />
                            </View>
                             
                            <View style={{ paddingBottom:34,}}>
                              <Pressable onPress={this.onLoginPress} >
                                <LinearGradient colors={['#008047', '#0F5737']}  start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={{borderRadius:8, width: 294, height: 50,  paddingLeft:98, paddingRight:98}}>
                                  <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={{fontSize:24, textAlign:'center', alignSelf:'center', color:"#ffffff"}}>Login</Text> 
                                  </View>
                                </LinearGradient>
                              </Pressable>
                            </View>

                            <View style={{}}>
                              <Pressable onPress={this.onSignupPress} >
                                <LinearGradient colors={['#008047', '#0F5737']}  start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={{borderRadius:8, width: 294, height: 50,  paddingLeft:98, paddingRight:98}}>
                                  <View style={{flex:1, justifyContent:'center',}}>
                                    <Text style={{fontSize:24, textAlign:'center', alignSelf:'center', color:"#ffffff"}}>Sign up</Text> 
                                  </View>
                                </LinearGradient>
                              </Pressable>
                            </View>
                            {/* <Text style={{fontSize:24, textAlign:'left', alignSelf:'center', paddingBottom:75,}}>Please Sign-In</Text>  */}

                            {/* <Pressable onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
                              <Image source={require('../Assets/googleSignin.png')} style={ { alignSelf:'center', width:191, height:46} }>  
                              </Image> 
                            </Pressable> */}
  
                          </View>
                           
                      </View>  
                      </View>  
                          
                      <BackgroundAnimation source={require('../Assets/mountainBackground.jpg')} style={{flex: 1}}  >
                          
                          </BackgroundAnimation>
                        </View>
                      }







                      { (authMode == AuthModes.LOGIN) &&
                      <View style={{flex: 1}}>
                        <View style={{ zIndex:2, flex: 1, alignItems: 'center', justifyContent: 'center',    }}>
                          <FadeInView style={{flex:1, paddingTop:42 ,paddingBottom:53 }}>
                              <View style={ { flex:1,   paddingTop:0, paddingBottom:0, paddingRight:98, paddingLeft:98,     borderRadius: 16,    backgroundColor: 'rgba(255, 255, 255, 0.26)',}}>
                                
                                <View style={{paddingTop:18, paddingBottom:20,  alignSelf:'center',}}>
                                  <Image source={require('../Assets/Logo/HungLogo.png')} style={s.settingsLogo} />
                                </View>
                                
                                
                                <Text style={{fontSize:30, textAlign:'left', alignSelf:'center', color:'#ffffff', paddingBottom:13,}}>Login</Text> 
                                

                                
                                <View style={s.emailSection}>
                                  {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
                                  <View style={s.searchIcon}>
                                    { (emailEntryActive)?
                                    <EmailActive   width={24} height={24}> </EmailActive>
                                    :
                                    <EmailNormal   width={24} height={24}> </EmailNormal>
                                    }
                                  </View>
                                  <TextInput
                                      style={s.loginInput}
                                      // placeholder="User Nickname"
                                      // onChangeText={(searchString) => {this.setState({searchString})}}
                                      // underlineColorAndroid="transparent"
                                      editable={true} 
                                      onFocus={le => {console.log('focussssssssssss')
                                              this.props.setEmailEntryActive(true)}}
                                      onEndEditing={le => {console.log('END focussssssssssss')
                                              this.props.setEmailEntryActive(false)}}

                                      onChangeText={text => {   
                                          // var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                          // this.props.onRouteIdChange(cleanText)   
                                          // this.props.routeIdSaved(false);
                                          this.props.onEmailChange(text)
                                          console.log(text)
                                          }}
                                      value={email} 
                                      placeholderTextColor={'#dddddd'}
                                      placeholder="Email"
                                      keyboardType="email-address"
                                  />
                              </View>
                              { invalidLogin.length > 0 &&
                              <View style={{ paddingLeft:10,  alignItems:'flex-start', flexDirection:'row', height:20}}>
                                <Text  style={{fontSize:15, fontWeight:'bold', textAlign:'left',  color:'#ff0000'}}>{invalidLogin}</Text>
                              </View>
                              }

                              <View style={{paddingTop: invalidLogin.length > 0? 10 : 30}}>
                                <View style={s.passwordSection}>
                                    {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
                                    <View style={s.searchIcon}>
                                      { (passwordEntryActive)?
                                      <PasswordActive   width={24} height={24}> </PasswordActive>
                                      :
                                      <PasswordNormal   width={24} height={24}> </PasswordNormal>
                                      }
                                    </View>
                                    <TextInput
                                        style={s.loginInput}
                                        // placeholder="User Nickname"
                                        // onChangeText={(searchString) => {this.setState({searchString})}}
                                        // underlineColorAndroid="transparent"
                                        editable={true} 
                                        secureTextEntry={true}
                                        onFocus={le => {console.log('focussssssssssss')
                                                this.props.setPasswordEntryActive(true)}}
                                        onEndEditing={le => {console.log('END focussssssssssss')
                                                this.props.setPasswordEntryActive(false)}}

                                        onChangeText={text => {   
                                            // var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                            // this.props.onRouteIdChange(cleanText)   
                                            // this.props.routeIdSaved(false);
                                            this.props.onPasswordChange(text)
                                            console.log(text)
                                            }}
                                        value={password} 
                                        placeholderTextColor={'#dddddd'}
                                        placeholder="Password"
                                        keyboardType="default"
                                    />
                                </View>
                              </View>
                              <View style={{ paddingRight:10, justifyContent:'flex-end', alignItems:'flex-start', flexDirection:'row', height:20, }}>                                
                                <Pressable onPress={()=> {  console.log('forgot password'); 
                                                            console.log('email')
                                                            console.log(email)
                                                              auth().sendPasswordResetEmail(email)
                                                              .then(function (user) {
                                                                alert('Please check your email...')
                                                              }).catch(function (e) {
                                                                console.log(e)
                                                              }) } 
                                                              }>
                                  <Text  style={{fontSize:14, fontWeight:'bold', textAlign:'right',  color:'#000000',  }}>Forgot password?</Text>                    
                                </Pressable>
                              </View>
    
                                <View style={{ paddingBottom:34, paddingTop:14}}>
                                  <Pressable onPress={this.onLoginSubmit} >
                                    <LinearGradient colors={['#008047', '#0F5737']}  start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={{borderRadius:8, width: 294, height: 50,  paddingLeft:98, paddingRight:98}}>
                                      <View style={{flex:1, justifyContent:'center'}}>
                                        <Text style={{fontSize:24, textAlign:'center', alignSelf:'center', color:"#ffffff"}}>Login</Text> 
                                      </View>
                                    </LinearGradient>
                                  </Pressable>
                                </View>



                                <View style={{ flexDirection:'row',  }}>  
                                  <View style={{  paddingRight:11.5, flex:1, justifyContent:'center'   }}> 
                                    <View style={{ borderWidth: 2,  height:2,  borderColor: '#ffffff', borderRadius:2  }}/>   
                                  </View>

                                  <Text style={{fontSize:15, textAlign:'center', alignSelf:'flex-start', color:'#ffffff',   }}>OR</Text> 
                                    
                                  <View style={{  paddingLeft:11.5,   flex:1, justifyContent:'center' }}> 
                                    <View style={{  borderWidth: 1, height:2,  borderColor: '#ffffff', borderWidth:2, borderRadius:2 }}/>
                                  </View> 
                                </View>


                                <Pressable style={{paddingTop:41}} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}> 
                                <View style={{height:36, flexDirection:'row',  backgroundColor:'#ffffff', justifyContent:'flex-start', alignContent:'center', borderWidth: 1, borderColor: '#707070', }}> 
                                  <Image source={require('../Assets/btn_google_light_normal_hdpi.9.png')} style={ { alignSelf:'center', width:36, height:36} }>  
                                  </Image> 
                                  <Text style={{fontSize:15, flex:1, marginRight:36, textAlign:'center',  alignSelf:'center', color:'#676767',   }}>Sign in with Google</Text> 
                                </View>
                                </Pressable>

                                <View style={{paddingTop:24,}}>
                                  <View style={{ height: 30, flexDirection:'row',   justifyContent:'center', alignItems:'center'   }}>
                                    <Text style={{fontSize:20, flex:1.3,   textAlign:'right',  alignSelf:'center', color:'#ffffff',      }}>Are you new?</Text> 
                                    <Pressable style={{flex:1,   }}  onPress={() => {
                                                                                              console.log('sign up pressed!!!')
                                                                                              
                                                                                              this.props.setInvalidLogin('')
                                                                                              this.props.onPasswordChange('')
                                                                                              this.props.onConfirmPasswordChange('')
                                                                                              this.props.setAuthMode(AuthModes.SIGNUP)}}> 
                                      <Text style={{fontSize:20, flex:1, textAlign:'left', fontWeight:'bold', alignSelf:'flex-start', color:'#10B56B',      }}> Sign Up</Text> 
                                    </Pressable>                                  
                                  </View>
                                </View>


                              </View>
                          </FadeInView>  
                          {/* <LottieView   resizeMode='cover'  source={require('../Assets/Scrolling BG.json')} autoPlay={true} loop={true} /> */}
                        </View>
                          
                        <BackgroundAnimation source={require('../Assets/mountainBackground.jpg')} style={{flex: 1}}  >
                          
                          </BackgroundAnimation>
                        </View>
                      }




                    { (authMode == AuthModes.SIGNUP) &&
                      <View style={{flex: 1}}>
                          <View style={{ zIndex:2, flex: 1, alignItems: 'center', justifyContent: 'center',    }}>
                            <FadeInView style={{flex:1, paddingTop:42 ,paddingBottom:53 }}>
                                <View style={ { flex:1,   paddingTop:0, paddingBottom:0, paddingRight:98, paddingLeft:98,     borderRadius: 16,    backgroundColor: 'rgba(255, 255, 255, 0.26)',}}>
                                  
                                  <View style={{paddingTop:15, paddingBottom:20,  alignSelf:'center',}}>
                                    <Image source={require('../Assets/Logo/HungLogo.png')} style={s.settingsLogo} />
                                  </View>
                                  
                                  
                                  <Text style={{fontSize:30, textAlign:'left', alignSelf:'center', color:'#ffffff', paddingBottom:13,}}>Sign up</Text> 
                                  

                                  
                                  <View style={s.emailSection}>
                                    {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
                                    <View style={s.searchIcon}>
                                      { (emailEntryActive)?
                                      <EmailActive   width={24} height={24}> </EmailActive>
                                      :
                                      <EmailNormal   width={24} height={24}> </EmailNormal>
                                      }
                                    </View>
                                    <TextInput
                                        style={s.loginInput}
                                        // placeholder="User Nickname"
                                        // onChangeText={(searchString) => {this.setState({searchString})}}
                                        // underlineColorAndroid="transparent"
                                        editable={true} 
                                        onFocus={le => {console.log('focussssssssssss')
                                                this.props.setEmailEntryActive(true)}}
                                        onEndEditing={le => {console.log('END focussssssssssss')
                                                this.props.setEmailEntryActive(false)}}

                                        onChangeText={text => {   
                                            // var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                            // this.props.onRouteIdChange(cleanText)   
                                            // this.props.routeIdSaved(false);
                                            this.props.onEmailChange(text)
                                            console.log(text)
                                            }}
                                        value={email} 
                                        placeholderTextColor={'#dddddd'}
                                        placeholder="Email"
                                        keyboardType="email-address"
                                    />
                                </View>
                                { invalidLogin.length > 0 &&
                                <View style={{ paddingLeft:10,  alignItems:'flex-start', flexDirection:'row', height:20}}>
                                  <Text  style={{fontSize:15, fontWeight:'bold', textAlign:'left',  color:'#ff0000'}}>{invalidLogin}</Text>
                                </View>
                                }

                                <View style={{paddingTop: invalidLogin.length > 0? 10 : 30}}>
                                  <View style={s.passwordSection}>
                                      {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
                                      <View style={s.searchIcon}>
                                        { (passwordEntryActive)?
                                        <PasswordActive   width={24} height={24}> </PasswordActive>
                                        :
                                        <PasswordNormal   width={24} height={24}> </PasswordNormal>
                                        }
                                      </View>
                                      <TextInput
                                          style={s.loginInput}
                                          // placeholder="User Nickname"
                                          // onChangeText={(searchString) => {this.setState({searchString})}}
                                          // underlineColorAndroid="transparent"
                                          editable={true} 
                                          secureTextEntry={true}
                                          onFocus={le => {console.log('focussssssssssss')
                                                  this.props.setPasswordEntryActive(true)}}
                                          onEndEditing={le => {console.log('END focussssssssssss')
                                                  this.props.setPasswordEntryActive(false)}}

                                          onChangeText={text => {   
                                              // var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                              // this.props.onRouteIdChange(cleanText)   
                                              // this.props.routeIdSaved(false);
                                              this.props.onPasswordChange(text)
                                              console.log(text)
                                              }}
                                          value={password} 
                                          placeholderTextColor={'#dddddd'}
                                          placeholder="Password"
                                          keyboardType="default"
                                      />
                                  </View>
                                </View>


                                <View style={{paddingTop:30,}}>
                                  <View style={s.passwordSection}>
                                      {/* <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000"/> */}
                                      <View style={s.searchIcon}>
                                        { (confirmPasswordEntryActive)?
                                        <PasswordActive   width={24} height={24}> </PasswordActive>
                                        :
                                        <PasswordNormal   width={24} height={24}> </PasswordNormal>
                                        }
                                      </View>
                                      <TextInput
                                          style={s.loginInput}
                                          // placeholder="User Nickname"
                                          // onChangeText={(searchString) => {this.setState({searchString})}}
                                          // underlineColorAndroid="transparent"
                                          editable={true} 
                                          secureTextEntry={true}
                                          onFocus={le => {console.log('focussssssssssss')
                                                  this.props.setConfirmPasswordEntryActive(true)}}
                                          onEndEditing={le => {console.log('END focussssssssssss')
                                                  this.props.setConfirmPasswordEntryActive(false)}}

                                          onChangeText={text => {   
                                              // var cleanText = text.replace(/[.$#\[\]\/]/gi, '')
                                              // this.props.onRouteIdChange(cleanText)   
                                              // this.props.routeIdSaved(false);
                                              console.log(text)
                                              this.props.onConfirmPasswordChange(text)
                                              }}
                                          value={confirmPassword} 
                                          placeholderTextColor={'#dddddd'}
                                          placeholder="Confirm Password"
                                          keyboardType="default"
                                      />
                                  </View>
                                </View>
  
      
                                  <View style={{ paddingBottom:25, paddingTop:34}}>
                                    <Pressable onPress={this.onSignUpSubmit} >
                                      <LinearGradient colors={['#008047', '#0F5737']}  start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}} style={{borderRadius:8, width: 294, height: 50,  paddingLeft:98, paddingRight:98}}>
                                        <View style={{flex:1, justifyContent:'center'}}>
                                          <Text style={{fontSize:24, textAlign:'center', alignSelf:'center', color:"#ffffff"}}>Sign up</Text> 
                                        </View>
                                      </LinearGradient>
                                    </Pressable>
                                  </View>



                                  <View style={{ flexDirection:'row',  }}>  
                                    <View style={{  paddingRight:11.5, flex:1, justifyContent:'center'   }}> 
                                      <View style={{ borderWidth: 2,  height:2,  borderColor: '#ffffff', borderRadius:2  }}/>   
                                    </View>

                                    <Text style={{fontSize:15, textAlign:'center', alignSelf:'flex-start', color:'#ffffff',   }}>OR</Text> 
                                      
                                    <View style={{  paddingLeft:11.5,   flex:1, justifyContent:'center' }}> 
                                      <View style={{  borderWidth: 1, height:2,  borderColor: '#ffffff', borderWidth:2, borderRadius:2 }}/>
                                    </View> 
                                  </View>


                                  <Pressable style={{paddingTop:30}} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}> 
                                  <View style={{height:36, flexDirection:'row',  backgroundColor:'#ffffff', justifyContent:'flex-start', alignContent:'center', borderWidth: 1, borderColor: '#707070', }}> 
                                    <Image source={require('../Assets/btn_google_light_normal_hdpi.9.png')} style={ { alignSelf:'center', width:36, height:36} }>  
                                    </Image> 
                                    <Text style={{fontSize:15, flex:1, marginRight:36, textAlign:'center',  alignSelf:'center', color:'#676767',   }}>Sign in with Google</Text> 
                                  </View>
                                  </Pressable>

                                  <View style={{paddingTop:24,}}>
                                    <View style={{ height: 30, flexDirection:'row',   justifyContent:'space-between', alignItems:'center' ,   }}>
                                      <Text style={{fontSize:20, flex:1,  paddingLeft:30, textAlign:'left',  alignSelf:'center', color:'#ffffff',   }}>Have an account?</Text> 
                                      <Pressable style={{flex:0.6,  }}  onPress={() => {
                                                                                                console.log('sign in pressed!!!') 
                                                                                                
                                                                                                this.props.setInvalidLogin('')
                                                                                                this.props.onPasswordChange('')
                                                                                                this.props.onConfirmPasswordChange('')
                                                                                                this.props.setAuthMode(AuthModes.LOGIN)}}> 
                                        <Text style={{fontSize:20, flex:1, textAlign:'left', fontWeight:'bold', alignSelf:'flex-start', color:'#10B56B',       }}> Login</Text> 
                                      </Pressable>                                  
                                    </View>
                                  </View>


                                </View>
                            </FadeInView>  
                            {/* <LottieView   resizeMode='cover'  source={require('../Assets/Scrolling BG.json')} autoPlay={true} loop={true} /> */}
                          </View> 
                          
                        <BackgroundAnimation source={require('../Assets/mountainBackground.jpg')} style={{flex: 1}}  >
                          
                          </BackgroundAnimation>
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
        //climbTime: state.route.climbTime, 
        authenticationIsLoading: state.route.authenticationIsLoading,
        userAuthenticated: state.route.userAuthenticated,
        authMode: state.auth.authMode,
        email: state.auth.email,
        emailEntryActive: state.auth.emailEntryActive,
        password: state.auth.password,
        passwordEntryActive: state.auth.passwordEntryActive,
        confirmPassword: state.auth.confirmPassword,
        confirmPasswordEntryActive: state.auth.confirmPasswordEntryActive,
        invalidLogin: state.auth.invalidLogin,
    };
  }
  
  const mapDispatchToProps = {
   //beginClimbRequest: Actions.beginClimbRequest, 
   setAuthenticationIsLoading: Actions.setAuthenticationIsLoading,
    setUserAuthenticated: Actions.setUserAuthenticated,
    setAuthMode: AuthActions.setAuthMode,
    onEmailChange: AuthActions.onEmailChange,
    setEmailEntryActive: AuthActions.setEmailEntryActive,
    onPasswordChange: AuthActions.onPasswordChange,
    setPasswordEntryActive: AuthActions.setPasswordEntryActive,
    onConfirmPasswordChange: AuthActions.onConfirmPasswordChange,
    setConfirmPasswordEntryActive: AuthActions.setConfirmPasswordEntryActive,
    setInvalidLogin: AuthActions.setInvalidLogin

  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationScreen)