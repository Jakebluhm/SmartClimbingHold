import React from 'react';
import { DataTable } from 'react-native-paper';
import { connect } from 'react-redux'
import Actions from '../Redux/ReduxActions'
import { LeaderboardFilters } from '../Lib/LeaderboardFilters';
import { 
    ScrollView, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image,
    View
    
  } from 'react-native';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { forEach } from 'lodash';

const s = require('../Styles/StyleSheet'); 


export  class Leaderboard extends React.Component {

    static propTypes = {

        leaderboardData: PropTypes.array.isRequired,
        leaderboardFilter: PropTypes.number.isRequired,
        allClimbData: PropTypes.object,
        changeLeaderboardFilter: PropTypes.func.isRequired,
    }

    leaderboardYearButton(){
        //console.log("leaderboardYearButton pressed") ;
        this.props.changeLeaderboardFilter(LeaderboardFilters.YEAR)
    }
    leaderboardDayButton(){
        //console.log("leaderboardDayButton pressed") ;
        this.props.changeLeaderboardFilter(LeaderboardFilters.DAY)
    }
    leaderboardMonthButton(){
        //console.log("leaderboardMonthButton pressed") ;
        this.props.changeLeaderboardFilter(LeaderboardFilters.MONTH)
    }
    leaderboardAllTimeButton(){
        //console.log("leaderboardAllTimeButton pressed") ;
        this.props.changeLeaderboardFilter(LeaderboardFilters.ALLTIME)
    }
    constructor(){
        super()
        
        this.leaderboardYearButton = this.leaderboardYearButton.bind(this) 
        this.leaderboardDayButton = this.leaderboardDayButton.bind(this) 
        this.leaderboardMonthButton = this.leaderboardMonthButton.bind(this) 
        this.leaderboardAllTimeButton = this.leaderboardAllTimeButton.bind(this)  
    }

    render() {
        console.log('-------------------------Leaderboard.js render()----------------------------------')
        const data = this.props.leaderboardData 
        const {allClimbData, leaderboardFilter} = this.props
        const numEntries = (data.length < 20)? data.length : 20
  
        // console.log('allClimbData')
        // console.log(allClimbData)

        //Throw all climbs into array with name, climbTime, dateTime
        var climberDateTimes = []
        for (const name in allClimbData){
            // console.log('---name');
            // console.log(name);
            // console.log(allClimbData[name])
            for(const climbTime in allClimbData[name] ){ 
                // console.log('climbTime')
                // console.log(climbTime)
                // console.log('allClimbData[name][climbTime]')
                // console.log(allClimbData[name][climbTime])

                var date = new Date(climbTime * 1000);
                climberDateTimes.push({name:name, climbTime:allClimbData[name][climbTime], dateTime:date}) 
            }

        }

        //console.log('climberDateTimes')
        //console.log(climberDateTimes)
        

        // Sort climbs chronologically                                                      CHANGE TO FILTERD BY RANGE SELECTOR YEAR DAY MONTH ALL TIME
        var selectedDateRange =  new Date(Date.now())
        // console.log(selectedDateRange)
        selectedDateRange.setDate(selectedDateRange.getDate() - leaderboardFilter)
        // console.log(selectedDateRange)
        // console.log('leaderboardFilter')
        // console.log(leaderboardFilter)
 
        var filteredClimberDateTimes
        if(leaderboardFilter > 0){
            filteredClimberDateTimes = climberDateTimes.filter( climb => climb.dateTime > selectedDateRange)
        }
        else{
            filteredClimberDateTimes = climberDateTimes
        }




        var LeaderboardFilterButtons = null
        if(leaderboardFilter == LeaderboardFilters.ALLTIME){
            LeaderboardFilterButtons = 
            <View style={s.horizontalContainerCentered}>
                <TouchableOpacity  onPress={() => this.leaderboardAllTimeButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/AllTimeButtonDark.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardYearButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/YearButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardMonthButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/MonthButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardDayButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/DayButton.png')} />
                </TouchableOpacity >
            </View>
        }
        else if(leaderboardFilter == LeaderboardFilters.YEAR){
            LeaderboardFilterButtons =
            <View style={s.horizontalContainerCentered}>
                <TouchableOpacity  onPress={() => this.leaderboardAllTimeButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/AllTimeButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardYearButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/YearButtonDark.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardMonthButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/MonthButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardDayButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/DayButton.png')} />
                </TouchableOpacity >
            </View>
            
        }
        else if(leaderboardFilter == LeaderboardFilters.MONTH){
            LeaderboardFilterButtons =
             <View style={s.horizontalContainerCentered}>
                <TouchableOpacity  onPress={() => this.leaderboardAllTimeButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/AllTimeButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardYearButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/YearButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardMonthButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/MonthButtonDark.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardDayButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/DayButton.png')} />
                </TouchableOpacity >
            </View>
        }
        else if(leaderboardFilter == LeaderboardFilters.DAY){
            LeaderboardFilterButtons =
            <View style={s.horizontalContainerCentered}>
                <TouchableOpacity  onPress={() => this.leaderboardAllTimeButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/AllTimeButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardYearButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/YearButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardMonthButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/MonthButton.png')} />
                </TouchableOpacity >
                <TouchableOpacity  onPress={() => this.leaderboardDayButton()}>
                    <Image style={s.image} source={require('../Assets/LeaderboardButton/DayButtonDark.png')} />
                </TouchableOpacity >
            </View>
        }




          
        // console.log('filteredClimberDateTimes')
        // console.log(filteredClimberDateTimes)

        var climbData = []
        filteredClimberDateTimes.map(climbInfo => {
            climbData.push({name:climbInfo.name, time:climbInfo.climbTime})
        })

        
        climbData = climbData.sort(compare)

        // console.log('climbData')
        // console.log(climbData)

        let leaderBoardEntries = []


        if(climbData.length > 0){
            var leaderboardPosition = 0
            console.log('climbData')
            console.log(climbData)
            for (const climb in climbData) {
                var time = convertToMMSS(climbData[climb].time); 
                console.log('climbData[climb]')
                console.log(climbData[climb])


                if(leaderboardPosition ===0 && climbData.length  === 1){
                    leaderBoardEntries.push(<DataTable.Row key={leaderboardPosition} style={styles.tableRowSingle}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{leaderboardPosition + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{climbData[climb].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }
                else if(leaderboardPosition === 0){
                    leaderBoardEntries.push(<DataTable.Row key={leaderboardPosition} style={styles.tableRowTop}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{leaderboardPosition + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{climbData[climb].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }   
                else if(leaderboardPosition === climbData.length - 1){
                    leaderBoardEntries.push(<DataTable.Row key={leaderboardPosition} style={styles.tableRowBottom}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{leaderboardPosition + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{climbData[climb].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }   
                else{
                    leaderBoardEntries.push(<DataTable.Row key={leaderboardPosition} style={styles.tableRow}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{leaderboardPosition + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{climbData[climb].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }                  
                leaderboardPosition = leaderboardPosition + 1
            }
        }
        else{
            leaderBoardEntries.push(<Text key={0} style={styles.welcome}>Complete a climb to show leaderboard</Text>)
        }


        // if(numEntries > 0){
        //     for (let index = 0; index < numEntries; index++) {
        //         var time = convertToMMSS(data[index].time); 


        //         if(index ===0 && numEntries === 1){
        //             leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRowSingle}>
        //                 <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
        //             </DataTable.Row>)
        //         }
        //         else if(index === 0){
        //             leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRowTop}>
        //                 <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
        //             </DataTable.Row>)
        //         }   
        //         else if(index === numEntries - 1){
        //             leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRowBottom}>
        //                 <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
        //             </DataTable.Row>)
        //         }   
        //         else{
        //             leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRow}>
        //                 <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
        //                 <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
        //             </DataTable.Row>)
        //         }                  
                
        //     }
        // }
        // else{
        //     leaderBoardEntries.push(<Text key={0} style={styles.welcome}>Complete a climb to show leaderboard</Text>)
        // }
  
        return (
            
            <View style={[s.containerLB]}>
                <View style={{flex:1, alignItems:'center'  }}>
                    
                        {LeaderboardFilterButtons} 
                </View>
                <DataTable style={styles.table}>
            
                    <DataTable.Header >
                        <DataTable.Title style={styles.number}>
                            <View style={{flex:1, flexDirection:'row', }}> 
                                <View style={{flex:1,  paddingTop:1}}>
                                    <Icon name="leaderboard" style={{flex:1, paddingBottom:2}} size={20} color="#000" />
                                </View>
                                <Text style={styles.tableHeaderFont}>Leaders</Text>
                            </View>
                            </DataTable.Title>
                        <DataTable.Title style={styles.name}> 
                            <View style={{flex:1, flexDirection:'row', }}> 
                                <Text style={styles.tableHeaderFont}>Name</Text>
                            </View> 
                        </DataTable.Title>
                        <DataTable.Title style={styles.time}>
                            <View style={{flex:1, flexDirection:'row', }}> 
                                <Text style={styles.tableHeaderFont}>Time</Text>
                            </View>
                        </DataTable.Title>
                    </DataTable.Header>
            
                    <ScrollView> 
                        {leaderBoardEntries}  
                    </ScrollView>
            
    
                </DataTable>
            </View>

            
        );
    } 
}
  
function compare( a, b ) {
    if ( a.time < b.time ){
      return -1;
    }
    if ( a.time > b.time ){
      return 1;
    }
    return 0;
  }


function mapStateToProps(state) {
    //console.log("-----------------mapStateToProps()---------------------") ;
    
    //console.log("state")
    //console.log(state)
    return {
        allClimbData: state.route.allClimbData, 
        leaderboardFilter: state.route.leaderboardFilter,
    };
  }
  
  const mapDispatchToProps = { 
    changeLeaderboardFilter: Actions.changeLeaderboardFilter,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)








const styles = StyleSheet.create({ 
    table:{ 
        flex:18,
        padding: 0, 
        
    },
    tableFont:{ 
        margin: 0,
        fontSize: 20,
        textAlign: 'center', 
    }, 
    tableHeaderFont:{ 
        flex:1,
        paddingBottom: 5,
        fontSize: 18,
        textAlign: 'left', 
    }, 
    tableRow:{
        flex: 1,
        flexDirection:'row',
        alignContent:'flex-start',   
        borderWidth: 2,
        borderColor: '#000000', 
        padding:1
    },    
    tableRowTop:{
        flex: 1,
        flexDirection:'row',
        alignContent:'flex-start',     
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderWidth: 2,
        borderColor: '#000000', 
        padding:1
    },    
    tableRowBottom:{
        flex: 1,
        flexDirection:'row', 
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,   
        borderWidth:2, 
        borderBottomWidth:2,
        borderBottomColor :'#000000', 
        borderColor: '#000000', 
        padding:1
    },
    tableRowSingle:{
        flex: 1,
        flexDirection:'row', 
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,   
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderWidth:2, 
        borderBottomWidth:2,
        borderBottomColor :'#000000', 
        borderColor: '#000000', 
        padding:1
    },
    number:{
        flex: 2,
        paddingRight: 0,   
        justifyContent:'center', 
        
    },
    name:{
        flex: 4,
        padding: 15,  
    },
    time:{
        flex: 2,
        padding: 15,  
    },
    welcome:{   
        fontSize: 24,
        textAlign: 'center',   
        margin: 35,
    },
})


function convertToMMSS(seconds) {
    var time;
    if(seconds%60 > 9){
        time = Math.floor(seconds/60) + ":" + (seconds%60)
    }
    else{
        time = Math.floor(seconds/60) + ":0" + (seconds%60)
    }
    return time;
}