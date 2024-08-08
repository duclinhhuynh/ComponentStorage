// AddProjects.js
"use client";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import IceSkatingOutlined from "@mui/icons-material/IceSkatingOutlined";
import { useRef, useEffect } from "react";
import { useAppContext } from "../../ContextApi";

export default function AddProjects() {
  const {
    isMobileViewObject: { isMobileView },
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
  } = useAppContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openProjectWindow) {
      inputRef.current?.focus();
    }
  }, [openProjectWindow]);

  // Ensure AddProjects is only rendered when openProjectWindow is true
  if (!openProjectWindow) return null;

  return (
    <div
      className={`${isMobileView ? "w-[80%]" : "w-[40%]"} h-[288px] border border-slate-50 bg-white rounded-md shadow-md absolute top-24 -translate-x-1/2 left-1/2 z-40`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
          {/* Project Icon */}
          <div className="w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center">
            <CategoryIcon sx={{ fontSize: 17 }} className="text-sky-400 text-[12px]" />
          </div>
          {/* Category Header */}
          <span className="font-semibold text-lg">New Project</span>
        </div>
        <CloseIcon
          onClick={() => setOpenProjectWindow(false)}
          sx={{ fontSize: 16 }}
          className="text-slate-400 text-[18px] cursor-pointer"
        />
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2 mt-11 px-7">
        <span className="text-[13px] font-medium">Project Name</span>
        <div className="flex gap-3">
          {/* Input */}
          <input
            placeholder="Enter Category Name..."
            className="p-[10px] text-[12px] w-full rounded-md border outline-none"
            ref={inputRef}
          />
          {/* Icon */}
          <div className="w-12 h-10 text-white flex items-center justify-center bg-sky-500 rounded-lg cursor-pointer">
            <IceSkatingOutlined sx={{ fontSize: 18 }} className="text-[18px]" />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full mt-11 flex gap-3 justify-end px-7 items-center">
        {/* Cancel Button */}
        <button
          onClick={() => setOpenProjectWindow(false)}
          className="border border-slate-200 text-slate-400 text-[12px] p-2 px-6 rounded-md hover:border-slate-300 transition-all hover:bg-slate-50"
        >
          Cancel
        </button>
        <button className="bg-sky-500 hover:bg-sky-600 text-white text-[12px] p-2 px-3 rounded-md transition-all">
          Add a Project
        </button>
      </div>
    </div>
  );
}
