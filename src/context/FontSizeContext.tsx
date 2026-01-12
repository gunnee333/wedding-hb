import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSizeMode = 'small' | 'large';

type FontSizeContextType = {
  mode: FontSizeMode;
  setSmall: () => void;
  setLarge: () => void;
};

const FontSizeContext = createContext<FontSizeContextType | null>(null);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<FontSizeMode>('small');

  useEffect(() => {
    const scale = mode === 'large' ? 1.15 : 1;
    document.documentElement.style.setProperty('--font-scale', String(scale));
  }, [mode]);

  return (
    <FontSizeContext.Provider
      value={{
        mode,
        setSmall: () => setMode('small'),
        setLarge: () => setMode('large')
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error('useFontSize must be used within FontSizeProvider');
  return ctx;
}
