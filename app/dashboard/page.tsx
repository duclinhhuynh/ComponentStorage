"use client"
import React from "react";
import SideBar from "./SideBar";
import ContentArea from "./ContentArea";
import { AppProvider, useAppContext } from "../ContextApi";
import AddProjects from "./Components/AddProjects";
import IconsWindow from "./Components/IconWindow";
import { IconData } from "../allIconData";
import { FaPython } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import ComponentPage from "./ComponentPage";
import {ComponentEditor} from "./Components/ComponentPage/ComponentEditor"
import DeleteWindow from "./Components/DeleteWindow";
import AllProjectWindow from "./Components/AllProjectsWindow";
interface SelectedIcon {
  icon: React.ReactNode;
  name: string;
}
function Dashboard() {
  const {
    openProjectWindowObject: { openProjectWindow },
    showComponentPageObject: { showComponentPage },
    openComponentEditorObject: { openComponentEditor },
    openDeleteWindowObject : { openDeletedWindow }, 
    openAllProjectWindowObject: { openAllProjectWindow },
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
    <div className="flex popins relative">
      <Toaster />
      <IconsWindow onUpdateIconSelected={getTheIconSelected} />
      {openProjectWindow && <>
          <SoftLayer />
          <AddProjects selectedIcon={selectedIcon} setSelectedIcon = {setSelectedIcon}/>
        </>}
      <SideBar/>
      {!showComponentPage ? <ContentArea /> : <ComponentPage/>}
      {openComponentEditor && (
        <>
          <SoftLayer />
          <ComponentEditor />
        </>
      )}
      {openDeletedWindow && (
        <>
          <SoftLayer />
          <DeleteWindow />
        </>
      )}
      {openAllProjectWindow && (
         <>
         <SoftLayer />
         <AllProjectWindow/>
       </>
      )}
    </div>
  );
}

function SoftLayer() {
  return (
      <div className="w-full h-full fixed left-0 top-0 right-0 bg-black opacity-30 z-20"></div>
  );
}

export default function App() {
  return (
    <div>
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </div>

  );
}