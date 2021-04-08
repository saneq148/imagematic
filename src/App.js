import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import { Auth, Categories, MyProfile, Home, AddPost } from "./Pages";
import { Login, Register, Preloader } from "./Components";
import { getUserLoggedIn } from "./state/user/selectors";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history } from "src/state";


function App() {

    const isAuthenticated = useSelector(getUserLoggedIn);

    return (
        <div className="wrapper">
            <ConnectedRouter history={history}>
                <Suspense fallback={<Preloader />} >
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/login" exact>
                            <Auth>
                                <Login />
                            </Auth>
                        </Route>
                        <Route path="/register" exact>
                            <Auth>
                                <Register />
                            </Auth>
                        </Route>
                        {!isAuthenticated && <Redirect to="/" />}
                        <Route path="/categories" exact>
                            <Categories />
                        </Route>
                        <Route path="/add" exact>
                            <AddPost />
                        </Route>
                        <Route path="/profile" exact>
                            <MyProfile />
                        </Route>
                        <Route path="/">
                            <div>
                                <h1>404</h1>

                            </div>
                        </Route>
                    </Switch>
                </Suspense>
            </ConnectedRouter>
        </div >
    );
}

export default App;
