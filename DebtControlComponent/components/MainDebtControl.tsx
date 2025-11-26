import * as React from "react";
import { IInputs } from "../generated/ManifestTypes";
import DebtControlTable from "./table/DebtControlTable";
import ButtonsControl from "./ButtonsControl/ButtonsControl";
import { useDebts } from "../hooks/useDebt";
import { useHistoryProcess } from "../hooks/useHistoryProcess";
import { ConfigProvider, es_ES } from "../ant-custom-import";
import { UserProvider } from "../contexts/UserContext";

interface IMainDebtControlProps {
    context: ComponentFramework.Context<IInputs>;
}

// Extracted styles as constants to prevent recreation on each render
const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    margin: 0,
    position: "relative",
};

// Estilo del badge de versión
const versionStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 4,
    right: 10,
    fontSize: 12,
    color: "#888",
};

const MainDebtControl: React.FC<IMainDebtControlProps> = ({ context }) => {
    const userEmail = context.parameters.userEmail?.raw ?? "";
    // Versión manual - cambiar aquí
    const VERSION = "1.0.0";
    const {
        debts,
        sellers,
        loading: debtsLoading,
        error: debtsError,
        refresh: refreshDebts,
        fechaActualizacion
    } = useDebts();

    return (
        <ConfigProvider locale={es_ES}>
            <UserProvider userEmail={userEmail}>
                <div style={containerStyle}>
                    <div className="main-debt-control-container">
                        <ButtonsControl
                            debts={debts}
                            onRefreshDebts={refreshDebts}
                            loadingDebts={debtsLoading}
                            sellers={sellers}
                            fechaActualizacion={fechaActualizacion}
                        />
                        <DebtControlTable
                            debts={debts}
                            sellers={sellers}
                            loading={debtsLoading}
                            error={debtsError}
                            
                        />
                    </div>
                    <div style={versionStyle}>v{VERSION}</div>
                </div>
            </UserProvider>
        </ConfigProvider>
    );
};

export default MainDebtControl;
