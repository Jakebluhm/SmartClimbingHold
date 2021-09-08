
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
})

// const refreshData = state => state.merge({
//         name: "Jake Bluhm",
//         climbTime: 0
//     })
    const refreshData = (state) => {
         console.log("INside")
        return state.merge({ name: "Jake Bluhm", 
                            climbTime: 25})
      }




export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIMPLE_READ]: refreshData
})


