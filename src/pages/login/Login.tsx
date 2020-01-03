/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React from "react";
import { LoginWrapper } from "../../components/login-wrapper";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { ILogin, IUser } from "../../entities";
import { login, signIn } from "../../api";
import { Transport } from "../../transport";
import { AppContext } from "../../context";
import { LinearProgress, Typography } from "@material-ui/core";
import { useState } from "react";
import { getServerError } from "../../utils";
import Helmet from "react-helmet";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Невалидный e-mail")
        .required("Поле обязательно для заполнения"),
    password: Yup.string()
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
});

const styles = {
    mb20: css`
        margin-bottom: 20px;
    `,
    loader: css`
        width: 100%;
        display: flex;
        justify-content: center;
    `,
};

interface ILoginProps {
    transport: Transport;

    onSetLogged?(value: boolean): void;

    onSetUser?(user: IUser): void;
}

export const Login = (props: ILoginProps) => {
    const { transport, onSetLogged, onSetUser } = props;
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string | undefined>(undefined);

    const onSubmit = (data: ILogin) => {
        setLoaderVisible(true);
        setServerErrorMessage(undefined);
        signIn(transport, data)
            .then((response) => transport.setToken(response.data))
            .then(() => {
                login(transport)
                    .then((response) => {
                        if (onSetLogged && onSetUser) {
                            onSetLogged(true);
                            onSetUser(response.data);
                            AppContext.getHistory().push("/panel/navigation");
                        }
                    })
                    .catch(() => {
                        if (onSetLogged) {
                            onSetLogged(false);
                        }
                    });
            })
            .catch((error) => {
                const err = getServerError(error);
                setServerErrorMessage(err?.title);
                setLoaderVisible(false);
            });
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <CustomForm
                onSubmit={onSubmit}
                validationSchema={LoginSchema}
                validateOnChange={false}
                render={(form) => (
                    <LoginWrapper
                        title={"Авторизация"}
                        buttonTitle={"Войти"}
                        onSubmit={form?.submitForm}
                        buttonDisable={loaderVisible}
                    >
                        <div css={styles.mb20}>
                            <TextField name={"email"} label={"E-mail"} error={!!serverErrorMessage} />
                        </div>
                        <div css={styles.mb20}>
                            <TextField
                                name={"password"}
                                label={"Пароль"}
                                error={!!serverErrorMessage}
                            />
                        </div>
                        {loaderVisible && <LinearProgress />}
                        {serverErrorMessage && (
                            <Typography color={"error"} align={"center"}>
                                {serverErrorMessage}
                            </Typography>
                        )}
                    </LoginWrapper>
                )}
            />
        </React.Fragment>
    );
};
