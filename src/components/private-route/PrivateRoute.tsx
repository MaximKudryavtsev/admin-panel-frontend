import React, { FC } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";

interface IPrivateRouteProps extends RouteProps {
    path: string;
    auth: boolean;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                // @ts-ignore
                rest.auth ? <Component {...props} /> : <Redirect to={"/sign-in"} />
            }
        />
    );
};
