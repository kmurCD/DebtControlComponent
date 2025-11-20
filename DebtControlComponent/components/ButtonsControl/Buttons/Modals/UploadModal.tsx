import * as React from "react";
import { Modal, Upload, Button } from "../../../../ant-custom-import";
import {
    UploadChangeParam,
    UploadFile,
    UploadProps,
} from "antd/es/upload/interface";
import { useUploadFile } from "../../../../hooks/useUploadFile";
import { UploadOutlined } from "../../../../ant-custom-icons-import";
interface ModalUploadControlProps {
    openDialogUpload: boolean;
    onCloseUpload?: () => void;
    onNotifyUpload?: (message: string, type: string) => void;
    email?: string;
}

const UploadModal: React.FC<ModalUploadControlProps> = ({
    openDialogUpload,
    onCloseUpload,
    onNotifyUpload,
    email = "josue.centella@tranligra.pe",
}) => {
    const { startUpload } = useUploadFile();
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [uploading, setUploading] = React.useState(false);
    const [fileValid, setFileValid] = React.useState<boolean>(false);
    const [validationMessage, setValidationMessage] = React.useState<string>("");

    const handleUpload = async (email: string) => {
        if (fileList.length === 0 || !fileValid) return;
        setUploading(true);
        const uploadFile = fileList[0];
        const originFile = uploadFile?.originFileObj;

        if (originFile) {
            const result = await startUpload(originFile, email);
            if (result) {
                if (result.code === "200" && onNotifyUpload)
                    onNotifyUpload("Archivo subido exitosamente", "success");
                else if (onNotifyUpload) onNotifyUpload(result.message, "error");
                if (onCloseUpload) onCloseUpload();
            }
        }

        setFileList([]);
        setUploading(false);
    };

    const validateFile = (file: UploadFile | undefined) => {
        if (!file) return { valid: false, message: "Adjunte un archivo" };

        const name = (file.name ?? "").toString().toLowerCase();
        const type = (file.type ?? "").toString().toLowerCase();

        const isXlsMime = type === "application/vnd.ms-excel";
        const isXlsExt = name.endsWith(".xls");
        if (isXlsMime ?? isXlsExt) {
            return { valid: true, message: "Archivo válido" };
        }
        return {
            valid: false,
            message: "Archivo no admitido: solo Excel (.xls) 97-2003",
        };
    };

    const props: UploadProps = {
        accept: ".xls,application/vnd.ms-excel",
        onRemove: (file) => {
            setFileList([]);
            setFileValid(false);
            setValidationMessage("");
        },
        beforeUpload: (file) => {
            // Validate before adding to list. We still return false to prevent auto upload
            const { valid, message } = validateFile(file as UploadFile);
            setFileValid(valid);
            setValidationMessage(message);
            setFileList([file as UploadFile]); // Solo uno, reemplaza el anterior
            return false;
        },
        onChange: (info: UploadChangeParam<UploadFile>) => {
            const file = info.fileList.slice(-1)[0] as UploadFile | undefined;
            const { valid, message } = validateFile(file);
            setFileValid(valid);
            setValidationMessage(message);
            setFileList(info.fileList.slice(-1)); // Seguridad: siempre solo uno
        },
        fileList,
        multiple: false,
        showUploadList: true,
    };

    return (
        <Modal
            title={
                <span style={{ fontWeight: "normal" }}>Actualizar Base de Datos</span>
            }
            width={400}
            open={openDialogUpload}
            onOk={() => void handleUpload(email)}
            confirmLoading={uploading}
            onCancel={onCloseUpload}
            okButtonProps={{ disabled: fileList.length === 0 || !fileValid }}
        >
            {" "}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 16,
                    marginBottom: 16,
                }}
            >
                {" "}
                <div style={{ width: "100%", textAlign: "center" }}>
                    <p>Solo se adminiten archivos Excel (.xls) 97-2003</p>
                </div>
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    {validationMessage && (
                        <p
                            style={{
                                color: fileValid ? "green" : "red",
                                marginTop: 2,
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            {validationMessage}
                        </p>
                    )}
                </div>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />} disabled={uploading}>
                        Seleccionar archivo
                    </Button>
                </Upload>
            </div>
        </Modal>
    );
};

export default UploadModal;
