import React, { useEffect, useState } from "react";
import { TableWrapper } from "../../widgets/table-wrapper";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { css } from "emotion";
import { IPagesTableRow } from "../../entities";
import moment from "moment";
import { CreatePagePopup } from "../../widgets/create-page-popup";

interface IPageListProps {
    body?: IPagesTableRow[];

    setPageTitle(title: string): void;
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
    `
};

export const PagesList = (props: IPageListProps) => {
    const { setPageTitle, body = [] } = props;
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => setPageTitle("Страницы"), [setPageTitle]);

    function onModalOpen(): void {
        setModalVisible(true);
    }

    function onModalClose(): void {
        setModalVisible(false);
    }

    return (
        <React.Fragment>
            <TableWrapper handler={onModalOpen}>
                <Paper>
                    <Table classes={{root: css`table-layout: fixed;`}}>
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{root: classNames.headCell}}>Автор</TableCell>
                                <TableCell classes={{root: classNames.headCell}}>Название</TableCell>
                                <TableCell classes={{root: classNames.headCell}}>Статус</TableCell>
                                <TableCell classes={{root: classNames.headCell}}>Дата создания</TableCell>
                                <TableCell classes={{root: classNames.headCell}}>Последнее изменение</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {body.map((item) => (
                                <TableRow classes={{root: classNames.bodyRow}} key={item._id}>
                                    <TableCell>{item.author.title}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.status.title}</TableCell>
                                    <TableCell>{moment(item.cratedAt).format("DD.MM.YYYY HH:mm")}</TableCell>
                                    <TableCell>{moment(item.updatedAt).format("DD.MM.YYYY HH:mm")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </TableWrapper>
            <CreatePagePopup visible={modalVisible} onClose={onModalClose} />
        </React.Fragment>
    );
};
