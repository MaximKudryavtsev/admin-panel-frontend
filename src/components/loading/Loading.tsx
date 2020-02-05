import React, { FC } from "react";
import { CircularProgress } from "@material-ui/core";

interface ILoadingProps {
    loaded: any | undefined;
}

export const Loading: FC<ILoadingProps> = (props) => {
    const { loaded, children } = props;
    return (
        <>
            {loaded ? children : <CircularProgress />}
        </>
    )
};
