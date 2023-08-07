import axios from "axios";
import { environment } from "../environment";

export const fetchImage = async (key:string): Promise<string> => {
  try {
    const response = await axios.get<string>(environment.backendURL + '/images/' + key);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar postagem', error);
    return '';
  }
};