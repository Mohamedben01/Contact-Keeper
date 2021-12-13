import {
    SET_ALERT,
    CLEAR_ALERT,
    REMOVE_ALERT,
} from '../types.js';

export default (state, action) => {

    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload]
        case REMOVE_ALERT:
            return state.filter(action => alert.id !== action.payload);
        default:
            return state
    }
}