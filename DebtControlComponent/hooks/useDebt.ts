import { useState, useEffect, useCallback, useRef } from "react";
import { getClients } from "../service/ClientService";
import { Debt,Seller, } from "../interface/Entities";

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fechaActualizacion, setFechaActualizacion] = useState<string>("");
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
      const result = await getClients();


      if (!result.error) {
        setDebts(result.Debts);
        setSellers(result.Seller);
        setFechaActualizacion(result.fecha_actualizacion);
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

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { debts, sellers, loading, error, fechaActualizacion, refresh: fetchData };
};