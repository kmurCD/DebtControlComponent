import axios from "axios";
import { CONFIG } from "./config";

export const notificationSeller = async (
    nameSeller: string,
    sellerEmail: string,
    emailUser: string
): Promise<{ error?: string }> => {
    const response = await axios.post(
        CONFIG.postSellerNotification,
        {
            Seller: nameSeller,
            Email: sellerEmail,
            EmailUsuario: emailUser,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

export const notificationAllSellers = async (
    emailUser: string
): Promise<{ error?: string }> => {
    const response = await axios.post(
        CONFIG.postAllSellerNotification,
        {
            EmailUsuario: emailUser,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};

export const notificationClients = async (
    EmailUser: string
): Promise<{ error?: string }> => {
    const response = await axios.post(
        CONFIG.postClientNotification,
        {
            Email: EmailUser,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
};
