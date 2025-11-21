import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { UploadOutlined } from "../../../ant-custom-icons-import";

interface ButtonUploadProps {
    handleOpenUploadModal: () => void;
}

const iconStyle: React.CSSProperties = { fontSize: 14 };

const ButtonUpload: React.FC<ButtonUploadProps> = ({
    handleOpenUploadModal,
}) => {
    return (
        <Button
            onClick={handleOpenUploadModal}
            icon={<UploadOutlined style={iconStyle} />}
        >
            Subir Archivo
        </Button>
    );
};

export default ButtonUpload;
