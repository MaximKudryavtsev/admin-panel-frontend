import React, { useState } from "react";
import { ILogo } from "../../blocks/clients-logo/logo";
import { css } from "emotion";

const classNames = {
    wrapper: css`
        display: grid;
        grid-row-gap: 40px;
        grid-column-gap: 20px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    imageWrapper: css`
        width: 200px;
    `,
    image: css`
        width: 100%;
    `,
};

const Logo = (props: { logo: ILogo }) => {
    const [hover, setHover] = useState(false);

    function onOver(): void {
        setHover(true);
    }

    function onLeave(): void {
        setHover(false);
    }

    return (
        <div onMouseLeave={onLeave} onMouseOver={onOver} className={classNames.imageWrapper}>
            {hover ? (
                <img src={props.logo.coloredLink} className={classNames.image} />
            ) : (
                <img src={props.logo.colorlessLink} className={classNames.image} />
            )}
        </div>
    );
};

export const ClientsLogoPreview = (props: { data: { blocks: ILogo[] } }) => {
    return (
        <div className={classNames.wrapper}>
            {props.data.blocks.map((item, index) => (
                <Logo logo={item} key={index} />
            ))}
        </div>
    );
};
