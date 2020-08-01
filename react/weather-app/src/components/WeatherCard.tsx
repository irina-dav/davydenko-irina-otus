import * as React from "react";
import {IWeatherObject} from "./Interfaces";

interface IWeatherCardProps {
    city: string;
    currentWeather: IWeatherObject
}

interface IPropsItem {
    title: string
    body: string | number
}

const WeatherItem: React.FC<IPropsItem> = ({title, body}) => (
    <div><span className="font-weight-bolder">{title}</span>: {body}</div>
);

export default class WeatherCard extends React.Component<IWeatherCardProps> {

    constructor(props: IWeatherCardProps) {
        super(props);
    }

    render() {
        return (
            this.props.currentWeather != null &&
            <div className='card'>
              <h5 className='card-header'>Today in {this.props.currentWeather.city}</h5>
              <div className='card-body'>
                <div className='card-text'>
                  <img src={this.props.currentWeather.icon} alt={this.props.currentWeather.main}/>
                  <WeatherItem title='Main' body={this.props.currentWeather.main}/>
                  <WeatherItem title='Description' body={this.props.currentWeather.description}/>
                  <hr/>
                  <WeatherItem title='Temp' body={`${this.props.currentWeather.data.temp}°`}/>
                  <WeatherItem title='Pressure' body={`${this.props.currentWeather.data.pressure} hPa`}/>
                  <WeatherItem title='Humidity' body={`${this.props.currentWeather.data.humidity}%`}/>
                </div>
              </div>
            </div>
        );
    }
}