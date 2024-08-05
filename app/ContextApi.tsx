"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";

export interface MenuItem {
    id: string;
    name: string;
    icon: ReactNode;
    isSelected: boolean;
}

interface AppContextType {
    menuItemsObject: {
        menuItems: MenuItem[];
        setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    };
    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };
}

const defaultState: AppContextType = {
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => { throw new Error("setMenuItems called outside of AppProvider"); },
    },
    openSideBarObject: {
        openSideBar: true,
        setOpenSideBar: () => { throw new Error("setOpenSideBar called outside of AppProvider"); },
    },
};

const AppContext = createContext<AppContextType>(defaultState);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: "1", name: "Home", icon: <HomeIcon />, isSelected: true },
        { id: "2", name: "Projects", icon: <CategoryIcon />, isSelected: false },
        { id: "3", name: "Favorites", icon: <FavoriteIcon />, isSelected: false },
    ]);
    const [openSideBar, setOpenSideBar] = useState(() => {
        const storedValue = localStorage.getItem("openedSideBar");
        return storedValue != null ? JSON.parse(storedValue) : true;
    });

    useEffect(() => {
        localStorage.setItem("openedSideBar", JSON.stringify(openSideBar));
    },[openSideBar]);

    return (
        <AppContext.Provider
            value={{
                menuItemsObject: { menuItems, setMenuItems },
                openSideBarObject: { openSideBar, setOpenSideBar },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
