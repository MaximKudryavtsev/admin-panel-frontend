import React, { FC } from "react";
import * as emotion from "emotion";
import {
    AppBar,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

interface ILayoutProps {
    title: string;
}

const styles = {
    root: emotion.css`
        display: flex;
    `,
    appBar: emotion.css`
        width: calc(100% - 300px) !important;
        margin-left: 300px;
    `,
    drawer: emotion.css`
        width: 300px;
    `,
    drawerPaper: emotion.css`
        width: 300px;
    `,
    content: emotion.css`
        width: calc(100% - 300px) !important;
        padding: 68px 24px 24px 24px;
    `,
    toolbar: emotion.css`
        width: 100%;
        height: 64px;
    `
};

export const Layout: FC<ILayoutProps> = (props) => {
    const { title, children } = props;
    return (
        <div className={styles.root}>
            <AppBar position={"fixed"} className={styles.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
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
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={styles.content}>{children}</div>
        </div>
    );
};
