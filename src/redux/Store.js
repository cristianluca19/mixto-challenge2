import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  LOGIN,
  REGISTER
} from "./Action";

const initialState = {
  users: [{email:"cristianlucatti@gmail.com", password:"Mixto123"}],
  login: false
};

export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const user = state.users.filter(user=> user.email === action.payload.email && user.password === action.payload.password)
      if(user)
      return{
        ...state,
        login: true
      }
    case REGISTER:
      return {
        ...state,
        users: state.users.concat(action.payload)
      };
    default:
      return state;
  }
}



export default createStore(
  counterReducer,
  compose(applyMiddleware(thunk))
);
