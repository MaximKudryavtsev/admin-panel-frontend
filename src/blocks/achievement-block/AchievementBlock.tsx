import React, { useState } from "react";
import { IBlock, IImageBlockIItem } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { getBlockDataWithFiles } from "../../utils";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { css } from "emotion";
import { FieldArray } from "formik";
import { TextField } from "../../components/text-field";
import { DraggablePanel } from "../draggable-panel";
import { BlockLoadingScreen } from "../block-loading-screen";
import { DateField } from "../../components/date-field";

export interface IAchievement extends IImageBlockIItem {
    title: string;
    achievementName: string;
    productName: string;
    date: string;
    link?: string;
    position: string;
}

export interface IAchievementBlock {
    blocks: IAchievement[];
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        blocks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required("Поле обязательно для заполнения"),
                achievementName: Yup.string().required("Поле обязательно для заполнения"),
                productName: Yup.string().required("Поле обязательно для заполнения"),
                position: Yup.string().required("Поле обязательно для заполнения"),
                date: Yup.string().required("Поле обязательно для заполнения"),
                link: Yup.string().notRequired(),
                file: Yup.mixed(),
                visible: Yup.boolean()
            }),
        ),
    }),
});

const classNames = {
    field: css`
        margin-bottom: 24px;
        width: 400px;
    `,
    content: css`
        display: flex;
    `,
    right: css`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-left: auto;
    `,
    left: css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    `,
};

export const AchievementBlock = (props: IBlockProps<IAchievementBlock>) => {
    const { onSubmit } = props;

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IAchievementBlock>>) => {
        data = getBlockDataWithFiles<IAchievementBlock, IAchievement>(data);
        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<IAchievementBlock>
            {...props}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <FieldArray
                        name={"data.blocks"}
                        render={(array) => (
                            <DraggablePanel
                                data={form?.values.data?.blocks}
                                onDragEnd={(result) =>
                                    array.move(result.source.index, result.destination?.index ?? 0)
                                }
                                setFieldValue={form?.setFieldValue}
                                onDelete={array.remove}
                                onAddBlock={() =>
                                    array.push({
                                        title: "",
                                        achievementName: "",
                                        productName: "",
                                        position: "",
                                        date: "",
                                        link: "",
                                        visible: true
                                    })
                                }
                                variant={"achievement"}
                                render={(index) => (
                                    <div className={classNames.content}>
                                        <div className={classNames.left}>
                                            <DateField
                                                name={`data.blocks.${index}.date`}
                                                label={"Дата получения награды"}
                                                className={classNames.field}
                                                disableFuture
                                            />
                                            <TextField
                                                name={`data.blocks.${index}.title`}
                                                label={"Заголовок"}
                                                classes={{ root: classNames.field }}
                                            />
                                            <TextField
                                                name={`data.blocks.${index}.achievementName`}
                                                label={"Название награды"}
                                                classes={{ root: classNames.field }}
                                            />
                                        </div>
                                        <div className={classNames.right}>
                                            <TextField
                                                name={`data.blocks.${index}.position`}
                                                label={"Место"}
                                                classes={{ root: classNames.field }}
                                            />
                                            <TextField
                                                name={`data.blocks.${index}.link`}
                                                label={"Ссылка на награду"}
                                                classes={{ root: classNames.field }}
                                            />
                                            <TextField
                                                name={`data.blocks.${index}.productName`}
                                                label={"Название продукта"}
                                                classes={{ root: classNames.field }}
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                    />
                    {uploaded && <BlockLoadingScreen />}
                </div>
            )}
        />
    );
};
