
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { lightTheme, darkTheme } from './globalStyles';
import Quiz from './pages/Quiz/Quiz'
import './App.css';



export default function App() {

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    localStorage.getItem("theme") === "dark"
      ? setTheme("dark")
      : setTheme("light");
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      < GlobalStyle />
      <Quiz toggleTheme={toggleTheme} />
    </ ThemeProvider>

  )
}