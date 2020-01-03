import React, { FC } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";

interface IPublicRouteProps extends RouteProps {
    path: string;
    auth: boolean;
}

export const PublicRoute: FC<IPublicRouteProps> = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                // @ts-ignore
                rest.auth ? <Redirect to={"/panel/navigation"} /> : <Component {...props} />
            }
        />
    );
};
