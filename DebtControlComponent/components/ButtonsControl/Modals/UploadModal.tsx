import * as React from "react";
import { Modal, Upload, Button } from "../../../ant-custom-import";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useUploadFile } from "../../../hooks/useUploadFile";
import { UploadOutlined } from "../../../ant-custom-icons-import";

interface ModalUploadControlProps {
    openDialogUpload: boolean;
    onCloseUpload?: () => void;
    onNotifyUpload?: (message: string) => void;
    typeMessage?: string;
    email?: string;
    uploadUrl?: string;
}

const UploadModal: React.FC<ModalUploadControlProps> = ({
    openDialogUpload,
    onCloseUpload,
    onNotifyUpload,
    typeMessage,
    email = "josue.centella@tranligra.pe",
}) => {
    const { loading, error, startUpload } = useUploadFile();
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [uploading, setUploading] = React.useState(false);
    const [isTypeMessage, setIsTypeMessage] = React.useState<string>(typeMessage ?? "");

    const handleUpload = async (email: string) => {
        if (fileList.length === 0) return;
        setUploading(true);
        const uploadFile = fileList[0];
        const originFile = uploadFile?.originFileObj;
        if (originFile) {
            await startUpload(originFile, email);
        }
        setFileList([]);
        setUploading(false);

        setIsTypeMessage("success");

        if (onNotifyUpload) onNotifyUpload("Archivo subido exitosamente");
        if (onCloseUpload) onCloseUpload();
    };

    const props: UploadProps = {
        onRemove: file => {
            setFileList([]);
        },
        beforeUpload: file => {
            setFileList([file]); // Solo uno, reemplaza el anterior
            return false;
        },
        onChange: (info: UploadChangeParam<UploadFile>) => {
            setFileList(info.fileList.slice(-1)); // Seguridad: siempre solo uno
        },
        fileList,
        multiple: false,
        showUploadList: true,
    };

    return (
        <Modal
            title={<span style={{ fontWeight: "normal" }}>Actualizar Base de Datos</span>}
            open={openDialogUpload}
            onOk={() => void handleUpload(email)}
            confirmLoading={uploading}
            onCancel={onCloseUpload}
            okButtonProps={{ disabled: fileList.length === 0 }}
        >
            <Upload {...props}>
                <Button icon={<UploadOutlined />} disabled={uploading}>Seleccionar archivo</Button>
            </Upload>
            {/* Puedes mostrar error o loading aquí si quieres */}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </Modal>
    );
};

export default UploadModal;