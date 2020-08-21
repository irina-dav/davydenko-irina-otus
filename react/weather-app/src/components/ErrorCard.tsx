import * as React from "react";
import {connect} from "react-redux";
import {IWeatherStore} from "../store/types";

interface IErrorCardProps {
    error: string;
}

class ErrorCard extends React.Component<IErrorCardProps> {

    constructor(props: IErrorCardProps) {
        super(props);
    }

    render() {
        return (
            this.props.error?.length > 0 &&
            <div className='border alert alert-warning' role="alert">
                {this.props.error}
            </div>
        );
    }
}

function mapStateToProps(store: IWeatherStore) {
    return {
        error: store.error?.errorMessage,
    };
}

export default connect(mapStateToProps)(ErrorCard);