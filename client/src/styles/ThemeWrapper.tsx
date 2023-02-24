import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import baseTheme from "./baseTheme";

export const ThemeContext = createContext({
  theme: "light",
  switchTheme: () => {},
  toggleTheme: () => {},
} as {
  // Some nasty types here due to localstorage
  theme: string | "light" | "dark";
  switchTheme: (val: "light" | "dark") => void;
  toggleTheme: () => void;
});

const ThemeHandler = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dynamicTheme = { ...baseTheme, mode: theme };
  const switchTheme = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const toggleTheme = () => {
    switchTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, toggleTheme }}>
      <ThemeProvider theme={dynamicTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeHandler;
