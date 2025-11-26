import { HistoryProcess } from "../interface/Entities";
import { ApiHistoryResponse } from "../interface/Entities";
import { CONFIG } from "./config";
import axios from "axios";

export const getHistoryProcess = async (): Promise<{
    historyProcess: HistoryProcess[];
    loading: boolean;
    error: string | null;
}> => {
    try {
        const r = await axios.get<ApiHistoryResponse>(CONFIG.getProcessHistory);
        const c: HistoryProcess[] = r.data.result ? JSON.parse(r.data.result) as HistoryProcess[] : [];
        console.log(r.data);
        return { historyProcess: c, loading: false, error: null };

    } catch (e: unknown) {
        interface ErrorData {
            message?: string;
        }
        const msg = axios.isAxiosError(e)
            ? (e.response?.data as ErrorData)?.message ?? e.message
            : e instanceof Error
                ? e.message
                : String(e);

        return { historyProcess: [], loading: false, error: msg };
    }
};
