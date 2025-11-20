import { useState, useEffect, useCallback, useRef } from "react";
import { getHistoryProcess } from "../service/HistoryService";
import { HistoryProcess } from "../interface/Entities";

export const useHistoryProcess = () => {
    const [historyProcess, setHistoryProcess] = useState<HistoryProcess[]>([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);
    const isFetchingRef = useRef(false);

    const fetchData = useCallback(async () => {
        if (isFetchingRef.current) {
            return;
        }
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);
        try {
            //Obtener datos de la API
            const result = await getHistoryProcess();

            if (!result.error) {
                setHistoryProcess(result.historyProcess);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    // Quitar el useEffect para no cargar automáticamente al mount

    return { historyProcess, loading, error, refresh: fetchData };
};
