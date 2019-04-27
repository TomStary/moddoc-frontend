import { modulesConstants } from '../_constants';

const initialState = {
    loaded: false,
    data: {},
};

export function module(state = initialState, action) {
    switch(action.type) {
        case modulesConstants.MODULE_LOADED:
            return {
                ...state,
                loaded: true,
                data: action.module,
            };
        case modulesConstants.MODULE_FAILED:
            return {
                ...state,
                loaded: true,
                data: {},
                error: action.error,
            };
        default:
            return state;
    }
}