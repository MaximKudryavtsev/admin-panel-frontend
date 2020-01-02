import React, { Component, FC } from "react";
import { Route, Redirect, RouteProps } from "react-router";

interface IPrivateRouteProps extends RouteProps {
    path: string;
    auth: boolean;
}

export const PublicRoute: FC<IPrivateRouteProps> = (props) => {
    const { auth, children, path, ...rest } = props;
    return (
        <Route
            path={path}
            {...rest}
            render={() => (!auth ? children : <Redirect to={""} />)}
        />
    );
};
