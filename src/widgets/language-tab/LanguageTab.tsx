import React, { Children, FC, useEffect, useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { css } from "emotion";
import { EUserRoles } from "../../entities";
import { useRole } from "../../hooks";

const classNames = {
    content: css`
        margin-top: 20px;
    `,
};

interface ILanguageTabProps {
    onSwitch?(): void;
}

export const LanguageTab: FC<ILanguageTabProps> = (props) => {
    const { children, onSwitch } = props;

    const { hasRole } = useRole();

    const defaultValue = hasRole(EUserRoles.RU) ? 0 : hasRole(EUserRoles.EN) ? 1 : 0;
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
            {(hasRole(EUserRoles.SUPER_ADMIN) || (hasRole(EUserRoles.EN) && hasRole(EUserRoles.RU))) && (
                <Paper>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                    >
                        <Tab label="Русский сайт" disabled={!hasRole(EUserRoles.RU)} />
                        <Tab label="Английский сайт" disabled={!hasRole(EUserRoles.EN)} />
                    </Tabs>
                </Paper>
            )}
            <div className={classNames.content}>
                {hasRole(EUserRoles.RU) &&
                    value === 0 &&
                    childArray &&
                    childArray[0] &&
                    childArray[0]}
                {hasRole(EUserRoles.EN) &&
                    value === 1 &&
                    childArray &&
                    childArray[1] &&
                    childArray[1]}
            </div>
        </div>
    );
};
