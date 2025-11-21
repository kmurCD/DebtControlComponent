import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { NotificationOutlined } from "../../../ant-custom-icons-import";
import "../ButtonCSS.css";

interface ButtonClientNotificationProps {
    loading?: boolean;
}

const iconStyle: React.CSSProperties = { fontSize: 14 };
const hanledNotifyClient = () => {
    console.log("Notificar al cliente");
}
const ButtonClientNotification: React.FC<ButtonClientNotificationProps> = ({
    loading = false,
}) => {
    return (
        <Button
            onClick={hanledNotifyClient}
            className="button-client-notification"
            icon={<NotificationOutlined style={iconStyle} />}
            loading={loading}
        >
            Notificar Cliente
        </Button>
        
    );
};

export default ButtonClientNotification;
