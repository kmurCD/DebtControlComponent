import * as React from "react";
// Define MessageType here if the import is missing
import type { MessageType } from '../../types/MessageType';
import { Button } from "../../ant-custom-import";
import UploadModal from "./Buttons/Modals/UploadModal";
import ButtonRefresh from "./Buttons/ButtonRefresh";
import ButtonUpload from "./Buttons/ButtonUpload";
import ButtonSellerNotification from "./Buttons/ButtonSellerNotification";
import ButtonClientNotification from "./Buttons/ButtonClientNotification";
import ButtonHistoryProcces from "./Buttons/ButtonHistoryProcces";
import Message from "./Buttons/Modals/Message/Message";
import NotificationSellerModal from "./Buttons/Modals/NotificationSellerModal";
import { Seller ,Debt } from "../../interface/Entities";
import HistoryProcessModal from "./Buttons/Modals/HistoryProcessModal";
import NotificationClientsModal from "./Buttons/Modals/NotificacionClientModal";
interface DebtControlButtonsProps {
  onRefreshDebts: () => Promise<void>;
  loadingDebts?: boolean;
  sellers: Seller[];
  debts?: Debt[]; // Ajusta el tipo según tu entidad Debt
}

const containerStyle: React.CSSProperties = {
  padding: 0,
  display: "flex",
  alignContent: "center",
};

const leftSectionStyle: React.CSSProperties = {
  width: "20%",
  display: "flex",
  justifyContent: "flex-start", // corregido
  alignItems: "center",
};

const rightSectionStyle: React.CSSProperties = {
  width: "80%",
  display: "flex",
  justifyContent: "flex-end", // corregido
  alignItems: "center",
  gap: "5px",
};



const ButtonsControl: React.FC<DebtControlButtonsProps> = ({
  onRefreshDebts,
  loadingDebts = false,
  sellers,
  debts,
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isNotificationSellerModalOpen, setIsNotificationSellerModalOpen] =
    React.useState(false);
  const [isHistoryProcessModalOpen, setIsHistoryProcessModalOpen] =
    React.useState(false);

  const [messageUpload, setMessageUpload] = React.useState<string | null>(null);
  const [messageVisible, setMessageVisible] = React.useState(false);
  const [typeMessage, setTypeMessage] = React.useState<MessageType>("success");
    const [isModalOpen, setIsModalOpen] = React.useState(false);

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


  const clientsData = React.useMemo(
    () =>
      sellers.map((seller, idx) => ({
        id: idx, // Genera un id único temporal
        nombre: seller.vendedor,
        email: seller.correo_vendedor,
      })),
    [sellers]
  );

  const handleOpenModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirmSend = React.useCallback(() => {
    // Aquí pones tu lógica de envío (backend, etc.)
    console.log("Enviando correos a clientes...");
    setIsModalOpen(false);
  }, []);

  const handleClickRefresh = React.useCallback(() => {
    void onRefreshDebts();
  }, [onRefreshDebts]);

  const handleNotification = React.useCallback(
    (message: string, type: MessageType) => {
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
        <ButtonClientNotification onClick={handleOpenModal}  />
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
      <NotificationClientsModal 
                openDialogNotificationClient={isModalOpen}
                onCloseNotificacionClient={handleCloseModal}
                onConfirm={handleConfirmSend}
                debts={debts}
                
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
