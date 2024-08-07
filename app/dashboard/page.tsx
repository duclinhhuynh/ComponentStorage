// Dashboard.tsx
import React from "react";
import SideBar from "./SideBar";
import ContentArea from "./ContentArea";
import { AppProvider } from "../ContextApi";

function Dashboard() {
  return (
    // appProvider fix
    <AppProvider>
      <div className="flex min-h-screen">
        <SideBar />
        <ContentArea />
      </div>
    </AppProvider>
  );
}

export default Dashboard;
