import React, { useState } from "react";
import { IUser } from "../../entities";
import { Route } from "react-router";
import { Navigation } from "../navigation";
import { Footer } from "../footer";
import { Layout } from "../../widgets/layout";

interface INavigationProps {
    baseUrl?: string;
    user?: IUser;

    onSetLogout?(): void;
}

export const WorkPanel = (props: INavigationProps) => {
    const { user, baseUrl, onSetLogout } = props;
    const [title, setTitle] = useState("");

    return (
        <Layout title={title} user={user} onSetLogout={onSetLogout}>
            <Route path={`${baseUrl}/navigation`}>
                <Navigation setPageTitle={setTitle} />
            </Route>
            <Route path={`${baseUrl}/footer`}>
                <Footer setPageTitle={setTitle} />
            </Route>
        </Layout>
    );
};
