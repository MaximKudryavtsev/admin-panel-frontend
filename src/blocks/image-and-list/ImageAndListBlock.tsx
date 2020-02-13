import React, { useState } from "react";
import { IBlock, IImageBlock, IImageBlockIItem } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import { getBlockDataWithFiles } from "../../utils";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { css } from "emotion";
import { TextField } from "../../components/text-field";
import { FieldArray } from "formik";
import { DraggablePanel } from "../draggable-panel";
import { BlockLoadingScreen } from "../block-loading-screen";
import * as Yup from "yup";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { Select } from "../../components/select";
import { useFetchPages } from "../../hooks";

export enum EImageAndListBlockType {
    DECISION = "decision",
    SERVICE = "service",
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        type: Yup.string().required("Поле обязательно для заполнения"),
        columns: Yup.number().required("Поле обязательно для заполнения"),
        blocks: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required("Поле обязательно для заполнения"),
                link: Yup.string().notRequired(),
                list: Yup.array().of(Yup.string().required("Поле обязательно для заполнения")),
                file: Yup.mixed(),
                visible: Yup.boolean(),
            }),
        ),
    }),
});

export interface IImageAndList extends IImageBlockIItem {
    title: string;
    list: string[];
    link?: string;
}

export interface IImageAndListBlock extends IImageBlock<IImageAndList>{
    type: string;
    columns: number;
}

export const ImageAndListBlock = (props: IBlockProps<IImageAndListBlock>) => {
    const { onSubmit, lang = "ru" } = props;

    const [uploaded, setUploaded] = useState(false);
    const { pages } = useFetchPages(lang);

    const handleSubmit = (id: string, data: Partial<IBlock<IImageAndListBlock>>) => {
        data = getBlockDataWithFiles<IImageAndListBlock, IImageAndList>(data);

        if (onSubmit) {
            setUploaded(true);
            onSubmit(id, { ...data }).then(() => setUploaded(false));
        }
    };

    return (
        <BlockWrapper<IImageAndListBlock>
            {...props}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            render={(form) => (
                <div
                    className={css`
                        position: relative;
                    `}
                >
                    <Select
                        name={`data.type`}
                        label={"Тип"}
                        classes={{
                            root: css`
                                margin-bottom: 24px;
                            `,
                        }}
                        options={[
                            {
                                value: String(EImageAndListBlockType.DECISION),
                                label: "Страница решений",
                            },
                            {
                                value: String(EImageAndListBlockType.SERVICE),
                                label: "Страница услуг",
                            },
                        ]}
                    />
                    <Select
                        name={`data.columns`}
                        label={"Количество колонок"}
                        classes={{
                            root: css`
                                margin-bottom: 24px;
                            `,
                        }}
                        options={[
                            {
                                value: 2,
                                label: "2 колонки",
                            },
                            {
                                value: 4,
                                label: "4 колонки",
                            },
                        ]}
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
                                onAddBlock={() =>
                                    array.push({
                                        title: "",
                                        type: "",
                                        list: [],
                                        link: "",
                                        visible: true,
                                    })
                                }
                                render={(index) => (
                                    <>
                                        <TextField
                                            name={`data.blocks.${index}.title`}
                                            label={"Имя"}
                                            classes={{
                                                root: css`
                                                    margin-bottom: 24px;
                                                `,
                                            }}
                                        />
                                        <FieldArray
                                            name={`data.blocks.${index}.list`}
                                            render={(arrayTexts) => (
                                                <>
                                                    {form?.values.data?.blocks &&
                                                        form?.values.data?.blocks[index] &&
                                                        form?.values.data?.blocks[index].list &&
                                                        form?.values.data?.blocks[index].list.map(
                                                            (link, linkIndex) => (
                                                                <div
                                                                    key={linkIndex}
                                                                    className={css`
                                                                        display: flex;
                                                                        align-items: center;
                                                                    `}
                                                                >
                                                                    <TextField
                                                                        name={`data.blocks.${index}.list.${linkIndex}`}
                                                                        textarea
                                                                        label={`Текст ${linkIndex +
                                                                            1}`}
                                                                        classes={{
                                                                            root: css`
                                                                                margin-bottom: 24px;
                                                                            `,
                                                                        }}
                                                                    />
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            arrayTexts.remove(
                                                                                linkIndex,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Delete />
                                                                    </IconButton>
                                                                </div>
                                                            ),
                                                        )}
                                                    <IconButton
                                                        onClick={() => arrayTexts.push("")}
                                                        className={css`
                                                            margin-bottom: 24px;
                                                        `}
                                                    >
                                                        <Add />
                                                    </IconButton>
                                                </>
                                            )}
                                        />
                                        <Select
                                            name={`data.blocks.${index}.link`}
                                            label={"Ссылка"}
                                            options={pages.map((item) => ({
                                                value: item._id,
                                                label: item.title,
                                            }))}
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
