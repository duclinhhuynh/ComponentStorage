import React from "react";
import { useAppContext } from "../ContextApi";
import TopBar from "./Components/ComponentPage/TopBar";
import AllComponents from "./Components/ComponentPage/AllComponents";
import { TextToIcon } from "../utils/TextToIcon"
import { IoMdAdd } from "react-icons/io";
import { ComponentEditor } from "./Components/ComponentPage/ComponentEditor";
function ComponentPage() {
    const {
        showComponentPageObject: { showComponentPage },
        selectedProjectObject: { selectedProject },
        openComponentEditorObject: { openComponentEditor, setOpenComponentEditor },
    } = useAppContext();
    return (
        <div className="w-full h-full bg-slate-50 p-3">
            <TopBar />
            {selectedProject?.components.length === 0 && <EmptyProjectsPlaceholder />}
            {openComponentEditor && <SoftLayer/> }
            <AllComponents />
            <ComponentEditor />
        </div>
    );
    function SoftLayer() {
        return (
            <div className="w-full h-full fixed top-0 right-0 bg-black opacity-30"></div>
        );
    }
    function EmptyProjectsPlaceholder() {
        const {
            selectedProjectObject: { selectedProject },
        } = useAppContext();
        return (
            <div className=" p-1 gap-5 flex flex-col justify-center h-[500px] mt-[68px] mb-[34px] items-center">
                {selectedProject?.icon !== undefined && (
                    <div className="w-28 h-28 bg-slate-200 rounded-full flex items-center justify-center">
                        {TextToIcon({
                            text: selectedProject?.icon,
                            size: "medium",
                            className: "text-slate-100",
                        })}
                    </div>
                )}
                {/* <CategoryIcon sx={{ fontSize: 150 }} className="text-slate-200" /> */}
                <div className=" flex flex-col ">
                    <h3 className="font-semibold text-[19px] mb-1 text-center">{`There are no components Yet...`}</h3>
                    <p className="text-gray-400 text-center text-[14px]">
                        Please click below to add your first component.
                    </p>
                </div>
                <button
                    onClick={() => setOpenComponentEditor(true)}
                    className="flex gap-1 items-center bg-sky-500 p-2 rounded-md
        text-white text-center text-[12px] px-3 pr-5"
                >
                    <IoMdAdd />
                    <span className="text-sm">Add new component</span>
                </button>
            </div>
        );
    }
}
export default ComponentPage;
