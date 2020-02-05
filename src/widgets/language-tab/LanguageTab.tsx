import React, { Children, FC, useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { css } from "emotion";

const classNames = {
    content: css`
        margin-top: 20px;
    `
};

interface ILanguageTabProps {
    onSwitch?(): void;
}

export const LanguageTab: FC<ILanguageTabProps> = (props) => {
    const { children, onSwitch } = props;

    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        if (onSwitch) {
            onSwitch();
        }
    };

    const childArray = Children.map(children, (child) => child);

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
                    <Tab label="Русский сайт" />
                    <Tab label="Английский сайт" />
                </Tabs>
            </Paper>
            <div className={classNames.content}>
                {value === 0 && childArray && childArray[0] && childArray[0]}
                {value === 1 && childArray && childArray[1] && childArray[1]}
            </div>
        </div>
    );
};
