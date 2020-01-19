import React, { FC, useState } from "react";
import * as emotion from "emotion";
import {
    AppBar,
    Avatar,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@material-ui/core";
import { INavigation, IUser } from "../../entities";
import { AccountCircle } from "@material-ui/icons";
import { AppContext } from "../../context";
import Helmet from "react-helmet";
import { ConfirmPopup } from "../../components/confirm-popup";
import { Sidebar } from "../sidebar";
import { Menu } from "../../components/menu";

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
        margin-top: 64px;
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
                        anchor={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        options={[
                            {
                                value: "Профиль",
                                handler: goToProfile,
                            },
                            {
                                value: "Выход",
                                handler: onOpenLogoutPopup,
                            },
                        ]}
                    />
                </Toolbar>
            </AppBar>
            <Sidebar navigations={navigations} />
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
