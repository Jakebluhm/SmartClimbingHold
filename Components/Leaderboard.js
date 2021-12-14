import React from 'react';
import { DataTable } from 'react-native-paper';
import { 
    ScrollView, 
    Text, 
    StyleSheet,
    View
    
  } from 'react-native';
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class FadeSpeedSlider extends React.Component {

    static propTypes = {
        leaderboardData: PropTypes.array.isRequired
    }
    render() {
        const data = this.props.leaderboardData 
        const numEntries = (data.length < 20)? data.length : 20
  

        let leaderBoardEntries = []

        if(numEntries > 0){
            for (let index = 0; index < numEntries; index++) {
                var time = convertToMMSS(data[index].time); 


                if(index ===0 && numEntries === 1){
                    leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRowSingle}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }
                else if(index === 0){
                    leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRowTop}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }   
                else if(index === numEntries - 1){
                    leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRowBottom}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }   
                else{
                    leaderBoardEntries.push(<DataTable.Row key={index} style={styles.tableRow}>
                        <DataTable.Cell style={styles.number}><Text style={styles.tableFont}>{index + 1}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.name}><Text style={styles.tableFont}>{data[index].name}</Text></DataTable.Cell>
                        <DataTable.Cell style={styles.time}><Text style={styles.tableFont}>{time}</Text></DataTable.Cell>
                    </DataTable.Row>)
                }                  
                
            }
        }
        else{
            leaderBoardEntries.push(<Text key={0} style={styles.welcome}>Complete a climb to show leaderboard</Text>)
        }
  
        return (
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

            
        );
    } 
}
  
const styles = StyleSheet.create({ 
    table:{ 
        flex:1,
        padding: 10,
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
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 2,
        borderColor: '#000000', 
        padding:1
    },    
    tableRowBottom:{
        flex: 1,
        flexDirection:'row', 
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,   
        borderWidth:2, 
        borderBottomWidth:2,
        borderBottomColor :'#000000', 
        borderColor: '#000000', 
        padding:1
    },
    tableRowSingle:{
        flex: 1,
        flexDirection:'row', 
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,   
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
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