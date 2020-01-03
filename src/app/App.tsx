import React, { useEffect, useMemo, useState } from "react";
import { Router, Switch } from "react-router";
import { AppContext } from "../context";
import { Login } from "../pages/login";
import { WorkPanel } from "../pages/work-panel";
import { Transport } from "../transport";
import { IToken, IUser } from "../entities";
import { login } from "../api";
import { PrivateRoute } from "../components/private-route";
import { PublicRoute } from "../components/public-route";

const App: React.FC = () => {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const transport = useMemo(() => new Transport(), []);

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
            setLogged(false);
            localStorage.removeItem("token");
            AppContext.getHistory().push("/sign-in");
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
    }, [transport]);

    return (
        <Router history={AppContext.getHistory()}>
            <Switch>
                <PublicRoute
                    auth={logged}
                    path={"/sign-in"}
                    component={() => (
                        <Login transport={transport} onSetLogged={setLogged} onSetUser={setUser} />
                    )}
                />
                <PrivateRoute
                    auth={logged}
                    path={"/panel/:page"}
                    component={() => (
                        <WorkPanel
                            user={user}
                            baseUrl={"/panel"}
                            onSetLogout={() => setLogged(false)}
                        />
                    )}
                />
            </Switch>
        </Router>
    );
};

export default App;
