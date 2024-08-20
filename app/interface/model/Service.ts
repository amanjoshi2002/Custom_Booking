import { ObjectId } from 'mongodb';

export interface Service {
  _id?: ObjectId;
  name: string;
  category: string;
  price: number;
  duration: string;
  photo: string;
  rating: number;
  description: string;
}

export interface ServiceInput {
  name: string;
  category: string;
  price: number;
  duration: string;
  photo: string;
  rating: number;
  description: string;
}

export type ServiceWithStringId = Omit<Service, '_id'> & { _id: string };

export interface ServiceSearchParams {
  category?: string | null;
  search?: string | null;
}

export type ServiceClickHandler = (service: ServiceWithStringId) => void;