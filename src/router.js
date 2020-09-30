import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Login from './pages/login/login';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';

export default class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" render={() => (
                            <Admin>
                                <Switch>
                                    <Route exact={true} path="/" component={Buttons} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notice} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        )} />
                        <Route path="/order/detail" component={Login} />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}