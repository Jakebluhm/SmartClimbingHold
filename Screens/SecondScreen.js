
import React from 'react';
import PropTypes from 'prop-types'
import Actions from '../ReduxActions'
import { connect } from 'react-redux'
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
export  class SecondScreen extends React.Component { 

    static propTypes = {
        climbTime: PropTypes.number,
        name: PropTypes.string.isRequired,
        simpleRead: PropTypes.func.isRequired,
    }

 
    onButtonPress(){ 
         //this.numClicks += 1
         console.log("Button pressed") ;
         this.props.simpleRead();
    }

    render()
    {
        console.log(this.props) ;
        const { name, climbTime } = this.props
        return ( 
            <View style={styles.container}>
                <Text style={styles.welcome}> 
                    {name}:{climbTime}  
                </Text>
                <Button color="#618455" title="Start Climb" onPress={this.onButtonPress} /> 
            </View>
        );
    }
    
    //Handlers





    constructor(props) {
        super()
        this.onButtonPress = this.onButtonPress.bind(this)
    }
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f000',
    },
    welcome:{
        margin: 10,
        fontSize: 24,
        textAlign: 'center'
    }
})


const mapStateToProps = state => ({
    climbTime: state.climbTime,
    name: state.name 
  })
  
  const mapDispatchToProps = {
    simpleRead: Actions.simpleRead
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen)








