import React, { useEffect, useState } from "react";
import { IUser } from "../../entities";
import { Route, Switch } from "react-router";
import { Navigation } from "../navigation";
import { Footer } from "../footer";
import { Layout } from "../../widgets/layout";
import { Profile } from "../profile";
import { Pages } from "../page";

interface INavigationProps {
    baseUrl?: string;
    user?: IUser;

    onLogout?(): void;
}

export const WorkPanel = (props: INavigationProps) => {
    const { baseUrl, onLogout } = props;
    const [user, setUser] = useState<IUser | undefined>(props.user);
    const [title, setTitle] = useState("");

    useEffect(() => setUser(props.user), [props.user]);

    return (
        <Layout title={title} user={user} onLogout={onLogout}>
            <Switch>
                <Route path={`${baseUrl}/navigation`}>
                    <Navigation setPageTitle={setTitle}  />
                </Route>
                <Route path={`${baseUrl}/footer`}>
                    <Footer setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/profile`}>
                    <Profile setPageTitle={setTitle} onSetUser={setUser} />
                </Route>
                <Route path={`${baseUrl}/pages`}>
                    <Pages setPageTitle={setTitle} />
                </Route>
            </Switch>
        </Layout>
    );
};
