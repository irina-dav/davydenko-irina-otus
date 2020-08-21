import axios from 'axios';
import {IError, IWeatherObject,} from "../components/Interfaces";

const errorsDict: { [codeId: number]: string } = require('./apiOpenWeatherMapErrors.json');

const axiosInstance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
    responseType: "json"
});

type IResult = IWeatherObject | IWeatherObject[] | IError;

export async function fetchWeather(city: string): Promise<IResult>  {
    try {
        let respObj = await axiosInstance.get('/weather', {
            params: {
                q: city,
                appid: process.env.API_KEY,
                units: 'metric'
            }
        });
        return respObj ? jsonToWeather(respObj.data) : null
    } catch (e) {
        return {errorMessage: getErrorDescription(e.response.status)};
    }
}

export async function fetchForecast(lon: number, lat: number): Promise<IResult>  {
    try {
        let respObj = await axiosInstance.get('/onecall', {
            params: {
                lat: lat,
                lon: lon,
                appid: process.env.API_KEY,
                units: 'metric',
                exclude: 'hourly,minutely'
            }
        });
        return respObj ? jsonToForecast(respObj.data) : null
    } catch (e) {
        return {errorMessage: getErrorDescription(e.response.status)};
    }
}

function jsonToWeather(jsonObj: any): IWeatherObject {
    return {
        city: jsonObj.name,
        coord: jsonObj.coord,
        main: jsonObj.weather[0].main,
        description: jsonObj.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${jsonObj.weather[0].icon}@2x.png`,
        data: {...jsonObj.main}
    }
}

function jsonToForecast(jsonObj: any): IWeatherObject[] {
    return jsonObj.daily.map((elem: any, idx: number) => { return {
        date: elem.dt,
        main: elem.weather[0].main,
        description: elem.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`,
        data: {temp: elem.temp.day, pressure: elem.pressure, humidity: elem.humidity }
    }}).slice(0, 3);
}

function getErrorDescription(code: number): string {
    return errorsDict[code] || "Unknown error";
}