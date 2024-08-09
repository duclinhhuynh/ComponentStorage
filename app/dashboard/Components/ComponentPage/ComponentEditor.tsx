import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import CodeIcon from "@mui/icons-material/Code";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Editor from '@monaco-editor/react';
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import { CheckBox, Save } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { useAppContext } from "@/app/ContextApi";
import toast from "react-hot-toast";

export function ComponentEditor() {
    const [code, setCode] = useState(`function HelloWorld() {
    return <h1  style={{ color: 'blue' }}>Hello, world!</h1>;
  }`);

    const editorRef = useRef(null);
    const {
        openComponentEditorObject: { openComponentEditor, setOpenComponentEditor },
        // seletedCo: { selectedComponent },
    } = useAppContext();

    const formatCode = async () => {
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

    function saveComponent() {
        formatCode();
    }

    useEffect(() => {
        formatCode();
    }, []);

    // if (!selectedProject) {
    //     toast.error("No project selected");
    //     return;
    // }
    // if (!selectedComponent) {
    //     // Creating a new component
    //     const newComponent: Component = {
    //         _id: uuidv4(),
    //         name: inputName,
    //         code: code,
    //         isFavorite: false,
    //         createdAt: new Date().toISOString(),
    //         projectName: selectedProject.name,
    //     };


    return (
        <div style={{
            display: openComponentEditor ? "flex" : "none"
        }}
            className="w-[96%] h-full max-sm:h[90%] max-sm:flex-col border-slate-100 flex-col items-center overflow-hidden bg-white absolute left-1/2 top-2 rounded-2xl shadow-md -translate-x-1/2 z-60">
            <div className="w-full h-full overflow-y-auto">
                {/* Left Part */}
                <div className="w-full max-sm:w-full max-sm:border-t border-1 max-sm:mt-5 border-slate-100 h-auto">
                    {/* header */}
                    <div className="flex justify-between items-center pt-7 px-8">
                        <div className="flex items-center gap-2">
                            {/* Category Icon */}
                            <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
                                <FormatShapesIcon
                                    sx={{ fontSize: 17 }}
                                    className="text-sky-400 text-[17px]"
                                />
                            </div>
                            {/* Category Header */}
                            <span className="font-semibold">Component Edit</span>
                        </div>
                        <CloseIcon
                            onClick={() => setOpenComponentEditor(false)}
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
                    {/* Header */}

                    {/* Input Name */}
                    <div className="flex flex-col gap-2 px-8">
                        {/* Input Label */}
                        <div className="flex gap-3">
                            <span className="flex gap-1 items-center text-[13px]">
                                <TextFieldsIcon className="text-[15px]" />
                                <span>Component Name</span>
                            </span>
                            <div>
                                <Checkbox icon={<FavoriteBorderIcon sx={{ fontSize: 19 }} />} />
                            </div>
                        </div>
                        {/* Input */}
                        <div className="flex gap-3">
                            <input
                                placeholder="Enter Component Name..."
                                className="p-[10px] text-[12px] w-full rounded-md border outline-none"
                            />
                        </div>
                    </div>
                    {/* Input Code */}
                    <div className="flex flex-col gap-2 pt-6 px-8">
                        <div className="flex justify-between">
                            {/* Input Label */}
                            <span className="flex gap-1 items-center text-[13px]">
                                <CodeIcon className="text-[15px] font-bold" />
                                <span>JSX Code</span>
                            </span>
                            <button
                                onClick={saveComponent}
                                className="bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 rounded-md transition-all">
                                <Save sx={{ fontSize: 17 }} />
                            </button>
                        </div>
                        <div className="editor-container" style={{ height: '100%', width: '100%' }}>
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
                                theme="vs-dark"  // You can use any available theme like "vs-dark", "vs-light", etc.
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}