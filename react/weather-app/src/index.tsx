import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './components/App';

const favoriteCities =require( './favorites.json');

ReactDOM.render(<App city='Sydney' favorites={favoriteCities} />, document.getElementById("root"));

