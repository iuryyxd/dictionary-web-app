import { useEffect } from "react";
import { WordDataType } from "../App";

interface VerbsProps {
  wordData: WordDataType | null;
}

export default function Verbs({ wordData }: VerbsProps) {
  return (
    <>
      {wordData?.meanings?.verbs && (
        <div className="flex flex-col mt-14">
          <div className="flex items-center gap-4">
            <h2 className="font-extrabold text-3xl italic">verbs</h2>
            <div className="w-full h-[1px] bg-zinc-400" />
          </div>

          <div className="flex flex-col gap-3 mt-9">
            <h2 className="text-zinc-500 text-xl">Meaning</h2>
            <ul className="flex flex-col gap-3 pl-3">
              {wordData.meanings?.verbs.definitions.map((definition) => (
                <div key={crypto.randomUUID()} className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="min-w-[5px] min-h-[5px] rounded-full bg-violet-500" />
                    {definition.definition}
                  </div>
                  {definition.example && (
                    <p className="text-zinc-400 pl-5">"{definition.example}"</p>
                  )}
                </div>
              ))}
            </ul>
          </div>

          <div className="flex flex-col mt-9 gap-4">
            {wordData.meanings?.verbs.synonyms && (
              <div className="flex items-center gap-6">
                <h4 className="text-zinc-500 text-xl">Synonyms</h4>
                <span className="font-extrabold text-violet-500 text-lg">
                  {wordData.meanings?.verbs.synonyms}
                </span>
              </div>
            )}

            {wordData.meanings?.verbs.antonyms && (
              <div className="flex items-center gap-6">
                <h4 className="text-zinc-500 text-xl">Antonyms</h4>
                <span className="font-extrabold text-violet-500 text-lg">
                  {wordData.meanings?.verbs.antonyms}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
