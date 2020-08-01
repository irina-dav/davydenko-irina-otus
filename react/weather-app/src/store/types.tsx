import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {IError, IWeatherObject} from "../components/Interfaces";

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const SET_FAVORITES = 'SET_FAVORITES'
export const SET_CURRENT_CITY = 'SET_CURRENT_CITY'
export const UPDATE_WEATHER = 'UPDATE_WEATHER'
export const UPDATE_FORECAST = 'UPDATE_FORECAST'
export const SET_ERROR = 'SET_ERROR'

export interface IWeatherStore {
    currentWeather: IWeatherObject
    currentCity: string
    error: IError
    favorites: string[]
    forecast: IWeatherObject[]
}

interface SetCurrentCityAction {
    type: typeof SET_CURRENT_CITY
    payload: string
}

interface SetErrorAction {
    type: typeof SET_ERROR
    payload: string
}

interface UpdateWeatherAction {
    type: typeof UPDATE_WEATHER
    payload: IWeatherObject
}

interface UpdateForecastAction {
    type: typeof UPDATE_FORECAST
    payload: IWeatherObject[]
}

interface AddFavoriteAction {
    type: typeof ADD_FAVORITE
    payload: string
}

interface DeleteFavoriteAction {
    type: typeof DELETE_FAVORITE
    payload: string
}

interface SetFavoritesAction {
    type: typeof SET_FAVORITES
    payload: string[]
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    IWeatherStore,
    unknown,
    Action<string>>

export type WeatherActionTypes =
    AddFavoriteAction
    | UpdateForecastAction
    | DeleteFavoriteAction
    | SetFavoritesAction
    | SetCurrentCityAction
    | UpdateWeatherAction
    | SetErrorAction

