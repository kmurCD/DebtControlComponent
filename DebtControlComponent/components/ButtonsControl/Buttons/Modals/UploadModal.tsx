import * as React from "react";
import { Modal, Upload, Button } from "../../../../ant-custom-import";
import {
    UploadChangeParam,
    UploadFile,
    UploadProps,
} from "antd/es/upload/interface";
import { useUploadFile } from "../../../../hooks/useUploadFile";
import { UploadOutlined } from "../../../../ant-custom-icons-import";

import type { MessageType } from '../../../../types/MessageType';
interface ModalUploadControlProps {
    openDialogUpload: boolean;
    onCloseUpload?: () => void;
    onNotifyUpload?: (message: string, type: MessageType) => void;
    email?: string;
}

// Extracted styles as constants
const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 16,
};

const textContainerStyle: React.CSSProperties = {
    width: "100%",
    textAlign: "center",
};

const validationContainerStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
};

const getValidationMessageStyle = (isValid: boolean): React.CSSProperties => ({
    color: isValid ? "green" : "red",
    marginTop: 2,
    width: "100%",
    textAlign: "center",
});

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

    // Memoize validateFile to prevent recreation on each render
    const validateFile = React.useCallback((file: UploadFile | undefined) => {
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
    }, []);

    // Memoize handleUpload to prevent recreation on each render
    const handleUpload = React.useCallback(
        async (email: string) => {
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
        },
        [fileList, fileValid, startUpload, onNotifyUpload, onCloseUpload]
    );

    // Memoize Upload props to prevent recreation on each render
    const uploadProps: UploadProps = React.useMemo(
        () => ({
            accept: ".xls,application/vnd.ms-excel",
            onRemove: () => {
                setFileList([]);
                setFileValid(false);
                setValidationMessage("");
            },
            beforeUpload: (file) => {
                const { valid, message } = validateFile(file as UploadFile);
                setFileValid(valid);
                setValidationMessage(message);
                setFileList([file as UploadFile]);
                return false;
            },
            onChange: (info: UploadChangeParam<UploadFile>) => {
                const file = info.fileList.slice(-1)[0] as UploadFile | undefined;
                const { valid, message } = validateFile(file);
                setFileValid(valid);
                setValidationMessage(message);
                setFileList(info.fileList.slice(-1));
            },
            fileList,
            multiple: false,
            showUploadList: true,
        }),
        [fileList, validateFile]
    );

    // Memoize onOk handler
    const handleOk = React.useCallback(() => {
        void handleUpload(email);
    }, [handleUpload, email]);

    return (
        <Modal
            title={
                <span style={{ fontWeight: "normal" }}>Actualizar Base de Datos</span>
            }
            width={400}
            open={openDialogUpload}
            onOk={handleOk}
            confirmLoading={uploading}
            onCancel={onCloseUpload}
            okButtonProps={{ disabled: fileList.length === 0 || !fileValid }}
            maskClosable={false}
        >
            <div style={containerStyle}>
                <div style={textContainerStyle}>
                    <p>Solo se adminiten archivos Excel (.xls) 97-2003</p>
                </div>
                <div style={validationContainerStyle}>
                    {validationMessage && (
                        <p style={getValidationMessageStyle(fileValid)}>
                            {validationMessage}
                        </p>
                    )}
                </div>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} disabled={uploading}>
                        Seleccionar archivo
                    </Button>
                </Upload>
            </div>
        </Modal>
    );
};

export default UploadModal;
