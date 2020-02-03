import React, { useEffect, useState } from "react";
import { IHeader, IHeaderLogo, TLang, TNavigationPage } from "../../entities";
import { css } from "emotion";
import { UploadAvatar } from "../upload-avatar";
import { CustomForm } from "../../components/custom-form";
import * as Yup from "yup";
import { TextField } from "../../components/text-field";
import { Select } from "../../components/select";
import { Save } from "@material-ui/icons";
import { isEqual } from "lodash";
import { Button, CircularProgress } from "@material-ui/core";

interface IHeaderPanel {
    header?: IHeader;
    lang?: TLang;
    pages?: TNavigationPage[];

    onSubmit?(data: Partial<IHeader>): Promise<void>;

    setLanguage(lang: TLang): void;

    onUploadLogo?(data: IHeaderLogo): Promise<void>;

    onDeleteLogo?(): Promise<void>;
}

const classNames = {
    wrapper: css`
        display: grid;
        grid-template-columns: 300px 450px;
        grid-column-gap: 60px;
    `,
    header: css`
        padding: 5px 10px 5px 20px;
        display: flex;
        align-items: center;
    `,
    image: css`
        height: 250px;
    `,
    button: css`
        width: 100%;
    `,
    field: css`
        margin-bottom: 30px;
    `,
};

const ValidationSchema = Yup.object().shape({
    buttonTitle: Yup.string().required("Поле обязательно для заполнения"),
    buttonLink: Yup.string().required("Поле обязательно для заполнения"),
});

export const HeaderPanel = (props: IHeaderPanel) => {
    const {
        header,
        lang = "ru",
        setLanguage,
        onDeleteLogo,
        onUploadLogo,
        pages = [],
        onSubmit,
    } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => setLanguage(lang), [setLanguage, lang]);

    const handleUpload = (file: File) => {
        if (onUploadLogo) {
            setLoading(true);
            onUploadLogo({ logo: file }).then(() => setLoading(false));
        }
    };

    return (
        <div className={classNames.wrapper}>
            <UploadAvatar
                src={header?.logoLink}
                uploadAvatar={handleUpload}
                loading={loading}
                onDeleteAvatar={onDeleteLogo}
            />
            {header ? (
                <CustomForm<IHeader>
                    onSubmit={onSubmit}
                    validationSchema={ValidationSchema}
                    data={header}
                    render={(form) => (
                        <div>
                            <TextField
                                name={"buttonTitle"}
                                label={"Текст кнопки"}
                                classes={{ root: classNames.field }}
                            />
                            <Select
                                name={"buttonLink"}
                                label={"Ссылка"}
                                classes={{ root: classNames.field }}
                                options={pages.map((item) => ({
                                    value: item._id,
                                    label: item.title,
                                }))}
                            />
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
            ) : (
                <CircularProgress />
            )}
        </div>
    );
};
