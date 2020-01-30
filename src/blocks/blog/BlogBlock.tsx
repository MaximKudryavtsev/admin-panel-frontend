import React from "react";
import { TLang } from "../../entities";
import { IBlockProps } from "../IBlockProps";
import * as Yup from "yup";
import { css } from "emotion";
import { BlockWrapper } from "../../widgets/block-wrapper";
import { TextField } from "../../components/text-field";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

export interface IBlog {
    lang: TLang;
    link: string;
    blog: IBlogItem[];
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
    `,
};

export const BlogBlock = (props: IBlockProps<IBlog>) => {
    const { block, onSubmit, onDelete, statuses } = props;

    return (
        <BlockWrapper
            block={block}
            statuses={statuses}
            onSubmit={onSubmit}
            onDelete={onDelete}
            validationSchema={ValidationSchema}
            render={() => (
                <div>
                    <div className={classNames.header}>
                        <TextField name={"data.title"} label={"Заголовок"} />
                        <TextField name={"data.link"} label={"Ссылка на блог"} disable={true} />
                    </div>
                    <div className={classNames.content}>
                        {block?.data?.blog?.map((item) => (
                            <a
                                key={item._id}
                                href={item.link}
                                target={"_blank"}
                                className={classNames.link}
                            >
                                <Card variant={"outlined"}>
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
                                </Card>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        />
    );
};
