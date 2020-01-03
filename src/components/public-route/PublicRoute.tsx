import React, { FC } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router";

interface IPublicRouteProps extends RouteProps {
    auth: boolean;
    restricted?: boolean;
    render: (props: RouteComponentProps) => React.ReactNode;
}

export const PublicRoute: FC<IPublicRouteProps> = (props) => {
    const { auth, render, restricted, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(routeProps: RouteComponentProps) =>
                auth && restricted ? (
                    <Redirect exact={true} push={true} to={"/panel/navigation"} />
                ) : (
                    render(routeProps)
                )
            }
        />
    );
};
