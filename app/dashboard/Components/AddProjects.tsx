// AddProjects.js
"use client";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useEffect, useState } from "react";
import { useAppContext } from "../../ContextApi";
import { Project } from "../../allData";
import { useUser } from "@clerk/nextjs";
import { TextToIcon } from "@/app/utils/TextToIcon";
export default function AddProjects({
  selectedIcon,
  setSelectedIcon,
}: {
  selectedIcon: {
    icon: React.ReactNode;
    name: string;
  };
  setSelectedIcon: React.Dispatch<
    React.SetStateAction<{
      icon: React.ReactNode;
      name: string;
    }>
  >;
}) {
  const {
    isMobileViewObject: { isMobileView },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    openIconWindowObject: { openIconWindow, setOpenIconWindow },
    allProjectsObject: { allProjects, setAllProjects },
    selectedProjectObject: { selectedProject, setSelectedProject }
  } = useAppContext();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const { user } = useUser();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //If the selected Project is not null, it means we are going to create a new project
    if (!selectedProject) {
      //Reset the project name
      setProjectName("");
      //Set the default icon
      const iconObject = {
        icon: TextToIcon({
          text: "CodeIcon",
          className: "text-white",
        }),
        name: "CodeIcon",
      };
      //Update the selectedIco
      setSelectedIcon(iconObject);
    } else {
      //Update the input name when we want to edit the project
      setProjectName(selectedProject.name);
      const iconObject = {
        icon: TextToIcon({
          text: selectedProject.icon,
          className: "text-white",
        }),
        name: selectedProject.icon,
      };
      setSelectedIcon(iconObject)
    }
    const focusInput = () => {
      if(inputRef.current) {
        inputRef.current.focus();
      }
    };
    setTimeout(focusInput, 0);
    setErrorMessage("");
  },[openProjectWindow])

  useEffect(() => {
    if (openProjectWindow) {
      inputRef.current?.focus();
    }
  }, [openProjectWindow]);
  // Ensure AddProjects is only rendered when openProjectWindow is true
  if (!openProjectWindow) return null;

  function handleInputUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    // Empty error message
    setErrorMessage("");
    // Update the project name
    setProjectName(e.target.value);
  }
  function addNewProject() {
    //Check if the project name is not empty
    if (projectName.trim() === "") {
      setErrorMessage("Project name cannot be empty");
      inputRef.current?.focus();
      return;
    }
    //Check if the project name already exists
    if (
      allProjects.find(
        (project) =>
          project.name.toLocaleLowerCase() === projectName.toLocaleLowerCase()
      )
    ) {
      setErrorMessage("Project name already exists");
      inputRef.current?.focus();
      return;
    }
    //Adding the new Project to allProjects state
    //Creating a new project object
    const newProject: Project = {
      _id: uuidv4(),
      clerkUserId: user?.id as string,
      name: projectName,
      icon: selectedIcon.name,
      createdAt: new Date().toISOString(),
      components: [],
    };
    //Adding the new project to allProjects
    try {
      setAllProjects([...allProjects, newProject]);
      toast.success("Project added successfully");
      setOpenProjectWindow(false);
    } catch (error) {
      toast.error("Failed to add project");
    }
  }
  function editTheProject() {
    // Check if the project name is not empty
    if (projectName.trim() === "") {
      setErrorMessage("Project name cannot be empty");
      inputRef.current?.focus();
      return;
    }
    try {
      if (selectedProject) {
        const updateSelectedProject: Project = {
          ...selectedProject,
          name: projectName,
          icon: selectedIcon.name,
        };
        const updateAllProjects = allProjects.map((singleProject) => {
          return singleProject._id === updateSelectedProject._id
            ? updateSelectedProject
            : singleProject;
        });
        setAllProjects(updateAllProjects);
        setOpenProjectWindow(false);
        setSelectedProject(null);
        toast.success("Project has been updated successfully");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div
      className={`${isMobileView ? "w-[80%]" : "w-[40%]"} h-[288px] border border-slate-50 bg-white rounded-md shadow-xl fixed top-[20%] -translate-x-1/2 left-1/2 z-40`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
          {/* Project Icon */}
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <CategoryIcon sx={{ fontSize: 17 }} className="text-sky-400 text-[12px]" />
          </div>
          {/* Category Header */}
          <span className="font-semibold text-lg">
            {!selectedProject ? "New Project" : "Editing Project"}
          </span>
        </div>
        <CloseIcon
          onClick={() => {
            setOpenProjectWindow(false);
            setSelectedProject(null);
          }}
          sx={{ fontSize: 16 }}
          className="text-slate-400 text-[18px] cursor-pointer"
        />
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2 mt-11 px-7">
        <span className="text-[13px] font-medium">Project Name</span>
        <div className="flex gap-3">
          <div className="flex flex-col h-[50px] w-full">
            {/* Input */}
            <input
              onChange={handleInputUpdate}
              value={projectName}
              placeholder="Enter Category Name..."
              className="p-[10px] text-[12px] w-full rounded-md border outline-none"
              ref={inputRef}
            />
            {/* Error Message */}
            <div
              className={`flex items-center gap-2 mt-2 ${errorMessage ? "" : "hidden"}`}>
              <ErrorOutlineIcon
                sx={{ fontSize: 14 }}
                className="text-red-500"
              />
              <span className="text-[12px] text-red-500 mt-[2px]">
                {errorMessage}
              </span>
            </div>
          </div>
          {/* Icon */}
          <div
            onClick={() => setOpenIconWindow(true)}
            className="w-12 h-10 text-white flex items-center justify-center bg-sky-500 rounded-lg cursor-pointer"
          >
            {selectedIcon?.icon}
          </div>
        </div>
      </div >
      {/* Footer */}
      < div className="w-full mt-11 flex gap-3 justify-end px-7 items-center" >
        {/* Cancel Button */}
        < button
          onClick={() => {
            setOpenProjectWindow(false)
            setSelectedProject(null)
          }
          }
          className="border border-slate-200 text-slate-400 text-[12px] p-2 px-6 rounded-md hover:border-slate-300 transition-all hover:bg-slate-50"
        >
          Cancel
        </button >
        <button
          onClick={selectedProject ? editTheProject : addNewProject}
          className="bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 px-3 rounded-md transition-all">
          {!selectedProject ? "Add Project" : "Editing Project"}
        </button>
      </div >
    </div >
  );
}