
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

  import database from '@react-native-firebase/database';

export  class SecondScreen extends React.Component { 

    static propTypes = {
        climbTime: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        simpleRead: PropTypes.func.isRequired,
    }

 
    onButtonPress(){ 
         //this.numClicks += 1
        const reference = database().ref('/abc123')
        .once('value')
        .then(snapshot => {
          console.log('User data: ', snapshot.val());
          let json =  snapshot.val()
          console.log(json["2ZNs3BiGSgS5shk808oPeaKH4Ho1"])
          console.log(json["ClimbStartTime"])
          console.log(json["CurrentClimber"]) 
          console.log(json["SuccessfulClimbs"])
        });
 

        let unixTime = Math.floor( Date.now() / 1000 )
        console.log(unixTime) ;

        database()
        .ref('/abc123')
        .update({
            ClimbStartTime: unixTime 
        })
        .then(() => console.log('Data set.'));


        console.log("Button pressed") ;
        console.log("this.props") ;
        console.log(this.props) ;
        this.props.simpleRead();
    }

    render()
    {
        console.log("-----------------render()---------------------") ;
        console.log("this.props") ;
        console.log(this.props) ;
        const { name, climbTime } = this.props
        return ( 
            <View style={styles.container}>
                <Text style={styles.welcome} > 
                    {name}:{climbTime}  
                </Text>
                <Button color="#618455" title="Start Climb"  onPress={this.onButtonPress} /> 
            </View>
        );
    }
    
    //Handlers





    constructor() {
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


// const mapStateToProps = state => ({
//     climbTime: state.climbTime,
//     name: state.name 
//   })
 
  function mapStateToProps(state) {
    console.log("-----------------mapStateToProps()---------------------") ;
    
    console.log("state")
    console.log(state)
    return {
        climbTime: state.zones.climbTime,
        name: state.zones.name 
    };
  }
  
  const mapDispatchToProps = {
    simpleRead: Actions.simpleRead,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen)








