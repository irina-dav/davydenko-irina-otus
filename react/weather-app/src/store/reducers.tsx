import * as types from './types'

const initialState: types.IWeatherStore = {
    currentWeather: null,
    error: null,
    currentCity: '',
    favorites: [],
    forecast: []
}

export function weatherReducer(
    state = initialState,
    action: types.WeatherActionTypes
): types.IWeatherStore {
    switch (action.type) {
        case types.UPDATE_WEATHER:
            return {
                ...state,
                currentWeather: action.payload,
            }
        case types.UPDATE_FORECAST:
            return {
                ...state,
                forecast: action.payload,
            }
        case types.SET_ERROR:
            return {
                ...state,
                error: {errorMessage: action.payload},
            }
        case types.SET_CURRENT_CITY:
            return {
                ...state,
                currentCity: action.payload,
            }
        case types.SET_FAVORITES:
            return {
                ...state,
                favorites: [...action.payload]
            }
        case types.ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case types.DELETE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(
                    f => f !== action.payload
                )
            }
        default:
            return {...state}
    }
}