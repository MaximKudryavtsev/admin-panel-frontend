import React from "react";
import { EImageAndListBlockType, IImageAndListBlock } from "../../blocks/image-and-list";
import { css } from "emotion";

const classNames = {
    col2Wrapper: css`
        display: grid;
        transition: all 0.3s ease;
        grid-row-gap: 95px;
        grid-column-gap: 140px;
        grid-template-columns: 1fr 1fr;
    `,
    col4Wrapper: css`
        display: grid;
        grid-row-gap: 105px;
        grid-column-gap: 80px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `,
    decisionItem: css`
        display: grid;
        grid-template-rows: 152px auto auto;
    `,
    decisionImage: css`
        width: 160px;
    `,
    decisionList: css`
        margin-left: 20px;
    `,
    decisionListItem: css`
        color: #0c0c0c;
        width: 83.33333333333334%;
        font-size: 16px;
        font-family: Ubuntu;
        line-height: 140%;
        margin-bottom: 10px;
        letter-spacing: 0.025em;
    `,
    decisionTitle: css`
        margin: 32px 0 24px 0;
        font-size: 24px;
        line-height: 100%;
        font-family: Ubuntu;
    `,
    serviceItem: css`
        display: grid;
        flex-wrap: wrap;
        grid-column-gap: 20px;
        grid-template-columns: 160px 1fr;
    `,
    serviceImage: css`
        width: 160px;
        height: 152px;
    `,
    serviceTitle: css`
        font-size: 36px;
        font-weight: 500;
        line-height: 44px;
        margin-bottom: 16px;
        font-family: Ubuntu;
    `,
};

export const PreviewImageAndList = (props: { data: IImageAndListBlock }) => (
    <div
        className={css([
            props.data.columns === 2
                ? classNames.col2Wrapper
                : props.data.columns === 4
                ? classNames.col4Wrapper
                : classNames.col4Wrapper,
        ])}
    >
        {props.data.blocks.map((item, index) => (
            <>
                {props.data.type === EImageAndListBlockType.DECISION && (
                    <div className={classNames.decisionItem}>
                        <img
                            src={item.imageLink}
                            alt={item.title}
                            className={classNames.decisionImage}
                        />
                        <div className={classNames.decisionTitle}>{item.title}</div>
                        <ul className={classNames.decisionList}>
                            {item.list.map((listItem, listIndex) => (
                                <li key={listIndex} className={classNames.decisionListItem}>
                                    {listItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {props.data.type === EImageAndListBlockType.SERVICE && (
                    <div className={classNames.serviceItem}>
                        <img
                            src={item.imageLink}
                            alt={item.title}
                            className={classNames.serviceImage}
                        />
                        <div>
                            <div className={classNames.serviceTitle}>{item.title}</div>
                            <ul className={classNames.decisionList}>
                                {item.list.map((listItem, listIndex) => (
                                    <li key={listIndex} className={classNames.decisionListItem}>
                                        {listItem}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </>
        ))}
    </div>
);
