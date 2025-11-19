import * as React from "react";
import { Modal, Space, Radio, Select } from "../../../../ant-custom-import";
import { useState, useMemo } from "react";
import { Seller } from "../../../../interface/Entities";
import { useNotification } from "../../../../hooks/useNotification";
import "./ModalCSS.css";

interface ModalNotificationControlProps {
    sellers: Seller[];
    openDialogUpload: boolean;
    onCloseUpload?: () => void;
    onNotifyUpload?: (mensaje: string, type: string) => void;
}

const NotificationSellerModal: React.FC<ModalNotificationControlProps> = ({
    openDialogUpload,
    onCloseUpload,
    onNotifyUpload,
    sellers,
}) => {
    const { startNotification, error, loading } = useNotification();
    const [typeNotification, setTypeNotification] = useState<number>(2);
    const [selectedSeller, setSelectedSeller] = useState<Seller | undefined>(
        undefined
    );

    const sellerOptions = useMemo(() =>
        sellers.map((seller) => ({
            value: seller.vendedor,
            label: seller.vendedor,
        })), [sellers]
    );
    const handleOk = () => {
        if (typeNotification === 2 && !selectedSeller) {
            onNotifyUpload?.(
                "Por favor, seleccione un vendedor específico para notificar.",
                "error"
            );
            return;
        }
        if (typeNotification === 2 && selectedSeller) {
            void startNotification(
                selectedSeller.correo_vendedor,
                selectedSeller.vendedor
            );
        }else {
            void startNotification();
        }

        onNotifyUpload?.(
            typeNotification === 1
                ? "Notificación enviada a todos los vendedores"
                : `Notificación enviada a: ${selectedSeller?.vendedor}`,
            "success"
        );
        onCloseUpload?.();
    };

    return (
        <Modal
            open={openDialogUpload}
            onOk={handleOk}
            title="Enviar Notificación"
            onCancel={onCloseUpload}
            width={500}
            centered
            maskClosable={false}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div>
                    <div style={{ fontWeight: 500, marginBottom: 8 }}>
                        Selecciona el tipo de notificación:
                    </div>
                    <Radio.Group
                        onChange={(e) => setTypeNotification(e.target.value as number)}
                        defaultValue={2}
                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                        <Radio value={1}>Notificar a todos los vendedores</Radio>
                        <Radio value={2}>Notificar a un vendedor específico</Radio>
                    </Radio.Group>

                    {typeNotification === 2 && (
                        <div>
                            <Select
                                onChange={(value) => {
                                    setSelectedSeller(
                                        sellers.find((s) => s.vendedor === value)
                                    );
                                }}
                                style={{ width: "100%", marginTop: 16 }}
                                placeholder="Selecciona un vendedor"
                                disabled={typeNotification !== 2}
                                options={sellerOptions}
                                // Si quieres que el valor seleccionado sea visible correctamente
                                value={selectedSeller?.vendedor}
                            />
                        </div>
                    )}
                </div>
            </Space>
        </Modal>
    );
};

export default NotificationSellerModal;
