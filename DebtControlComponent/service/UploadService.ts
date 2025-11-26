import axios from "axios";
import { CONFIG } from "./config";
import { serviceResponse } from "../interface/Entities";

export const uploadFile = async (
  file: File,
  email: string,
  emailUser: string
): Promise<serviceResponse> => {
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  const base64 = await fileToBase64(file);

  const response = await axios.post(
    CONFIG.uploadFile,
    {
      File: base64,
      Email: email,
      EmailUsuario: emailUser,
      
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  // Validar que la respuesta tenga la forma correcta
  const data = response.data as serviceResponse;
  return data;
};
