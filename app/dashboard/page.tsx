"use client"
import React from "react";
import SideBar from "./SideBar";
import ContentArea from "./ContentArea";
import { AppProvider, useAppContext } from "../ContextApi";
import { useRef, useEffect } from "react";
import AddProjects from "./Components/AddProjects";
import IconsWindow from "./Components/IconWindow";
import { IconData } from "../allIconData";
import { FaPython } from "react-icons/fa";

interface SelectedIcon {
  icon: React.ReactNode;
  name: string; 
}
export default function Dashboard() {
  const {
    openProjectWindowObject: { openProjectWindow },
  } = useAppContext();
  const [selectedIcon, setSelectedIcon] = React.useState<SelectedIcon>({
    icon: <FaPython />,
    name: "CodeIcon",
  })
  function getTheIconSelected(icon: IconData) {
    setSelectedIcon({ icon: icon.icon, name: icon.name });
  }
  return (
    // appProvider fix
    <AppProvider>
      <div className="flex popins relative">
        <IconsWindow onUpdateIconSelected={getTheIconSelected} />
        <AddProjects selectedIcon={selectedIcon} />
        {openProjectWindow && <SoftLayer />}
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