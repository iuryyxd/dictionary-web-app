import * as Select from "@radix-ui/react-select";
import { useContext } from "react";
import { BsChevronDown } from "react-icons/bs";
import { ThemeContext } from "../context/ThemeContext";

const items = ["Sans Serif", "Serif", "Monospace"];

const fonts = {
  Serif: "Lora, serif",
  "Sans Serif": "Inter, sans-serif",
  Monospace: "Inconsolata, monospace",
};

export default function SelectFont() {
  const { theme } = useContext(ThemeContext);

  function handleValueChange(value: string) {
    document.body.style.fontFamily = fonts[value as keyof typeof fonts];
  }

  return (
    <Select.Root onValueChange={(value) => handleValueChange(value)}>
      <Select.Trigger
        className="flex items-center gap-2"
        aria-label="Fonts"
      >
        <Select.Value placeholder="Serif" />
        <Select.Icon>
          <BsChevronDown className="text-violet-700" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={`overflow-hidden rounded shadow-2xl ${
            theme === "dark" ? "bg-zinc-900" : "bg-white"
          }`}
          position="popper"
	  onCloseAutoFocus={(e) => e.preventDefault()}
	  sideOffset={10}
        >
          <Select.Viewport className="p-3">
            <Select.Group className="flex flex-col gap-2">
              {items.map((item) => (
                <Select.Item
                  value={item}
                  className={`cursor-pointer font-sans ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                  key={crypto.randomUUID()}
                >
                  <Select.ItemText>{item}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
