export const GET_FORKS_SUCCESS = 'GET_FORKS_SUCCESS';
export const FORKS_LOADING = 'FORKS_LOADING';
export const ACTION_ERROR_FORKS = 'ACTION_ERROR_FORKS';
export const GET_STARS_SUCCESS = 'GET_STARS_SUCCESS';

const initStore = {
    loading: false,
    forksData: [],
    starsData: [],
    error: "",
    count: 0,
}
const ForksReducer = (store = initStore, action) => {
    switch (action.type) {
        case FORKS_LOADING:
            return { ...store, loading: action.payload };
        case GET_FORKS_SUCCESS:
            return { ...store, forksData: action.payload };
        case GET_STARS_SUCCESS:
            return { ...store, starsData: action.payload };
        case ACTION_ERROR_FORKS:
            return { ...store, error: action.payload };
        default:
            return store;
    }
}
export default ForksReducer;