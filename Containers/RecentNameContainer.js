

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


        return ( 
            <View style={styles.horizontalContainer}>  
                   {namesJSX}
            </View>
        );
    }

} 
const styles = StyleSheet.create({
    horizontalContainer:{
        padding: 0,
        flexDirection: 'row',  
        flex: 8, 
        flexWrap:'wrap'
        ,height:120
        ,overflow:'hidden'
    },  
})