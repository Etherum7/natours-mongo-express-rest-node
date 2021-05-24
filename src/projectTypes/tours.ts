export interface SimpleTour {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images?: string[] | null;
  startDates?: string[] | null;
}



export interface Tour {
  startLocation: StartLocation;
  ratingsAverage: number;
  ratingsQuantity: number;
  images?: string[] | null;
  startDates?: string[] | null;
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  guides?: string[] | null;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations?: LocationsEntity[] | null;
}
export interface StartLocation {
  description: string;
  type: string;
  coordinates?: number[] | null;
  address: string;
}
export interface LocationsEntity {
  _id: string;
  description: string;
  type: string;
  coordinates?: number[] | null;
  day: number;
}
