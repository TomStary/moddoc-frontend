import { documentsConstants } from '../_constants';

const initialState = {
    loaded: false,
    data: [],
}

export function documents(state = initialState, action) {
    switch(action.type) {
        case documentsConstants.DOCUMENTS_LOADING:
            return {
                ...state,
                loaded: false,
                data: [],
            };
        case documentsConstants.DOCUMENTS_LOADED:
            return {
                ...state,
                loaded: true,
                data: action.documents,
            };
        case documentsConstants.DOCUMENTS_FAILED:
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
