import {isErrorObject, isWeatherObject, IWeatherObject} from "../components/Interfaces";
import {fetchForecast, fetchWeather} from "../utils/apiOpenWeatherMap";
import {
    ADD_FAVORITE,
    AppThunk,
    DELETE_FAVORITE,
    SET_CURRENT_CITY,
    SET_ERROR,
    SET_FAVORITES,
    UPDATE_FORECAST,
    UPDATE_WEATHER,
    WeatherActionTypes
} from './types'

export function updateWeatherAction(weather: IWeatherObject): WeatherActionTypes {
    return {
        type: UPDATE_WEATHER,
        payload: weather
    }
}

export function updateForecastAction(forecast: IWeatherObject[]): WeatherActionTypes {
    return {
        type: UPDATE_FORECAST,
        payload: forecast
    }
}

export function setErrorAction(error: string): WeatherActionTypes {
    return {
        type: SET_ERROR,
        payload: error
    }
}

export function setCurrentCityAction(name: string): WeatherActionTypes {
    return {
        type: SET_CURRENT_CITY,
        payload: name
    }
}

export const fetchWeatherApi = (city: string): AppThunk => async dispatch => {
    dispatch(setErrorAction(""));
    dispatch(updateWeatherAction(null));
    dispatch(updateForecastAction(null));
    dispatch(setCurrentCityAction(''));
    const asyncRespW = await fetchWeather(city);
    if (isWeatherObject(asyncRespW)) {
        dispatch(updateWeatherAction(asyncRespW));
        dispatch(setCurrentCityAction(city));
        const asyncRespF = await fetchForecast(asyncRespW.coord.lon, asyncRespW.coord.lat) as IWeatherObject[];
        dispatch(updateForecastAction(asyncRespF));
    } else if (isErrorObject(asyncRespW))
        dispatch(setErrorAction(asyncRespW.errorMessage));
}

export function addFavoriteAction(name: string): WeatherActionTypes {
    return {
        type: ADD_FAVORITE,
        payload: name
    }
}

export function deleteFavoriteAction(name: string): WeatherActionTypes {
    return {
        type: DELETE_FAVORITE,
        payload: name
    }
}

export function setFavoritesAction(list: string[]): WeatherActionTypes {
    return {
        type: SET_FAVORITES,
        payload: list
    }
}