import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { MailOutlined } from "../../../ant-custom-icons-import";
import "../ButtonCSS.css";

interface ButtonSellerNotificationProps {
    handleNotificationSellerModal: () => void;
    loading?: boolean;
}

const iconStyle: React.CSSProperties = { fontSize: 14 };

const ButtonSellerNotification: React.FC<ButtonSellerNotificationProps> = ({
    handleNotificationSellerModal,
    loading = false,
}) => {
    return (
        <Button
            onClick={handleNotificationSellerModal}
            className="button-seller-notification"
            icon={<MailOutlined style={iconStyle} />}
            loading={loading}
        >
            Notificar Vendedor
        </Button>
    );
};

export default ButtonSellerNotification;
