import { createContext } from "react";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const iThemeContextState = {
  theme: "",
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(iThemeContextState);