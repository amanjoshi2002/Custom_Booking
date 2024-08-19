'use client';

import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { defaultStyles, StyleType } from '../components/DefaultStyle';
import { useSession } from 'next-auth/react';

interface StyleContextType {
  styles: StyleType;
  setStyles: (styles: StyleType) => void;
  isDefaultTheme: boolean;
  toggleTheme: () => void;
  isLoading: boolean;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [styles, setStyles] = useState<StyleType>(defaultStyles);
  const [isDefaultTheme, setIsDefaultTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const savedStyles = localStorage.getItem('userStyles');
      if (savedStyles) {
        setStyles(JSON.parse(savedStyles));
        setIsDefaultTheme(false);
      }
    }
    setIsLoading(false);
  }, [status]);

  const toggleTheme = () => {
    if (isDefaultTheme) {
      const savedStyles = localStorage.getItem('userStyles');
      if (savedStyles) {
        setStyles(JSON.parse(savedStyles));
      } else {
        localStorage.setItem('userStyles', JSON.stringify(styles));
      }
    } else {
      setStyles(defaultStyles);
    }
    setIsDefaultTheme(!isDefaultTheme);
  };

  const updateStyles = (newStyles: StyleType) => {
    setStyles(newStyles);
    if (!isDefaultTheme) {
      localStorage.setItem('userStyles', JSON.stringify(newStyles));
    }
  };

  return (
    <StyleContext.Provider value={{ styles, setStyles: updateStyles, isDefaultTheme, toggleTheme, isLoading }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyles() {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error('useStyles must be used within a StyleProvider');
  }
  return context;
}