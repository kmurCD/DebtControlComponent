import { useState, useRef } from "react";
import { uploadFile } from "../service/UploadService";
import { serviceResponse } from "../interface/Entities";
import { useUser } from "../contexts/UserContext";

export const useUploadFile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isFetchingRef = useRef(false);
    const { userEmail } = useUser();
    const startUpload = async (
        file: File,
        email: string
    ): Promise<serviceResponse | null> => {
        if (isFetchingRef.current) return null;
        isFetchingRef.current = true;
        setLoading(true);
        setError(null);
        try {
            const result = await uploadFile(file, email, userEmail);
            if (result.code !== "200") setError(result.message);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
            return null;
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    return { startUpload, loading, error };
};
