import axios from 'axios';
import { environment } from '../environment';
import { IPost } from '../types';
import { addToMockData, getMockData } from './mockDataManager';

export const fetchBo = async (): Promise<IPost[]> => {
  try {
    const response = await axios.get<IPost[]>(environment.backendURL + '/bo');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar BOs:', error);
    return getMockData();
  }
};

export const createBo = async (data: FormData): Promise<IPost> => {
  try {
    const response = await axios.post<IPost>(environment.backendURL + '/bo', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Adiciona ao mockData mesmo se a requisição for bem sucedida
    // assim temos os dados offline também
    const newBo = response.data;
    addToMockData(newBo);
    return newBo;
  } catch (error) {
    console.error('Erro ao criar BO:', error);

    // Se falhar, cria um BO mock
    const newMockBo: IPost = {
      _id: Date.now().toString(),
      image: data.get('image') as string,
      audience: data.get('audience') as 'All',
      placeType: data.get('placeType') as string,
      address: 'Novo local adicionado',
      peopleNumber: 1,
      location: {
        type: {
          enum: ['Point'],
          required: true,
          type: 'string'
        },
        coordinates: [-2.53073, -44.3068],
        required: true
      }
    };

    addToMockData(newMockBo);
    return newMockBo;
  }
};