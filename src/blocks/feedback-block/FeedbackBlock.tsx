import React from "react";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { FieldArray } from "formik";
import { Feedback, IFeedback } from "./feedback";
import { Add } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { IBlock } from "../../entities";
import { set, omit, get } from "lodash";
import * as uuid from "uuid";

export interface IFeedbackBlock {
    title: string;
    feedbacks: IFeedback[];
}

const validationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        feedbacks: Yup.array().of(
            Yup.object().shape({
                file: Yup.mixed(),
                text: Yup.string().required("Поле обязательно для заполнения"),
                name: Yup.string().required("Поле обязательно для заполнения"),
                position: Yup.string().required("Поле обязательно для заполнения"),
            }),
        ),
    }),
});

const classNames = {
    title: css`
        margin-bottom: 24px;
    `,
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        margin-bottom: 24px;
    `,
};

export const FeedbackBlock = (props: IBlockProps<IFeedbackBlock>) => {
    const { block, onDelete, onSubmit, statuses } = props;

    const handleSubmit = (id: string, data: Partial<IBlock<IFeedbackBlock>>) => {
        if (data.data?.feedbacks) {
            set(
                data,
                "data.feedbacks",
                data.data?.feedbacks
                    .map((item) => {
                        item.id = uuid.v4();
                        if (item.file) {
                            set(data, `${item.id}`, item.file);
                        }
                        return omit(item, ["file"])
                    })
            );
        }
        if (onSubmit) {
            onSubmit(id, { ...data });
        }
    };

    return (
        <BlockWrapper<IFeedbackBlock>
            block={block}
            statuses={statuses}
            onDelete={onDelete}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            render={(form) => (
                <div>
                    <TextField
                        name={"data.title"}
                        label={"Заголовок"}
                        classes={{ root: classNames.title }}
                    />
                    <FieldArray
                        name={"data.feedbacks"}
                        render={(array) => (
                            <React.Fragment>
                                <div className={classNames.content}>
                                    {form?.values?.data?.feedbacks?.map((item, index) => (
                                        <Feedback
                                            name={`data.feedbacks.${index}`}
                                            feedback={item}
                                            onDelete={() => array.remove(index)}
                                            setFieldValue={form?.setFieldValue}
                                            key={index}
                                        />
                                    ))}
                                </div>
                                <IconButton
                                    onClick={() => array.push({ text: "", name: "", position: "" })}
                                    color="primary"
                                >
                                    <Add />
                                </IconButton>
                            </React.Fragment>
                        )}
                    />
                </div>
            )}
        />
    );
};
