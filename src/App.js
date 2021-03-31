import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import { Auth, Categories, Profile, Home } from "./Pages";
import { Login, Register, Preloader } from "./Components";
import { getUserLoggedIn } from "./state/user/selectors";
import { useSelector } from "react-redux";

function App() {

    const isLoggedIn = useSelector(getUserLoggedIn);

    return (
        <div className="wrapper">
            <Router>
                {!isLoggedIn ? <Redirect to="/" /> : null}
                <Suspense fallback={<Preloader />} >
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
                        <Route path="/categories" exact>
                            <Categories />
                        </Route>
                        <Route path="/profile" exact>
                            <Profile />
                        </Route>
                        <Route path="/">
                            <div>
                                <h1>404</h1>

                            </div>
                        </Route>
                    </Switch>
                </Suspense>
            </Router>
        </div >
    );
}

export default App;
