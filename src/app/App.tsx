import React from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { Login } from "../pages/login";

const App: React.FC = () => {
    return (
        <div>
            <Router history={AppContext.getHistory()}>
                <Switch>
                    <Route path={"/login"}>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
