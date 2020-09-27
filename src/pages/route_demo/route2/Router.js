import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Topic from '../route1/Topic';
import Main from '../route1/Main';
import About from '../route1/About';

import Home from './Home'

export default class IRouter extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    <Route path="/main" render={() => (
                        <Main>
                            <div>
                                <Route path="/main/a" component={About}></Route>
                            </div>
                        </Main>
                    )}></Route>
                    <Route exact={true} path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                </Home>
            </Router>
        );
    }
}