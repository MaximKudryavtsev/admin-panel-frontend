/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { LoginWrapper } from "../../components/login-wrapper";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { ILogin, IToken, TResponse } from "../../entities";
import { login, signIn } from "../../api";
import { Transport } from "../../transport";
import { AppContext } from "../../context";

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
};

interface ILoginProps {
    transport: Transport;

    onSetLogged?(value: boolean): void;
}

export const Login = (props: ILoginProps) => {
    const { transport, onSetLogged } = props;
    function onSubmit(data: ILogin) {
        signIn(transport, data)
            .then((response) => transport.setToken(response.data))
            .then(() => {
                login(transport).then(() => {
                    if (onSetLogged) {
                        onSetLogged(true);
                        AppContext.getHistory().push("/");
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
                >
                    <div css={styles.mb40}>
                        <TextField name={"email"} label={"E-mail"} />
                    </div>
                    <div css={styles.mb40}>
                        <TextField name={"password"} label={"Пароль"} />
                    </div>
                </LoginWrapper>
            )}
        />
    );
};
