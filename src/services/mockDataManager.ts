import { IPost } from '../types';

let mockData: IPost[] = [
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    _id: '0',
    audience: 'All',
    placeType: 'Bar',
    address: 'Bar do Zé, Centro, São Luís - MA',
    peopleNumber: 15,
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
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67",
    _id: '1',
    audience: 'All',
    placeType: 'Restaurante',
    peopleNumber: 20,
    address: 'Restaurante do Mar, Ponta d\'Areia, São Luís - MA',
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

export const getMockData = () => mockData;

export const addToMockData = (newBo: IPost) => {
  mockData = [newBo, ...mockData];
  return mockData;
};