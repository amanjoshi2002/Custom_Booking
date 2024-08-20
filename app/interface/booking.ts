import { ObjectId } from 'mongodb';

export interface BookingInput {
  serviceName: string;
  dateTime: string | Date;
  cost: number;
  status: string;
  name: string;
  email: string;
}

export interface Booking extends BookingInput {
  _id: ObjectId;
  userId: string | null;
  createdAt: Date;
}

export interface BookingProjection {
  serviceName: 1;
  dateTime: 1;
  cost: 1;
  status: 1;
}

export interface BookingUpdateData {
  status?: 'Cancelled';
  name?: string;
  email?: string;
  dateTime?: string | Date;
}

export interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
}

export interface BookingSubmission extends BookingFormData {
  serviceId: string;
  serviceName: string;
  cost: number;
  status: string;
  dateTime: string;
}