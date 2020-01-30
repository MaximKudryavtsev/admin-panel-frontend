import React, { createElement, useState } from "react";
import { EPageStatusLabel, IBlock, IDictionary } from "../../entities";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { css } from "emotion";
import { IBlockProps } from "../IBlockProps";
import { getBlock } from "../blockList";

interface IBlockTabsProps {
    blocks?: IBlock<any>[];
    statuses?: IDictionary[];

    onUpdateBlock?(id: string, block: IBlock<any>): void;

    onDeleteBlock?(id: string): void;
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
    const {blocks = [], statuses = [], onDeleteBlock, onUpdateBlock} = props;

    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const published = blocks.filter((item) => item.status.label === EPageStatusLabel.PUBLISHED);
    const draft = blocks.filter((item) => item.status.label === EPageStatusLabel.DRAFT);

    const handleUpdateBlock = (id: string, data: IBlock<any>) => {
        if (onUpdateBlock) {
            onUpdateBlock(id, data);
        }
    };

    const handleDeleteBlock = (id: string) => {
        if (onDeleteBlock) {
            onDeleteBlock(id)
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
                        {published.map((item) => getBlock(item.type.label) &&  (
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
                                    onSubmit: handleUpdateBlock,
                                })}
                            </div>
                        ))}
                    </div>
                )}
                {value === 1 && (
                    <div>
                        {draft.map((item) => getBlock(item.type.label) && (
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
                                    onSubmit: handleUpdateBlock,
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
