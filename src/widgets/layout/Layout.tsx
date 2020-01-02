import React, { FC, useState } from "react";
import * as emotion from "emotion";
import {
    AppBar,
    Avatar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { IUser } from "../../entities";
import { AccountCircle } from "@material-ui/icons";

interface ILayoutProps {
    title: string;
    user?: IUser;
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
    `,
    avatarIcon: emotion.css`
        margin-left: auto !important;
    `,
};

export const Layout: FC<ILayoutProps> = (props) => {
    const { title, children, user } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    function onMenuOpen(): void {
        setMenuOpen(true);
    }

    function onMenuClose(): void {
        setMenuOpen(false);
    }

    return (
        <div className={styles.root}>
            <AppBar position={"fixed"} className={styles.appBar} color={"primary"}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={onMenuOpen}
                        color={"inherit"}
                        className={styles.avatarIcon}
                        title={user?.email}
                    >
                        {user?.avatar ? <Avatar src={user?.avatar} /> : <AccountCircle />}
                    </IconButton>
                    <Menu
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={menuOpen}
                        onClose={onMenuClose}
                    >
                        <MenuItem onClick={onMenuClose}>Профиль</MenuItem>
                        <MenuItem onClick={onMenuClose}>Выход</MenuItem>
                    </Menu>
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
