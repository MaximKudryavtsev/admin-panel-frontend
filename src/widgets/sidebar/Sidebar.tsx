import React from "react";
import { Divider, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { adminSidebarLinks, sidebarLinks } from "../../config";
import { AppContext } from "../../context";
import * as emotion from "emotion";

const styles = {
    drawer: emotion.css`
        width: 300px;
    `,
    drawerPaper: emotion.css`
        width: 300px;
    `,
    toolbar: emotion.css`
        width: 100%;
        height: 64px;
    `,
    childrenNav: emotion.css`
        padding-left: 40px !important;
    `,
};

export const Sidebar = () => {
    return (
        <Drawer
            variant={"permanent"}
            anchor={"left"}
            className={styles.drawer}
            classes={{
                paper: styles.drawerPaper,
            }}
        >
            <div className={styles.toolbar} />
            <Divider />
            <List>
                {sidebarLinks.map((item, key) => (
                    <ListItem
                        button
                        key={key}
                        onClick={() => AppContext.getHistory().push(item.link)}
                    >
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {adminSidebarLinks.map((item, key) => (
                    <ListItem
                        button
                        key={key}
                        onClick={() => AppContext.getHistory().push(item.link)}
                    >
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
