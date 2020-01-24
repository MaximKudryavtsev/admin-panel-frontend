import React, { useEffect } from "react";

interface IPageListProps {
    setPageTitle(title: string): void;
}

export const PagesList = (props: IPageListProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Страницы"), [setPageTitle]);

    return <div>Pages</div>;
};
