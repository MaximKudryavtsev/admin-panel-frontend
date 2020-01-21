import React from "react";
import { INavigation, INavigationType } from "../../entities";
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

export interface ICreateNavigation {
    title: string;
    navigationTypeId: string;
    hasChild: boolean;
    link: string;
    parentId?: string;
}

interface IAddNavigationProps {
    open: boolean;
    navigationsTypes: INavigationType[];
    parentId?: string;
    navigation?: INavigation;
    title?: string;
    isChildren?: boolean;

    onSubmit?(navigation: ICreateNavigation): void;

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
    navigationTypeId: Yup.string().required("Поле обязательно для заполнения"),
    link: Yup.string().required("Поле обязательно для заполнения"),
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
    } = props;

    const handleSubmit = (data: ICreateNavigation) => {
        if (!onSubmit) {
            return;
        }
        onSubmit(data);
    };

    return (
        <Popup title={title} open={open} onClose={onClose}>
            <CustomForm<Partial<ICreateNavigation>>
                onSubmit={handleSubmit}
                data={transform(navigation)}
                validationSchema={ValidationSchema}
                render={(form) => (
                    <div className={styles.content}>
                        <TextField
                            name={"title"}
                            label={"Название"}
                            classes={{ root: styles.field }}
                        />
                        <Select
                            name={"navigationTypeId"}
                            label={"Тип ссылки"}
                            options={navigationsTypes.map((item) => ({
                                value: item._id,
                                label: item.title,
                            }))}
                            classes={{ root: styles.field }}
                        />
                        <TextField name={"link"} label={"Ссылка"} classes={{ root: styles.field }} />
                        {!isChildren && (
                            <SwitchField
                                name={"hasChild"}
                                label={"Второй уровень"}
                                classes={{ root: styles.field }}
                            />
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            onClick={form?.submitForm}
                            disabled={!form?.isValid || isEqual(form?.values, form?.initialValues)}
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
            />
        </Popup>
    );
};

export function transform(navigation?: INavigation): Partial<ICreateNavigation> {
    if (!navigation) {
        return { hasChild: false };
    }
    return { ...navigation, navigationTypeId: navigation.navigationType._id };
}
