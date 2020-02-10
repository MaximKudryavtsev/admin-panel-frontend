import React, { useState } from "react";
import { IBlock, IImageBlockIItem } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import { getBlockDataWithFiles } from "../../utils";
import * as Yup from "yup";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { css } from "emotion";
import { FieldArray } from "formik";
import { TextField } from "../../components/text-field";
import { DraggablePanel } from "../draggable-panel";
import { BlockLoadingScreen } from "../block-loading-screen";
import { Card, IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

export interface IBestAchievement extends IImageBlockIItem {
    title: string;
    links: Array<{
        title: string;
        link: string;
    }>;
}

interface IBestAchievementBlock {
    title: string;
    blocks: IBestAchievement[];
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        blocks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required("Поле обязательно для заполнения"),
                file: Yup.mixed(),
                links: Yup.array().of(
                    Yup.object().shape({
                        title: Yup.string().required("Поле обязательно для заполнения"),
                        link: Yup.string().required("Поле обязательно для заполнения"),
                    }),
                ),
            }),
        ),
    }),
});

const classNames = {
    field: css`
        margin-bottom: 24px;
    `,
    linkCard: css`
        padding: 24px;
         margin-bottom: 24px;
    `,
};

export const BestAchievementBlock = (props: IBlockProps<IBestAchievementBlock>) => {
    const { onSubmit } = props;

    const [uploaded, setUploaded] = useState(false);

    const handleSubmit = (id: string, data: Partial<IBlock<IBestAchievementBlock>>) => {
        data = getBlockDataWithFiles<IBestAchievementBlock, IBestAchievement>(data);

        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<IBestAchievementBlock>
            {...props}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <TextField
                        name={"data.title"}
                        label={"Заголовок"}
                        classes={{ root: classNames.field }}
                    />
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
                                onAddBlock={() => array.push({ title: "" })}
                                render={(index) => (
                                    <>
                                        <TextField
                                            name={`data.blocks.${index}.title`}
                                            label={"Загловок"}
                                            classes={{ root: classNames.field }}
                                        />
                                        <FieldArray
                                            name={`data.blocks.${index}.links`}
                                            render={(arrayLinks) => (
                                                <>
                                                    {form?.values.data?.blocks &&
                                                        form?.values.data?.blocks[index] &&
                                                        form?.values.data?.blocks[index].links &&
                                                        form?.values.data?.blocks[index].links.map(
                                                            (link, linkIndex) => (
                                                                <Card variant={"outlined"} classes={{root: classNames.linkCard}} key={linkIndex}>
                                                                    <div className={css`display: flex; justify-content: flex-end;`}>
                                                                        <IconButton onClick={() => arrayLinks.remove(linkIndex)}>
                                                                            <Delete />
                                                                        </IconButton>
                                                                    </div>
                                                                    <TextField
                                                                        name={`data.blocks.${index}.links.${linkIndex}.title`}
                                                                        label={"Название проекта"}
                                                                        classes={{
                                                                            root: classNames.field,
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        name={`data.blocks.${index}.links.${linkIndex}.link`}
                                                                        label={"Ссылка на награду"}
                                                                        classes={{
                                                                            root: classNames.field,
                                                                        }}
                                                                    />
                                                                </Card>
                                                            ),
                                                        )}
                                                    <IconButton
                                                        onClick={() =>
                                                            arrayLinks.push({ title: "", link: "" })
                                                        }
                                                    >
                                                        <Add />
                                                    </IconButton>
                                                </>
                                            )}
                                        />
                                    </>
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
