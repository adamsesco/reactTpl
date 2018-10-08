import {
    FETCH_DATA_SEARCH,
    FETCH_PROGRESS
} from '../actions/types';

const INITIAL_STATE = { loading: false, data: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PROGRESS:
            return { ...INITIAL_STATE, loading: true};
        case FETCH_DATA_SEARCH:
            return { ...INITIAL_STATE, loading: false, data: action.payload.data};
        default: return state;
    }
};