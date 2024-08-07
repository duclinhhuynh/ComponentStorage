"use client"; // fix useAppContext
import React from "react";
import TopBar from "./Components/TopBar";
import StatsBar from "./Components/StatsBar";
import AllProjects from "./Components/AllProjects";
import FavoriteComponents from "./Components/FavoriteComponents"
import { useAppContext } from "../ContextApi";
export default function ContentArea() {
    const {
        showSideBarObject: { showSideBar },
        isMobileViewObject: { isMobileView },
    } = useAppContext();
    return (
        <div className="w-full h-screen bg-slate-50 p-3">
            <TopBar />
            {isMobileView && showSideBar && <SoftLayer />}
            <StatsBar/>
            <AllProjects/>
            <FavoriteComponents/>
        </div>
    );

    function SoftLayer() {
        return (
            <div className="w-full h-full fixed top-0 right-0 bg-black opacity-30"></div>
        );
    }
}