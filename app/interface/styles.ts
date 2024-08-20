import { Document } from 'mongoose';
import { ReactNode } from 'react';
import { Dispatch, SetStateAction } from 'react';

// Define the structure of the style object
export interface IStyle extends Document {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  logoColor: string;
  hoverColor: string;
  logoname: string;
  userId: string;
}

// This can be used for the state in your component
export interface StyleType {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  logoColor: string;
  hoverColor: string;
  logoname: string;
}

// Define the shape of the context value
export interface StyleContextType {
  styles: StyleType;
  setStyles: (styles: StyleType) => void;
  isDefaultTheme: boolean;
  toggleTheme: () => void;
  isLoading: boolean;
}

// Define props for the StyleProvider component
export interface StyleProviderProps {
  children: ReactNode;
}

// If you need to define the shape of the session explicitly
export interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}