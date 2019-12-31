/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { LoginWrapper } from "../../components/login-wrapper";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { ILogin } from "../../entities";
import { signIn } from "../../api";

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

export const Login = () => {
    function onSubmit(data: ILogin) {
        signIn(data);
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
