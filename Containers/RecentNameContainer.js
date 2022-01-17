

import React from 'react';
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
 

  import NameButton from '../Components/NameButton';

  import LinearGradient from 'react-native-linear-gradient';

  import PropTypes from 'prop-types'



export default class RecentNameContainer extends React.Component {
 
    static propTypes = {
        names: PropTypes.array.isRequired, 
    }

    constructor() {
        super()
    }


    render() {   

        var names = this.props.names

        

        var namesJSX = []

        for (let index = 0; index < names.length; index++) {
            namesJSX.push(<NameButton   key={index} name={names[index].name}></NameButton>) 
        }

        if(names.length == 0){ 
            var namesJSX =                 
 
                <View style={styles.registerButtonStyle}>
                    <Text style={styles.nameBubble}>Empty</Text> 
                </View> 
        }


        return ( 
            <ScrollView horizontal={true} style={styles.horizontalContainer}>  
                   {namesJSX}
            </ScrollView>
        );
    }

} 
const styles = StyleSheet.create({
    horizontalContainer:{
        padding: 0,
        flexDirection: 'row',  
        flex: 1, 
        flexWrap:'wrap',
        overflow:'scroll',
        
        
    }, 
    registerButtonStyle: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 12,
      paddingTop: 13,
      margin: 3,  
      borderRadius: 45
  }, 
  nameBubble:{   
      fontSize: 18,
      textAlign: 'left',   
      margin: 5,
  },
})