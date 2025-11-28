import { useState, useCallback, useRef } from "react";
import { notificationClients } from "../service/NotificationService";
import { useUser } from "../contexts/UserContext";

export const useNotificationClients = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isFetchingRef = useRef(false);

        const { userEmail } = useUser();

    const startNotificationClient = useCallback(async (): Promise<boolean> => {
        if (isFetchingRef.current) return false;
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        try {
   
            let result: string | { error?: string } = {};

            if (userEmail ) {
                result = await notificationClients(userEmail,);
            } 

            if ((result as { error?: string })?.error) {
                setError((result as { error?: string }).error!);
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
    }, []);

    const notifyAllSellers = useCallback(async () => {
        await startNotificationClient();
    }, [startNotificationClient]);

    return { loading, error, startNotificationClient, notifyAllSellers };
};
