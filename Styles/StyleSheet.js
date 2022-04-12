
import React from 'react';

import {  
    StyleSheet,
  } from 'react-native';
 

  var climberContentHorizPadding = 20;
  var elev = 5;
module.exports = StyleSheet.create({ 

    container:{
        flex: 1,   
        flexDirection: 'row', 
        padding: 30,
        backgroundColor: '#f0f0f0',
    },     
    verticalContainer:{
        flex: 1,    
        padding: 0,
        backgroundColor: '#f0f0f0',
    },  
    containerLB:{
        //width:600,
        paddingHorizontal:25,
        flex: 1,      
        flexDirection: "column", 
        paddingRight:0,  
        alignItems:'center' 
    },  
    verticalHalfLeft:{
        flex: 1,    
        // borderWidth: 1, 
        // borderColor: '#ff0000',
    },  
    verticalHalfRight:{
        flex: 1,   
 
        paddingLeft: 50,
        justifyContent:'center',
        
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },
    passcodeText:{
        fontSize: 48,   
        color:'#000000',
        marginTop:15,
 

    },
    settingsHeading:{   
        fontSize: 26,
        textAlign: 'left',     
        paddingBottom:15,

        
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    }, 
    settingsLeftContainer:{
        flex:1,
        paddingLeft:15,
        paddingRight:15,
    },
    horizontalContainerFlexEnd:{ 
        flexDirection:'row',
        justifyContent:'flex-end', 
        paddingBottom:65,
        
        paddingRight:60,
 

    },
    settingsEntryContainer:{
        
        justifyContent:'space-between',
        paddingRight:60,

        // borderWidth: 1, 
        // borderColor: '#0000ff',
    },
    horizontalContainerFlexBetween:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        
        paddingRight:60, 
        paddingBottom:15,

        paddingTop:15,
        // borderWidth: 1, 
        // borderColor: '#0000ff',

    },
    horizontalContainerFlexBetween1:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        
        paddingRight:30, 
        paddingBottom:15,

        paddingTop:15,
        // borderWidth: 1, 
        // borderColor: '#0000ff',

    },
    settingsInput: {
        height: 45,//40,  
        fontSize: 18, 
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor:'#ffffff',
        paddingLeft: 10,   
        paddingTop:10,
        elevation:5,
        
        borderWidth: 1, 
        borderColor: '#000000',

    },




    emailSection: {
        height: 45,//40,  
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.56)',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius:15,
    },
    
    passwordSection: {
        
        height: 45,//40,  
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.56)',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius:15,
    },
    searchIcon: {
        padding: 8,
        paddingRight:20
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
//        backgroundColor: '#fff',
        color: '#424242',
    },





    loginInput: {
        flex: 1,
        height: 45,//40,  
        fontSize: 18, 
        borderWidth: 1,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
         //backgroundColor:'rgba(0, 0, 0, 0.26)',
        paddingLeft: 10,   
        paddingTop:10,
        color:'#ffffff',
        
        //elevation:5,
         
         borderColor: '#FFFFFF',

    },

    settingsBody:{    
        fontSize: 18,
        textAlign: 'left', 
        width:350,
        color:'#949494',   
        paddingBottom:15,
        
        
        // borderWidth: 1,  
        // borderColor: '#00ff00', 
    },
    settingsSaveButton: { 
        flex:1,   
        width:188,
        height:89,
        borderRadius:15,

        // borderWidth: 1,  
        // borderColor: '#00ff00', 
    },
    
    heading:{   
        fontSize: 26,
        textAlign: 'left',    
        paddingLeft:10,

        
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },   
    headingFixedWidth:{   
        fontSize: 26,
        textAlign: 'left',    
        paddingLeft:10,
 
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },
    headingWithOffset:{   
        fontSize: 26,
        textAlign: 'left',  
 
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },
    time:{   
        fontSize: 26, 
        textAlign: 'left',  
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },  
    heading1:{   
        fontSize: 19,
        textAlign: 'left',   
        paddingLeft:10, 
        
    },
    body:{    
        fontSize: 18,
        textAlign: 'left',  
        
        // borderWidth: 1,  
        // borderColor: '#00ff00', 
    },


    // ------------------------------ Icons ------------------------------
    iconContainer:{  
        borderRadius:15, 
        elevation:5,  
    },   
     metalContainer:{  
        borderRadius:55, 
        elevation:8,  
        
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },

    stopWatchIcon:{ 
        height: 61/2,
        width: 52/2,     



        //   borderWidth: 1,  
        //   borderColor: '#00ff00',
    },  
    metalIcon:{ 
        height: 59/1.5,
        width: 52/1.5,    



        //   borderWidth: 1,  
        //   borderColor: '#00ff00',
    },  
    checkIcon:{ 
        height: 60/2,
        width: 60/2,   
        marginBottom:1,  

        //   borderWidth: 1,  
        //   borderColor: '#00ff00',
    }, 
    
    nameIcon:{ 
        height: 49/2,
        width: 53/2,   
        marginTop:0,  
        //   borderWidth: 1,  
        //   borderColor: '#00ff00',
    },  
    climbButtonImage:{ 
        height: 89/2,
        width: 188/2,     
        marginTop:-3,
        marginRight:0, 
        //  borderWidth: 1, 
        //  borderColor: '#ff0000',
    },
    saveButton:{ 
        height: 89/2,
        width: 188/2,     
        marginTop:-3,
        marginRight:0, 
        //  borderWidth: 1, 
        //  borderColor: '#ff0000',
    },
    ResetRouteButton:{ 
        height: 89/2,
        width: 255/2,     
        marginTop:-3,
        marginRight:0, 
        //  borderWidth: 1, 
        //  borderColor: '#ff0000',
    },
    ResetPasscodeButton:{ 
        height: 89/2,
        width: 320/2,     
        marginTop:-5,
        marginRight:0, 
        //  borderWidth: 1, 
        //  borderColor: '#ff0000',
    },
    SignoutButton:{ 
        height: 89/2,
        width: 188/2,     
        marginTop:-3,
        marginRight:0, 
        //  borderWidth: 1, 
        //  borderColor: '#ff0000',
    },
    settingsLogo:{ 
        height: 188,
        width: 250,     
        //  borderWidth: 1,  
        //  borderColor: '#ff0000',
    },
    bgcontainer: {
        flex: 1,
        // remove width and height to override fixed static size
        width: 2500/1.9,
        height: 1800/2,
        marginTop:-80,
      },
    //----------------------Name entry and Select from recents ----------------------------
    nameContainer:{
        flex: 1,   
        
        paddingBottom: 15,

    },
    nameBox:{
        flex: 1,    
        borderRadius: 15,
        backgroundColor: '#949494',
        elevation:elev,
         
    },
    nameBoxTitle:{
        flex: 2,
        flexDirection: 'row',   
        alignContent: "flex-start",
        alignItems:'center',
        paddingLeft:climberContentHorizPadding,
        //borderWidth: 1, 
        //borderColor: '#ff0000',

    },  

    nameEntry:{
        flex: 2,
        flexDirection: 'row',   
        alignContent: "flex-start",
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:climberContentHorizPadding,
        paddingRight:climberContentHorizPadding,
        //borderWidth: 1, 
        //borderColor: '#ff0000',
        
    },
    nameInput: {
        height: 45,//40, 
        width: 400, 
        fontSize: 18, 
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor:'#ffffff',
        paddingLeft: 10,   
        paddingTop:10,
        elevation:5,
        
        borderWidth: 1, 
        borderColor: '#000000',

    },

    nameBoxRecents:{
        flex: 3.5,
        flexDirection: 'column',   
        alignContent: "flex-start",
        alignItems:'flex-start',
        paddingLeft:climberContentHorizPadding,
        paddingRight:climberContentHorizPadding,
        paddingBottom:15,
        //borderWidth: 1, 
        //borderColor: '#ff0000',
        
    },
    recentNameContainer:{
        flex:1,
        flexDirection: 'row',   
        alignContent: "center",
        alignItems:'center', 
        //backgroundColor: '#ff0000',
        borderRadius: 15, 
        elevation:elev,
    }, 
    recentNameBackgound:{
        flex:1, 
    }, 
    //---------------------- Climber Highlights ----------------------------
    climberHighlightsContainer:{
        flex: 1,   
        //borderWidth: 1,  
        paddingBottom: 15,
        paddingTop: 15,
        //borderColor: '#0000ff',
    },
    climberHighlightsBox:{
        flex: 1,    
        borderRadius: 20,
        backgroundColor: '#949494',
        elevation:elev,

         
        
        // borderWidth: 1, 
        // borderColor: '#ff0000',
    },
    climberHighlightsTitle:{
        flex: 0.5,   
        flexDirection: 'row', 
        alignItems:'center', 
        justifyContent:'flex-start',
        paddingLeft:climberContentHorizPadding,

        
         borderWidth: 1, 
         borderColor: '#ff0000',
    },
    climberHighlightContent:{
        flex: 5,   
        //flexDirection: 'row', 
        //alignItems:'center', 
        //justifyContent:'space-between',
        paddingLeft:0,
        paddingRight:0,


         borderWidth: 1, 
         borderColor: '#ff0000',
    },
    climberHighlightContainer:{
        //flex:3,
        width:170, 
        alignItems:'center',  
        padding:10, 
        paddingBottom:20,
        height: 155,
        

        // borderWidth: 3, 
        // borderColor: '#ffff00',
    },
    climberHighlight:{ 
        flex:1,
        flexDirection:'column',
        alignSelf: "stretch",
        borderRadius: 15,
         
    },
    medal:{ 
        flex:1,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingLeft:5,
        paddingTop: 4,

        
        // borderWidth: 2, 
        // borderColor: '#0000ff',
    },
    timeContent:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:30,


        // borderWidth: 2, 
        // borderColor: '#0000ff',

    },


    climberHighlightGradient:{
        flex:1,
        flexDirection: 'row',   
        alignContent: "center",
        alignItems:'center', 
        //backgroundColor: '#ff0000',
        borderRadius: 10, 
        elevation:5,
    }, 

    //---------------------- Route Statistics ----------------------------
    routeStatsContainer:{
        flex: 1,   
        //borderWidth: 1,  
        flexDirection: 'row', 
        borderColor: '#00ffff',
    },
    routeStat:{
        flex: 1,    
        //borderWidth: 1,  
        borderColor: '#000000',
        backgroundColor: '#949494',
        borderRadius: 20,

        elevation:elev,
         
    },
    routeStatsContainerLeft:{
        flex: 1,   
        //borderWidth: 1,  
        borderColor: '#000000',  
        paddingRight: 20, 
    },
    routeStatsContainerRight:{
        flex: 1,   
        //borderWidth: 1,  
        borderColor: '#000000',  
        paddingLeft: 20,


    },

    routeStatTitle:{
        flex: 2,
        flexDirection: 'row',   
        alignContent: "flex-start",
        alignItems:'center',
        paddingLeft:10,
 
    },
    routeStatContent:{
        flex: 4,
        flexDirection: 'column',   
        alignContent: "flex-start",
        alignItems:'flex-start',
        paddingLeft:10,
        paddingTop:15,
         
    },    
    routeStatContent1:{
        flex: 5.5,
        flexDirection: 'column',   
        alignContent: "center",
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:15,

        
        
        //  borderWidth: 1, 
        //  borderColor: '#ff0000',
         
    }, 
       
    routeStatDescription:{
        flex: 1,
        flexDirection: 'column',   
        alignContent: "flex-start",
        alignItems:'flex-start',
        paddingLeft:10,
         
    },

    successfulClimbsFont:{   
        fontSize: 36,
        textAlign: 'left',  
          
        // borderWidth: 1,  
        // borderColor: '#00ff00',
    },   












    emptyContainer:{
        flex: 1,  
        backgroundColor: '#f0f0f0',
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
        justifyContent:'center'
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
    leaderboardFilterImage:{
        resizeMode: "contain",
        height: 66/2,
        width: 182/2,
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
        flex: 0.1,  
        
        
        borderWidth: 1,  
        borderColor: '#00ff00',

    }, 
    leaderboardContainer:{
    
    },
    gymSettingsContainer:{ 
        flex: 1, 
        padding: 10,  
        alignItems: 'flex-start',
        flexDirection: "column"
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
        //width: 360,
        alignSelf: 'stretch', 
        fontSize: 18,
        margin: 5,
        borderWidth: 2,
        paddingRight: 15,  

    },   

    button: { 
        flex:1,  
        paddingHorizontal: 32,
    },

    buttonContainer: {
        flex:1, 
        //padding: 5,   
        //margin: 5,
        alignSelf: 'stretch',  
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'flex-start',
        flexDirection: "row" 
        //borderWidth:  3,  
        //borderLeftColor:  'red'
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