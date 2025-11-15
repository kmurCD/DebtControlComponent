import * as React from "react";
import UploadModal from "./Modals/UploadModal";
import ButtonRefresh from "./Buttons/ButtonRefresh";
import ButtonUpload from "./Buttons/ButtonUpload";
import ButtonSellerNotification from "./Buttons/ButtonSellerNotification";
import ButtonClientNotification from "./Buttons/ButtonClientNotification";
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
  const [typeMessage, setTypeMessage] = React.useState<string>("success");

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);
  const handleMessageUpload = (message: string) => {
    setMessageUpload(message);
  }
const handleTypeMessage = (type: string) => {
    setTypeMessage(type);
  }
  const handleClickRefresh = () => {
    void onRefresh(); 
  };

  return (
    <div style={{ padding: 0, display: "flex", gap: 8 }}>
      <ButtonRefresh onRefresh={handleClickRefresh} loading={loading} />

      <ButtonUpload handleOpenUploadModal={handleOpenUploadModal} />

      <ButtonSellerNotification onNotify={() => { void 0; }} />
        <ButtonClientNotification onNotify={() => { void 0; }} />
      <UploadModal
        openDialogUpload={isUploadModalOpen}
        onCloseUpload={handleCloseUploadModal}
        onNotifyUpload={(message: string, type: string) => {
          handleMessageUpload(message);
          handleTypeMessage(type);
          setMessageVisible(true);
        }}
      />
      <Message
        visible={messageVisible}
        mensaje={messageUpload ?? ""}
        type={typeMessage}
        onClose={() => {
          setMessageVisible(false);
          setMessageUpload(null);
          
        }}
      />
    </div>
  );
};
export default ButtonsControl;
