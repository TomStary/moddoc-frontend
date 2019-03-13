import { LOGIN_SOMETHING } from "../constants/action-types"

const initialState = {
    login: {}
};

function rootReducer(state = initialState, action) {
    if (action.type == LOGIN_SOMETHING) {
        state.login = action.payload;
    }
    return state;
};

export default rootReducer;