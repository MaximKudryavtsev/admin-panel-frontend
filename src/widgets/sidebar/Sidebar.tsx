import React, { useCallback } from "react";
import { IClientNavigation, INavigation } from "../../entities";
import { Divider, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { adminSidebarLinks, sidebarLinks } from "../../config";
import { AppContext } from "../../context";
import * as emotion from "emotion";

interface ISidebarProps {
    navigations: INavigation[];
}

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

export const Sidebar = (props: ISidebarProps) => {
    const { navigations = [] } = props;

    const transformNavigations = useCallback(() => {
        const result: IClientNavigation[] = [];
        navigations.map((item) => !item.parentId && item.isVisible && result.push({ navigation: item }));
        result.map((item, index) => {
            if (item.navigation.hasChild) {
                const children = navigations.filter((nav) => nav.parentId === item.navigation._id);
                result[index].children = children.map((nav) => ({ navigation: nav }));
            }
        });
        return result;
    }, [navigations]);

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
                {transformNavigations().map((item) => (
                    <React.Fragment key={item.navigation._id}>
                        <ListItem
                            button
                            key={item.navigation._id}
                            onClick={() =>
                                AppContext.getHistory().push(`/panel/page/${item.navigation._id}`)
                            }
                        >
                            <ListItemText primary={item.navigation.title} />
                        </ListItem>
                        {item.children && (
                            <List>
                                {item.children.map((child) => (
                                    <ListItem
                                        button
                                        key={child.navigation._id}
                                        className={styles.childrenNav}
                                        onClick={() =>
                                            AppContext.getHistory().push(
                                                `/panel/page/${child.navigation._id}`,
                                            )
                                        }
                                    >
                                        <ListItemText primary={child.navigation.title} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </React.Fragment>
                ))}
            </List>
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
