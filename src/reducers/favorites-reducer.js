export const ADD_FAVORITE_SUCCESS = 'ADD_FAVORITE_SUCCESS';
export const ACTION_ERROR_FAVORITES = 'ACTION_ERROR_FAVORITES';


const initStore = {
    data: [],
    error: "",
}
const FavoritesReducer = (store = initStore, action) => {
    switch (action.type) {
        case ACTION_ERROR_FAVORITES:
            return { ...store, error: action.payload };
        case ADD_FAVORITE_SUCCESS:
            return { ...store, data: [action.payload, ...store.data], };
        default:
            return store;
    }
}
export default FavoritesReducer;