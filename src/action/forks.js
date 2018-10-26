import {
    ACTION_ERROR_FORKS,
    FORKS_LOADING,
    GET_FORKS_SUCCESS,
    GET_STARS_SUCCESS,
} from '../reducers/forks-reducer';
import axios from 'axios';

const BASE_URL = 'https://api.github.com/repos';

function actionError(error) {
    return {
        type: ACTION_ERROR_FORKS,
        payload: error,
    }
}
function loading(data) {
    return {
        type: FORKS_LOADING,
        payload: data
    }
}
function getForksSuccess(data) {
    return {
        type: GET_FORKS_SUCCESS,
        payload: data,
    }
}
function getStarsSuccess(data) {
    return {
        type: GET_STARS_SUCCESS,
        payload: data
    }
}
export function GetForks(params) {
    return async (dispatch) => {
        const arr = [];
        try {
            dispatch(loading(true));
            const data = await axios.get(`${BASE_URL}/${params}/forks`, {
                headers: '',
            });
            for(let i = 0; i < data.data.length; i++)
            {
                let stars = await axios.get(`${BASE_URL}/${data.data[i].full_name}/stargazers`, {
                    headers: '',
                });
                arr.push([stars.data, data.data[i].html_url]);
            }
            dispatch(getForksSuccess(data.data));
            dispatch(getStarsSuccess(arr));
        } catch (error) {
            if (error.response && error.response.data.errors) {
                alert(error.response.data.errors)
                dispatch(actionError(error.response.data.errors));
            }
        } finally {
            dispatch(loading(false));
        }
    };
}