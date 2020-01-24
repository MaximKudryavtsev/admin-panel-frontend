import React, { useEffect, useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { NavigationContent } from "./navigation-content";
import { css } from "emotion";

interface INavigationProps {
    setPageTitle(title: string): void;
}

const styles = {
    wrapper: css`
        margin-top: 20px;
    `,
};

export const Navigation = (props: INavigationProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Навигация"), [setPageTitle]);

    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
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
                    <Tab label="Русский сайт" />
                    <Tab label="Английский сайт" />
                </Tabs>
            </Paper>
            <div className={styles.wrapper}>
                {value === 0 && <NavigationContent lang={"ru"} type={"navigation"} />}
                {value === 1 && <NavigationContent lang={"en"} type={"navigation"} />}
            </div>
        </div>
    );
};
