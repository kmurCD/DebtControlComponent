import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { SyncOutlined } from "../../../ant-custom-icons-import";

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
            style={{
                borderRadius: 2,
                fontWeight: "normal",
                backgroundColor: "white",
            }}
            icon={<SyncOutlined style={{ fontSize: 14 }} />}          
        >
            Subir Archivo
        </Button>
    );
};
export default ButtonUpload;
