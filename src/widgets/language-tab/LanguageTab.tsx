import React, { Children, FC, useContext, useEffect, useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { css } from "emotion";
import { RoleContext } from "../../app/App";
import { EUserRoles } from "../../entities";

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
    const roles = useContext(RoleContext);

    const isTabAvailable = (roleLabel: string) => {
        return roles && !!roles.find((item) => item.label === roleLabel);
    };

    const defaultValue = isTabAvailable(EUserRoles.RU) ? 0 : isTabAvailable(EUserRoles.EN) ? 1 : 0;
    const [value, setValue] = useState(defaultValue);

    useEffect(() => setValue(defaultValue), [defaultValue]);

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
                    <Tab label="Русский сайт" disabled={!isTabAvailable(EUserRoles.RU)} />
                    <Tab label="Английский сайт" disabled={!isTabAvailable(EUserRoles.EN)} />
                </Tabs>
            </Paper>
            <div className={classNames.content}>
                {isTabAvailable(EUserRoles.RU) && value === 0 && childArray && childArray[0] && childArray[0]}
                {isTabAvailable(EUserRoles.EN) && value === 1 && childArray && childArray[1] && childArray[1]}
            </div>
        </div>
    );
};
