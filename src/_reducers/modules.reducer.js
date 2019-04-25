import { modulesConstants } from '../_constants';

const initialState = {
    loaded: false,
    data: []
}

export function modules(state = initialState, action) {
    switch(action.type) {
        case modulesConstants.MODULES_LOADING:
            return {
                ...state,
                loaded: false,
                data: [],
            };
        case modulesConstants.MODULES_LOADED:
            return {
                ...state,
                loaded: true,
                data: action.modules,
            };
        case modulesConstants.MODULES_FAILED:
            return {
                ...state,
                loaded: true,
                data: [],
                error: action.error,
            };
        default:
            return state;
    }
}
