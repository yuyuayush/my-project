import { useEffect, useState } from "react";
import { getStoredTheme, setStoredTheme } from "./utils";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme);

    useEffect(() => {
        setStoredTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
}
