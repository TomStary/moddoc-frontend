import { repositoriesConstants } from '../_constants';

const initialState = {
    loaded: false,
    data: {}
};

export function repository(state = initialState, action) {
    switch(action.type) {
        case repositoriesConstants.REPOSITORY_CREATE:
            return {
                ...state,
                loaded: false,
                data: {},
            };
        case repositoriesConstants.REPOSITORY_LOADING:
            return {
                ...state,
                loaded: false,
                data: {},
            }
        case repositoriesConstants.REPOSITORY_LOADED:
            return {
                ...state,
                loaded: true,
                data: action.repository,
            }
        case repositoriesConstants.REPOSITORY_FAILED:
            return {
                ...state,
                loaded: true,
                data: {},
                error: action.error,
            }
        default:
            return state;
    }
}
