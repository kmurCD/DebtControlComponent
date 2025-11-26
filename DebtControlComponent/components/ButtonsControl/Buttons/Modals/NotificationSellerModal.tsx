import * as React from "react";
import { Modal, Space, Radio, Select } from "../../../../ant-custom-import";
import type { RadioChangeEvent } from "antd/es/radio";
import { useState, useMemo, useCallback } from "react";
import { Seller } from "../../../../interface/Entities";
import { useNotification } from "../../../../hooks/useNotification";
import "./ModalCSS.css";
import type { MessageType } from '../../../../types/MessageType';
interface ModalNotificationControlProps {
    sellers: Seller[];
    openDialogUpload: boolean;
    onCloseUpload?: () => void;
    onNotifyUpload?: (mensaje: string, type: MessageType) => void;
}

// Extracted styles as constants
const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    marginBottom: 8,
};

const radioGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
};

const selectStyle: React.CSSProperties = {
    width: "100%",
    marginTop: 16,
};

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
    // Memoize handleOk to prevent recreation on each render
    const handleOk = useCallback(() => {
        if (typeNotification === 1) {
            // Fire-and-forget
            void startNotification();
            onNotifyUpload?.("Notificación enviada a todos los vendedores", "success");
            console.log("Notificación enviada a todos los vendedores");
        } else if (typeNotification === 2) {
            if (!selectedSeller) {
                onNotifyUpload?.(
                    "Por favor, seleccione un vendedor específico para notificar.",
                    "error"
                );
                return;
            }
            // Fire-and-forget
            void startNotification(
                selectedSeller.correo_vendedor,
                    selectedSeller.vendedor,
            );
            onNotifyUpload?.(
                `Notificación enviada a: ${selectedSeller.vendedor}`,
                "success"
            );
        }

        onCloseUpload?.();
    }, [typeNotification, selectedSeller, startNotification, onNotifyUpload, onCloseUpload]);

    // Memoize radio change handler
    const handleRadioChange = useCallback((e: RadioChangeEvent) => {
        setTypeNotification(e.target.value as number);
    }, []);

    // Memoize select change handler
    const handleSelectChange = useCallback((value: string) => {
        setSelectedSeller(sellers.find((s) => s.vendedor === value));
    }, [sellers]);

    return (
        <Modal
            open={openDialogUpload}
            onOk={handleOk}
            title={ <span style={{ fontWeight: "normal" }}>Notificar Vendedor</span>}
            onCancel={onCloseUpload}
            width={500}
            centered
            maskClosable={false}
        >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div>
                    <div style={labelStyle}>
                        Selecciona el tipo de notificación:
                    </div>
                    <Radio.Group
                        onChange={handleRadioChange}
                        defaultValue={2}
                        style={radioGroupStyle}
                    >
                        <Radio value={1}>Notificar a todos los vendedores</Radio>
                        <Radio value={2}>Notificar a un vendedor específico</Radio>
                    </Radio.Group>

                    {typeNotification === 2 && (
                        <div>
                            <Select
                                onChange={handleSelectChange}
                                style={selectStyle}
                                placeholder="Selecciona un vendedor"
                                disabled={typeNotification !== 2}
                                options={sellerOptions}
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
