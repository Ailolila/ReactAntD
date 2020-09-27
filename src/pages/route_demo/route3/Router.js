import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Topic from './Topic';
import Main from './Main';
import About from './About';
import Info from './Info';

import Home from './Home'
import NoMath from './NoMath';

export default class IRouter extends React.Component {

    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={() => (
                            <Main>
                                <div>
                                    <Route path="/main/:value" component={Info}></Route>
                                </div>
                            </Main>
                        )}></Route>
                        <Route exact={true} path="/about" component={About}></Route>
                        <Route path="/topics" component={Topic}></Route>
                        <Route component={NoMath}></Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}