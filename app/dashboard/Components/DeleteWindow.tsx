"use client";
import React from "react";
import { useAppContext } from "@/app/ContextApi";
import { AppComponent } from "@/app/allData";
import { Project } from "@/app/allData";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
const DeleteWindow = () => {
    const {
        openDeleteWindowObject: { openDeletedWindow, setOpenDeletedWindow },
        selectedComponentObject: { selectedComponent, setSelectedComponent },
        allProjectsObject: { allProjects, setAllProjects },
        selectedProjectObject: { selectedProject, setSelectedProject },
        isMobileViewObject: { isMobileView },
    } = useAppContext();

    function deleteComponentFunction() {
        try {
            if (selectedProject) {
                // Update the selected project by removing the component
                const updatedSelectedProject = {
                    ...selectedProject,
                    components: selectedProject.components.filter(
                        (comp: AppComponent) => comp._id !== selectedComponent?._id
                    ),
                };
                setSelectedProject(updatedSelectedProject);

                // Update all projects by modifying the relevant project
                const updatedAllProjects = allProjects.map((project: Project) => {
                    if (project._id === selectedProject._id) {
                        return {
                            ...project,
                            components: project.components.filter(
                                (comp: AppComponent) => comp._id !== selectedComponent?._id
                            ),
                        };
                    }
                    return project; // Ensure we return the project in the map function
                });

                // Update the allProjects state
                setAllProjects(updatedAllProjects);
            }

            // Close the delete window after deletion
            setOpenDeletedWindow(false);
        } catch (error) {
            console.error("Failed to delete component:", error);
        }
    }

    return (
        <div
            className={`${isMobileView ? "w-[80%]" : "w-[40%]"} h-[288px] border border-slate-50 bg-white rounded-md shadow-md fixed top-[20%] bottom-[20%] -translate-x-1/2 left-1/2 z-40`}
        >
            {/* Header */}
            <div className="flex justify-between items-center pt-7 px-7">
                <div className="flex items-center gap-2">
                    {/* Project Icon */}
                    <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
                        <DeleteIcon sx={{ fontSize: 17 }} className="text-sky-400 text-[12px]" />
                    </div>
                    {/* Category Header */}
                    <span className="font-semibold text-lg">Deleted component</span>
                </div>
                <CloseIcon
                    onClick={() => setOpenDeletedWindow(false)}
                    sx={{ fontSize: 16 }}
                    className="text-slate-400 text-[18px] cursor-pointer"
                />
            </div>
            {/* body */}
            <div className="lex flex-col gap-2 mt-11 px-7">
                <span className="font-semibold text-lg">Are You sure you want to delete this component <br/></span>
                <span className="font-semibold text-red-500 "> You can not revert after deleted</span>
            </div>
            {/* Footer */}
            < div className="w-full mt-11 flex gap-3 justify-end px-7 items-center" >
                {/* Cancel Button */}
                < button
                    onClick={() => {
                        setOpenDeletedWindow(false);
                        setSelectedComponent(null);
                    }}
                    className="border border-slate-200 text-slate-400 text-[12px] p-2 px-6 rounded-md hover:border-slate-300 transition-all hover:bg-slate-50"
                >
                    Cancel
                </button >
                <button
                    onClick={deleteComponentFunction}
                    className="flex items-center bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 px-3 rounded-md transition-all">
                        <DeleteIcon sx={{ fontSize: 17 }} className="text-white-500 mx-1 text-[12px]" />
                    Delete
                </button>
            </div >
        </div >
    );
};

export default DeleteWindow;
