import { userConstants } from '../_constants';

const initalState = {
    loaded: false,
    user: {},
}

export function profile(state=initalState, action) {
    switch(action.type) {
        case userConstants.PROFILE_LOADING:
            return {
                ...state,
                loaded: false,
                user: action.user
            };
        case userConstants.PROFILE_LOADED:
            return {
                ...state,
                loaded: true,
                user: action.user
            };
        case userConstants.PROFILE_UPDATED:
            return {
                ...state,
                loaded: true,
                user: action.user,
            }
        case userConstants.PROFILE_ERROR:
            return {
                ...state,
                loaded: true,
                user: {},
            }
        default:
            return state;
    }
}