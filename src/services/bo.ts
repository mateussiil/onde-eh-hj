import axios from 'axios';
import { environment } from '../environment';
import { IPost } from '../types';

export const fetchBo = async (): Promise<IPost[]> => {
  console.log(environment.backendURL + '/bo');
  const response = await axios.get<IPost[]>(environment.backendURL + '/bo');
  return response.data;
};
