import React, { useEffect, useState } from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { NavigationContent } from "../navigation/navigation-content";
import { css } from "emotion";

interface IFooterProps {
    setPageTitle(title: string): void;
}

const styles = {
    wrapper: css`
        margin-top: 20px;
    `,
};

export const Footer = (props: IFooterProps) => {
    const { setPageTitle } = props;

    useEffect(() => setPageTitle("Футер"), [setPageTitle]);

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
                {value === 0 && (
                    <NavigationContent
                        lang={"ru"}
                        type={"footer"}
                    />
                )}
                {value === 1 && (
                    <NavigationContent
                        lang={"en"}
                        type={"footer"}
                    />
                )}
            </div>
        </div>
    );
};
