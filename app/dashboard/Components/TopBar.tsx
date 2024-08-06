"use client";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../ContextApi";
export default function TopBar() {
    return (
        <div className=" bg-white w-full p-[11px] rounded-lg px-6 flex justify-between items-center">
            <DashboardText />
            <SearchBar />
            <div className="flex gap-4 items-center">
                <DarkMode />
                <UserButton />
            </div>
        </div>
    );

    function DarkModeMenu() {
        const {
            openDarkModeMenuObject: { openDarkModeMenu, setOpenDarkModeMenu },
            darkModeMenuObject: { darkModeMenu, setDarkModeMenu },
        } = useAppContext();
        const menuRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    setOpenDarkModeMenu(false);
                }
            }

            if (openDarkModeMenu) {
                document.addEventListener("mousedown", handleClickOutside);
            }

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [openDarkModeMenu, setOpenDarkModeMenu]);

        function changeSelection(menuItem: any) {
            setDarkModeMenu((prevMenuItems) =>
                prevMenuItems.map((prevMenuItem) =>
                    prevMenuItem.id === menuItem.id
                        ? { ...prevMenuItem, isSelected: true }
                        : { ...prevMenuItem, isSelected: false }
                )
            )
        }
        return (
            <div
                ref={menuRef}
                className={`${openDarkModeMenu ? "absolute" : "hidden"} p-3 border border-slate-50 select-none pr-10 bg-white rounded`}
            >
                {darkModeMenu.map((item) => (
                    <div
                        onClick={() => changeSelection(item)}
                        key={item.id.toString()}
                        className={`${item.isSelected ? "text-sky-500" : "text -slate-400"} flex gap-2 items-center cursor-pointer `}
                    >
                        {item.icon}
                        < span className="text-[12px] font-light" > {item.name}</span>
                    </div >
                ))
                }
            </div >
        );
    }

    function DashboardText() {
        return (
            <div className="flex flex-col ">
                <span className="font-semibold">Welcome Back Your Friend</span>
                <span className="text-slate-400 text-[11px] font-light">
                    I feel so excited to connect with you </span>
            </div>
        );
    }
    function SearchBar() {
        return (
            <div
                className=" bg-slate-100 w-1/3 cursor-pointer hover:bg-slate-200 transition-all
        p-[8px] flex gap-1 justify-center items-center rounded-md"
            >
                <SearchIcon fontSize="small" className="text-slate-500" />
                <span className="text-slate-500 text-sm">Search</span>
            </div>
        );
    }
    function DarkMode() {
        const {
            openDarkModeMenuObject: { openDarkModeMenu, setOpenDarkModeMenu },
            darkModeMenuObject: { darkModeMenu, setDarkModeMenu },
        } = useAppContext();
        function handleClicked() {
            setOpenDarkModeMenu(!openDarkModeMenu);
        }
        console.log(darkModeMenu);
        return (
            <div onClick={handleClicked} className="relative">
                <div className="text-sky-500">
                    {darkModeMenu[0].isSelected && darkModeMenu[0].icon}
                    {darkModeMenu[1].isSelected && darkModeMenu[1].icon}
                </div>
                <DarkModeMenu />
            </div>
        )
    };
    function ProfileAccount() {
        return (
            <div className=" flex gap-3 items-center ">
                <div className="w-[36px] h-[37px] bg-slate-100 rounded-full"></div>
            </div>
        );
    }
}