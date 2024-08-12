"use client"
import React, { useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { SiJavascript } from "react-icons/si";
import { formatDate } from "@/app/utils/formatDate";
import {
    materialDark,
    materialLight,
    atomDark,
    oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
} from 'react-live'
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useAppContext } from "@/app/ContextApi";
import { AppComponent, Project } from "@/app/allData";
import Checkbox from '@mui/material/Checkbox';
import { Favorite, CheckBox } from "@mui/icons-material/";

export default function AllComponents() {
    const {
        selectedProjectObject: { selectedProject, setSelectedProject },
        allProjectsObject: { allProjects, setAllProjects },
        selectedComponentObject: { selectedComponent, setSelectedComponent },
        openComponentEditorObject: {setOpenComponentEditor}
    } = useAppContext();
    return (
        <div className="mt-5 flex flex-wrap gap-5">
            {
                selectedProject?.components.map(
                    (component: AppComponent, index: number) => (
                        <div key={index}>
                            <SingleNote component={component} />
                        </div>
                    )
                )
            }
        </div>
    );

    function SingleNote({ component }: { component: AppComponent }) {
        interface CodeBlockProps {
            language: string;
        }
        function openTheComponentEditor() {
            setSelectedComponent(component);
            setOpenComponentEditor(true);
        }
        const CodeBlock: React.FC<CodeBlockProps> = ({ language }) => {
            const codeString = component.code;
            return (
                <div className="rounded-md max-sm:w-[90%] overflow-hidden h-[250px]">
                    <div className="h-full overflow-y-auto p-2 custom-scroll">
                        <SyntaxHighlighter language={language} style={oneDark}>
                            {codeString}
                        </SyntaxHighlighter>
                    </div>
                </div>
            );
        };
        return (
            <div className="max-sm:w-full w-[320px] rounded-md py-4 bg-white">
                <NoteHeader component={component} />
                <NoteDate component={component} />
                <NoteTags component={component} />
                <NoteDescription component={component} />
                <CodeBlock language="javascript" />
                <NoteFooter />
            </div>
        );
        function updateFavoriteState(componentId: string) {
            const newAllProjects = allProjects.map((project: Project) => {
                const updatedComponents = project.components.map((comp: AppComponent) => {
                    if (comp._id === componentId) {
                        return {
                            ...comp,
                            isFavorite: !comp.isFavorite,
                        };
                    }
                    return comp;
                });
                return { ...project, components: updatedComponents };
            });

            setAllProjects(newAllProjects);

            if (selectedProject) {
                const updatedSelectedProject = newAllProjects.find(
                    (project: Project) => project._id === selectedProject._id
                );
                if (updatedSelectedProject) {
                    setSelectedProject(updatedSelectedProject);
                }
            }
        }
        function NoteHeader({ component }: { component: AppComponent }) {
            const [isFavorite, setFavorite] = useState(component.isFavorite);
            const handleFavoriteChange = () => {
                setFavorite(!isFavorite); // update state of local
                updateFavoriteState(component._id); // update state in context
            };

            return (
                <div className="flex justify-between mx-4 cursor-pointer">
                    <span
                        onClick={openTheComponentEditor}
                        className="font-bold text-lg w-[87%] cursor-pointer hover:text-sky-500">
                        {component.name}
                    </span>
                    <Checkbox
                        onChange={handleFavoriteChange}
                        checked={isFavorite}
                        icon={
                            <FavoriteBorderIcon className="text-slate-400 cursor-pointer" />
                        }
                        checkedIcon={<FavoriteIcon className="text-red-500" />}
                    />
                </div>
            );
        }
        function NoteTags({ component }: { component: AppComponent }) {
            return (
                <div className="text-slate-500 text-[11px] mx-4 flex-wrap flex gap-1 mt-4">
                    {component.tags.map((item, index) => (
                        <span
                            key={index}
                            className="bg-sky-100 text-purple-600 p-1 rounded-md px-2">
                            {item}
                        </span>
                    ))}
                </div>
            );
        }
        function NoteDate({ component }: { component: AppComponent }) {
            return (
                <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
                    <span>{formatDate(component.createdAt)}</span>
                </div>
            );
        }
        function NoteDescription({ component }: { component: AppComponent }) {
            const maxLength = 250; // Set the maximum number of characters to display
            const truncatedDesc =
                component.desc.length > maxLength
                    ? `${component.desc.slice(0, maxLength)}...`
                    : component.desc
            return (
                <div className="text-slate-600 text-[13px] mt-4 mx-4">
                    {truncatedDesc}
                </div>
            );
        }
        function NoteFooter() {
            return (
                <div className="flex justify-between text-[13px] text-slate-400 mx-4 mt-3">
                    <div className="flex gap-1 items-center">
                        <SiJavascript size={15} className="mb-[2px]" />
                        Javascript
                    </div>
                    <DeleteRoundedIcon sx={{ fontSize: 17 }} className="cursor-pointer" />
                </div>
            );
        }
    }
}