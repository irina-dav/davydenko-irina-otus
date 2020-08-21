import * as React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {Dispatch} from "redux";
import {addFavoriteAction, deleteFavoriteAction} from "../store/actions";
import {IWeatherStore, WeatherActionTypes} from "../store/types";
import './FavoritesList.css';

interface IFavoriteListProps {
    newFavorite: string;
    favorites: string[],
    addFavorite(name: string): void;
    deleteFavorite(name: string): void;
}

class FavoritesList extends React.Component<IFavoriteListProps> {

    constructor(props: IFavoriteListProps) {
        super(props);
    }

    render() {
        return (
            <div className='card accordion' id='accordionBox'>
                <h6 className='card-header'><i className='far fa-star text-warning'/> Favorites
                    <span><a className='m-0 p-0' data-toggle="collapse" href="#collapseList" role="button"
                             aria-expanded="true" aria-controls="collapseList">
                       <i className="fa" aria-hidden="true"></i>
                    </a></span></h6>
                <div id="collapseList" className="collapse show" aria-labelledby="heading"
                     data-parent="#accordionBox">
                    <ul className='list-group'>
                        {this.props.newFavorite && this.props.favorites.indexOf(this.props.newFavorite) < 0 &&
                        <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                            {this.props.newFavorite}
                          <button className='btn btn-success btn-sm'
                                  title='Add to Favorites'
                                  onClick={() => this.props.addFavorite(this.props.newFavorite)}>
                            <i className={'fas fa-plus'}/>
                          </button>
                        </li>
                        }
                        {this.props.favorites.length > 0 && this.props.favorites.map((favorite, idx) =>
                            <Link key={idx}
                                  className={'list-group-item list-group-item-action d-flex justify-content-between align-items-center'}
                                  to={`/city/${favorite}`}> {favorite}
                                <button className={'btn btn-outline-danger btn-sm'}
                                        title='Delete from Favorites'
                                        onClick={(e) => {e.preventDefault(); this.props.deleteFavorite(favorite)}}>
                                    <i className='fas fa-minus'/>
                                </button>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch<WeatherActionTypes>) {
    return {
        addFavorite: (name: string) => dispatch(addFavoriteAction(name)),
        deleteFavorite: (name: string) => dispatch(deleteFavoriteAction(name)),
    };
}

function mapStateToProps(state: IWeatherStore) {
    return {
        newFavorite: state.currentCity,
        favorites: state.favorites,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);