import * as React from "react";
import { Modal,Dragger } from "../../ant-custom-import";
import { FileExcelOutlined } from "../../ant-custom-icons-import";

interface modalUploadControlProps {
    openDialogUpload: boolean;
    onCloseUpload?: () => void;
}
const ModalUploadControl: React.FC<modalUploadControlProps> = ({ openDialogUpload, onCloseUpload }) => {

    const handleOk = () => {
        if (onCloseUpload) {
            onCloseUpload();
        }
    };

    const handleCancel = () => {
        if (onCloseUpload) {
            onCloseUpload();
        }
    };

    return (
        <Modal
            title="Basic Modal"
            open={openDialogUpload}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Dragger name="file" multiple={false} action="/upload.do">

                <p className="ant-upload-drag-icon">
                    <FileExcelOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
        </Modal>
    );
};

export default ModalUploadControl;
