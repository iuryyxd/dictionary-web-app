import { BsMoon } from "react-icons/bs";
import * as SwitchRadix from "@radix-ui/react-switch";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function Switch() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-4 border-l border-zinc-600 pl-4 h-8">
      <SwitchRadix.Root
        className="w-8 h-4 rounded-full bg-zinc-500 relative data-[state=checked]:bg-violet-500"
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        checked={theme === "dark"}
      >
        <SwitchRadix.Thumb className="block w-3 h-3 rounded-full bg-white transition-transform translate-x-[2px] data-[state=checked]:translate-x-[18px]" />
      </SwitchRadix.Root>
      <BsMoon
        className={theme === "dark" ? "text-violet-600" : "text-zinc-600"}
      />
    </div>
  );
}
