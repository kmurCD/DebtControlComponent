import * as React from "react";
import { Table, Tooltip } from "../../ant-custom-import";
import type {TableProps } from "../../ant-custom-import";
import { Debt } from "../../interface/Clientes";
import TransligraLogo from "../table/TransligraLogo";

type ColumnsType<T> = TableProps<T>["columns"];

interface Props {
    debts: Debt[];
    sellers: string[];
    loading: boolean;
    error: string | null;
};

const DebtControlTable: React.FC<Props> = ({ debts, sellers, loading, error }) => {
    const sellerFilters = sellers.map((seller) => ({
        text: seller,
        value: seller,
    }));

    const columns: ColumnsType<Debt> = [
        {
            title: "Cliente",
            dataIndex: "cliente",
            key: "cliente",
            width: 200,
            ellipsis: { showTitle: false },
            fixed: "left",
            sorter: (a: Debt, b: Debt) => a.cliente.localeCompare(b.cliente),
            sortDirections: ["descend"],
            render: (cliente: string) => (
                <Tooltip placement="topLeft" title={cliente}>
                    {cliente}
                </Tooltip>
            ),
        },
        { title: "RUC", dataIndex: "ruc", key: "ruc" },
        { title: "Factura", dataIndex: "codigo_factura", key: "codigo_factura" },
        { title: "Emisión", dataIndex: "fecha_emision", key: "fecha_emision" },
        {
            title: "Vencimiento",
            dataIndex: "fecha_vencimiento",
            key: "fecha_vencimiento",
        },
        {
            title: "Moneda",
            dataIndex: "tipo_moneda",
            key: "tipo_moneda",
            ellipsis: true,
        },
        { title: "Importe", dataIndex: "importe", key: "importe" },
        { title: "Pagado", dataIndex: "pagado", key: "pagado" },
        { title: "Saldo", dataIndex: "saldo", key: "saldo" },
        {
            title: "Vendedor",
            dataIndex: "vendedor",
            key: "vendedor",
            ellipsis: true,
            filters: sellerFilters,
            onFilter: (value: string | number | boolean, record: Debt) =>
                record.vendedor === value,
        },
    ];

    const tableData = debts.map((debt, idx) => ({
        ...debt,
        key: `${debt.ruc}-${debt.codigo_factura}-${idx}`,
    }));

    return (
        <Table<Debt>
            columns={columns}
            dataSource={tableData}
            loading={loading}
            size="small"
            scroll={{ y: 600, x: 1200 }}
            className="mi-tabla-pcf"
            tableLayout="fixed"
            locale={{
                emptyText: (
                    <div className="empty-placeholder-content">
                        <TransligraLogo
                            style={{ width: "500px", height: "auto", color: "#ffa51d" }}
                        />
                        <div>Cargando</div>
                    </div>
                ),
            }}
            pagination={{
                pageSizeOptions: ["20", "50", "100"],
                showSizeChanger: true,
                defaultPageSize: 20,
                showTotal: (total, range) =>
                    `${range[0]}-${range[1]} de ${total} filas`,
            }}
        />
    );
};

export default DebtControlTable;
