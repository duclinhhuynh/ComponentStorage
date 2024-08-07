"use client"
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppContext } from "@/app/ContextApi";
import { AppComponent } from "../../allData";
import { formatDate } from "@/app/utils/formatDate";
export default function FavoriteComponents() {
    const {
        allFavoriteComponentsObject: { allFavoriteComponents },
    } = useAppContext();
    return (
        <div className=" bg-white w-full p-8 rounded-1g mt-4 ">
            {/* Main Header */}
            <div className="flex justify-between">
                <span className="font-bold text-lg">Favorite Components</span>
                {/* Button */}
                <button className="bg-sky-500 flex gap-2 items-center text-white text-[12px] p-2 px-3 rounded-md">
                    <VisibilityIcon fontSize="small" />
                    <span className="max-sm:hidden">View All</span>
                </button>
            </div>
            {/*Header's List */}
            <div className="grid grid-cols-4 mt-6 mb-4 text-sm items-center text-slate-400 px-4 max-sm:grid-cols-2">
                <span className="">Component Name</span>
                <span className="max-sm:hidden">Created At</span>
                <span className="max-sm:hidden">Project</span>
                <span className="">Actions</span>
            </div>
            {/* Components */}
            <div className="px-4 flex flex-col gap-1 mt-1">
                {allFavoriteComponents.map((component, index) => (
                    <div key={index}>
                        <SingleFavoriteComponent component={component} />
                    </div>
                ))}
            </div>
        </div>
    )
    function SingleFavoriteComponent({ component }: { component: AppComponent }) {
        return (
            <div className="grid grid-cols-4 gap-4 text-sm items-center rounded-lg p-2 max-sm:grid-cols-2">
                {/* Component Name */}
                <span className="hover:text-sky-500 cursor-pointer">
                    {component.name}
                </span>
                {/* Component date */}
                <span className="max-sm:hidden">
                    {formatDate(component.createdAt)}
                </span>
                {/* Project */}
                <span className="justify-self-start max-sm:hidden">
                    <span className="inline-block rounded-2xl bg-sky-500 text-white text-[12px] px-4 py-1 whitespace-nowrap">
                        {component.projectName}
                    </span>
                </span>
                {/* Actions button */}
                <div className="flex gap-2">
                    {/* Modify] Button */}
                    <div className="bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-sky-600 cursor-pointer">
                        <EditIcon fontSize="small" className="text-white text-[13px]" />
                    </div>
                    <div className="bg-sky-500 rounded-full w-7 h-7 flex items-center justify-center hover: bg-sky-600 cursor-pointer">
                        <DeleteIcon fontSize="small" className=" text-white text-[13px]" />
                    </div>
                </div>
            </div>
        );
    }
}