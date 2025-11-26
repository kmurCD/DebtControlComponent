import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { NotificationOutlined } from "../../../ant-custom-icons-import";
import "../ButtonCSS.css";

interface ButtonClientNotificationProps {
    loading?: boolean;
    onClick?: () => void;
}

const iconStyle: React.CSSProperties = { fontSize: 14 };
const ButtonClientNotification: React.FC<ButtonClientNotificationProps> = ({
    loading = false,
    onClick,
}) => {
    return (
        <Button
            onClick={onClick}
            className="button-client-notification"
            icon={<NotificationOutlined style={iconStyle} />}
            loading={loading}
        >
            Notificar Cliente
        </Button>
    );
};

export default ButtonClientNotification;
