
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
export class TestScreen extends React.Component {


    render(){
        return( 
            <View style={styles.container}>
                <Text style={styles.welcome}> 
                    GoodBye {this.props.name}
                </Text>
            </View>
        );
    }

    constructor() {
        super()
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
        fontSize: 20,
        textAlign: 'center'
    }
})




