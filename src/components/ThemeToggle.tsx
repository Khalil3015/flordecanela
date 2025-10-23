import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    (localStorage.getItem("theme") ?? "light") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button className="btn-ghost" onClick={() => setDark(d => !d)} aria-label="Cambiar tema">
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
