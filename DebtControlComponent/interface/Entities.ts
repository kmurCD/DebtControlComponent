export interface ParsedData {
    deudas: Debt[];
    vendedores: Seller[];
    
}

export interface ApiResponse {
    clientes: string;
    vendedores: string;
    fecha_actualizacion: string;
}

export interface Seller {
    vendedor: string;
    correo_vendedor: string;
}

export interface Debt {
    ruc: string;
    cliente: string;
    vendedor: string;
    codigo_factura: string;
    fecha_emision: string;
    fecha_vencimiento: string;
    tipo_moneda: string;
    importe: string;
    pagado: string;
    saldo: string;
    correo_cliente: string | null;
    correo_vendedor: string;
}
export interface serviceResponse {
    code: string;
    message: string;
}

export interface DateUpdate{
    fecha_actualizacion: string;
}

export interface ApiHistoryResponse {
    result: string;
}

export interface HistoryProcess {   
    id: number;
    tipo: number;
    estado: number;
    codigo: string;
    fecha_proceso: string;
 
}
