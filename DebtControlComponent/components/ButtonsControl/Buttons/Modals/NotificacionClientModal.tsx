import * as React from "react";
import {
    Modal,
    Button,
    Typography,
    Space,
} from "../../../../ant-custom-import";
import {
    ExclamationCircleOutlined,
    CloseCircleFilled,
} from "../../../../ant-custom-icons-import";
import { Debt } from "../../../../interface/Entities";
import { useNotificationClients } from "../../../../hooks/useNotificationClients";

// Definimos una interfaz básica para el Cliente (ajústala a tu entidad real)

interface ModalNotificationClientsProps {
    openDialogNotificationClient: boolean;
    onCloseNotificacionClient: () => void;
    onConfirm?: () => void;
    debts?: Debt[];
    loading?: boolean;
    onNotifyUpload?: (mensaje: string, type: string) => void;
    userEmail?: string;
}

// Elimina la destructuración de Text, usa Typography.Text directamente

const NotificationClientsModal: React.FC<ModalNotificationClientsProps> = ({
    openDialogNotificationClient,
    onCloseNotificacionClient,
    onConfirm,
    debts,
    loading,
    onNotifyUpload,
}) => {
    const {
        loading: hookLoading,
        error,
        startNotificationClient,
    } = useNotificationClients();

    const handleConfirm = React.useCallback(() => {
        void startNotificationClient("josue.centella@transligra.pe");
        onNotifyUpload?.("Notificación enviada a todos los vendedores", "success");

        onCloseNotificacionClient?.();
    }, [startNotificationClient, onNotifyUpload, onCloseNotificacionClient]);

    const totalClients = debts ? new Set(debts.map((debt) => debt.ruc)).size : 0;

    return (
        <Modal
            open={openDialogNotificationClient}
            onCancel={onCloseNotificacionClient}
            width={500}
            centered
            maskClosable={false}
            title={
                <Space>
                    <ExclamationCircleOutlined
                        style={{ color: "#faad14", fontSize: 20 }}
                    />
                    <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
                        Confirmar Notificación a Clientes
                    </Typography.Text>
                </Space>
            }
            footer={[
                <Button
                    key="back"
                    onClick={onCloseNotificacionClient}
                    disabled={loading ?? hookLoading}
                >
                    Cancelar
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    danger
                    onClick={handleConfirm}
                    loading={loading ?? hookLoading}
                    style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
                >
                    Confirmar y Enviar
                </Button>,
            ]}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    width: "100%",
                    paddingTop: 12,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        background: "#fff1f0",
                        border: "1px solid #ffccc7",
                        padding: 16,
                    }}
                >
                    <ExclamationCircleOutlined
                        style={{ color: "#cf1322", fontSize: 24, marginRight: 12 }}
                    />
                    <div>
                        <strong style={{ fontSize: 16, color: "#cf1322" }}>
                            ¡ADVERTENCIA!
                        </strong>
                        <div style={{ color: "#434343" }}>
                            Esta acción es IRREVERSIBLE. Se enviarán notificaciones por correo
                            electrónico a todos los clientes con deudas pendientes.
                        </div>
                    </div>
                </div>
                <div style={{ paddingLeft: 8 }}>
                    <h5 style={{ fontSize: 15, marginBottom: 8, color: "#434343" }}>
                        Detalles de la notificación:
                    </h5>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: 24,
                            color: "#434343",
                            fontSize: 14,
                        }}
                    >
                        <li style={{ marginBottom: 4 }}>
                            Total de clientes a notificar: <strong>{totalClients}</strong>
                        </li>
                        <li style={{ marginBottom: 4 }}>
                            Tipo: Notificación de deuda pendiente
                        </li>
                        <li>Método: Correo electrónico</li>
                    </ul>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        background: "#fff1f0",
                        border: "1px solid #ffccc7",
                        padding: "8px 15px",
                    }}
                >
                    <CloseCircleFilled
                        style={{ color: "#ff4d4f", fontSize: 20, marginRight: 10 }}
                    />
                    <span style={{ fontSize: 13, color: "#434343" }}>
                        Una vez enviadas, las notificaciones no pueden ser canceladas ni
                        recuperadas.
                    </span>
                </div>
                <div style={{ textAlign: "center", marginTop: 8 }}>
                    <span style={{ color: "#8c8c8c", fontSize: 14 }}>
                        ¿Está seguro de que desea continuar?
                    </span>
                </div>
            </div>
        </Modal>
    );
};

export default NotificationClientsModal;
