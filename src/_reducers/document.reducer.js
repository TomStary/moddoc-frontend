import { documentsConstants } from '../_constants';

const initialState = {
    loaded: false,
    data: {},
};

export function document(state = initialState, action) {
    switch(action.type) {
        case documentsConstants.DOCUMENT_LOADED:
            return {
                ...state,
                loaded: true,
                data: action.document,
            };
        case documentsConstants.DOCUMENT_FAILED:
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