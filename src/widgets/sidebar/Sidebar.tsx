import React from "react";
import { Divider, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { adminSidebarLinks, sidebarLinks } from "../../config";
import { AppContext } from "../../context";
import * as emotion from "emotion";
import { EUserRoles } from "../../entities";
import { useRole } from "../../hooks";

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
    const { hasRole } = useRole();

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
                        selected={window.location.pathname
                            .split("/")
                            .join("/")
                            .includes(item.link)}
                    >
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </List>
            {!!hasRole(EUserRoles.SUPER_ADMIN) && (
                <>
                    <Divider />
                    <List>
                        {adminSidebarLinks.map((item, key) => (
                            <ListItem
                                button
                                key={key}
                                onClick={() => AppContext.getHistory().push(item.link)}
                                selected={window.location.pathname
                                    .split("/")
                                    .join("/")
                                    .includes(item.link)}
                            >
                                <ListItemText primary={item.title} />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Drawer>
    );
};
