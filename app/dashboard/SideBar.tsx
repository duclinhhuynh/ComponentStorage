"use client";
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppContext } from "../ContextApi";
import { MenuItem } from "../ContextApi";

export default function SideBar() {
    const { openSideBarObject: { openSideBar } } = useAppContext();
    return (
        <div className={`${openSideBar ? "w-[320px] p-6" : "w-[100px] p-4"} h-screen pt-12 relative transition-all duration-300`}>
            <RoundedArrowIcon />
            <Logo />
            <Links />
            <LogOutButton />
        </div>
    );

    function RoundedArrowIcon() {
        const { openSideBarObject: { openSideBar, setOpenSideBar } } = useAppContext();
        function handleClick() {
            setOpenSideBar(!openSideBar);
        }
        return (
            <div
                onClick={handleClick}
                className="w-7 h-7 z-40 rounded-full absolute right-[-11px] top-[95px] flex items-center justify-center">
                <div className="bg-sky-500 rounded-full w-[76%] h-[70%] flex items-center justify-center cursor-pointer">
                    {openSideBar ?
                        (
                            <FaAngleLeft
                                fontSize="small"
                                className="text-white text-[12px]"
                            />
                        )
                        : (
                            <FaAngleRight
                                fontSize="small"
                                className="text-white text-[12px]"
                            />
                        )
                    }
                </div>
            </div>
        );
    }

    function Logo() {
        return (
            <div className="flex gap-2 items-center">
                <div className="bg-sky-500 p-[6px] rounded-md w-10 h-10 flex items-center justify-center">
                    <RiNextjsFill className="text-white text-[22px]" />
                </div>
                {openSideBar && (
                    <div className="flex gap-1 text-[23px]">
                        <span className="font-bold text-sky-500">Next</span>
                        <span className="text-slate-600">dk</span>
                    </div>
                )}
            </div>
        );
    }

    function Links() {
        const { menuItemsObject: { menuItems, setMenuItems } } = useAppContext();

        function handleLinkClick(item: MenuItem) {
            setMenuItems(prevMenuItems =>
                prevMenuItems.map(prevMenuItem =>
                    prevMenuItem.id === item.id
                        ? { ...prevMenuItem, isSelected: true }
                        : { ...prevMenuItem, isSelected: false }
                )
            );
        }

        return (
            <div className="mt-44 ml-3 flex flex-col gap-2 text-[15px]">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleLinkClick(item)}
                        className={`${item.isSelected ? "bg-sky-500 text-white" : "text-slate-400 hover:text-sky-500"}
                    p-[7px] select-none cursor-pointer rounded-lg flex items-center gap-2 w-[75%]`}
                    >
                        {item.icon}
                        {openSideBar && <span className="mt-0.5">{item.name}</span>}
                    </div>
                ))}
            </div>
        );
    }

    function LogOutButton() {
        const {
            openSideBarObject: { openSideBar },
        } = useAppContext();
        return (
            <div className={`p-[7px] hover:text-sky-500 select-none cursor-pointer ${openSideBar ? "ml-3" : "ml-0"}  mt-14 text-[15px] rounded-lg flex items-center`}>
                <LogoutIcon />
                {openSideBar && <span className="mt-0.5">Log Out</span>}
            </div>
        );
    }
}
