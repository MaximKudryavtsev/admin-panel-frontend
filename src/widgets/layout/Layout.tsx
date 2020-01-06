import React, { FC, useCallback, useState } from "react";
import * as emotion from "emotion";
import {
    AppBar,
    Avatar,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { IClientNavigation, INavigation, IUser } from "../../entities";
import { AccountCircle } from "@material-ui/icons";
import { adminSidebarLinks, sidebarLinks } from "../../config";
import { AppContext } from "../../context";
import Helmet from "react-helmet";
import { ConfirmPopup } from "../../components/confirm-popup";

interface ILayoutProps {
    title: string;
    user?: IUser;
    navigations: INavigation[];

    onLogout?(): void;
}

const styles = {
    root: emotion.css`
        display: flex;
    `,
    appBar: emotion.css`
        width: calc(100% - 300px) !important;
        margin-left: 300px;
    `,
    content: emotion.css`
        width: calc(100% - 300px) !important;
        height: calc(100vh - 64px);
        transform: translate(0, 64px);
        box-sizing: border-box;
        overflow-y: auto;
        padding: 24px;
        background: #f5f5f5;
    `,
    avatarIcon: emotion.css`
        margin-left: auto !important;
    `,
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

export const Layout: FC<ILayoutProps> = (props) => {
    const { title, children, user, onLogout, navigations } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);

    function onOpenLogoutPopup(): void {
        setLogoutPopupVisible(true);
    }

    function onCloseLogoutPopup(): void {
        setLogoutPopupVisible(false);
    }

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleMenuClose();
        if (onLogout) {
            onLogout();
        }
    };

    const goToProfile = () => {
        AppContext.getHistory().push("/panel/profile");
        handleMenuClose();
    };

    const transformNavigations = useCallback(() => {
        const result: IClientNavigation[] = [];
        navigations.map((item) => !item.parentId && result.push({ navigation: item }));
        result.map((item, index) => {
            if (item.navigation.hasChild) {
                const children = navigations.filter((nav) => nav.parentId === item.navigation._id);
                result[index].children = children.map((nav) => ({ navigation: nav }));
            }
        });
        return result;
    }, [navigations]);

    return (
        <div className={styles.root}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <AppBar position={"fixed"} className={styles.appBar} color={"primary"}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                    <Tooltip title={user?.login || user?.email || ""}>
                        <IconButton
                            onClick={handleProfileMenuOpen}
                            color={"inherit"}
                            className={styles.avatarIcon}
                        >
                            {user?.avatar ? <Avatar src={user?.avatar} /> : <AccountCircle />}
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={goToProfile}>Профиль</MenuItem>
                        <MenuItem onClick={onOpenLogoutPopup}>Выход</MenuItem>
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
                    {transformNavigations().map((item) => (
                        <>
                            <ListItem button key={item.navigation._id}>
                                <ListItemText primary={item.navigation.title} />
                            </ListItem>
                            {item.children && (
                                <Collapse in={true}>
                                    <List>
                                        {item.children.map((child) => (
                                            <ListItem
                                                button
                                                key={child.navigation._id}
                                                className={styles.childrenNav}
                                            >
                                                <ListItemText primary={child.navigation.title} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </>
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
            <div className={styles.content}>{children}</div>
            <ConfirmPopup
                title={"Вы действительно хотите выйти?"}
                submitTitle={"Выйти"}
                open={logoutPopupVisible}
                onClose={onCloseLogoutPopup}
                onSubmit={logout}
            />
        </div>
    );
};
