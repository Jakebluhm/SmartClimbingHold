
import {createReducer, createActions} from 'reduxsauce'
import  Immutable  from 'seamless-immutable';
import mapValues from 'lodash/mapValues'
import { LeaderboardFilters } from './Lib/LeaderboardFilters';

const {Types, Creators} = createActions({
    beginClimb: ['name', 'climbTime'],
    updateSuccessfulClimbs: ['climbs'],
    updateFailedClimbs: ['failedClimbs'],
    beginClimbRequest: null,
    firebaseDataRequest: null,
    onNameChange: ['name'],
    onClimbingGymNameChange: ['name'],
    onRouteIdChange: ['id'],
    updateLeaderBoard: ['leaderboard'],
    saveGymSettingsRequest: null,
    setIsLoading: ['loading'],
    routeIdSaved: ['saved'],
    setAuthenticationIsLoading: ['loading'],
    setUserAuthenticated: ['auth'],
    changeAllClimbData: ['data'],
    changeLeaderboardFilter: ['filter'],


})

export const Actions = Types;
export default Creators;


/* ------------------ Initial State -------------------*/
export const INITIAL_STATE = new Immutable({
    recentClimbers:[],
    successfulClimbs: 0,
    failedClimbs: 0,
    activeClimber: false,
    climbingGymName: "",
    routeId: "",
    leaderboardFilter: 0,
    allClimbData: null,
    isLoading: true,
    routeIdSet: false,
    authenticationIsLoading: true,
    userAuthenticated: false,
    leaderboard: [
        {name:"Jake", time:1},
        {name:"climber1", time:12},
        {name:"climber2", time:13},
        {name:"climber3", time:14},
        {name:"climber4", time:15},
    ],
    climbTime: 0,
    name: "Jake"
});

// const refreshData = state => state.merge({
//         name: "Jake Bluhm",
//         climbTime: 0
//     })
    const refreshData = (state, action) => {
         //console.log("-------------------Inside  refreshData -------------------")
        
        //  var Names = state.recentClimbers
        //  Names.push({name: action.name})
        //  if(Names.length > 20){
        //     Names.pop()
        //  }
        var names = (state.recentClimbers.length > 19)?  [{key: state.recentClimbers.length,  name: action.name}, ...state.recentClimbers.filter( (_,i) =>  i !== state.recentClimbers.length-1
        )] : [{key: state.recentClimbers.length,  name: action.name}, ...state.recentClimbers]
      
        
        names = names.filter((thing, index, self) =>
        index === self.findIndex((t) => (
            t.name === thing.name  
        ))
        )

        
        //console.log("names")
        //console.log(names)
        //console.log("names.length")
        //console.log(names.length)
        return  state.merge({
            recentClimbers: names,
            name: action.name,
            climbTime: action.climbTime,
            activeClimber: true })
            
       //return new Immutable({  name: action.name,  climbTime: action.climbTime })
      }
 
      const nameChanged = (state, action) => {
        //console.log("-------------------Inside  nameChanged -------------------")
 
        //console.log(action.name)
        return  state.merge({ name: action.name }) 
     }

     
     const changeLeaderboardFilter = (state, action) => {
        console.log("-------------------Inside  changeLeaderboardFilter -------------------")
 
        console.log(action.filter)
        return  state.merge({ leaderboardFilter: action.filter }) 
     }
     
     const setIsLoading = (state, action) => {
        //console.log("-------------------Inside  setIsLoading -------------------")
 
        //console.log(action.loading)
        return  state.merge({ isLoading: action.loading }) 
     }

     const changeAllClimbData = (state, action) => {
        //console.log("-------------------Inside  changeAllClimbData -------------------")
 

        //console.log(action.data) 
        return  state.merge({ allClimbData: action.data }) 

     }
     
     const setAuthenticationIsLoading = (state, action) => {
        //console.log("-------------------Inside  setAuthenticationIsLoading -------------------")
 
        //console.log('action.loading')
        //console.log(action.loading)
        return  state.merge({ authenticationIsLoading: action.loading }) 
     }

     
     const setUserAuthenticated = (state, action) => {
        //console.log("-------------------Inside  setUserAuthenticated -------------------")
 
        //console.log(action.auth)
        return  state.merge({ userAuthenticated: action.auth }) 
     }
     
     const routeIdSaved = (state, action) => {
        //console.log("-------------------Inside  routeIdSaved -------------------")
 
        //console.log(action.saved)
        return  state.merge({ routeIdSet: action.saved }) 
     }
     
     const onClimbingGymNameChange = (state, action) => {
        //console.log("-------------------Inside  onClimbingGymNameChange -------------------")
 
        //console.log(action.name)
        return  state.merge({ climbingGymName: action.name }) 
     }

     const leaderboardChange = (state, action) => {
        //console.log("-------------------Inside  leaderboardChange -------------------")
        //console.log(action.leaderboard)
        return  state.merge({ leaderboard: action.leaderboard })
      
     }

     
     const onRouteIdChange = (state, action) => {
        //console.log("-------------------Inside  onRouteIdChange -------------------")
        //console.log(action.id)
        return  state.merge({ routeId: action.id })
      
     }

     const updateSuccessfulClimbs = (state, action) => {
        //console.log("-------------------Inside  updateSuccessfulClimbs -------------------")
        //console.log(action.climbs)
        return  state.merge({ successfulClimbs: action.climbs, activeClimber: false }) 
     }

     const updateFailedClimbs = (state, action) => {
        //console.log("-------------------Inside  updateFailedClimbs -------------------")
        //console.log(action.failedClimbs)
        return  state.merge({ failedClimbs: action.failedClimbs })
      
     }


export const reducer = createReducer(INITIAL_STATE, {
    [Types.BEGIN_CLIMB]: refreshData,
    [Types.ON_NAME_CHANGE]: nameChanged,
    [Types.ON_CLIMBING_GYM_NAME_CHANGE]: onClimbingGymNameChange,
    [Types.UPDATE_LEADER_BOARD]: leaderboardChange,
    [Types.UPDATE_SUCCESSFUL_CLIMBS]: updateSuccessfulClimbs,
    [Types.ON_ROUTE_ID_CHANGE]: onRouteIdChange,
    [Types.UPDATE_FAILED_CLIMBS]: updateFailedClimbs,
    [Types.SET_IS_LOADING]: setIsLoading,
    [Types.ROUTE_ID_SAVED]: routeIdSaved,
    [Types.SET_AUTHENTICATION_IS_LOADING]: setAuthenticationIsLoading,
    [Types.SET_USER_AUTHENTICATED]: setUserAuthenticated,
    [Types.CHANGE_ALL_CLIMB_DATA]:changeAllClimbData,
    [Types.CHANGE_LEADERBOARD_FILTER]:changeLeaderboardFilter,
    
})


