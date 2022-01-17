
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, 
    View, 
    TouchableOpacity
    
  } from 'react-native';
 
import { connect } from 'react-redux'
import Actions from '../Redux/ReduxActions'
import PropTypes from 'prop-types' 

//
export  class NameButton extends React.Component {
 
    static propTypes = {
        name: PropTypes.string.isRequired,
        onNameChange: PropTypes.func.isRequired,
        
    }
    constructor() {
        super()
        
        this.onPress = this.onPress.bind(this)
    }
    onPress(name){
        console.log('----------------------------onPress--------------------')
         this.props.onNameChange(name)
    }
    render() { 
        const name = this.props.name
        return ( 
            <TouchableOpacity style={styles.container} onPress={() => this.onPress(name)}>
                <LinearGradient
                colors={["#49b073", "#008047"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ borderRadius: 45  }}
                >
                    <View style={styles.registerButtonStyle}>
                        <Text style={styles.nameBubble}>{name}</Text> 
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    }

} 

const styles = StyleSheet.create({
    container:{
        padding:7 ,
        flexShrink :0
    },
    registerButtonStyle: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 7,
      paddingTop: 7,
      margin: 3, 
      backgroundColor: '#ffffff',
      borderRadius: 45
  }, 
  nameBubble:{   
      fontSize: 18,
      textAlign: 'left',   
      margin: 5,
  },
})



 
  
  const mapDispatchToProps = { 
    onNameChange: Actions.onNameChange,        
  }
  
  export default connect(null, mapDispatchToProps)(NameButton)