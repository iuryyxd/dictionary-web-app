import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { api } from "../lib/axios";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { WordDataType } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InputProps {
  setWordData: (a: WordDataType | null) => void;
}

export default function Input({ setWordData }: InputProps) {
  const [word, setWord] = useState<string>("");
  const [font, setFont] = useState<string>(
    window.getComputedStyle(document.body).getPropertyValue("font-family")
  );

  const { theme } = useContext(ThemeContext);

  const fonts = {
    "Lora, serif": "font-serif",
    "Inter, sans-serif": "font-sans",
    "Inconsolata, monospace": "font-mono",
  };

  const handleGetWordData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFont(
      window.getComputedStyle(document.body).getPropertyValue("font-family")
    );

    api
      .get(`/${word}`)
      .then(({ data }) => {
        let audio = null;

        if (data[0].phonetics.length > 0) {
          const phoneticFilter = data[0].phonetics.filter(
            (phonetic: { audio: string }) => phonetic.audio !== ""
          );
          if (phoneticFilter.length > 0) {
            audio = phoneticFilter[0].audio;
          }
        }

        let noun = null;

        data[0].meanings.map((meaning: any) => {
          if (meaning.partOfSpeech === "noun") {
            let nounArray: string[] = [];
            meaning.definitions.map((definition: { definition: string }) =>
              nounArray.push(definition.definition)
            );

            noun = {
              definitions: nounArray,
              synonyms:
                meaning.synonyms.length > 0
                  ? meaning.synonyms.join(", ")
                  : null,
              antonyms:
                meaning.antonyms.length > 0
                  ? meaning.antonyms.join(", ")
                  : null,
            };
          }
        });

        let verbs = null;

        data[0].meanings.map((meaning: any) => {
          if (meaning.partOfSpeech === "verb") {
            let verbsArray: { definition: string; example: string | null }[] =
              [];
            meaning.definitions.map(
              (definition: { definition: string; example: string | null }) =>
                verbsArray.push({
                  definition: definition.definition,
                  example: definition.example ? definition.example : null,
                })
            );

            verbs = {
              definitions: verbsArray,
              synonyms:
                meaning.synonyms.length > 0
                  ? meaning.synonyms.join(", ")
                  : null,
              antonyms:
                meaning.antonyms.length > 0
                  ? meaning.antonyms.join(", ")
                  : null,
            };
          }
        });

        setWordData({
          word: data[0].word,
          phonetic: data[0].phonetic ? data[0].phonetic : "",
          sourceUrls: data[0].sourceUrls,
          audio,
          meanings: {
            noun,
            verbs
          },
        });
        toast.success("Data found!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });
      })
      .catch(() => {
        setWordData(null);
        toast.error("Word not found!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme === "dark" ? "dark" : "light",
        });
      });
  };

  return (
    <>
      <form className="w-full h-14 relative" onSubmit={handleGetWordData}>
        <input
          type="search"
          className={`w-full h-full ${
            theme === "dark"
              ? "bg-zinc-800 text-white"
              : "bg-zinc-100 text-black"
          } rounded-xl pl-5 pr-12 focus:outline-none font-extrabold text-lg`}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit" className="bg-none">
          <BsSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-violet-500" />
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        bodyClassName={fonts[font as keyof typeof fonts]}
      />
    </>
  );
}
