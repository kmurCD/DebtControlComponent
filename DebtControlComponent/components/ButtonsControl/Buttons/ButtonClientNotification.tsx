import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { NotificationOutlined } from "../../../ant-custom-icons-import";
import './ButtonCSS.css';

interface ButtonClientNotificationProps {
    onNotify: () => void;
    loading?: boolean;
}

const ButtonClientNotification: React.FC<ButtonClientNotificationProps> = ({
    onNotify,
    loading = false,
}) => {

    const handleClickNotify = (e: React.MouseEvent) => {
        void onNotify();
    };

    return (
        <Button
            onClick={handleClickNotify}
            className="button-client-notification"
            icon={<NotificationOutlined style={{ fontSize: 14 }} />}
            loading={loading}
        >
            Notificar Cliente
        </Button>
    );
};
export default ButtonClientNotification;
