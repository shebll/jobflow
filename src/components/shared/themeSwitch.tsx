"use client";
import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

type theme = "dark" | "light" | "";
function ThemeSwitch() {
  const [theme, setTheme] = useState<theme>("");
  const [open, setOpen] = useState<boolean>(false);
  const ThemeSwitchHandle = (theme: string) => {
    if (theme === "light") {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      detectTheme();
    } else {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }

    setOpen(false);
  };
  const detectTheme = () => {
    const matches = window.matchMedia("(prefers-color-scheme: dark)");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (matches) {
          setTheme("dark");
          window.localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          setTheme("light");
          window.localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
        }
      });
    if (matches.matches) {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    const themeFormLocal = window.localStorage.getItem("theme") as theme | null;
    if (themeFormLocal) {
      if (themeFormLocal == "dark") {
        setTheme(themeFormLocal);
        document.documentElement.classList.add("dark");
      } else {
        setTheme(themeFormLocal);
        document.documentElement.classList.remove("dark");
      }
    } else {
      console.log("no local");
      detectTheme();
    }
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", ({ matches }) => {
        if (matches) {
          setTheme("dark");
          window.localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          setTheme("light");
          window.localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
        }
      });
  }, []);

  return (
    <div className="fixed bottom-8 right-10 z-[60] transition-all">
      <div
        className={`absolute backdrop:blur-sm ${
          open
            ? "visible bottom-[110%] right-[0%] opacity-100"
            : "invisible bottom-[150%] right-[0%] opacity-0"
        } right-[0%] flex flex-col gap-1 rounded-xl border-[1.4px] border-black/40 p-2 text-start transition-all dark:border-gray-200`}
      >
        <p
          className="cursor-pointer rounded-md px-4 py-1 hover:bg-gray-300/10"
          onClick={() => ThemeSwitchHandle("light")}
        >
          Light
        </p>
        <p
          className="cursor-pointer rounded-md px-4 py-1 hover:bg-gray-300/10"
          onClick={() => ThemeSwitchHandle("dark")}
        >
          Dark
        </p>
        <p
          className="cursor-pointer rounded-md px-4 py-1 hover:bg-gray-300/10"
          onClick={() => ThemeSwitchHandle("system")}
        >
          System
        </p>
      </div>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl border-[1.4px] border-black/40 p-2 backdrop-blur-sm dark:border-gray-200"
      >
        {theme === "" ? (
          ""
        ) : theme === "light" ? (
          <CiLight size={23} />
        ) : (
          <MdDarkMode size={23} />
        )}
      </button>
    </div>
  );
}

export default ThemeSwitch;
