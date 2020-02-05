import React, { useEffect } from "react";
import { ENavigationType, IDictionary, IFooter, TLang, TNavigationPage } from "../../entities";
import { css } from "emotion";
import { CustomForm } from "../../components/custom-form";
import { TextField } from "../../components/text-field";
import { Save } from "@material-ui/icons";
import { isEqual } from "lodash";
import { Button, Card, Divider, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { getServerError } from "../../utils";
import { Loading } from "../../components/loading";
import { Select } from "../../components/select";

interface IFooterPanel {
    footer?: IFooter;
    lang: TLang;
    navigationTypes?: IDictionary[];
    pages?: TNavigationPage[];

    updateFooter?(data: Partial<IFooter>): Promise<void>;

    setLanguage(lang: TLang): void;
}

const classNames = {
    wrapper: css`
        width: 600px;
        padding: 24px;
    `,
    field: css`
        margin-bottom: 24px;
    `,
    button: css`
        width: 100%;
    `,
};

export const FooterPanel = (props: IFooterPanel) => {
    const { footer, lang, updateFooter, setLanguage, navigationTypes = [], pages = [] } = props;

    useEffect(() => setLanguage(lang), [lang, setLanguage]);

    const { enqueueSnackbar } = useSnackbar();

    const handleUpdate = (data: Partial<IFooter>) => {
        if (updateFooter) {
            updateFooter(data)
                .then(() => {
                    enqueueSnackbar("Успешно сохранено!", { variant: "success" });
                })
                .catch((err) => {
                    const error = getServerError(err);
                    enqueueSnackbar(error?.title, { variant: "error" });
                });
        }
    };

    return (
        <Card className={classNames.wrapper}>
            <Loading loaded={footer}>
                <CustomForm<IFooter>
                    data={footer}
                    onSubmit={handleUpdate}
                    render={(form) => (
                        <div>
                            <TextField
                                name={"copyright"}
                                label={"Копирайт"}
                                textarea
                                classes={{ root: classNames.field }}
                            />
                            <Divider />
                            <Typography>Контакты</Typography>
                            <Divider />
                            <TextField
                                name={"buttonTitle"}
                                label={"Заголовок кнопки"}
                                classes={{ root: classNames.field }}
                            />
                            <Select
                                name={"navigationTypeId"}
                                label={"Тип ссылки"}
                                options={navigationTypes.map((item) => ({
                                    value: item._id,
                                    label: item.title,
                                }))}
                                classes={{ root: classNames.field }}
                            />
                            {navigationTypes.find(
                                (item) => item._id === form?.values.navigationTypeId,
                            )?.label === ENavigationType.INTERNAL ? (
                                <Select
                                    name={"buttonLink"}
                                    label={"Ссылка кнопки"}
                                    options={pages.map((item) => ({
                                        value: item._id,
                                        label: item.title,
                                    }))}
                                    classes={{ root: classNames.field }}
                                />
                            ) : (
                                <TextField
                                    name={"buttonLink"}
                                    label={"Ссылка кнопки"}
                                    classes={{ root: classNames.field }}
                                />
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={
                                    !form?.isValid || isEqual(form?.values, form?.initialValues)
                                }
                                className={classNames.button}
                            >
                                Сохранить
                            </Button>
                        </div>
                    )}
                />
            </Loading>
        </Card>
    );
};
