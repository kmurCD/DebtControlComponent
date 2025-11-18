import * as React from "react";
import { Modal, Space, Radio, Select } from "../../../../ant-custom-import";
import { useState } from "react";
import { Seller } from "../../../../interface/Entities";
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
    sellers
}) => {
    const [typeNotification, setTypeNotification] = useState<number>(2);
    const [selectedSeller, setSelectedSeller] = useState<string>("");

    const handleOk = () => {
        

        onNotifyUpload?.(
            typeNotification === 1
                ? "Notificación enviada a todos los vendedores"
                : `Notificación enviada a : ${selectedSeller}`,
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
                        onChange={(e) =>  setTypeNotification(e.target.value as number)}
                        defaultValue={2}
                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                        <Radio value={1}>Notificar a todos los vendedores</Radio>
                        <Radio value={2}>Notificar a un vendedor específico</Radio>
                    </Radio.Group>

                    {typeNotification === 2 && (        
                    <div>
                        <Select
                        onChange={
                            (value: string) => {
                                setSelectedSeller(value);
                            }
                        }
                            style={{ width: "100%", marginTop: 16 }}
                            placeholder="Selecciona un vendedor"
                            disabled={typeNotification !== 2}
                            options={sellers.map(seller => ({ value: seller.correo_vendedor, label: seller.vendedor }))}
                        />  
                    </div>)}
                </div>
            </Space>
        </Modal>
    );
};

export default NotificationSellerModal;
