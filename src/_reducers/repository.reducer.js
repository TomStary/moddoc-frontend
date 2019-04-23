import { repositoriesConstants } from '../_constants';

const initialState = {
    data: {}
};

export function repository(state = initialState, action) {
    switch(action.type) {
        case repositoriesConstants.REPOSITORY_CREATE:
            return {
                ...state,
                data: {},
            };
        default:
            return state;
    }
}
