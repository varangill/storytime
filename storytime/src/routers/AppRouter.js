import '../styles/App.css';
import React from 'react';
import HomePage from '../components/HomePage';
import RoomPage from '../components/RoomPage';
import LoginPage from '../components/LoginPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <Router>
        <div className="container">
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <Route path="/home" component={HomePage} />
                <Route path="/room:code" component={RoomPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;