import React, { useEffect, useState } from "react";
import { IUser } from "../../entities";
import { Route } from "react-router";
import { Navigation } from "../navigation";
import { Footer } from "../footer";
import { Layout } from "../../widgets/layout";
import { Profile } from "../profile";

interface INavigationProps {
    baseUrl?: string;
    user?: IUser;

    onLogout?(): void;
}

export const WorkPanel = (props: INavigationProps) => {
    const { baseUrl, onLogout } = props;
    const [user, setUser] = useState<IUser | undefined>(props.user);
    const [title, setTitle] = useState("");

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return (
        <Layout title={title} user={user} onLogout={onLogout}>
            <Route path={`${baseUrl}/navigation`}>
                <Navigation setPageTitle={setTitle} />
            </Route>
            <Route path={`${baseUrl}/footer`}>
                <Footer setPageTitle={setTitle} />
            </Route>
            <Route path={`${baseUrl}/profile`}>
                <Profile setPageTitle={setTitle} onSetUser={setUser} />
            </Route>
        </Layout>
    );
};
