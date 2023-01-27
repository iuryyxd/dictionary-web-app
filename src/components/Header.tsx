import logo from "../assets/logo.svg";
import { ThemeContext } from "../context/ThemeContext";
import SelectFont from "./Select";
import Switch from "./Switch";
import { useContext } from "react";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="flex items-center justify-between py-10">
      <img src={logo} alt="logo" />
      <div
        className={`flex items-center gap-4 ${
          theme === "dark" ? "text-white" : "text-black"
        } `}
      >
        <SelectFont />
        <Switch />
      </div>
    </header>
  );
}
