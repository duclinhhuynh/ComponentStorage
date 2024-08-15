import { useAppContext } from "@/app/ContextApi"
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Project } from "@/app/allData";
import { TextToIcon } from "@/app/utils/TextToIcon";
import NoteAddSharpIcon from '@mui/icons-material/NoteAddSharp';
import React, { useEffect, useRef, useState } from "react";
import { SortingDropdown } from "../Components/SortingDropdown"
export default function AllProjectsWindow() {
    const {
        openAllProjectWindowObject: {
            openAllProjectWindow,
            setOpenAllProjectWindow
        }
    } = useAppContext()
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div
            style={{ display: openAllProjectWindow ? "block" : "none" }}
            className="w-[70%] max-sm:w-[90%] p-9 border border-slate-50 h-[82%] bg-white rounded-xl shadow-md fixed left-1/2 top-[10%] bottom-[10%] -translate-x-1/2 z-30"
        >
            <Header />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <SortByComponent />
            <ProjectsList searchQuery={searchQuery} />
        </div>
    )
    function Header() {
        const {
            menuItemsObject: { menuItems, setMenuItems },
        } = useAppContext();
        function closeTheWindow() {
            //Set the isSelected of the first menu item to true and others to false
            setMenuItems((prevMenuItems) =>
                prevMenuItems.map((prevMenuItem) => ({
                    ...prevMenuItem,
                    isSelected: prevMenuItem.id === menuItems[0].id,
                }))
            );
            setOpenAllProjectWindow(false);
        }
        return (
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    < div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center" >
                        <CategoryIcon
                            sx={{ fontSize: 17 }}
                            className="text-sky-400 text-[17px]"
                        />
                    </div >
                    <span className="text-xl font-bold">All Projects</span>
                </div>
                <div>
                    <CloseIcon
                        onClick={closeTheWindow}
                        sx={{ fontSize: 16 }}
                        className="text-slate-400 cursor-pointer"
                    />
                </div>
            </div>
        );
    }
    function SearchBar({
        searchQuery,
        setSearchQuery
    }: {
        searchQuery: string;
        setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    }) {
        const {
            openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
        } = useAppContext();
        const inputRef = useRef<HTMLInputElement>(null);
        useEffect(() => {
            if (openAllProjectWindow) {
                const focusInput = () => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                };
                if (!openProjectWindow) {
                    // Schedule focus setting for the next render
                    setTimeout(focusInput, 0);
                }
            }
        }, [openAllProjectWindow, openProjectWindow]);
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
        };
        return (
            <div className="flex gap-5 items-center justify-between mt-12 relative ">
                <div
                    className={`h-[42px] relative bg-slate-50 flex items-center text-sm rounded-md pl-3 gap-1 w-[85%]`}
                >
                    <SearchIcon className="text-slate-400" />
                    <input
                        ref={inputRef}
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder="Search a Project..."
                        className="bg-transparent outline-none w-full font-light"
                    />
                    {/* Close Icon delete text */}
                    {searchQuery.length > 0 && (
                        <div
                            onClick={() => setSearchQuery("")}
                            className="text-slate-400 cursor-pointer absolute right-2 flex items-center"
                        >
                            <CloseIcon sx={{ fontSize: 17 }} />
                        </div>
                    )}
                </div>
                <button className="bg-sky-500 ml-2 p-[10px] flex w-[15%] text-sm rounded-md text-white items-center justify-center max-lg:w-full">
                    <AddOutlinedIcon sx={{ fontSize: 17 }} />
                    <span className="max-md:hidden">Create New</span>
                </button >
            </div >
        );
    }

    //Sort By
    function SortByComponent() {
        const {
            allProjectsObject: { allProjects },
            openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
            sortingDropDownPositionsObject: { sortingDropDownPositions, setSortingDropDownPositions },
        } = useAppContext();
        const nameRef = useRef<HTMLDivElement>(null);
        function openSortingDropDownFunction() {
            if (nameRef.current) {
                const rect = nameRef?.current.getBoundingClientRect();
                const top = rect.top;
                const left = rect.left;
                setSortingDropDownPositions({ top: top, left: left });
            }
            setOpenSortingDropDown(true);
        }
        return (
            <div
                className="mt-11 mb-[13px] flex gap-2  items-center justify-between text-[13px]">
                <div className="flex gap-1">
                    <span className="text-slate-400">You have</span>
                    <span className="text-sky-500 font-semibold">{allProjects.length}</span>
                    <span className="text-slate-400">projects!</span>
                </div>
                <div className="flex gap-2 items-center relative">
                    <span className="text-slate-400">Sort By:</span>
                    <div
                        ref={nameRef}
                        onClick={openSortingDropDownFunction}
                        className="text-sky-500 flex gap-1 items-center cursor-pointer">
                        <span>Name</span>
                        {openSortingDropDown ? <KeyboardArrowUpIcon className="text-[13px]"/> : <KeyboardArrowDownRoundedIcon className="text-[13px]" />}
                        
                        
                    </div>
                    <SortingDropdown />

                </div>
            </div>
        );
    }

    //Projects List
    function ProjectsList({
        searchQuery,
    }: {
        searchQuery: string;
    }) {
        const {
            allProjectsObject: { allProjects },
            isLoadingObject: { isLoading },
            sortProjectsObject: { sortProjects}
        } = useAppContext()
        const filterAllProjectsBySearchQuery = sortProjects.filter((singleProject) =>
            singleProject.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="w-full bg-slate-50 h-[64%] rounded-lg p-3 flex flex-col gap-3">
                {isLoading && (
                    <div className="flex flex-col gap-3 justify-center items-center w-full mt-28">
                        <CircularProgress value={100} />
                        <span className="text-slate-400 text-sm">Loading...</span>
                    </div>
                )}
                {allProjects.length === 0 && !isLoading ? (
                    <EmptyProjectsPlaceholder />
                ) : (
                    <>{filterAllProjectsBySearchQuery.length > 0 ? (
                        <>
                            {filterAllProjectsBySearchQuery.map((project, index) => (
                                <SingleProject key={index} project={project} />
                            ))}
                        </>
                    ) : (
                        <>{!isLoading && <NoFoundProjectsSearched />}</>
                    )}
                    </>
                )}
            </div>
        )
        function SingleProject({ project }: { project: Project }) {
            const {
                selectedProjectObject: { selectedProject, setSelectedProject },
                openProjectWindowObject: { setOpenProjectWindow },
                showComponentPageObject: { setShowComponentPage },
                menuItemsObject: { menuItems, setMenuItems },
                openDeleteWindowObject: { setOpenDeletedWindow },
            } = useAppContext();
            function editTheProjectClicked() {
                setOpenProjectWindow(true);
                setSelectedProject(project)
            }
            function openTheProject() {
                // update selected project
                setSelectedProject(project);
                // close the all project window
                setOpenAllProjectWindow(false);
                // Show component page
                setShowComponentPage(true);
            }
            function openDeleteWindow() {
                setSelectedProject(project);
                setOpenDeletedWindow(true);
            }
            return (
                <div className="w-full bg-white rounded-md flex gap-3 items-center justify-between p-3">
                    <div className="flex gap-3 items-center">
                        <DragIndicatorRoundedIcon className="text-slate-400" />
                        {/* Project Icon */}
                        <div>
                            <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
                                {
                                    TextToIcon({
                                        text: project.icon,
                                        size: "medium",
                                        className: "text-sky-400 text-[17px]"
                                    })
                                }
                            </div>
                        </div>
                        {/* Project Name */}
                        <div className="flex flex-col">
                            <span
                                onClick={openTheProject}
                                className="font-bold">{project.name}</span>
                            <span className="text-slate-400 text-[12px] ">{project.components.length} components</span>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 items-center">
                        {/* Edit Button */}
                        <div
                            onClick={editTheProjectClicked}
                            className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
                            <EditRoundedIcon
                                className=" text-slate-400"
                                sx={{ fontSize: 15 }}
                            />
                        </div>
                        {/* Edit Button */}
                        <div
                            onClick={openDeleteWindow}
                            className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
                            <DeleteIcon className=" text-slate-400" sx={{ fontSize: 15 }} />
                        </div>
                    </div>
                </div>
            );
        }
        function NoFoundProjectsSearched() {
            return (
                <div className=" p-1 gap-5 flex flex-col justify-center pt-[90px] items-center">
                    <SearchIcon
                        sx={{ fontSize: 80 }}
                        className="text-[70px] text-slate-200"
                    />
                    <div className="">
                        <p className="text-gray-400 w-72 text-center text-[13px]">
                            {"Oops! That project seems to be missing. Try searching with a different keyword."}
                        </p>
                    </div>
                </div>
            );
        }
    }
}
export function EmptyProjectsPlaceholder() {
    return (
        <div className=" p-1 gap-5 flex flex-col justify-center h-[200px] mt-[68px] mb-[34px] items-center">
            <NoteAddSharpIcon
                sx={{ fontSize: 80 }}
                className="text-[70px] text-slate-200"
            />
            <div className="">
                <h3 className="font-semibold text-[15px] mb-1 text-center">There are no projects Yet...</h3>
                <p className="text-gray-400 w-52 text-center text-[13px]">
                    Please click below to add your first project.
                </p>
            </div>
            <button className="bg-sky-500 p-2 rounded-md text-white text-center text-[12px] px-7">
                Add New Project
            </button>
        </div>
    )
}