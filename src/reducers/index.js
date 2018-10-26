import { combineReducers } from 'redux';
import ForksReducer from './forks-reducer';
import FavoritesReducer from './favorites-reducer';

export default combineReducers({
    forks: ForksReducer,
    favorites: FavoritesReducer,
});
