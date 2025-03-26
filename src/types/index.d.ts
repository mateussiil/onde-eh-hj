type Latitude = number;
type Longitude = number;

export type Coordinates = [Longitude, Latitude];

interface IPost {
  __v?: number;
  _id: string;
  location: {
    type: {
      type: string;
      enum: ['Point'];
      required: true;
    };
    coordinates: [number, number];
    required: true;
  };
  audience: 'Friends' | 'All';
  placeType: string;
  image: string;
}
