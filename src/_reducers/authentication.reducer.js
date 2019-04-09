import {
    userConstants
} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
    loggedIn: true,
    user
} : {
    loggedIn: false,
    user: {}
};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggedIn: false,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggedIn: false,
                user: {}
            };
        case userConstants.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                error: action.error
            };
        default:
            return state
    }
}