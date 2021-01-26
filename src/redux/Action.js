export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";

export function login(user) {
  return {
    type: LOGIN,
    payload: user,
  }
}

export function register(user) {
  return {
    type: REGISTER,
    payload: user,
  }
}
