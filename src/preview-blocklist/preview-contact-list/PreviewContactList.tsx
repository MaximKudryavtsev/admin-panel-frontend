import React from "react";
import { css } from "emotion";
import { EContactTypes, IContact } from "../../entities";

const classNames = {
    wrapper: css`
        display: grid;
        grid-column-gap: 20px;
        grid-template-columns: 50% 50%;
    `,
    column: css`
        display: grid;
        grid-row-gap: 48px;
    `,
    link: css`
        font-size: 50px;
        font-family: Ubuntu;
        font-weight: 700;
        line-height: 100%;
        text-decoration: none;
        display: inline-block;
        :hover {
            text-decoration: underline;
        };
    `,
    phone: css`
        color: #36465e;
        white-space: nowrap;
    `,
    email: css`
        color: #0061f3;
        white-space: nowrap;
        margin-bottom: 16px;
    `,
    description: css`
        font-family: Ubuntu;
        color: #a0a0a0;
        line-height: 20px;
        letter-spacing: 0.025em;
        font-family: 16px;
    `,
};

export const PreviewContactList = (props: {
    data: { blocks: { left: IContact[]; right: IContact[] } };
}) => (
    <div className={classNames.wrapper}>
        <div className={classNames.column}>
            {props.data.blocks.left.map((item, index) => (
                <React.Fragment key={index}>
                    {item.type.label === EContactTypes.EMAIL && (
                        <div>
                            <a
                                href={`mailto:${item.title}`}
                                className={css([classNames.email, classNames.link])}
                            >
                                {item.title}
                            </a>
                            {item.description && (
                                <div className={classNames.description}>{item.description}</div>
                            )}
                        </div>
                    )}
                    {item.type.label === EContactTypes.PHONE && (
                        <a
                            href={`tel:${item.value}`}
                            className={css([classNames.link, classNames.phone])}
                        >
                            {item.title}
                        </a>
                    )}
                </React.Fragment>
            ))}
        </div>
        <div className={classNames.column}>
            {props.data.blocks.right.map((item, index) => (
                <React.Fragment key={index}>
                    {item.type.label === EContactTypes.EMAIL && (
                        <div>
                            <a
                                href={`mailto:${item.title}`}
                                className={css([classNames.email, classNames.link])}
                            >
                                {item.title}
                            </a>
                            {item.description && (
                                <div className={classNames.description}>{item.description}</div>
                            )}
                        </div>
                    )}
                    {item.type.label === EContactTypes.PHONE && (
                        <a
                            href={`tel:${item.value}`}
                            className={css([classNames.link, classNames.phone])}
                        >
                            {item.title}
                        </a>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
);
