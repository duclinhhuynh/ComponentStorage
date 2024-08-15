import { useAppContext } from "@/app/ContextApi";
import React, { useEffect, useRef, useState } from "react";
import { Project } from "@/app/allData";
export const SortingDropdown = () => {
    const {
        openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
        sortProjectsObject: { setSortProjects, sortProjects },
        sortingOptionsObject: { sortingOptions, setSortingOptions },
        allProjectsObject: { allProjects },
    } = useAppContext();

    const DropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                DropDownRef.current &&
                !DropDownRef.current.contains(event.target as Node)
            ) {
                setOpenSortingDropDown(false);
            }
        }

        if (openSortingDropDown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSortingDropDown, setOpenSortingDropDown]);
    const handleOptionClick = (categoryIndex: number, optionIndex: number) => {
        setSortingOptions((prevoptions) => {
            const newOptions = prevoptions.map((category, cIndex) => ({
                ...category,
                options: category.options.map((option: any, oIndex: any) => ({
                    ...option,
                    selected: cIndex === categoryIndex && oIndex === optionIndex,
                })),
            }));
            // Find the selected option
            const selectedOption = newOptions
                .flatMap((c) => c.options)
                .find((o) => o.selected);
            if (selectedOption) {
                // Sort the projects based on the selected option
                const sorted = sortedProjects(allProjects, selectedOption.value);
                setSortProjects(sorted);
            }
            return newOptions;
        });
        setOpenSortingDropDown(false);
    };
    function sortedProjects(projects: Project[], sortOption: string): Project[] {
        const sortedProjects = [...projects];
        switch (sortOption) {
            case "asc":
                sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "desc":
                sortedProjects.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "newest":
                sortedProjects.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case "oldest":
                sortedProjects.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                break;
            case "oldest":
                sortedProjects.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
                break;
            default:
                // If no valid sort option is provided, return the original array
                return projects;
        }
        return sortedProjects;
    }
    return (
        <div
            ref={DropDownRef}
            style={{
                display: openSortingDropDown ? "block" : "none",
                top: 25,
                left: -25,
            }}
            className="bg-white text-sm top-[170px] right-14 z-[60] px-4 border border-slate-50 absolute py-6 w-[160px] shadow-md rounded-lg flex flex-col gap-10"
        >
            {sortingOptions.map((category, categoryIndex) => (
                <div
                    key={categoryIndex}
                    className="flex flex-col gap-1 text-slate-600 cursor-pointer"
                >
                    <span
                        className={`text-[13px] font-bold ${category.category === "Date" ? "mt-3" : ""
                            }`}
                    >
                        {category.category}
                    </span>
                    <div className="flex flex-col gap-2 ml-2 mt-[2px]">
                        {category.options.map((option: any, optionIndex: any) => (
                            <div key={optionIndex}>
                                <span
                                    onClick={() => handleOptionClick(categoryIndex, optionIndex)}
                                    className={`cursor-pointer hover:text-sky-500 ${option.selected ? "text-sky-500" : ""
                                        }`}
                                >
                                    {option.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
