import * as React from "react";
import { Button } from "../ant-custom-import";
import { SyncOutlined, UploadOutlined } from "../ant-custom-icons-import";
import ModalUploadControl from "./Dialog/ModalUploadControl";

interface DebtControlButtonsProps {
  onRefresh: () => Promise<void> | void;
  loading?: boolean;
}

const buttonBaseStyle: React.CSSProperties = {
  borderRadius: 2,
  fontWeight: "normal",
  backgroundColor: "white",
};

const DebtControlButtons: React.FC<DebtControlButtonsProps> = ({
  onRefresh,
  loading = false,
}) => {
  const handleClickRefresh = (e: React.MouseEvent) => {
    void onRefresh();
  };

  const handleClickNotificationSeller = (e: React.MouseEvent) => {
    // Añadir funcionalidad si hace falta
  };

  // Inicializar en false para no abrir el modal al cargar la UI
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  return (
    <div
      style={{ padding: 0, display: "flex", gap: 8 }}
    >
      <Button
        onClick={handleClickRefresh}
        style={buttonBaseStyle}
        icon={<SyncOutlined style={{ fontSize: 14 }} />}
        loading={loading}
      >
        Recargar
      </Button>

      <Button
        onClick={handleOpenUploadModal}
        style={buttonBaseStyle}
        icon={<UploadOutlined />}
      >
        Subir Archivo
      </Button>

      <ModalUploadControl
        openDialogUpload={isUploadModalOpen}
        onCloseUpload={handleCloseUploadModal}
      />
    </div>
  );
};
export default DebtControlButtons;
