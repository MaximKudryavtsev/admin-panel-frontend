import React from "react";
import { TLang } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { TextField } from "../../components/text-field";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { SwitchField } from "../../components/switch-field";

export interface IBlog {
    lang: TLang;
    link: string;
    blocks: IBlogItem[];
    title: string;
}

export interface IBlogItem {
    _id: string;
    title: string;
    link: string;
    description: string;
    imageLink: string;
}

const ValidationSchema = Yup.object().shape({
    data: Yup.object().shape({
        title: Yup.string().required("Поле обязательно для заполнения"),
        blog: Yup.array().of(
            Yup.object().shape({
                visible: Yup.boolean().notRequired(),
            }),
        ),
    }),
});

const classNames = {
    header: css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 24px;
        margin-bottom: 24px;
    `,
    content: css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 24px;
        grid-row-gap: 24px;
    `,
    card: css`
        padding: 24px;
        box-sizing: border-box;
    `,
    image: css`
        height: 180px;
    `,
    link: css`
        text-decoration: none;
        color: #000;
    `,
    cardHeader: css`
        display: flex;
        width: 100%;
        justify-content: flex-end;
        margin-bottom: 5px;
    `,
};

export const BlogBlock = (props: IBlockProps<IBlog>) => {
    const { block } = props;
    return (
        <BlockWrapper
            {...props}
            validationSchema={ValidationSchema}
            render={() => (
                <div>
                    <div className={classNames.header}>
                        <TextField name={"data.title"} label={"Заголовок"} />
                        <TextField name={"data.link"} label={"Ссылка на блог"} disable={true} />
                    </div>
                    <div className={classNames.content}>
                        {block?.data?.blocks?.map((item, index) => (
                            <Card variant={"outlined"} key={item._id}>
                                <div className={classNames.cardHeader}>
                                    <SwitchField name={`data.blocks.${index}.visible`} />
                                </div>
                                <a
                                    key={item._id}
                                    href={item.link}
                                    target={"_blank"}
                                    className={classNames.link}
                                >
                                    <CardMedia
                                        image={item.imageLink}
                                        title={item.title}
                                        className={classNames.image}
                                    />
                                    <CardContent className={classNames.card}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                </a>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        />
    );
};
