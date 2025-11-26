import { useState, useCallback, useRef } from "react";
import { notificationSeller, notificationAllSellers } from "../service/NotificationService";
import { useUser } from "../contexts/UserContext";

export const useNotification = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isFetchingRef = useRef(false);
    const { userEmail } = useUser();

    const startNotification = useCallback(async (sellerEmail?: string, nameSeller?: string): Promise<boolean> => {
        if (isFetchingRef.current) return false;
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        try {
   
            let result: string | { error?: string };

            if (sellerEmail && nameSeller) {
                result = await notificationSeller(nameSeller, sellerEmail, userEmail);
            } else {
                result = await notificationAllSellers(userEmail);
            }

            if (result?.error) {
                setError(result.error);
                return false;
            }
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
            return false;
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [userEmail]);

    const notifyAllSellers = useCallback(async () => {
        await startNotification();
    }, [startNotification]);

    return { loading, error, startNotification, notifyAllSellers };
};
