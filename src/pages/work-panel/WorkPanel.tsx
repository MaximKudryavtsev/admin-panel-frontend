import React, { useEffect, useState } from "react";
import { INavigation, IUser } from "../../entities";
import { Route, Switch } from "react-router";
import { Navigation } from "../navigation";
import { Footer } from "../footer";
import { Layout } from "../../widgets/layout";
import { Profile } from "../profile";
import { useNavigation } from "../../hooks";
import { PagesList } from "../pages-list";

interface INavigationProps {
    baseUrl?: string;
    user?: IUser;

    onLogout?(): void;
}

export const WorkPanel = (props: INavigationProps) => {
    const { baseUrl, onLogout } = props;
    const [user, setUser] = useState<IUser | undefined>(props.user);
    const [navigations, setNavigations] = useState<INavigation[]>([]);
    const [title, setTitle] = useState("");

    const { navigations: navs } = useNavigation("ru");

    useEffect(() => setUser(props.user), [props.user]);
    useEffect(() => setNavigations(navs), [navs]);

    return (
        <Layout title={title} user={user} onLogout={onLogout} navigations={navigations}>
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
                    <PagesList setPageTitle={setTitle} />
                </Route>
            </Switch>
        </Layout>
    );
};
