
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
        padding: 10,
        flexDirection: 'row', 
        alignItems:'center',
        alignItems:'flex-start'
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
    }
})