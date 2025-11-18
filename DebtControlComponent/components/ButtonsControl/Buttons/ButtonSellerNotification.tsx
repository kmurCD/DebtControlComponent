import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { MailOutlined } from "../../../ant-custom-icons-import";
import '../ButtonCSS.css';

interface ButtonSellerNotificationProps {
    handleNotificationSellerModal: () => void;
    loading?: boolean;
}

const ButtonSellerNotification: React.FC<ButtonSellerNotificationProps> = ({
    handleNotificationSellerModal,
    loading = false,
}) => {

    const handleClickNotify = (e: React.MouseEvent) => {
        void handleNotificationSellerModal();
    };

    return (
        <Button
            onClick={handleClickNotify}
            className="button-seller-notification"
            icon={<MailOutlined style={{ fontSize: 14 }} />}
            loading={loading}
        >
            Notificar Vendedor
        </Button>
    );
};
export default ButtonSellerNotification;
