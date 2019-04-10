import { userConstants } from '../_constants';

const initialState = {
    registered: false,
    user: {}
}

export function registration(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTRATION_SUCCESS:
            return {
                ...state,
                registered: true,
                user: action.user
            };
        case userConstants.REGISTRATION_ERROR:
            return {
                ...state,
                registered: false,
                user: {}
            };
        default:
            return state
    }
}