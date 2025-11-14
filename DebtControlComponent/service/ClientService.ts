import { Debt, Seller } from "../interface/Entities";
import { ApiResponse } from "../interface/Entities";
import { CONFIGDEV } from "./config";
import axios from "axios";

export const getClients = async (): Promise<{
    Debts: Debt[];
    loading: boolean;
    error: string | null;
    Seller: Seller[];
}> => {
    try {
        const r = await axios.get<ApiResponse>(CONFIGDEV.getClients);
        const c: Debt[] = r.data.clientes ? JSON.parse(r.data.clientes) as Debt[] : [];
        const v: Seller[] = r.data.vendedores ? JSON.parse(r.data.vendedores) as Seller[] : [];
        return { Debts: c, loading: false, error: null, Seller: v };

    } catch (e: unknown) {
        interface ErrorData {
            message?: string;
        }
        const msg = axios.isAxiosError(e)
            ? (e.response?.data as ErrorData)?.message ?? e.message
            : e instanceof Error
                ? e.message
                : "Error desconocido";

        return { Debts: [], loading: false, error: msg, Seller: [] };
    }
};
