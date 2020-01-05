import React, { useEffect } from "react";
import { useNavigation } from "../../hooks";

interface INavigationProps {
    setPageTitle(title: string): void;
}

export const Navigation = (props: INavigationProps) => {
    const { setPageTitle } = props;

    useEffect(() => {
        setPageTitle("Навигация");
    }, [setPageTitle]);

    const { navigations } = useNavigation("en");

    return (
        <h1>
            Навигация
        </h1>
    );
};
