import React, { useState } from "react";
import { Transport } from "../../transport";
import Helmet from "react-helmet";
import * as Yup from "yup";
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
import { Lock } from "@material-ui/icons";
import { TextField } from "../../components/text-field";
import { CustomForm } from "../../components/custom-form";
import { forgotPassword } from "../../api";
import { getServerError } from "../../utils";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";

interface IForgotPasswordProps {
    transport: Transport;
}

const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Невалидный e-mail")
        .required("Поле обязательно для заполнения"),
});

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
        marginBottom: 20,
    },
    field: {
        margin: "0 0 20px 0",
    },
    row: {
        marginBottom: 20,
    },
    loader: {
        width: "100%",
        marginBottom: 30,
    },
    successMessage: {
        color: green[600]
    }
}));

export const ForgotPassword = (props: IForgotPasswordProps) => {
    const { transport } = props;
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string | undefined>(undefined);
    const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

    const onSubmit = (data: { email: string }) => {
        setLoaderVisible(true);
        setServerErrorMessage(undefined);
        setSuccessMessage(undefined);
        forgotPassword(transport, data)
            .then((response) => {
                setLoaderVisible(false);
                setSuccessMessage(response.data);
            })
            .catch((error) => {
                const err = getServerError(error);
                setLoaderVisible(false);
                setServerErrorMessage(err?.title);
            });
    };

    const classes = useStyles();
    return (
        <>
            <Helmet>
                <title>Восстановление пароля</title>
            </Helmet>
            <CustomForm
                onSubmit={onSubmit}
                validationSchema={FormSchema}
                validateOnChange={false}
                render={(form) => (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <Lock />
                            </Avatar>
                            <Typography component="h1" variant="h5" className={classes.row}>
                                Восстановление пароля
                            </Typography>
                            <TextField
                                name={"email"}
                                label={"E-mail"}
                                error={!!serverErrorMessage}
                                classes={{ root: classes.field }}
                            />
                            {loaderVisible && (
                                <LinearProgress className={`${classes.loader} ${classes.row}`} />
                            )}
                            {serverErrorMessage && (
                                <Typography
                                    color={"error"}
                                    align={"center"}
                                    className={classes.row}
                                >
                                    {serverErrorMessage}
                                </Typography>
                            )}
                            {successMessage && (
                                <Typography
                                    align={"center"}
                                    className={`${classes.row} ${classes.successMessage}`}
                                >
                                    {successMessage}
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
                                Отправить
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/sign-in">
                                        Войти
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                )}
            />
        </>
    );
};
