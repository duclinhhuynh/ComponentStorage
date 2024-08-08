"use client"
import React from "react";
import SideBar from "./SideBar";
import ContentArea from "./ContentArea";
import { AppProvider, useAppContext } from "../ContextApi";
import { useRef, useEffect } from "react";
import AddProjects from "./Components/AddProjects";

export default function  Dashboard() {
  const {
    openProjectWindowObject: { openProjectWindow },
  } = useAppContext();
  return (
    // appProvider fix
    <AppProvider>
      <div className="flex popins relative">
        <AddProjects/>
        {openProjectWindow && <SoftLayer/>}
        <SideBar />
        <ContentArea />
      </div>
    </AppProvider>
  );
}

function SoftLayer() {
  return (
      <div className="w-full h-full fixed top-0 right-0 bg-black opacity-30"></div>
  );
}