import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { MailOutlined } from "../../../ant-custom-icons-import";
import './ButtonCSS.css';

interface ButtonSellerNotificationProps {
    onNotify: () => void;
    loading?: boolean;
}

const ButtonSellerNotification: React.FC<ButtonSellerNotificationProps> = ({
    onNotify,
    loading = false,
}) => {

    const handleClickNotify = (e: React.MouseEvent) => {
        void onNotify();
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
