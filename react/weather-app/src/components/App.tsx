import * as React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from 'react-router-dom'
import {ThunkDispatch} from "redux-thunk";
import {fetchWeatherApi} from "../store/actions";
import {IWeatherStore, WeatherActionTypes} from "../store/types";
import ErrorCard from "./ErrorCard";
import FavoritesList from './FavoritesList';
import ForecastCard from "./ForecastCard";
import SearchForm from './SearchForm';
import WeatherCard from './WeatherCard';

interface IAppProps {
    updateWeather(city: string): void;
}

const MainBox: React.FC = () => (
    <div className="App d-flex flex-column pt-2">
        <div className="col-12 row pt-2">
            <div className="col-4">
                <SearchForm/>
            </div>
            <div className="col-4">
                <FavoritesList/>
            </div>
        </div>
        <div className="col-12 row pt-2">
            <div className="col-8">
                <ErrorCard/>
            </div>
        </div>
    </div>
);

const NotFoundPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" id="main">
            <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
            <div className="inline-block align-middle">
                <h2 className="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
            </div>
        </div>)
};

class App extends React.Component<IAppProps> {

    constructor(props: IAppProps) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={MainBox}/>
                <Route exact path='/city/:name'
                       render={({match}) => {
                           this.props.updateWeather(match.params.name);
                           return (<div><MainBox/>
                               <div className='col-12 row pt-3'>
                                   <div className='col-4'><WeatherCard/></div>
                                   <div className='col-8'><ForecastCard/></div>
                               </div>
                           </div>)
                       }}/>
                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<IWeatherStore, undefined, WeatherActionTypes>) {
    return {
        updateWeather: (city: string) => dispatch(fetchWeatherApi(city)),
    };
}

export default connect(null, mapDispatchToProps)(App);