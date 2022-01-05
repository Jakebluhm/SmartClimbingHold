
import React from 'react';

import {  
    StyleSheet,
  } from 'react-native';
 

module.exports = StyleSheet.create({ 

    emptyContainer:{
        flex: 1,  
        backgroundColor: '#95b0ff',
    }, 
    container:{
        flex: 1, 
        padding: 10,
        backgroundColor: '#95b0ff',
    },     
    horizontalContainer:{ 
        flex: 1, 
        padding: 0,
        flexDirection: 'row', 
        alignItems:'center',
        alignItems:'flex-start'
    }, 
    horizontalContainerCentered:{ 
        flex: 1, 
        padding: 0,
        flexDirection: 'row', 
        alignItems:'center', 
    }, 
    verticalContainer:{
        flex: 5, 
        padding: 10,  
        alignItems: 'flex-start',
    }, 
    verticalItem:{  
        flex: 1,
        margin:10,  
    },
    image:{
        resizeMode: "contain",
        height: 68/2,
        width: 184/2,
    },
    InfoContainer:{
        flex: 1, 
        padding: 20, 

        margin: 10,
        fontSize: 24,
        textAlign: 'center',

        borderRadius: 10,
        borderWidth: 4, 
        justifyContent:'flex-start'
    }, 
    tableContainer:{ 
        flex: 1,  
        justifyContent:'center',

    }, 
    leaderboardContainer:{
    
    },
    containerTop:{
        flex: 2, 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent:'flex-start',
        padding: 0, 
    },
    containerMiddle:{
        flex: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 0, 
    },
    containerEnd:{
        flex: 2, 
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 0, 
    },
    welcome:{   
        fontSize: 24,
        textAlign: 'left',   
        flex:5,
        margin: 5, 
    },
    GymSettingsText:{   
        fontSize: 24,
        textAlign: 'left',   
        margin: 5, 
    },
    infoGraphic:{   
        fontSize: 24,
        textAlign: 'center',   
        margin: 5, 
    },
    input: {
        height: 40,
        alignItems: 'flex-start',
        width: 360,
        fontSize: 18,
        margin: 5,
        borderWidth: 2,
        padding: 5,  

    },
    button: {
        alignSelf: 'stretch', 
    },




    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
    },
    focusCell: {
      borderColor: '#000',
    },

})