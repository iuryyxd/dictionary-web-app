import { WordDataType } from "../App";

interface NounProps {
  wordData: WordDataType | null;
}

export default function Noun({ wordData }: NounProps) {
  return (
    <>
      {wordData?.meanings?.noun && (
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
    </>
  );
}
