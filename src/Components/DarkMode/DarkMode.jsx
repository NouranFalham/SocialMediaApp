import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../assets/Context/Theme.context/Theme.context";

export default function DarkToggle() {
    const { dark, setDark } = useContext(ThemeContext);
    console.log("dark:", dark);
    return (
        <button
        onClick={() => setDark(prev => !prev)}
        className="
            flex items-center gap-2 px-4 py-2 rounded-full
            bg-gray-100 dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            text-sm font-medium
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition cursor-pointer ms-2
        "
        >
        <FontAwesomeIcon icon={dark ? faSun : faMoon} />
        
        </button>
    );
}
