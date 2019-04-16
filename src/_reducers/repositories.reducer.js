import { repositoriesConstants } from '../_constants';

const initalState = {
    loaded: false,
    data: []
};

export function repositories(state = initalState, action) {
    switch(action.type) {
        case repositoriesConstants.REPOSITORIES_LOADING:
            return {
                ...state,
                loaded: false,
                data: [],
            };
        case repositoriesConstants.REPOSITORIES_LOADED:
            return {
                ...state,
                loaded: true,
                data: action.repositories,
            };
        case repositoriesConstants.REPOSITORIES_FAIL:
            return {
                ...state,
                loaded: true,
                data: [],
            };
        default:
            return state;
    }
};
