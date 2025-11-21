import * as React from "react";
import { Button } from "../../../ant-custom-import";
import { HistoryOutlined } from "../../../ant-custom-icons-import";
import "../ButtonCSS.css";

interface ButtonHistoryProccesProps {
    handleOpenHistoryProcessModal: () => void;
    loading?: boolean;
}

const iconStyle: React.CSSProperties = { fontSize: 14 };

const ButtonHistoryProcces: React.FC<ButtonHistoryProccesProps> = ({
    handleOpenHistoryProcessModal,
    loading = false,
}) => {
    return (
        <Button
            onClick={handleOpenHistoryProcessModal}
            className="button-history-process"
            icon={<HistoryOutlined style={iconStyle} />}
            loading={loading}
        >
        </Button>
    );
};

export default ButtonHistoryProcces;
