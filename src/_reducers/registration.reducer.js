import { userConstants } from '../_constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTRATION_REQUEST:
            return {
                registration: true
            };
        case userConstants.REGISTRATION_SUCCESS:
            return {};
        case userConstants.REGISTRATION_ERROR:
            return {};
        default:
            return state
    }
}