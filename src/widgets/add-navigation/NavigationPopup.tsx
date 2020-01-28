import React from "react";
import { ENavigationType, INavigation, INavigationType, TNavigationPage } from "../../entities";
import { Popup } from "../../components/popup";
import { CustomForm } from "../../components/custom-form";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { Select } from "../../components/select";
import { Button } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { SwitchField } from "../../components/switch-field";
import { isEqual } from "lodash";
import * as Yup from "yup";

interface IAddNavigationProps {
    open: boolean;
    navigationsTypes: INavigationType[];
    parentId?: string;
    navigation?: INavigation;
    title?: string;
    isChildren?: boolean;
    pages?: TNavigationPage[];

    onSubmit?(navigation: INavigation): void;

    onClose?(): void;
}

const styles = {
    content: css`
        padding: 0 24px 24px 24px;
    `,
    field: css`
        margin: 0 0 30px 0 !important;
        display: flex !important;
    `,
};

const ValidationSchema = Yup.object().shape({
    title: Yup.string().required("Поле обязательно для заполнения"),
    hasChild: Yup.boolean(),
    navigationType: Yup.string().when("hasChild", {
        is: false,
        then: Yup.string().required("Поле обязательно для заполнения"),
        otherwise: Yup.string().notRequired(),
    }),
    link: Yup.string().when("hasChild", {
        is: false,
        then: Yup.string().required("Поле обязательно для заполнения"),
        otherwise: Yup.string().notRequired(),
    }),
});

export const NavigationPopup = (props: IAddNavigationProps) => {
    const {
        open,
        navigationsTypes,
        onClose,
        onSubmit,
        navigation,
        title = "Добавить навигацию",
        isChildren,
        pages = [],
    } = props;

    const handleSubmit = (data: INavigation) => {
        if (!onSubmit) {
            return;
        }
        onSubmit(data);
    };

    return (
        <Popup title={title} open={open} onClose={onClose}>
            <CustomForm<Partial<INavigation>>
                onSubmit={handleSubmit}
                data={{ ...navigation, hasChild: false }}
                validationSchema={ValidationSchema}
                validateOnChange={false}
                render={(form) => (
                    <div className={styles.content}>
                        <TextField
                            name={"title"}
                            label={"Название"}
                            classes={{ root: styles.field }}
                        />
                        {!isChildren && (
                            <div
                                className={css`
                                    display: flex;
                                `}
                            >
                                <SwitchField
                                    name={"hasChild"}
                                    label={"Второй уровень"}
                                    classes={{ root: styles.field }}
                                />
                            </div>
                        )}
                        {!form?.values.hasChild && (
                            <React.Fragment>
                                <Select
                                    name={"navigationType"}
                                    label={"Тип ссылки"}
                                    options={navigationsTypes.map((item) => ({
                                        value: item._id,
                                        label: item.title,
                                    }))}
                                    classes={{ root: styles.field }}
                                />
                                {console.log(navigationsTypes.find(
                                    (item) => item._id === form?.values.navigationType,
                                ))}
                                {navigationsTypes.find(
                                    (item) => item._id === form?.values.navigationType,
                                )?.label === ENavigationType.INTERNAL ? (
                                    <Select
                                        name={"link"}
                                        label={"Страница"}
                                        options={pages.map((page) => ({
                                            value: page._id,
                                            label: page.title,
                                        }))}
                                        classes={{ root: styles.field }}
                                    />
                                ) : (
                                    <TextField
                                        name={"link"}
                                        label={"Ссылка"}
                                        classes={{ root: styles.field }}
                                    />
                                )}
                            </React.Fragment>
                        )}
                        <div
                            className={css`
                                display: flex;
                                justify-content: flex-end;
                            `}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Save />}
                                onClick={form?.submitForm}
                                disabled={
                                    !form?.isValid || isEqual(form?.values, form?.initialValues)
                                }
                            >
                                Сохранить
                            </Button>
                        </div>
                    </div>
                )}
            />
        </Popup>
    );
};
