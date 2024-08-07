"use client"; // fix useAppContext
import React from "react";
import TopBar from "./Components/TopBar";
import { useAppContext } from "../ContextApi";
export default function ContentArea() {
    const {
        showSideBarObject: { showSideBar },
        isMobileViewObject: { isMobileView },
    } = useAppContext();
    return (
        <div className="w-full h-screen bg-slate-50">
            <TopBar />
            {isMobileView && showSideBar && <SoftLayer />}
        </div>
    );

    function SoftLayer() {
        return (
            <div className="w-full h-full fixed top-0 right-0 bg-black opacity-30"></div>
        );
    }
}