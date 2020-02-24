import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TableWrapper } from "../../widgets/table-wrapper";
import { Link, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { css } from "emotion";
import { EPageType, ICreatePageRequest, IPagesTableRow, TLang } from "../../entities";
import { CreatePagePopup } from "../../widgets/create-page-popup";
import { useCreatePage } from "../../hooks/page";
import { AppContext } from "../../context";
import { formatDate, getServerError } from "../../utils";
import { Transport } from "../../transport";

interface IPageListProps {
    body?: IPagesTableRow[];
    lang?: TLang;
    type?: EPageType;
    baseUrl: string;

    setLanguage(lang: TLang): void;
}

const classNames = {
    headCell: css`
        font-weight: 600 !important;
    `,
    bodyRow: css`
        cursor: pointer;
        :hover {
            background: rgba(0, 0, 0, 0.04);
        }
    `,
};

export const PagesList = (props: IPageListProps) => {
    const { body = [], setLanguage, lang = "ru", type = EPageType.ORDINARY, baseUrl } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState<undefined | string>(undefined);
    const transport = useMemo(() => Transport.create(), []);
    const { createPage } = useCreatePage(transport, lang, type);

    useEffect(() => setLanguage(lang), [lang, setLanguage]);

    function onModalOpen(): void {
        setModalVisible(true);
    }

    function onModalClose(): void {
        setModalVisible(false);
    }

    const onCreatePage = useCallback(
        (data: ICreatePageRequest) => {
            createPage(data)
                .then((response) => {
                    AppContext.getHistory().push(`${baseUrl}/${response.data._id}`);
                    setError(undefined);
                })
                .catch((error) => {
                    const err = getServerError(error);
                    setError(err?.title);
                });
        },
        [createPage, baseUrl],
    );

    const onClickRow = (id: string) => {
        AppContext.getHistory().push(`${baseUrl}/${id}`);
    };

    return (
        <React.Fragment>
            <TableWrapper handler={onModalOpen}>
                <Paper>
                    <Table classes={{ root: css`table-layout: fixed;`}}>
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{ root: classNames.headCell }}>Автор</TableCell>
                                <TableCell classes={{ root: classNames.headCell }}>
                                    Название
                                </TableCell>
                                <TableCell classes={{ root: classNames.headCell }}>
                                    Статус
                                </TableCell>
                                <TableCell classes={{ root: classNames.headCell }}>
                                    Дата создания
                                </TableCell>
                                <TableCell classes={{ root: classNames.headCell }}>
                                    Последнее изменение
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {body.map((item) => (
                                <TableRow
                                    classes={{ root: classNames.bodyRow }}
                                    key={item._id}
                                    onClick={() => onClickRow(item._id)}
                                >
                                    <TableCell>
                                        <Link
                                            onMouseDown={() =>
                                                AppContext.getHistory().push(
                                                    `/users/${item.author._id}`,
                                                )
                                            }
                                            component={"button"}
                                        >
                                            {item.author.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.status.title}</TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt, "DD.MM.YYYY HH:mm")}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.updatedAt, "DD.MM.YYYY HH:mm")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </TableWrapper>
            <CreatePagePopup
                visible={modalVisible}
                onClose={onModalClose}
                onSubmit={onCreatePage}
                error={error}
            />
        </React.Fragment>
    );
};
