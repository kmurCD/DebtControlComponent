import { useState, useCallback, useRef } from "react";
import { notificationSeller, notificationAllSellers } from "../service/NotificationService";

export const useNotification = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isFetchingRef = useRef(false);

    const startNotification = useCallback(async (sellerEmail?: string, nameSeller?: string) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        try {
   
            let result: string | { error?: string };

            if (sellerEmail && nameSeller) {
                result = await notificationSeller(nameSeller, sellerEmail);
            } else {
                result = await notificationAllSellers();
            }

            if (result?.error) {
                setError(result.error);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    const notifyAllSellers = useCallback(async () => {
        await startNotification();
    }, [startNotification]);

    return { loading, error, startNotification, notifyAllSellers };
};
