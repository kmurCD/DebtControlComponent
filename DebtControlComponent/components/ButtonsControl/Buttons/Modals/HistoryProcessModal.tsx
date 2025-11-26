import * as React from "react";
import {
    Table,
    Tooltip,
    Modal,
    Button,
} from "../../../../ant-custom-import";
import type { TableProps } from "../../../../ant-custom-import";
import { HistoryProcess } from "../../../../interface/Entities";
import TransligraLogo from "../../../table/TransligraLogo";
import { useHistoryProcess } from "../../../../hooks/useHistoryProcess";
type ColumnsType<T> = TableProps<T>["columns"];

interface Props {
    openDialogHistoryProcess: boolean;
    onCloseHistoryProcess?: () => void;
}

const DebtControlTable: React.FC<Props> = ({
    openDialogHistoryProcess,
    onCloseHistoryProcess,
}) => {
    const { historyProcess, loading, error, refresh } = useHistoryProcess();

    React.useEffect(() => {
        if (openDialogHistoryProcess) {
            void refresh();
        }
    }, [openDialogHistoryProcess, refresh]);

    const columns: ColumnsType<HistoryProcess> = [
        {
            title: "Código",
            dataIndex: "codigo",
            key: "codigo",
            width: 200,
            ellipsis: { showTitle: false },
            fixed: "left",
            sorter: (a: HistoryProcess, b: HistoryProcess) =>
                a.codigo.localeCompare(b.codigo),
            sortDirections: ["descend"],
            render: (codigo: string) => (
                <Tooltip placement="topLeft" title={codigo}>
                    {codigo}
                </Tooltip>
            ),
        },
        {
            title: "Tipo", dataIndex: "tipo", key: "tipo", render: (tipo: number) => {
                const tipoInfo = tipoMap[tipo] || {
                    label: "Desconocido",
                    color: "#6c757d",
                    bg: "#f8f9fa",
                };
                return (
                    <span
                        style={{
                            color: tipoInfo.color,
                            backgroundColor: tipoInfo.bg,
                            borderRadius: 8,
                            padding: "2px 10px",
                            fontWeight: 500,
                            fontSize: 13,
                            display: "inline-block",
                            minWidth: 120,
                            textAlign: "center",
                        }}
                    >
                        {tipoInfo.label}
                    </span>
                );
            },
        },

        { title: "Fecha", dataIndex: "fecha_proceso", key: "fecha_proceso" },
   

        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            render: (estado: number) => {
                const estadoInfo = estadoMap[estado] || {
                    label: "Desconocido",
                    color: "#aaa",
                    bg: "#f5f5f5",
                };
                return (
                    <span
                        style={{
                            color: estadoInfo.color,
                            backgroundColor: estadoInfo.bg,
                            borderRadius: 8,
                            padding: "2px 10px",
                            fontWeight: 500,
                            fontSize: 13,
                            display: "inline-block",
                            minWidth: 90,
                            textAlign: "center",
                        }}
                    >
                        {estadoInfo.label}
                    </span>
                );
            },
            filters: Object.entries(estadoMap).map(([value, { label }]) => ({
                text: label,
                value: Number(value),
            })),
            onFilter: (value: string | number | boolean, record: HistoryProcess) =>
                record.estado === Number(value),
        },
    ];
    const handleCancel = () => {
        if (onCloseHistoryProcess) onCloseHistoryProcess();
    };
    const tableData = historyProcess.map((history, idx) => ({
        ...history,
        key: `${history.id}-${idx}`,
    }));

    return (
        <Modal
            title={
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span>Historial de Procesos</span>
                    <Button onClick={() => void refresh()}>Actualizar</Button>
                </div>
            }
            maskClosable={false}
            open={openDialogHistoryProcess}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
            ]}
            width={900}
        >
            <Table<HistoryProcess>
                columns={columns}
                dataSource={tableData}
                loading={loading}
                size="small"
                className="mi-tabla-pcf"
                tableLayout="fixed"
                locale={{
                    emptyText: (
                        <div className="empty-placeholder-content">
                            <TransligraLogo
                                style={{
                                    width: "600px",
                                    height: "auto",
                                    color: "#ffa51d",
                                    opacity: 0.5,
                                }}
                            />
                        </div>
                    ),
                }}
                pagination={{
                    pageSizeOptions: ["5", "10", "20"],
                    showSizeChanger: true,
                    defaultPageSize: 5,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} de ${total} filas`,
                }}
            />
        </Modal>
    );
};

const estadoMap: Record<number, { label: string; color: string; bg: string }> =
{
    1: { label: "En curso", color: "#1677ff", bg: "#e6f4ff" },
    2: { label: "Cancelado", color: "#fa8c16", bg: "#fff7e6" },
    3: { label: "Completado", color: "#52c41a", bg: "#f6ffed" },
    4: { label: "Error", color: "#ff4d4f", bg: "#fff1f0" },
};

const tipoMap: Record<number, { label: string; color: string; bg: string }> = {
    1: { label: "Actualizacion BD", color: "#0d6efd", bg: "#d1ecf1" },
    2: { label: "Notificar vendedores", color: "#198754", bg: "#d4edda" },
    3: { label: "Notificar vendedor", color: "#fd7e14", bg: "#fff3cd" },
    4: { label: "Notificar Clientes", color: "#dc3545", bg: "#f8d7da" },
};

export default DebtControlTable;
