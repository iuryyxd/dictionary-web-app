import { WordDataType } from "../App";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import IconPlay from "../assets/icon-play.svg";

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
              <h1 className="text-6xl font-extrabold">{wordData.word}</h1>
              <p className="text-violet-500">{wordData.phonetic}</p>
            </div>

            {wordData.audio && (
              <button className=" w-16 h-16 rounded-full" onClick={playAudio}>
                <img src={IconPlay} alt="play button" />
              </button>
            )}
          </div>

          {wordData.meanings?.noun && (
            <div className="flex flex-col mt-14">
              <div className="flex items-center gap-4">
                <h2 className="font-extrabold text-3xl italic">noun</h2>
                <div className="w-full h-[1px] bg-zinc-400" />
              </div>

              <div className="flex flex-col gap-3 mt-9">
                <h2 className="text-zinc-500 text-xl">Meaning</h2>
                <ul className="flex flex-col gap-3 pl-3">
                  {wordData.meanings?.noun.definitions.map((definition) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex items-center gap-4"
                    >
                      <div className="min-w-[5px] min-h-[5px] rounded-full bg-violet-500" />{" "}
                      {definition}
                    </div>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col mt-9">
                {wordData.meanings?.noun.synonyms && (
                  <div className="flex items-center gap-6">
                    <h4 className="text-zinc-500 text-xl">Synonyms</h4>
                    <span className="font-extrabold text-violet-500 text-lg">
                      {wordData.meanings?.noun.synonyms}
                    </span>
                  </div>
                )}

                {wordData.meanings?.noun.antonyms && (
                  <div className="flex items-center gap-6">
                    <h4 className="text-zinc-500 text-xl">Antonyms</h4>
                    <span className="font-extrabold text-violet-500 text-lg">
                      {wordData.meanings?.noun.antonyms}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}
