import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import CodeIcon from "@mui/icons-material/Code";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Editor from "@monaco-editor/react";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { CheckBox, Save } from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import Checkbox from "@mui/material/Checkbox";
import { useAppContext } from "@/app/ContextApi";
import { AppComponent } from "@/app/allData";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
export function ComponentEditor({ component }: { component?: AppComponent }) {
    const [code, setCode] = useState(`function HelloWorld() {
    return <h1 style={{ color: 'blue' }}>Hello, world!</h1>;
  }`);
    const [inputName, setInputName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [copySuccess, setCopySuccess] = useState(false);
    const editorInstanceRef = useRef<any>(null);
    const editorRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [isFavorite, setFavorite] = useState(component?.isFavorite);
    // Explicitly typing the ref as pointing to an HTMLTextAreaElement
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current) {
            // Reset height to 'auto' to calculate the new scrollHeight
            textareaRef.current.style.height = 'auto';
            // Set the height based on the scrollHeight to fit the content
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [desc]);

    const {
        openComponentEditorObject: { openComponentEditor, setOpenComponentEditor },
        selectedProjectObject: { selectedProject, setSelectedProject },
        allProjectsObject: { allProjects, setAllProjects },
        selectedComponentObject: { selectedComponent, setSelectedComponent },
    } = useAppContext();
    const formatCode = async (codeToFormat: string) => {
        if (editorRef.current) {
            try {
                const formatted = await prettier.format(code, {
                    parser: "babel",
                    plugins: [babelPlugin, estreePlugin], // Include both plugins
                    singleQuote: true,
                    trailingComma: "all",
                });
                setCode(formatted);
            } catch (error) {
                console.error("Formatting failed: ", error);
            }
        }
    };

    const handleEditorChange = (value: any) => {
        setCode(value);
    };
    // save component
    function saveComponent() {
        if (!selectedProject) {
            toast.error("No project selected");
            return;
        }

        if (!selectedComponent) {
            // Creating a new component
            const newComponent: AppComponent = {
                _id: uuidv4(),
                name: inputName,
                code: code,
                tags: tags,
                desc: desc,
                isFavorite: false,
                createdAt: new Date().toISOString(),
                projectName: selectedProject.name,
            };

            // Check if the component name already exists in the current project
            if (selectedProject.components.some((component) => component.name.toLowerCase() === inputName.toLowerCase())) {
                toast.error("Component name already exists in this project");
                return;
            }

            addNewComponent(newComponent);
            setSelectedComponent(newComponent);
            toast.success("New component created successfully");
            formatCode(newComponent.code);
        } else {
            const updatedComponent: AppComponent = {
                ...selectedComponent,
                name: inputName,
                desc: desc,
                tags: tags,
                code: code,
            };

            // Check if the new name conflicts with other components (excluding the current one)
            if (
                selectedProject.components.some(
                    (component) =>
                        component._id !== selectedComponent._id &&
                        component.name.toLowerCase() === inputName.toLowerCase()
                )
            ) {
                toast.error("Component name already exists in this project");
                return;
            }

            updateExistingComponent(updatedComponent);
            setSelectedComponent(updatedComponent);
            toast.success("Component updated successfully");
        }
    }
    // add a new component
    function addNewComponent(newComponent: AppComponent) {
        if (selectedProject && allProjects) {
            const updatedProject = {
                ...selectedProject,
                components: [...selectedProject.components, newComponent],
            };
            const updatedAllProjects = allProjects.map((project) =>
                project._id === selectedProject._id ? updatedProject : project
            );
            setSelectedProject(updatedProject);
            setAllProjects(updatedAllProjects);
        }
    }

    function updateExistingComponent(updatedComponent: AppComponent) {
        if (selectedProject && allProjects) {
            const updatedComponents = selectedProject.components.map((component) =>
                component._id === updatedComponent._id ? updatedComponent : component
            );
            const updatedProject = {
                ...selectedProject,
                components: updatedComponents,
            };
            const updatedAllProjects = allProjects.map((project) =>
                project._id === selectedProject._id ? updatedProject : project
            );
            setSelectedProject(updatedProject);
            setAllProjects(updatedAllProjects);
        }
    }

    function copyTheCode() {
        // Ensure the document is focused
        window.focus();

        // Try to copy using the Clipboard API
        navigator.clipboard.writeText(code).then(
            () => {
                setCopySuccess(true);
                toast.success("Code copied to clipboard");
                setTimeout(() => {
                    setCopySuccess(false);
                }, 1400);
            },
            (err) => {
                console.error("Could not copy text: ", err);
                // Fallback method using execCommand
                // fallbackCopyTextToClipboard(code);
            }
        );
    }

    // update component
    function updateTheFavoriteState() {
        if (
            selectedComponent !== null &&
            allProjects !== null &&
            selectedProject !== null
        ) {
            // Update the isFavorite state in the selected Component
            const updatedComponent = {
                ...selectedComponent,
                isFavorite: !selectedComponent.isFavorite,
            };
            // Update the components array in the selected Project
            const updatedComponents = selectedProject.components.map((component) =>
                component._id === selectedComponent._id ? updatedComponent : component
            );
            // Update the selectedProject in the allProjects
            const updatedSelectedProject = {
                ...selectedProject,
                components: updatedComponents,
            };
            // update all project
            const updatedAllProjects = allProjects.map((project) => 
                project._id === selectedProject._id ? updatedSelectedProject : project
            );
            // Update all the states
            setSelectedComponent(updatedComponent);
            setSelectedProject(updatedSelectedProject);
            setAllProjects(updatedAllProjects);
        } else {
            console.error("selected component, project, or all projects is null");
        }
    }
    //When the component is first rendered, focus on the input and format the code
    // and the empty the fields
    useEffect(() => {
        if (openComponentEditor) {
            inputRef.current?.focus();
            if (!selectedComponent) {
                resetEditor();
            } else {
                setInputName(selectedComponent.name);
                setCode(selectedComponent.code);
                setDesc(selectedComponent.desc);
                setTags(selectedComponent.tags);
                if (editorInstanceRef.current) {
                    editorInstanceRef.current.setValue(selectedComponent.code, -1);
                    // Format the code after setting it
                    formatCode(selectedComponent.code);
                }
            }
        } else {
            resetEditor();
        }
    }, [openComponentEditor, selectedComponent]);

    const resetEditor = () => {
        setCode("");
        setInputName("");
        if (editorInstanceRef.current) {
            editorInstanceRef.current.setValue("", -1);
        }
    };
    interface TagMenuProps {
        tags: string[];
        setTags: React.Dispatch<React.SetStateAction<string[]>>;
    }
    function TagMenu({ tags, setTags }: TagMenuProps
    ) {
        // const [tags, setTags] = useState<string[]>([]);
        const [inputValue, setInputValue] = useState('');
        const [isEditing, setIsEditing] = useState(false);

        const addTag = () => {
            if (inputValue.trim() !== '') {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        };

        const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                addTag();
            }
        };

        const removeTag = (indexToRemove: number) => {
            setTags(tags.filter((_, index) => index !== indexToRemove));
        };

        return (
            <div className="mt-3 p-x">
                <div className="flex items-center ">
                    <StyleOutlinedIcon />
                    <ul className="flex flex-wrap">
                        {tags.length === 0 ? (
                            <li className="p-1 px-2 m-2 text-slate-500 bg-slate-300 rounded-md transition-all">No tags</li>
                        ) :
                            (tags.map((item, index) => (
                                <li
                                    key={index}
                                    className="p-1 px-2 m-2 flex justify-between items-center select-none cursor-pointer bg-slate-300 text-slate-500 rounded-md transition-all"
                                >
                                    {item}
                                    <CloseIcon
                                        onClick={() => removeTag(index)}
                                        className="text-bold hover:text-red-700 cursor-pointer"
                                    />
                                </li>
                            )))
                        }
                    </ul>
                    <div className="relative">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className=" flex items-center gap-1 text-slate-600 hover:text-sky-500 transition-all"
                        >
                            <EditIcon />
                        </button>

                        {isEditing && (
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a tag and Enter"
                                className="absolute p-2 border rounded-md mt-2 z-50"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                display: openComponentEditor ? "flex" : "none",
            }}
            className="w-[96%] h-full max-sm:h-[90%] max-sm:flex-col border-slate-100 flex-col items-center overflow-hidden bg-white absolute left-1/2 top-2 rounded-2xl shadow-md -translate-x-1/2 z-30"
        >
            <div className="w-full h-full overflow-y-auto">
                {/* Left Part */}
                <div className="w-full max-sm:w-full max-sm:border-t border-1 max-sm:mt-5 border-slate-100 h-auto">
                    {/* header */}
                    <div className="flex justify-between items-center pt-7 px-8">
                        <div className="flex items-center gap-2">
                            {/* Category Icon */}
                            <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
                                <FormatShapesIcon sx={{ fontSize: 17 }} className="text-sky-400 text-[17px]" />
                            </div>
                            {/* Category Header */}
                            <span className="font-semibold">Component Edit</span>
                        </div>
                        <CloseIcon
                            onClick={() => {
                                setOpenComponentEditor(false);
                                setSelectedComponent(null);
                                resetEditor();
                            }}
                            sx={{ fontSize: 16 }}
                            className="text-slate-400 text-[18px] cursor-pointer"
                        />
                    </div>
                    <div className="border rounded mx-8 my-3">
                        <LiveProvider code={code} noInline={false} scope={React}>
                            <div className=" ">
                                <LiveError className="rounded-1g border-gray-200 p-4 text-red-600" />
                                <LivePreview className="rounded-1g border-gray-200 p-4" />
                            </div>
                        </LiveProvider>
                    </div>
                </div>
                {/* Right Part */}
                <div className="w-full max-sm:w-full h-full">
                    <div className="flex max-sm:flex-col">
                        {/* Input Name */}
                        <div className="w-1/2 flex flex-col gap-2 px-8">
                            {/* Input Label */}
                            <div className="flex gap-3">
                                <span className="flex gap-1 items-center text-[13px]">
                                    <TextFieldsIcon className="text-[15px]" />
                                    <span>Component Name</span>
                                </span>
                                <div>
                                    <Checkbox 
                                    onChange={() => updateTheFavoriteState()}
                                    checked={isFavorite}
                                    icon={<FavoriteBorderIcon sx={{ fontSize: 19 }} />
                                    } checkedIcon={<FavoriteIcon sx={{ fontSize: 19 }} className="text-red-500" />} />
                                </div>
                            </div>
                            {/* Input */}
                            <div className="flex gap-3">
                                <input
                                    ref={inputRef}
                                    placeholder="Enter Component Name..."
                                    value={inputName}
                                    onChange={(e) => setInputName(e.target.value)}
                                    className="p-[10px] text-[12px] w-full rounded-md border outline-none"
                                />
                            </div>
                            {/* Input */}
                            <TagMenu
                                tags={tags}
                                setTags={setTags}
                            />
                        </div>
                        {/* Input desc */}
                        <div className="w-1/2 flex flex-col gap-2 px-8 pt-3 justify-between">
                            {/* Input */}
                            <div className="grid gap-2">
                                <div className="flex">
                                    <span className="flex gap-1 text-[13px]">
                                        <DescriptionIcon className="text-[15px]" />
                                        <span>Description</span>
                                    </span>
                                </div>
                                <textarea
                                    ref={textareaRef}
                                    placeholder="Enter Component Name..."
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="p-[10px] min-h-[50px] h-auto text-[12px] w-full resize-none overflow-hidden rounded-md border outline-none hover:border-sky-500 "

                                />
                            </div>
                        </div>
                    </div>
                    {/* Input Code */}
                    <div className="flex flex-col gap-2 pt-6 px-8">
                        <div className="flex justify-between">
                            {/* Input Label */}
                            <div className="flex">
                                <span className="flex gap-1 items-center text-[13px]">
                                    <CodeIcon className="text-[15px] font-bold" />
                                    <span>JSX Code</span>
                                </span>
                                <IconButton onClick={copyTheCode}>
                                    {!copySuccess ? (
                                        <ContentCopyIcon sx={{ fontSize: 17 }} />
                                    ) : (
                                        <DoneAllIcon sx={{ fontSize: 17 }} />
                                    )
                                    }
                                </IconButton>
                            </div>
                            <button
                                onClick={saveComponent}
                                className="bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 rounded-md transition-all"
                            >
                                <Save sx={{ fontSize: 17 }} />
                            </button>
                        </div>
                        <div className="editor-container" style={{ height: "100%", width: "100%" }}>
                            {/* Monaco Editor */}
                            <Editor
                                height="600px"
                                language="javascript"
                                value={code}
                                onChange={handleEditorChange}
                                options={{
                                    scrollBeyondLastLine: true,
                                    minimap: { enabled: false },
                                    automaticLayout: true,
                                }}
                                theme="vs-dark" // You can use any available theme like "vs-dark", "vs-light", etc.
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
