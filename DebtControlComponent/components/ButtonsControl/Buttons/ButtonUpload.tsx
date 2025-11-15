import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { UploadOutlined } from "../../../ant-custom-icons-import";

interface ButtonUploadProps {
   handleOpenUploadModal: () => void;
}

const ButtonUpload: React.FC<ButtonUploadProps> = ({
    handleOpenUploadModal
}) => {

    const handleClickUpload = (e: React.MouseEvent) => {
        handleOpenUploadModal();
    };

    return (
        <Button
            onClick={handleClickUpload}
            icon={<UploadOutlined style={{ fontSize: 14 }} />}          
        >
            Subir Archivo
        </Button>
    );
};
export default ButtonUpload;
