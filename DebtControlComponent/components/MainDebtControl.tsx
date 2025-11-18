import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";
import DebtControlTable from "./table/DebtControlTable";
import ButtonsControl from "./ButtonsControl/ButtonsControl";
import { useDebts } from "../hooks/useDebt";
import { ConfigProvider,es_ES } from "../ant-custom-import";



interface IMainDebtControlProps {
    context: ComponentFramework.Context<IInputs>;
}


const MainDebtControl: React.FC<IMainDebtControlProps> = ({ context }) => {
  const { debts, sellers, loading, error, refresh } = useDebts();
    return (
        <ConfigProvider locale={es_ES}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    margin: 0,
                    
                }}
            >
                <div className="main-debt-control-container">
                    <ButtonsControl onRefresh={refresh} loading={loading} sellers={sellers} />
                    <DebtControlTable
                        debts={debts}
                        sellers={sellers}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default MainDebtControl;
