import { useState, useRef } from "react";
import { uploadFile } from "../service/UploadService";

export const useUploadFile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isFetchingRef = useRef(false);
    const [result, setResult] = useState<string | { error?: string } | null>(null);

    const startUpload = async (file: File, email: string) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);
        try {
            const result = (await uploadFile(file, email)) as { error?: string };
            setResult(result);
            if (result.error) setError(result.error);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    return { loading, error, startUpload };
};
