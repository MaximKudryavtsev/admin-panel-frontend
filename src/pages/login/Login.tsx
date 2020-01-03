/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { LoginWrapper } from "../../components/login-wrapper";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { ILogin, IUser } from "../../entities";
import { login, signIn } from "../../api";
import { Transport } from "../../transport";
import { AppContext } from "../../context";
import { LinearProgress } from "@material-ui/core";
import { useState } from "react";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Невалидный e-mail")
        .required("Поле обязательно для заполнения"),
    password: Yup.string()
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
});

const styles = {
    mb40: css`
        margin-bottom: 40px;
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

    function onSubmit(data: ILogin) {
        setLoaderVisible(true);
        signIn(transport, data)
            .then((response) => transport.setToken(response.data))
            .then(() => {
                login(transport).then((response) => {
                    if (onSetLogged && onSetUser) {
                        onSetLogged(true);
                        onSetUser(response.data);
                        AppContext.getHistory().push("/panel/navigation");
                    }
                });
            });
    }

    return (
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
                    <div css={styles.mb40}>
                        <TextField name={"email"} label={"E-mail"} />
                    </div>
                    <div css={styles.mb40}>
                        <TextField name={"password"} label={"Пароль"} />
                    </div>
                    {loaderVisible && <LinearProgress />}
                </LoginWrapper>
            )}
        />
    );
};
