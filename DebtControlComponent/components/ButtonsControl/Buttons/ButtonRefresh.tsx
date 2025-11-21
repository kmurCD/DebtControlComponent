import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { SyncOutlined } from "../../../ant-custom-icons-import";

interface ButtonRefreshProps {
    onRefresh: () => void;
    loading?: boolean;
}

const iconStyle: React.CSSProperties = { fontSize: 14 };

const ButtonRefresh: React.FC<ButtonRefreshProps> = ({
    onRefresh,
    loading = false,
}) => {
    return (
        <Button
            onClick={onRefresh}
            icon={<SyncOutlined style={iconStyle} />}
            loading={loading}
        >
            Recargar
        </Button>
    );
};

export default ButtonRefresh;
