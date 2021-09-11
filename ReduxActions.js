
import {createReducer, createActions} from 'reduxsauce'
import  Immutable  from 'seamless-immutable';


const {Types, Creators} = createActions({
    simpleRead: null,
})

export const Actions = Types;
export default Creators;


/* ------------------ Initial State -------------------*/
export const INITIAL_STATE = new Immutable({
    climbTime: 0,
    name: "Jake"
});

// const refreshData = state => state.merge({
//         name: "Jake Bluhm",
//         climbTime: 0
//     })
    const refreshData = (state) => {
         console.log("-------------------INside  refreshData -------------------")
         console.log("state")
         console.log(state)
         var n = state.name  
         var num = state.climbTime + 1

       // return  state.merge({ name: n,  climbTime: num})
       return new Immutable({  name: n,  climbTime: num })
      }




export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIMPLE_READ]: refreshData
})


