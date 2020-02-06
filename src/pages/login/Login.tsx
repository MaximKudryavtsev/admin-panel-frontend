import React from "react";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import * as Yup from "yup";
import { ILogin, IUser } from "../../entities";
import { ProfileAPI, signIn } from "../../api";
import { Transport } from "../../transport";
import { AppContext } from "../../context";
import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    Grid,
    LinearProgress,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useState } from "react";
import { getServerError } from "../../utils";
import Helmet from "react-helmet";
import { Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Невалидный e-mail")
        .required("Поле обязательно для заполнения"),
    password: Yup.string()
        .min(6, "Пароль должен сожержать минимум 6 символов")
        .required("Поле обязательно для заполнения"),
});

interface ILoginProps {
    transport: Transport;

    onSetUser?(user: IUser): void;

    onSignIn?(): void;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginBottom: 20
    },
    field: {
        margin: "0 0 40px 0"
    },
    row: {
        marginBottom: 20,
    },
    loader: {
        width: "100%",
        marginBottom: 30
    }
}));

export const Login = (props: ILoginProps) => {
    const { transport, onSetUser, onSignIn } = props;
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string | undefined>(undefined);

    const onSubmit = (data: ILogin) => {
        setLoaderVisible(true);
        setServerErrorMessage(undefined);
        signIn(transport, data)
            .then((response) => transport.setToken(response.data))
            .then(() => {
                ProfileAPI.fetchProfile(transport)
                    .then((response) => {
                        if (onSetUser) {
                            onSetUser(response.data);
                            if (onSignIn) {
                                onSignIn();
                                AppContext.getHistory().push("/profile");
                            }
                        }
                    })
                    .catch(() => AppContext.getHistory().push("/sign-in"));
            })
            .catch((error) => {
                const err = getServerError(error);
                setServerErrorMessage(err?.title);
                setLoaderVisible(false);
            });
    };
    const classes = useStyles();

    return (
        <React.Fragment>
            <Helmet>
                <title>Авторизация</title>
            </Helmet>
            <CustomForm
                onSubmit={onSubmit}
                validationSchema={LoginSchema}
                validateOnChange
                render={(form) => (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <Lock />
                            </Avatar>
                            <Typography component="h1" variant="h5" className={classes.row}>
                                Авторизация
                            </Typography>
                            <TextField
                                name={"email"}
                                label={"E-mail"}
                                error={!!serverErrorMessage}
                                classes={{ root: classes.field }}
                            />
                            <TextField
                                name={"password"}
                                label={"Пароль"}
                                error={!!serverErrorMessage}
                                type={"password"}
                                classes={{ root: classes.field }}
                            />
                            {loaderVisible && <LinearProgress className={`${classes.loader} ${classes.row}`} />}
                            {serverErrorMessage && (
                                <Typography color={"error"} align={"center"} className={classes.row}>
                                    {serverErrorMessage}
                                </Typography>
                            )}
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={form?.submitForm}
                                disabled={loaderVisible}
                                className={classes.submit}
                            >
                                Войти
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/forgot-password">
                                        Забыли пароль?
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                )}
            />
        </React.Fragment>
    );
};
