import * as React from "react";
import { Table, Tooltip } from "../../ant-custom-import";
import type { TableProps } from "../../ant-custom-import";
import { Debt, Seller } from "../../interface/Entities";
import TransligraLogo from "../table/TransligraLogo";

type ColumnsType<T> = TableProps<T>["columns"];

interface Props {
    debts: Debt[];
    sellers: Seller[];
    loading: boolean;
    error: string | null;
}

const DebtControlTable: React.FC<Props> = ({
    debts,
    sellers,
    loading,
    error,
}) => {
    // Memoize seller filters to avoid recalculation on every render
    const sellerFilters = React.useMemo(
        () =>
            sellers.map((seller) => ({
                text: seller.vendedor,
                value: seller.vendedor,
            })),
        [sellers]
    );

    // Memoize columns definition to prevent recreation on every render
    const columns: ColumnsType<Debt> = React.useMemo(
        () => [
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
                onFilter: (vendedor: string | number | boolean, record: Debt) =>
                    record.vendedor === vendedor,
            },
        ],
        [sellerFilters]
    );

    // Memoize table data to avoid remapping on every render
    const tableData = React.useMemo(
        () =>
            debts.map((debt, idx) => ({
                ...debt,
                key: `${debt.ruc}-${debt.codigo_factura}-${idx}`,
            })),
        [debts]
    );

    // Memoize pagination showTotal function
    const showTotal = React.useCallback(
        (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} de ${total} filas`,
        []
    );

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
                showTotal,
            }}
        />
    );
};

export default DebtControlTable;
