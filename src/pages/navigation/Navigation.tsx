import React, { useEffect } from "react";

interface INavigationProps {
    setPageTitle(title: string): void;
}

export const Navigation = (props: INavigationProps) => {
    const { setPageTitle } = props;

    useEffect(() => {
        setPageTitle("Навигация");
    }, [setPageTitle]);

    return (
        <h1>
            Навигация
        </h1>
    );
};
