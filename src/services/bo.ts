import axios from "axios";
import { IPost } from "../types";
import { environment } from "../environment";

export const fetchBo = async (): Promise<IPost[]> => {
  console.log(environment.backendURL + '/bo')
  try {
    const response = await axios.get<IPost[]>(environment.backendURL + '/bo');
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar postagem', error);
    return [] as IPost[];
  }
};