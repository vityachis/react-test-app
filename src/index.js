import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./components/Home";
import Cart from "./components/Cart";
import Shipping from "./components/Shipping";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/shipping" component={Shipping}/>
            </Switch>
        </Router>
    );
};

// ========================================
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
