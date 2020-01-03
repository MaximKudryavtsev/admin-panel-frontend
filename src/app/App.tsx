import React, { useEffect, useMemo, useState } from "react";
import { Router, Switch } from "react-router";
import { AppContext } from "../context";
import { Login } from "../pages/login";
import { WorkPanel } from "../pages/work-panel";
import { Transport } from "../transport";
import { IToken, IUser } from "../entities";
import { fetchUser } from "../api";
import { PrivateRoute } from "../components/private-route";
import { PublicRoute } from "../components/public-route";
import { ForgotPassword } from "../pages/forgot-password";

const App: React.FC = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const transport = useMemo(() => new Transport(), []);
    const [logged, setLogged] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
            localStorage.removeItem("token");
            AppContext.getHistory().push("/sign-in");
            return;
        }
        const token: IToken = JSON.parse(tokenString);
        transport.setToken(token);
        fetchUser(transport)
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
            });
    }, [transport]);

    const logout = () => {
        localStorage.removeItem("token");
        setLogged(false);
        AppContext.getHistory().push("/sign-in");
    };

    return (
        <Router history={AppContext.getHistory()}>
            <Switch>
                <PublicRoute
                    auth={logged}
                    exact={true}
                    restricted={true}
                    path={"/sign-in"}
                    render={() => (
                        <Login transport={transport}  onSetUser={setUser} onSignIn={() => setLogged(true)} />
                    )}
                />
                <PublicRoute
                    auth={logged}
                    restricted={true}
                    path={"/forgot-password"}
                    exact={true}
                    render={() => (
                        <ForgotPassword transport={transport} />
                    )}
                />
                <PrivateRoute
                    auth={logged}
                    path={"/panel/:page"}
                    render={() => (
                        <WorkPanel
                            user={user}
                            baseUrl={"/panel"}
                            onLogout={logout}
                        />
                    )}
                />
            </Switch>
        </Router>
    );
};

export default App;
