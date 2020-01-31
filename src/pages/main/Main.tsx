import React, { useEffect } from "react";

interface IMainProps {
    setPageTitle(title: string): void;
}

export const Main = (props: IMainProps) => {
    const { setPageTitle } = props;

    useEffect(() => {
        setPageTitle("Главная")
    }, [setPageTitle]);

    return (
        <h1>23</h1>
    );
};
