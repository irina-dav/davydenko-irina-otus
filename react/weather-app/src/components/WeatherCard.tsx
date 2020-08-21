import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router-dom';
import {IWeatherStore} from "../store/types";
import {IWeatherObject} from "./Interfaces";

interface RouteInfo {
    name: string;
}

interface IWeatherCardProps extends RouteComponentProps<RouteInfo> {
    currentWeather: IWeatherObject;
    forecast: IWeatherObject[];
    test?(name: string): void;
}

interface IPropsItem {
    title: string
    body: string | number
}


const WeatherItem: React.FC<IPropsItem> = ({title, body}) => (
    <div className='small'><span className="font-weight-bolder">{title}</span>: {body}</div>
);

export const WeatherBox: React.FC<{ weather: IWeatherObject }> = ({weather}) => (
    <div className='card'>
        <h5 className='card-header'>
            {weather.date ? (new Date(parseInt(weather.date) * 1000)).toDateString() : `Today in ${weather.city}`}
        </h5>
        <div className='card-body test'>
            <div className='card-text'>
                <img src={weather.icon} alt={weather.main}/>
                <WeatherItem title='Main' body={weather.main}/>
                <WeatherItem title='Description' body={weather.description}/>
                <hr/>
                <WeatherItem title='Temp' body={`${weather.data.temp}°`}/>
                <WeatherItem title='Pressure' body={`${weather.data.pressure} hPa`}/>
                <WeatherItem title='Humidity' body={`${weather.data.humidity}%`}/>
            </div>
        </div>
    </div>
);

class WeatherCard extends React.Component<IWeatherCardProps> {

    constructor(props: IWeatherCardProps) {
        super(props);
    }

    render() {
        const weather = this.props.currentWeather;
        return (
            weather != null &&
                <WeatherBox weather={weather} />
        );
    }
}

function mapStateToProps(store: IWeatherStore) {
    return {
        currentWeather: store.currentWeather,
        forecast: store.forecast
    };
}

export default connect(mapStateToProps)(withRouter(WeatherCard))
