import { Debt } from '../interface/Clientes';
import { ApiResponse } from '../interface/Clientes';
import { CONFIG } from '../service/config';

export const getClients = async (): Promise<{
    deudas: Debt[];
    loading: boolean;
    error: string | null;
}> => {
    try {
        const response = await fetch(CONFIG.desarrollo, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ApiResponse;

        let debtsParsed: Debt[] = [];

        if (typeof data.response === "string") {
            debtsParsed = JSON.parse(data.response) as Debt[];
        } else if (Array.isArray(data.response)) {
            debtsParsed = data.response as Debt[];
        }

        return {
            deudas: debtsParsed,
            loading: false,
            error: null
        };
    } catch (error) {
        console.error("Error en GET", error);
        return {
            deudas: [],
            loading: false,
            error: error instanceof Error ? error.message : "Error desconocido"
        };
    }
};