import React from 'react';
import StoryPage from '../components/StoryPage';
import HomePage from '../components/HomePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true} />
                <Route path="/story" component={StoryPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;