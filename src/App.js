import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";
import "./App.scss";
import { Auth, Home } from "./Pages";
import { Login, Register, Header } from "./Components";

function App() {
    return (
        <div className="wrapper">
            <Router>
                <Route
                    path="/"
                    render={() =>
                        window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Header />
                    }
                />
                <Switch>
                    <Route path="/login" exact>
                        <Auth>{<Login />}</Auth>
                    </Route>
                    <Route path="/register" exact>
                        <Auth>{<Register />}</Auth>
                    </Route>
                    <Route path="/" exact>
                        {console.log(localStorage.getItem("token"))}
                        {localStorage.getItem("token") ? <Home /> : <Auth>{<Login />}</Auth>}
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
