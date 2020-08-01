import * as React from 'react'
import WeatherCard from './WeatherCard'
import {IWeatherObject} from "./Interfaces";
import FavoritesList from './FavoritesList'
import {SearchWeatherFormWithApi} from './SearchForm'
import ErrorCard from "./ErrorCard";

interface IProps {
    city: string;
    favorites: Array<string>;
}

interface IState {
    city: string;
    newFavoriteCity?: string;
    currentWeather?: IWeatherObject;
    favorites: Array<string>;
    error?: string;
}

class App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.chooseCityFormFavorites = this.chooseCityFormFavorites.bind(this);
        this.changeCurrentCity = this.changeCurrentCity.bind(this);
        this.updateWeather = this.updateWeather.bind(this);
        this.setError = this.setError.bind(this);
        this.state = {
            city: props.city,
            favorites: props.favorites
        };
    }

    chooseCityFormFavorites(newCity: string): void {
        this.setState({city: newCity, currentWeather: null});
    };

    updateWeather(weather: IWeatherObject) {
        this.setState({currentWeather: weather});
    }

    setError(errorText: string): void {
        this.setState({error: errorText});
    }

    changeCurrentCity(currCity: string): void {
        this.setState({city: currCity});
    }

    render() {
        return (
            <div className="App container pt-5">
                <div className="row">
                    <div className="col-5">
                        <div className="pb-2">
                            <SearchWeatherFormWithApi
                                city={this.state.city}
                                setError={this.setError}
                                changeCurrentCity={this.changeCurrentCity}
                                updateWeather={this.updateWeather}
                                handlerSearchClick={click => {this.chooseCityFormFavorites = click; click(this.state.city);}}/>
                        </div>
                        <div className="pt-2">
                            <FavoritesList
                                newFavorite={this.state.city}
                                chooseFavorite={this.chooseCityFormFavorites}>
                                    {this.props.favorites}
                            </FavoritesList>
                        </div>
                    </div>
                    <div className="col-5 pb-2">
                        <ErrorCard error={this.state.error}/>
                        <WeatherCard
                            city={this.state.city}
                            currentWeather={this.state.currentWeather}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;