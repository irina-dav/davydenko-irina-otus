import * as React from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router';
import {RouteComponentProps} from 'react-router-dom';
import {IWeatherStore} from "../store/types";
import {IWeatherObject} from "./Interfaces";
import {WeatherBox} from "./WeatherCard";

interface RouteInfo {
    name: string;
}

interface IForecastCardProps extends RouteComponentProps<RouteInfo> {
    forecast: IWeatherObject[]
}

interface IPropsItem {
    title: string
    body: string | number
}

class ForecastCard extends React.Component<IForecastCardProps> {

    constructor(props: IForecastCardProps) {
        super(props);
    }

    render() {
        return (
            <div className='d-flex'>
                {this.props.forecast?.length > 0 && this.props.forecast.map((elem, idx) =>
                    <div className='card mr-2' key={idx}>
                        <WeatherBox weather={elem}/>
                    </div>)
                }
            </div>
        );
    }
}

function mapStateToProps(store: IWeatherStore) {
    return {
        forecast: store.forecast
    };
}

export default connect(mapStateToProps)(withRouter(ForecastCard));