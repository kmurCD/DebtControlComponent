import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { SyncOutlined } from "../../../ant-custom-icons-import";

interface ButtonRefreshProps {
    onRefresh: () => void;
    loading?: boolean;
}

const ButtonRefresh: React.FC<ButtonRefreshProps> = ({
    onRefresh,
    loading = false,
}) => {

    const handleClickRefresh = (e: React.MouseEvent) => {
        void onRefresh();
    };

    return (
        <Button
            onClick={handleClickRefresh}
            icon={<SyncOutlined style={{ fontSize: 14 }} />}
            loading={loading}
        >
            Recargar
        </Button>
    );
};
export default ButtonRefresh;
