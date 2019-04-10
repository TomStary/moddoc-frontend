import {
    alertConstants
} from '../_constants'

const initialState = {
    notification: {
        level: '',
        message: '',
    },
}

export function alert(state = initialState, action) {
    switch (action.type) {
        case alertConstants.SHOW:
            return {
                ...state,
                notification: action.notification,
            };
        case alertConstants.HIDE:
            return {
                ...state,
                notification: initialState.notification
            };
        default:
            return state;
    }
}