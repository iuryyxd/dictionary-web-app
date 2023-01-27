import { WordDataType } from "../App";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import IconPlay from "../assets/icon-play.svg";
import Noun from "./Noun";
import Verbs from "./Verbs";
import { FiExternalLink } from "react-icons/fi";

interface ContentProps {
  wordData: WordDataType | null;
}

export default function Content({ wordData }: ContentProps) {
  const { theme } = useContext(ThemeContext);

  const playAudio = () => {
    if (wordData?.audio) {
      const audio = new Audio(wordData.audio);
      audio.play();
    }
  };

  return (
    <>
      {wordData && (
        <main
          className={`flex flex-col mt-24 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-extrabold sm:text-4xl">
                {wordData.word}
              </h1>
              <p className="text-violet-500">{wordData.phonetic}</p>
            </div>

            {wordData.audio && (
              <button className=" w-16 h-16 rounded-full" onClick={playAudio}>
                <img src={IconPlay} alt="play button" />
              </button>
            )}
          </div>

          <Noun wordData={wordData} />
          <Verbs wordData={wordData} />

          <footer className="border-t pt-5 border-zinc-400 flex gap-5 mb-32 mt-14 sm:flex-wrap">
            <p className="text-zinc-400">Source</p>

            <div className="flex flex-col flex-wrap gap-4">
              {wordData.sourceUrls.map((url) => (
                <a
                  href={url}
                  className="underline flex items-center gap-4 sm:flex-wrap sm:text-xs"
                  key={crypto.randomUUID()}
                >
                  {url}
                  <FiExternalLink className=" text-zinc-400" />
                </a>
              ))}
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
