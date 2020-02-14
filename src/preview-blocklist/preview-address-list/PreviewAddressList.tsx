import React from "react";
import { IAddressBlock } from "../../blocks/address-list";
import { css } from "emotion";

const classNames = {
    wrapper: css`
        display: grid;
        grid-column-gap: 20px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    city: css`
        font-size: 22px;
        line-height: 120%;
        margin-bottom: 24px;
        font-family: Ubuntu;
    `,
    address: css`
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 8px;
        font-family: Ubuntu;
        width: 83.33333333333334%;
    `,
    phone: css`
        font-size: 12px;
        line-height: 18px;
        margin-bottom: 16px;
        font-family: Ubuntu;
    `,
    workingHours: css`
        font-size: 12px;
        line-height: 18px;
        color: rgb(160, 160, 160);
        text-transform: uppercase;
    `,
};

export const PreviewAddressList = (props: { data: IAddressBlock }) => (
    <div className={classNames.wrapper}>
        {props.data.blocks.map((item, index) => (
            <div key={index}>
                <div className={classNames.city}>{item.city}</div>
                <div className={classNames.address}>{item.address}</div>
                <div className={classNames.phone}>{item.phone}</div>
                <div className={classNames.workingHours}>{item.workingHours}</div>
            </div>
        ))}
    </div>
);
