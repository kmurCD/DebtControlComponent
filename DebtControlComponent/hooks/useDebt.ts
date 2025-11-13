import { useState, useEffect, useCallback, useRef } from "react";
import { getClients } from "../service/getClients";
import { Debt } from "../interface/Clientes";

export const useDebts = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [sellers, setSellers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
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
      console.log("[useDebts] fetchData start"); // para depurar
      const result = await getClients();
      if (!result.error) {
        setDebts(result.deudas);
        const sellersUnicos = Array.from(new Set(result.deudas.map(d => d.vendedor)));
        setSellers(sellersUnicos);
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

  return { debts, sellers, loading, error, refresh: fetchData };
};