import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import { Auth, Home } from "./Pages";
import { Login, Register, Header } from "./Components";
import { setUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

function App() {

    const dispatch = useDispatch();

    dispatch(setUser(!!localStorage.getItem("token")));

    if (useSelector(state => state.isLoggedIn)) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="wrapper">
            <Router>
                <Switch>
                    <Route path="/login" exact>
                        <Auth>{<Login />}</Auth>
                    </Route>
                    <Route path="/register" exact>
                        <Auth>{<Register />}</Auth>
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/">
                        <h1>404</h1>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
