import LOGIN_SOMETHING from "../constants/action-types";


export function loginSomething(payload) {
    return { type: LOGIN_SOMETHING, payload };
};
