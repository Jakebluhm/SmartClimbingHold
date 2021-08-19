
import React from 'react';
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
export class SecondScreen extends React.Component {
    addedText;
    onButtonPress() { 
         console.log("Button pressed")
    }

    render(){
        return( 
            <View style={styles.container}>
                <Text style={styles.welcome}> 
                    Hello {this.props.name} {this.addedText}
                </Text>
                <Button color="#618455" title="Start Climb" onPress={this.onButtonPress} /> 
            </View>
        );
    }
    
    //Handlers





    constructor() {
        super()
        this.addedText = 0;
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




