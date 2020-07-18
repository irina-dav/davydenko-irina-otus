import * as React from 'react';

interface IProps {
    newFavorite: string;
    chooseFavorite(name: string): void;
}

interface IState {
    favorites: Array<string>;
}

class FavoritesList extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            favorites: this.props.children as Array<string>
        }
    }

    addFavorite(name: string): void {
        let favorites = this.state.favorites;
        favorites.push(name);
        this.setState({favorites});
    };

    removeFavorite(nameToDel: string): void {
        let favorites = this.state.favorites;
        favorites.splice(favorites.indexOf(nameToDel), 1);
        this.setState({favorites});
    };

    render() {
        return (
            <div className='card'>
                <div className='card-header'><h5><i className='far fa-star text-warning'/> Favorites</h5></div>
                <ul className='list-group'>
                    {this.props.newFavorite && this.state.favorites.indexOf(this.props.newFavorite) < 0 &&
                        <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                            {this.props.newFavorite}
                          <button className='btn btn-success btn-sm'
                                  title='Add to Favorites'
                                  onClick={() => this.addFavorite(this.props.newFavorite)}>
                            <i className={'fas fa-plus'}/>
                          </button>
                        </li>
                    }
                    {this.state.favorites.length > 0 && this.state.favorites.map((favorite, idx) =>
                        <li key={idx}
                            onClick={() => this.props.chooseFavorite(favorite)}
                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                            {favorite}
                            <button className={'btn btn-outline-danger btn-sm'}
                                    title='Delete from Favorites'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.removeFavorite(favorite)
                                    }}>
                                <i className='fas fa-minus'/>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default FavoritesList;