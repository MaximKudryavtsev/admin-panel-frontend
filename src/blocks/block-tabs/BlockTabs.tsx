import React, { createElement, useState } from "react";
import { EPageStatusLabel, IBlock, IDictionary, TLang } from "../../entities";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { css } from "emotion";
import { IBlockProps } from "../IBlockProps";
import { getBlock } from "../blockList";

interface IBlockTabsProps {
    blocks?: IBlock<any>[];
    statuses?: IDictionary[];
    baseUrl?: string;
    lang: TLang;

    onUpdateBlock?(id: string, block: IBlock<any>): Promise<void>;

    onDeleteBlock?(id: string): void;

    onOpenFullscreen?(): void;
}

const classNames = {
    content: css`
        margin-top: 20px;
    `,
    button: css`
        margin: 30px 0;
    `,
    titleGroup: css`
        margin-bottom: 10px;
    `,
};

export const BlockTabs = (props: IBlockTabsProps) => {
    const {
        blocks = [],
        statuses = [],
        onDeleteBlock,
        onUpdateBlock,
        baseUrl,
        onOpenFullscreen,
        lang,
    } = props;

    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const published = blocks
        .filter((item) => item.status.label === EPageStatusLabel.PUBLISHED)
        .sort((left, right) => (left.position > right.position ? 1 : -1));
    const draft = blocks
        .filter((item) => item.status.label === EPageStatusLabel.DRAFT)
        .sort((left, right) => (left.position > right.position ? 1 : -1));

    const handleDeleteBlock = (id: string) => {
        if (onDeleteBlock) {
            onDeleteBlock(id);
        }
    };

    return (
        <div>
            <Paper>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab label={`Опубликовано (${published.length})`} />
                    <Tab label={`Черновик (${draft.length})`} />
                </Tabs>
            </Paper>
            <div className={classNames.content}>
                {value === 0 && (
                    <div>
                        {published.map(
                            (item) =>
                                getBlock(item.type.label) && (
                                    <div
                                        key={item._id}
                                        className={css`
                                            margin-bottom: 20px;
                                        `}
                                    >
                                        {createElement<IBlockProps>(getBlock(item.type.label), {
                                            block: item,
                                            statuses,
                                            onDelete: handleDeleteBlock,
                                            onSubmit: onUpdateBlock,
                                            baseUrl,
                                            onOpenFullscreen,
                                            lang
                                        })}
                                    </div>
                                ),
                        )}
                    </div>
                )}
                {value === 1 && (
                    <div>
                        {draft.map(
                            (item) =>
                                getBlock(item.type.label) && (
                                    <div
                                        key={item._id}
                                        className={css`
                                            margin-bottom: 20px;
                                        `}
                                    >
                                        {createElement<IBlockProps>(getBlock(item.type.label), {
                                            block: item,
                                            statuses,
                                            onDelete: handleDeleteBlock,
                                            onSubmit: onUpdateBlock,
                                            baseUrl,
                                            onOpenFullscreen,
                                            lang
                                        })}
                                    </div>
                                ),
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
