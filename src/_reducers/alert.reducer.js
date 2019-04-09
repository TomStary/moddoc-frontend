import {
    alertConstants
} from '../_constants'

const initialState = {
    notificationSource: '',
}

export function alert(state = initialState, action) {
    switch (action.type) {
        case alertConstants.SHOW:
            return {
                ...state,
                notificationSource: action.notificationSource,
            };
        case alertConstants.HIDE:
            return {
                ...state,
                notificationSource: ''
            };
        default:
            return state;
    }
}