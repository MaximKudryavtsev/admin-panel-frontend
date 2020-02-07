import React, { useEffect } from "react";
import { useAdmin, useCustomSnackbar, useRole } from "../../hooks";
import { css } from "emotion";
import { Button } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import { Card } from "../../components/card";
import { EUserRoles, TLang } from "../../entities";
import { getServerError } from "../../utils";

interface IControlPanelProps {
    setPageTitle(title: string): void;
}

const classNames = {
    wrapper: css`
        display: flex;
        flex-wrap: wrap;
    `,
    card: css`
        margin: 0 24px 24px 0;
    `,
    contacts: css`
        width: 600px;
        box-sizing: border-box;
    `,
    blog: css`
        height: fit-content;
    `,
};

export const ControlPanel = (props: IControlPanelProps) => {
    const { setPageTitle } = props;
    const { updateBlog } = useAdmin();
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
    const { hasRole } = useRole();

    useEffect(() => setPageTitle("Панель управления"), [setPageTitle]);

    const onUpdateBlog = (lang: TLang) => {
        updateBlog(lang)
            .then(() => showSuccessSnackbar("Обновлено!"))
            .catch((err) => {
                const error = getServerError(err);
                if (error) {
                    showErrorSnackbar(error.title);
                }
            });
    };

    return (
        <div className={classNames.wrapper}>
            <Card title={"Блог"} classes={{ root: css([classNames.card, classNames.blog]) }}>
                {hasRole(EUserRoles.RU) && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Update />}
                        className={css`
                            margin-right: 24px;
                        `}
                        onClick={() => onUpdateBlog("ru")}
                    >
                        Обновить русский блог
                    </Button>
                )}
                {hasRole(EUserRoles.EN) && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Update />}
                        onClick={() => onUpdateBlog("en")}
                    >
                        Обновить английский блог
                    </Button>
                )}
            </Card>
        </div>
    );
};
