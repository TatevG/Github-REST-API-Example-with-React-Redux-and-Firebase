import {
    ACTION_ERROR_FAVORITES,
    ADD_FAVORITE_SUCCESS,
} from '../reducers/favorites-reducer';


function actionError(error) {
    return {
        type: ACTION_ERROR_FAVORITES,
        payload: error,
    }
}
function addFavoriteSuccess(data) {
    return {
        type: ADD_FAVORITE_SUCCESS,
        payload: data,
    }
}

var ref = firebase.app().database().ref();
var favoritesRef = ref.child('favorites');
export function AddFavorite(favoriteUrl) {
    return async (dispatch) => {
        try {
            const data = await new Promise((resolve, reject) => { favoritesRef.push(favoriteUrl).then(resolve, reject)});
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        }
    };
}
favoritesRef.on("child_added", async function(snapshot) {
    const data = await new Promise((resolve, reject) => {
        firebase.database().ref('/favorites/' + snapshot.key).once('value').then(function(snapshot) {
            resolve(snapshot.val());
        });
    })
    window.store.dispatch(addFavoriteSuccess([data, snapshot.key]));
});

