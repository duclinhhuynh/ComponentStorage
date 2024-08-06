// import { UserButton } from "@clerk/nextjs";
import React from "react";
import SideBar from "./SideBar";
import { AppProvider } from "../ContextApi";
import ContentArea from "./ContentArea";
import TopBar from "./Components/TopBar";

function Dashboard() {
    return (
        <AppProvider>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex flex-col flex-grow">
                    <TopBar />
                    <ContentArea />
                </div>
            </div>
        </AppProvider>
    );
}

export default Dashboard;
