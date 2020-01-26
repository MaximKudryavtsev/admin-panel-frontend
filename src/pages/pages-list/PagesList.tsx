import React, { useCallback, useEffect, useState } from "react";
import { TableWrapper } from "../../widgets/table-wrapper";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { css } from "emotion";
import { ICreatePageRequest, IPagesTableRow, TLang } from "../../entities";
import moment from "moment";
import { CreatePagePopup } from "../../widgets/create-page-popup";
import { usePage } from "../../hooks/page";
import { AppContext } from "../../context";

interface IPageListProps {
    body?: IPagesTableRow[];
    lang?: TLang;

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
    const { body = [], setLanguage, lang = "ru" } = props;

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => setLanguage(lang), [lang, setLanguage]);

    const { createPage } = usePage(lang);

    function onModalOpen(): void {
        setModalVisible(true);
    }

    function onModalClose(): void {
        setModalVisible(false);
    }

    const onCreatePage = useCallback(
        (data: ICreatePageRequest) => {
            createPage(data).then((response) =>
                AppContext.getHistory().push(`/panel/pages/${response.data._id}`),
            );
        },
        [createPage],
    );

    return (
        <React.Fragment>
            <TableWrapper handler={onModalOpen}>
                <Paper>
                    <Table
                        classes={{
                            root: css`
                                table-layout: fixed;
                            `,
                        }}
                    >
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
                                <TableRow classes={{ root: classNames.bodyRow }} key={item._id}>
                                    <TableCell>{item.author.title}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.status.title}</TableCell>
                                    <TableCell>
                                        {moment(item.cratedAt).format("DD.MM.YYYY HH:mm")}
                                    </TableCell>
                                    <TableCell>
                                        {moment(item.updatedAt).format("DD.MM.YYYY HH:mm")}
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
            />
        </React.Fragment>
    );
};
