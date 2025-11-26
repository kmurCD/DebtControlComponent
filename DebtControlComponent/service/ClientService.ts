import { Debt, Seller  } from "../interface/Entities";
import { ApiResponse } from "../interface/Entities";
import { CONFIG } from "./config";
import axios from "axios";

export const getClients = async (): Promise<{
    Debts: Debt[];
    loading: boolean;
    error: string | null;
    Seller: Seller[];
    fecha_actualizacion: string;
}> => {
    try {
        const r = await axios.get<ApiResponse>(CONFIG.getClients);
        const c: Debt[] = r.data.clientes ? JSON.parse(r.data.clientes) as Debt[] : [];
        const v: Seller[] = r.data.vendedores ? JSON.parse(r.data.vendedores) as Seller[] : [];
        const fecha_actualizacion: string = r.data.fecha_actualizacion ? r.data.fecha_actualizacion : "";
        return { Debts: c, loading: false, error: null, Seller: v , fecha_actualizacion: fecha_actualizacion };

    } catch (e: unknown) {
        interface ErrorData {
            message?: string;
        }
        const msg = axios.isAxiosError(e)
            ? (e.response?.data as ErrorData)?.message ?? e.message
            : e instanceof Error
                ? e.message
                : "Error desconocido";

        return { Debts: [], loading: false, error: msg, Seller: [], fecha_actualizacion: "" };
    }
};
