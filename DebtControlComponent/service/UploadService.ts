import axios from "axios";
import { CONFIGDEV } from "./config";
import { serviceResponse } from "../interface/Entities";

export const uploadFile = async (
  file: File,
  email: string
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
    CONFIGDEV.uploadFile,
    {
      File: base64,
      Email: email,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  // Validar que la respuesta tenga la forma correcta
  const data = response.data as serviceResponse;
  return data;
};
