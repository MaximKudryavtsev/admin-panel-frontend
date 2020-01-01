import React from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { Login } from "../pages/login";
import { Test } from "../pages/test/Test";
import { Transport } from "../transport";

const App: React.FC = () => {
    const transport = new Transport();

    return (
        <div>
            <Router history={AppContext.getHistory()}>
                <Switch>
                    <Route path={"/sign-in"} exact>
                        <Login transport={transport} />
                    </Route>
                    <Route path={""} exact>
                        <Test />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
