"use client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import { allProjectsData, Project, AppComponent } from "./allData";

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
    };
    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openDarkModeMenuObject: {
        openDarkModeMenu: boolean;
        setOpenDarkModeMenu: React.Dispatch<React.SetStateAction<boolean>>;
    };
    showSearchBarObject: {
        showSearchBar: boolean;
        setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
    };
    isMobileViewObject: {
        isMobileView: boolean;
        setIsMobileView: React.Dispatch<React.SetStateAction<boolean>>;
    }
    showSideBarObject: {
        showSideBar: boolean;
        setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };
    allProjectsObject: {
        allProjects: Project[];
        setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    };
    allFavoriteComponentsObject: {
        allFavoriteComponents: AppComponent[],
        setAllFavoriteComponents: React.Dispatch<React.SetStateAction<AppComponent[]>>;
    };
    isLoadingObject: {
        isLoading: boolean;
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openProjectWindowObject: {
        openProjectWindow: boolean;
        setOpenProjectWindow: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openIconWindowObject: {
        openIconWindow: boolean;
        setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
    };
    showComponentPageObject: {
        showComponentPage: boolean;
        setShowComponentPage: React.Dispatch<React.SetStateAction<boolean>>;
    };
    selectedProjectObject: {
        selectedProject: Project | null;
        setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
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
    },
    allProjectsObject: {
        allProjects: [],
        setAllProjects: () => { },
    },
    allFavoriteComponentsObject: {
        allFavoriteComponents: [],
        setAllFavoriteComponents: () => { },
    },
    isLoadingObject: {
        isLoading: true,
        setIsLoading: () => { },
    },
    openProjectWindowObject: {
        openProjectWindow: false,
        setOpenProjectWindow: () => { throw new Error("setOpenProjectWindow called outside of AppProvider"); },
    },
    openIconWindowObject: {
        openIconWindow: false,
        setOpenIconWindow: () => {},
    },
    showComponentPageObject: {
        showComponentPage: false,
        setShowComponentPage: () => {},
    },
    selectedProjectObject: {
        selectedProject: null,
        setSelectedProject: () => {}
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
    const [openProjectWindow, setOpenProjectWindow] = useState(false);
    const [openIconWindow, setOpenIconWindow] = useState(false);
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
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [allFavoriteComponents, setAllFavoriteComponents] = useState<AppComponent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showComponentPage, setShowComponentPage] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    useEffect(() => {
        function fetchAllProjects() {
            setTimeout(() => {
                setAllProjects(allProjectsData);
            }, 2000);
        }
        fetchAllProjects();
    }, []);
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
    useEffect(() => {
        localStorage.setItem("openedSideBar", JSON.stringify(openSideBar));
    }, [openSideBar]);
    // Update favorite components when allProjects changes
    useEffect(() => {
        if (allProjects.length > 0) {
            const favoriteComponents = allProjects.flatMap((project) =>
                project.components.filter((component) => component.isFavorite)
            );
            setAllFavoriteComponents(favoriteComponents);
        }
    }, [allProjects]);
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
                allProjectsObject: { allProjects, setAllProjects },
                isLoadingObject: { isLoading, setIsLoading },
                allFavoriteComponentsObject: { allFavoriteComponents, setAllFavoriteComponents },
                openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
                openIconWindowObject: { openIconWindow, setOpenIconWindow },
                showComponentPageObject: { showComponentPage, setShowComponentPage },
                selectedProjectObject: { selectedProject, setSelectedProject },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
