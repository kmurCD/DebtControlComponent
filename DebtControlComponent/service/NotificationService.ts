import axios from "axios";
import { CONFIGDEV } from "./config";

export const notificationSeller = async (nameSeller: string, sellerEmail: string): Promise<{ error?: string }> => {
    const response = await axios.post(
        CONFIGDEV.postSellerNotification,
        {
            Seller: nameSeller,
            Email: sellerEmail,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

export const notificationAllSellers = async (): Promise<{ error?: string }> => {
    const response = await axios.post(
        CONFIGDEV.postAllSellerNotification,
        null,
        {
            headers: { "Content-Type": "application/json" },
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

export const notificationClients = async (EmailUser: string): Promise<{ error?: string }> => {
    const response = await axios.post(
        CONFIGDEV.postClientNotification,   
         {
            Email: EmailUser,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
}