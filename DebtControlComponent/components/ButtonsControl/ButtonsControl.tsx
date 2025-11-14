import * as React from "react";
import UploadModal from "./Modals/UploadModal";
import ButtonRefresh from "./Buttons/ButtonRefresh";
import ButtonUpload from "./Buttons/ButtonUpload";
import Message from "./Message/Message";
interface DebtControlButtonsProps {
  onRefresh: () => Promise<void>;
  loading?: boolean;
}

const ButtonsControl: React.FC<DebtControlButtonsProps> = ({
  onRefresh,
  loading = false,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [messageUpload, setMessageUpload] = React.useState<string | null>(null);
  const [messageVisible, setMessageVisible] = React.useState(false);


  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);
  const handleMessageUpload = (message: string) => {
    setMessageUpload(message);
  }

  const handleClickRefresh = () => {
    void onRefresh(); 
  };

  return (
    <div style={{ padding: 0, display: "flex", gap: 8 }}>
      <ButtonRefresh onRefresh={handleClickRefresh} loading={loading} />

      <ButtonUpload handleOpenUploadModal={handleOpenUploadModal} />

      <UploadModal
        openDialogUpload={isUploadModalOpen}
        onCloseUpload={handleCloseUploadModal}
        onNotifyUpload={(message: string) => {
          handleMessageUpload(message);
          setMessageVisible(true);
        }}
      />
      <Message
        visible={messageVisible}
        mensaje={messageUpload ?? ""}
        onClose={() => {
          setMessageVisible(false);
          setMessageUpload(null);
        }}
      />
    </div>
  );
};
export default ButtonsControl;
