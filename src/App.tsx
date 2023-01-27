import { useEffect, useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Input from "./components/Input";
import { ThemeContext } from "./context/ThemeContext";

export interface WordDataType {
  word: string;
  phonetic: string;
  sourceUrls: string[];
  audio: string | null;
  meanings?: {
    noun: {
      definitions: string[];
      synonyms: string | null;
      antonyms: string | null;
    } | null;
    verbs?: {
      definitions: {
        definition: string;
        example: string | null;
      }[];
      synonyms: string | null;
      antonyms: string | null;
    } | null;
  };
}

function App() {
  const [wordData, setWordData] = useState<WordDataType | null>(null);
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.body.style.background = theme === "dark" ? "#050505" : "#fff";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {theme && (
        <div className="w-full max-w-[900px] mx-auto lg:w-full lg:px-5">
          <Header />
          <Input setWordData={setWordData} />
          <Content wordData={wordData} />
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export default App;
