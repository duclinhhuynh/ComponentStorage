import { UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";
import SideBar from "./SideBar";
import { AppProvider } from '../ContextApi'; 
import ContentArea from "./ContentArea"
function dashboard() {
    return (
        // contain fix outsite
        <AppProvider>
            <div className="flex">
                <SideBar />
                <ContentArea />
            </div>
            <UserButton />
        </AppProvider>
    );
}
export default dashboard;