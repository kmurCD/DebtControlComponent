import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { HistoryOutlined } from "../../../ant-custom-icons-import";
import '../ButtonCSS.css';

interface ButtonHistoryProccesProps {
    onNotify: () => void;
    loading?: boolean;
}

const ButtonHistoryProcces: React.FC<ButtonHistoryProccesProps> = ({
    onNotify,
    loading = false,
}) => {

    const handleClickNotify = (e: React.MouseEvent) => {
        void onNotify();
    };

    return (
        <Button
            onClick={handleClickNotify}
            type="ghost"
            className="button-history-procces button-sombra-personalizada"
            icon={<HistoryOutlined style={{ fontSize: 14 }} />}
            loading={loading}
        >
        </Button>
    );
};
export default ButtonHistoryProcces;
