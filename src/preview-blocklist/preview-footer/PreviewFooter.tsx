import React from "react";
import { EContactTypes, IClientFooter } from "../../entities";
import { css } from "emotion";

const classNames = {
    wrapper: css`
        display: flex;
        margin-bottom: 80px;
    `,
    menu: css`
        width: 100%;
        display: grid;
        grid-column-gap: 20px;
        grid-template-columns: 220px 220px 220px 220px;
    `,
    menuTitle: css`
        color: rgb(160, 160, 160);
        line-height: 32px;
        margin-bottom: 8px;
        font-family: Ubuntu;
        text-transform: uppercase;
    `,
    childrenTitle: css`
        color: #0c0c0c;
        display: block;
        font-size: 12px;
        font-family: Ubuntu;
        line-height: 12px;
        margin-bottom: 20px;
        letter-spacing: 0.1em;
        text-decoration: none;
        :last-child {
            margin-bottom: 0;
        }
    `,
    copyright: css`
        left: 0;
        bottom: 80px;
        position: fixed;
        font-size: 12px;
        line-height: 24px;
        letter-spacing: 0.1em;
        color: rgb(160, 160, 160);
        transform: rotate(-90deg) translate(50%);
    `,
    right: css`
        margin-left: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
    `,
    contacts: css`
        margin-bottom: 48px;
    `,
    contact: css`
        color: #0061f3;
        display: block;
        font-size: 16px;
        font-family: Ubuntu;
        line-height: 24px;
        white-space: nowrap;
        margin-bottom: 8px;
        text-decoration: none;
        text-align: right;
    `,
    button: css`
        color: #fff;
        width: 220px;
        bottom: 0;
        cursor: pointer;
        height: 50px;
        display: flex;
        padding: 0 40px;
        font-size: 14px;
        box-shadow: 0px 15px 30px rgba(0, 78, 255, 0.4);
        box-sizing: border-box;
        transition: background 0.3s ease, box-shadow 0.3s ease;
        align-items: center;
        font-family: Ubuntu;
        white-space: nowrap;
        border-radius: 6px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        justify-content: center;
        text-decoration: none;
        background-color: #0061f3;
    `,
};

export const PreviewFooter = (props: { footer?: IClientFooter }) => {
    const { footer } = props;

    const getChildren = (parentId: string) => {
        return footer?.navigations.filter((item) => item.parentId === parentId) || [];
    };

    return (
        <div className={classNames.wrapper}>
            <div className={classNames.copyright}>{footer?.copyright}</div>
            <div className={classNames.menu}>
                {footer &&
                    footer.navigations &&
                    footer?.navigations
                        ?.filter((item) => item.hasChild)
                        .sort((left, right) => (left.position > right.position ? 1 : -1))
                        .map((item) => (
                            <div key={item._id}>
                                <div className={classNames.menuTitle}>{item.title}</div>
                                <div>
                                    {getChildren(item._id)
                                        .sort((left, right) =>
                                            left.position > right.position ? 1 : -1,
                                        )
                                        .map((child) => (
                                            <div
                                                key={child._id}
                                                className={classNames.childrenTitle}
                                            >
                                                {child.title}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
            </div>
            <div className={classNames.right}>
                <div className={classNames.contacts}>
                    {footer?.contacts &&
                        footer.contacts.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.type.label === EContactTypes.PHONE && (
                                    <a href={`tel:${item.value}`} className={classNames.contact}>
                                        {item.title}
                                    </a>
                                )}
                                {item.type.label === EContactTypes.EMAIL && (
                                    <a href={`mailto:${item.title}`} className={classNames.contact}>
                                        {item.title}
                                    </a>
                                )}
                            </React.Fragment>
                        ))}
                </div>
                <a href={"#"} className={classNames.button}>
                    {footer?.buttonTitle}
                </a>
            </div>
        </div>
    );
};
