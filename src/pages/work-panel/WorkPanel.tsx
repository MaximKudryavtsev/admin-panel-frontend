import React, { useEffect, useState } from "react";
import { IUser } from "../../entities";
import { Route, Switch } from "react-router";
import { Navigation } from "../navigation";
import { Footer } from "../footer";
import { Layout } from "../../widgets/layout";
import { Profile } from "../profile";
import { Pages } from "../pages";
import { Page } from "../page";
import { Main } from "../main";
import { Header } from "../header";
import { PreviewPage } from "../preview-page";
import { ControlPanel } from "../control-panel";

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
                <Route path={`${baseUrl}/navigation`} exact>
                    <Navigation setPageTitle={setTitle}  />
                </Route>
                <Route path={`${baseUrl}/footer`} exact>
                    <Footer setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/profile`} exact>
                    <Profile setPageTitle={setTitle} onSetUser={setUser} />
                </Route>
                <Route path={`${baseUrl}/control-panel`} exact>
                    <ControlPanel setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/pages`} exact>
                    <Pages setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/pages/:id`} exact>
                    <Page setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/pages/:id/preview`} exact>
                    <PreviewPage />
                </Route>
                <Route path={"/main"} exact>
                    <Main setPageTitle={setTitle} />
                </Route>
                <Route path={"/header"} exact>
                    <Header setPageTitle={setTitle} />
                </Route>
            </Switch>
        </Layout>
    );
};
