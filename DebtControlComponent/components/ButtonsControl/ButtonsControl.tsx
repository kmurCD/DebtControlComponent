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
import HistoryProcessModal from "./Buttons/Modals/HistoryProcessModal";

interface DebtControlButtonsProps {
  onRefreshDebts: () => Promise<void>;
  loadingDebts?: boolean;
  sellers: Seller[];
}

const containerStyle: React.CSSProperties = {
  padding: 0,
  display: "flex",
  alignContent: "center",
};

const leftSectionStyle: React.CSSProperties = {
  width: "20%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
};

const rightSectionStyle: React.CSSProperties = {
  width: "80%",
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "5px",
};

const ButtonsControl: React.FC<DebtControlButtonsProps> = ({
  onRefreshDebts,
  loadingDebts = false,
  sellers,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isNotificationSellerModalOpen, setIsNotificationSellerModalOpen] =
    React.useState(false);
  const [isHistoryProcessModalOpen, setIsHistoryProcessModalOpen] =
    React.useState(false);

  const [messageUpload, setMessageUpload] = React.useState<string | null>(null);
  const [messageVisible, setMessageVisible] = React.useState(false);
  const [typeMessage, setTypeMessage] = React.useState<string>("success");

  const handleOpenUploadModal = React.useCallback(
    () => setIsUploadModalOpen(true),
    []
  );
  const handleCloseUploadModal = React.useCallback(
    () => setIsUploadModalOpen(false),
    []
  );
  const handleOpenNotificationSellerModal = React.useCallback(
    () => setIsNotificationSellerModalOpen(true),
    []
  );
  const handleCloseNotificationSellerModal = React.useCallback(
    () => setIsNotificationSellerModalOpen(false),
    []
  );
  const handleOpenHistoryProcessModal = React.useCallback(
    () => setIsHistoryProcessModalOpen(true),
    []
  );
  const handleCloseHistoryProcessModal = React.useCallback(
    () => setIsHistoryProcessModalOpen(false),
    []
  );

  const handleClickRefresh = React.useCallback(() => {
    void onRefreshDebts();
  }, [onRefreshDebts]);

  const handleNotification = React.useCallback(
    (message: string, type: string) => {
      setMessageUpload(message);
      setTypeMessage(type);
      setMessageVisible(true);
    },
    []
  );

  const handleCloseMessage = React.useCallback(() => {
    setMessageVisible(false);
    setMessageUpload(null);
  }, []);


  return (
    <div style={containerStyle}>
      <div style={leftSectionStyle}>
        <ButtonRefresh onRefresh={handleClickRefresh} loading={loadingDebts} />
      </div>
      <div style={rightSectionStyle}>
        <ButtonUpload handleOpenUploadModal={handleOpenUploadModal} />
        <ButtonSellerNotification
          handleNotificationSellerModal={handleOpenNotificationSellerModal}
        />
        <ButtonClientNotification />
        <ButtonHistoryProcces
          handleOpenHistoryProcessModal={handleOpenHistoryProcessModal}
        />
      </div>
      <UploadModal
        openDialogUpload={isUploadModalOpen}
        onCloseUpload={handleCloseUploadModal}
        onNotifyUpload={handleNotification}
      />
      <NotificationSellerModal
        sellers={sellers}
        openDialogUpload={isNotificationSellerModalOpen}
        onCloseUpload={handleCloseNotificationSellerModal}
        onNotifyUpload={handleNotification}
      />
      <HistoryProcessModal
        openDialogHistoryProcess={isHistoryProcessModalOpen}
        onCloseHistoryProcess={handleCloseHistoryProcessModal}
      />
      <Message
        visible={messageVisible}
        mensaje={messageUpload ?? ""}
        type={typeMessage}
        onClose={handleCloseMessage}
      />
    </div>
  );
};

export default ButtonsControl;
