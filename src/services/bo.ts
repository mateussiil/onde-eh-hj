import axios from 'axios';
import { environment } from '../environment';
import { IPost } from '../types';
import { addToMockData, getMockData } from './mockDataManager';

const mockData: IPost[] = [
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    _id: '0',
    audience: 'All',
    placeType: '',
    address: 'Santo Fogo Party, MG',
    peopleNumber: 5,
    location: {
      type: {
        type: 'string',
        enum: ['Point'],
        required: true,
      },
      coordinates: [-2.53073, -44.3068],
      required: true
    }
  },
  {
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    _id: '1',
    audience: 'All',
    placeType: '',
    address: 'Bequimão, Bar, MG',
    peopleNumber: 20,
    location: {
      type: {
        type: 'string',
        enum: ['Point'],
        required: true,
      },
      coordinates: [-2.53073, -44.3068],
      required: true
    }
  }
];

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