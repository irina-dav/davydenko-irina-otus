import * as React from "react";

interface IErrorCardProps {
    error: string;
}

export default class ErrorCard extends React.Component<IErrorCardProps> {

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