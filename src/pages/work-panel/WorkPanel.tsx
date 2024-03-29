import React, { useEffect, useState } from "react";
import { EPageType, EUserRoles, IUser } from "../../entities";
import { Route, Switch } from "react-router";
import { Navigation } from "../navigation";
import { Footer } from "../footer";
import { Layout } from "../../widgets/layout";
import { Profile } from "../profile";
import { Pages } from "../pages";
import { Page } from "../page";
import { Main } from "../main";
import { Header } from "../header";
import { ControlPanel } from "../control-panel";
import { Contacts } from "../contacts";
import { UserList } from "../user-list";
import { useRole } from "../../hooks";
import { Filters } from "../filters";

interface INavigationProps {
    baseUrl?: string;
    user?: IUser;

    onLogout?(): void;
}

export const WorkPanel = (props: INavigationProps) => {
    const { baseUrl, onLogout } = props;
    const [user, setUser] = useState<IUser | undefined>(props.user);
    const [title, setTitle] = useState("");
    const { hasRole } = useRole();

    useEffect(() => setUser(props.user), [props.user]);

    const defaultLang = hasRole(EUserRoles.RU) ? "ru" : hasRole(EUserRoles.EN) ? "en" : "ru";

    return (
        <Layout title={title} user={user} onLogout={onLogout}>
            <Switch>
                <Route path={`${baseUrl}/navigation`} exact>
                    <Navigation defaultLang={defaultLang} setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/footer`} exact>
                    <Footer defaultLang={defaultLang} setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/contacts`} exact>
                    <Contacts defaultLang={defaultLang} setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/profile`} exact>
                    <Profile setPageTitle={setTitle} onSetUser={setUser} />
                </Route>
                <Route path={`${baseUrl}/control-panel`} exact>
                    <ControlPanel setPageTitle={setTitle} />
                </Route>
                <Route path={`${baseUrl}/pages`} exact>
                    <Pages
                        defaultLang={defaultLang}
                        setPageTitle={setTitle}
                        type={EPageType.ORDINARY}
                        title={"Страницы"}
                        baseUrl={`${baseUrl}/pages`}
                    />
                </Route>
                <Route path={`${baseUrl}/cases`} exact>
                    <Pages
                        defaultLang={defaultLang}
                        setPageTitle={setTitle}
                        type={EPageType.CASE}
                        title={"Кейсы"}
                        baseUrl={`${baseUrl}/cases`}
                    />
                </Route>
                <Route path={`${baseUrl}/pages/:id`}>
                    <Page setPageTitle={setTitle} baseUrl={`${baseUrl}/pages`} lang={defaultLang} />
                </Route>
                <Route path={`${baseUrl}/cases/:id`}>
                    <Page setPageTitle={setTitle} baseUrl={`${baseUrl}/cases`} lang={defaultLang} />
                </Route>
                <Route path={"/main"} exact>
                    <Main setPageTitle={setTitle} />
                </Route>
                <Route path={"/header"} exact>
                    <Header defaultLang={defaultLang} setPageTitle={setTitle} />
                </Route>
                <Route path={"/users"} exact>
                    <UserList setPageTitle={setTitle} />
                </Route>
                <Route path={"/filters"} exact>
                    <Filters setPageTitle={setTitle} defaultLang={defaultLang} />
                </Route>
            </Switch>
        </Layout>
    );
};
