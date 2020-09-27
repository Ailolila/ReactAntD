import React from 'react';
import {Link} from 'react-router-dom';

export default class Main extends React.Component {

    render() {
        return (
            <div>
                this is main js 2
                <Link to="/main/a">AA</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}