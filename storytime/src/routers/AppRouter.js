import React from 'react';
import HomePage from '../components/HomePage';
import RoomPage from '../components/RoomPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <Router>
        <div className="container">
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/room:code" component={RoomPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;