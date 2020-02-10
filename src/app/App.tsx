import React, { createContext, useEffect, useMemo, useState } from "react";
import { Router, Switch } from "react-router";
import { AppContext } from "../context";
import { Login } from "../pages/login";
import { WorkPanel } from "../pages/work-panel";
import { Transport } from "../transport";
import { IUser } from "../entities";
import { ProfileAPI } from "../api";
import { PrivateRoute } from "../components/private-route";
import { PublicRoute } from "../components/public-route";
import { ForgotPassword } from "../pages/forgot-password";
import { SnackbarProvider } from "notistack";

export const UserContext = createContext<IUser | undefined>(undefined);

const App: React.FC = () => {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const transport = useMemo(() => Transport.create(), []);
    const [logged, setLogged] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) {
            localStorage.removeItem("token");
            AppContext.getHistory().push("/sign-in");
            return;
        }
        ProfileAPI.fetchProfile(transport)
            .then((response) => {
                if (window.location.pathname === "/") {
                    AppContext.getHistory().push("/main");
                }
                setUser(response.data);
            })
            .catch(() => {
                localStorage.removeItem("token");
                AppContext.getHistory().push("/sign-in");
            });
    }, [transport]);

    const logout = () => {
        localStorage.removeItem("token");
        setLogged(false);
        AppContext.getHistory().push("/sign-in");
    };

    return (
        <UserContext.Provider value={user}>
            <SnackbarProvider>
                <Router history={AppContext.getHistory()}>
                    <Switch>
                        <PublicRoute
                            auth={logged}
                            exact={true}
                            restricted={true}
                            path={"/sign-in"}
                            render={() => (
                                <Login
                                    transport={transport}
                                    onSetUser={setUser}
                                    onSignIn={() => setLogged(true)}
                                />
                            )}
                        />
                        <PublicRoute
                            auth={logged}
                            restricted={true}
                            path={"/forgot-password"}
                            exact={true}
                            render={() => <ForgotPassword transport={transport} />}
                        />
                        <PrivateRoute
                            auth={logged}
                            path={"/:page"}
                            render={() => (
                                <WorkPanel
                                    user={user}
                                    baseUrl={""}
                                    onLogout={logout}
                                />
                            )}
                        />
                    </Switch>
                </Router>
            </SnackbarProvider>
        </UserContext.Provider>
    );
};

export default App;
