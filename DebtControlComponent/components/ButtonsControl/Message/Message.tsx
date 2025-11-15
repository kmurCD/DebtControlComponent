import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    CheckCircleFilled,
    InfoCircleFilled,
    CloseCircleFilled,
    LoadingOutlined
} from "../../../ant-custom-icons-import";
import './Message.css';

interface MessageProps {
    mensaje: string;
    visible: boolean;
    onClose?: () => void;
    duration?: number; // ms
    type?:string;
}

const iconMap = {
    success: <CheckCircleFilled className="icon-message success" />,
    info: <InfoCircleFilled className="icon-message info" />,
    error: <CloseCircleFilled className="icon-message error" />,
    loading: <LoadingOutlined spin className="icon-message loading" />
};

const Message: React.FC<MessageProps> = ({
    mensaje,
    visible,
    onClose,
    duration = 3000,
    type,
}) => {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
        setShow(false);
    }, [visible, duration, onClose]);

    return (
        <div className="message-container">
            <div
                className={`message message-${type}${show ? ' animate-in' : ''}`}
                style={{ display: show ? 'flex' : 'none' }}
            >
                {iconMap[type as keyof typeof iconMap]}
                <span>{mensaje}</span>
            </div>
        </div>
    );
};

export default Message;