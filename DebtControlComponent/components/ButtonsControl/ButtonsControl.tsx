import * as React from "react";
import UploadModal from "./Buttons/Modals/UploadModal";
import ButtonRefresh from "./Buttons/ButtonRefresh";
import ButtonUpload from "./Buttons/ButtonUpload";
import ButtonSellerNotification from "./Buttons/ButtonSellerNotification";
import ButtonClientNotification from "./Buttons/ButtonClientNotification";
import ButtonHistoryProcces from "./Buttons/ButtonHistoryProcces";
import Message from "./Buttons/Modals/Message/Message";
import NotificationSellerModal from "./Buttons/Modals/NotificationSellerModal";
import { Seller } from "../../interface/Entities";

interface DebtControlButtonsProps {
  onRefresh: () => Promise<void>;
  loading?: boolean;
  sellers: Seller[];
}

const ButtonsControl: React.FC<DebtControlButtonsProps> = ({
  onRefresh,
  loading = false,
  sellers
}) => {
  type AppContextType = Record<string, unknown>; // Define with actual shape if needed
  const AppContext = React.createContext<AppContextType | undefined>(undefined);

  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isNotificationSellerModalOpen, setIsNotificationSellerModalOpen] = React.useState(false);


  const [messageUpload, setMessageUpload] = React.useState<string | null>(null);
  const [messageVisible, setMessageVisible] = React.useState(false);
  const [typeMessage, setTypeMessage] = React.useState<string>("success");

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);
  const handleOpenNotificationSellerModal = () => setIsNotificationSellerModalOpen(true);
  const handleCloseNotificationSellerModal = () => setIsNotificationSellerModalOpen(false);
  const handleMessageUpload = (message: string) => {
    setMessageUpload(message);
  };
  const handleTypeMessage = (type: string) => {
    setTypeMessage(type);
  };
  const handleClickRefresh = () => {
    void onRefresh();
  };

  return (
    <AppContext.Provider value={{}}>
    <div style={{ padding: 0, display: "flex", alignContent: "center"}}>
      <div style={{ width: "20%" , display: "flex", justifyContent: "start", alignItems: "center"}}>
        <ButtonRefresh onRefresh={handleClickRefresh} loading={loading} />
      </div>
      <div style={{ width: "80%" , display: "flex", justifyContent: "end", alignItems: "center", gap: "5px" }}>
        <ButtonUpload handleOpenUploadModal={handleOpenUploadModal} />
        <ButtonSellerNotification 
          handleNotificationSellerModal={handleOpenNotificationSellerModal}
        />
        <ButtonClientNotification
          onNotify={() => {
            void 0;
          }}
        />
        <ButtonHistoryProcces
          onNotify={() => {
            void 0;
          }}
        />
      </div>
      <UploadModal
        openDialogUpload={isUploadModalOpen}
        onCloseUpload={handleCloseUploadModal}
        onNotifyUpload={(message: string, type: string) => {
          handleMessageUpload(message);
          handleTypeMessage(type);
          setMessageVisible(true);
        }}
      />
      <NotificationSellerModal
        sellers={sellers}
        openDialogUpload={isNotificationSellerModalOpen}
        onCloseUpload={handleCloseNotificationSellerModal}
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
    </AppContext.Provider>
  );
};
export default ButtonsControl;
