import React, { useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { Login } from "../pages/login";
import { Test } from "../pages/test/Test";
import { Transport } from "../transport";
import { IToken, IUser } from "../entities";
import { login } from "../api";
import { PrivateRoute } from "../components/private-route";
import { PublicRoute } from "../components/public-route";

const App: React.FC = () => {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const transport = new Transport();

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
            setLogged(false);
            return;
        }
        const token: IToken = JSON.parse(tokenString);
        transport.setToken(token);
        login(transport)
            .then((response) => {
                setUser(response.data);
                setLogged(true);
            })
            .catch(() => setLogged(false));
    }, []);

    return (
        <div>
            <Router history={AppContext.getHistory()}>
                <Switch>
                    <PublicRoute auth={logged} path={"/sign-in"} exact>
                        <Login transport={transport} onSetLogged={setLogged} />
                    </PublicRoute>
                    <PrivateRoute auth={logged} path={""}>
                        <Test />
                    </PrivateRoute>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
