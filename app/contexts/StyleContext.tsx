'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultStyles, StyleType } from '../components/DefaultStyle';
import { useSession } from 'next-auth/react';
import { StyleContextType, StyleProviderProps } from '../interface/styles';

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: StyleProviderProps) {
  const [styles, setStyles] = useState<StyleType>(defaultStyles);
  const [isDefaultTheme, setIsDefaultTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStyles();
    } else {
      setStyles(defaultStyles);
      setIsDefaultTheme(true);
      setIsLoading(false);
    }
  }, [status]);

  const fetchStyles = async () => {
    try {
      const response = await fetch('/api/getStyle');
      if (response.ok) {
        const customStyles = await response.json();
        setStyles(customStyles);
        setIsDefaultTheme(false);
      } else {
        setStyles(defaultStyles);
        setIsDefaultTheme(true);
      }
    } catch (error) {
      console.error('Error fetching styles:', error);
      setStyles(defaultStyles);
      setIsDefaultTheme(true);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    if (isDefaultTheme) {
      fetchStyles();
    } else {
      setStyles(defaultStyles);
      setIsDefaultTheme(true);
    }
  };

  const updateStyles = async (newStyles: StyleType) => {
    try {
      const response = await fetch('/api/saveStyle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStyles),
      });
      if (response.ok) {
        setStyles(newStyles);
        setIsDefaultTheme(false);
      } else {
        console.error('Failed to save styles');
      }
    } catch (error) {
      console.error('Error saving styles:', error);
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