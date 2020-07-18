import * as React from "react";
import {IWeatherObject} from "./Interfaces";

interface IPropsSearchWeatherForm extends IPropsBase {
    jsonToWeather(respObj: any): IWeatherObject;
    apiFetchUrl(city: string): string;
    getErrorDescription(code: number): string;
}

interface IPropsBase {
    city: string;
    updateWeather(weather: IWeatherObject): void;
    setError(text: string): void;
    changeCurrentCity(currCity: string): void;
    handlerSearchClick(fn: (city: string) => IWeatherObject): void;
}

interface IStateSearchWeatherForm {
    cityToSearch: string;
    currentWeather?: IWeatherObject;
    error?: string;
}

export class SearchForm extends React.Component<IPropsSearchWeatherForm, IStateSearchWeatherForm> {
    constructor(props: IPropsSearchWeatherForm) {
        super(props);
        this.state = {cityToSearch: this.props.city};
        this.fetchWeather = this.fetchWeather.bind(this)
    }
    componentDidMount() {
        this.props.handlerSearchClick(this.fetchWeather);
    }

    fetchWeather(city: string): IWeatherObject {
        this.props.setError("");
        this.props.changeCurrentCity(city);
        if (city.length === 0) return null;
        fetch(this.props.apiFetchUrl(city))
            .then(response => {
                if (response.status != 200) {
                    this.props.setError(this.props.getErrorDescription(response.status));
                    return null;
                }
                return response.json()
            })
            .then(respObj => {
                this.setState({
                    currentWeather: respObj ? this.props.jsonToWeather(respObj) : null
                });
                this.props.updateWeather(this.state.currentWeather);
            })
            .catch(err => {
                this.props.setError(err.message);
            });
    }

    changeInputValue(currCity: string): void {
        this.setState({cityToSearch: currCity});
        this.props.changeCurrentCity(currCity);
    }

    render() {
        return (
            <div className='card'>
                <h5 className='card-header'>Print city and press Get weather...</h5>
                <div className='card-body'>
                    <form className=''>
                        <div className='form-row'>
                            <div className="col-8">
                            <input value={this.state.cityToSearch}
                                       className='form-control'
                                       onChange={(e) => this.changeInputValue(e.target.value)}/>
                            </div>
                            <div className="col-4">
                            <button type='button'
                                     disabled= {!this.props.city}
                                     className='btn btn-outline-primary'
                                     onClick={() => this.fetchWeather(this.state.cityToSearch)}>Get weather
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export const openWeatherMap = (SearchWeatherForm: React.ComponentClass<IPropsSearchWeatherForm, IStateSearchWeatherForm>) => {
    return class Cmp extends React.Component<IPropsSearchWeatherForm, IStateSearchWeatherForm> {

        constructor(props: IPropsSearchWeatherForm) {
            super(props);
        }

        apiFetchUrl(city: string): string {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
        };

        jsonToWeather(respObj: any) {
            return {
                city: respObj.name,
                main: respObj.weather[0].main,
                description: respObj.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${respObj.weather[0].icon}@2x.png`,
                data: {...respObj.main}
            }
        }

        getErrorDescription(code: number): string {
            const errors: { [codeId: number]: string } = {
                429: 'You make more than 60 API calls per minute.',
                401: 'There is problem with API key.',
                404: 'You specify wrong city name'
            };
            return errors.hasOwnProperty(code) ? errors[code] : "Unknown error";
        }

        render() {
            return <SearchWeatherForm
                {...this.props}
                apiFetchUrl={this.apiFetchUrl}
                jsonToWeather={this.jsonToWeather}
                getErrorDescription={this.getErrorDescription}
            />;
        }
    }
}

export const SearchWeatherFormWithApi: React.ComponentClass<IPropsBase, IStateSearchWeatherForm> = openWeatherMap(SearchForm);

