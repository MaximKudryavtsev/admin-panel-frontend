import React, { useEffect } from "react";

interface IFooterProps {
    setPageTitle(title: string): void;
}

export const Footer = (props: IFooterProps) => {
    const { setPageTitle } = props;

    useEffect(() => {
        setPageTitle("Футер")
    }, [setPageTitle]);

    return (
        <div>Fooetr</div>
    );
};
