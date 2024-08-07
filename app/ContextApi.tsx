"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";

export interface MenuItem {
    id: string;
    name: string;
    icon: ReactNode;
    isSelected: boolean;
}

export interface DarkModeMenu {
    id: String;
    name: string;
    icon: ReactNode;
    isSelected: boolean;
}

interface AppContextType {
    menuItemsObject: {
        menuItems: MenuItem[];
        setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    };
    darkModeMenuObject: {
        darkModeMenu: DarkModeMenu[];
        setDarkModeMenu: React.Dispatch<React.SetStateAction<DarkModeMenu[]>>;
    }

    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openDarkModeMenuObject: {
        openDarkModeMenu: boolean;
        setOpenDarkModeMenu: React.Dispatch<React.SetStateAction<boolean>>;
    }
    showSearchBarObject: {
        showSearchBar: boolean;
        setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
    }
    isMobileViewObject: {
        isMobileView: boolean;
        setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
    }
    showSideBarObject: {
        showSideBar: boolean;
        setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    }
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
    openDarkModeMenuObject: {
        openDarkModeMenu: false,
        setOpenDarkModeMenu: () => { throw new Error("setOpenSidsetOpenDarkModeMenueBar called outside of AppProvider"); },
    },
    darkModeMenuObject: {
        darkModeMenu: [],
        setDarkModeMenu: () => { throw new Error("setDarkModeMenu called outside of AppProvider"); },
    },
    showSearchBarObject: {
        showSearchBar: false,
        setShowSearchBar: () => { throw new Error("setShowSearchBar called outside of AppProvider"); },
    },
    isMobileViewObject: {
        isMobileView: false,
        setIsMobileView: () => { throw new Error("isMobileViewObject called outside of AppProvider"); },
    },
    showSideBarObject: {
        showSideBar: true,
        setShowSideBar: () => { throw new Error("showSideBarObject called outside of AppProvider"); },
    }
};

const AppContext = createContext<AppContextType>(defaultState);
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([
        { id: "1", name: "Home", icon: <HomeIcon />, isSelected: true },
        { id: "2", name: "Projects", icon: <CategoryIcon />, isSelected: false },
        { id: "3", name: "Favorites", icon: <FavoriteIcon />, isSelected: false },
    ]);
    const [openSideBar, setOpenSideBar] = useState(() => {
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem("openedSideBar");
            return storedValue !== null ? JSON.parse(storedValue) : true;
        }
        return true; // Default value if window is not defined
    });
    const [openDarkModeMenu, setOpenDarkModeMenu] = useState(false);
    const [darkModeMenu, setDarkModeMenu] = useState<DarkModeMenu[]>([
        {
            id: "1",
            name: "Light",
            icon: <LightModeIcon fontSize="small" />,
            isSelected: true,
        },
        {
            id: "2",
            name: "Dark",
            icon: <DarkModeIcon fontSize="small" />,
            isSelected: false,
        },
    ]);

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showSideBar, setShowSideBar] = useState(true);

    useEffect(() => {
        function handleResize() {
            setIsMobileView(window.innerWidth <= 640);
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);
    console.log(isMobileView);
    useEffect(() => {
        localStorage.setItem("openedSideBar", JSON.stringify(openSideBar));
    }, [openSideBar]);

    return (
        <AppContext.Provider
            value={{
                menuItemsObject: { menuItems, setMenuItems },
                openSideBarObject: { openSideBar, setOpenSideBar },
                openDarkModeMenuObject: { openDarkModeMenu, setOpenDarkModeMenu },
                darkModeMenuObject: { darkModeMenu, setDarkModeMenu },
                showSearchBarObject: { showSearchBar, setShowSearchBar },
                isMobileViewObject: { isMobileView, setIsMobileView },
                showSideBarObject: { showSideBar, setShowSideBar },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
