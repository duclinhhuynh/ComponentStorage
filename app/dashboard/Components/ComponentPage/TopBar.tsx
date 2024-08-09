import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AddOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppContext } from "@/app/ContextApi";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export default function TopBar() {
    const {
        showComponentPageObject: { setShowComponentPage },
        showSideBarObject: { setShowSideBar, showSideBar },
    } = useAppContext();
    return (
        <div className="flex justify-between items-center gap-4 bg-white p-3 px-4 rounded-lg">
            <div className="flex gap-5 items-center w">
                {/* Back Button */}
                <div
                    onClick={() => setShowComponentPage(false)}
                    className="border mt-[2px] p-[2px] text-slate-400 flex h-7 gap-1 px-2 items-center justify-center rounded-md cursor-pointer">
                    <ArrowBackIcon sx={{ fontSize: 11 }} className=" text-[11px]" />
                    <span className="max-sm:hidden">Back</span>
                </div>
                {/* Category Title And Icon */}
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                        <span className="font-bold text-x1">Buttons</span>
                        <span className="text-slate-400 text-[11px] ">10 Components</span>
                    </div>
                </div>
            </div>
            {/* Search Bar */}
            <div className=" relative p-[8px] text-[13px] w-[34%] flex px-[15px] h-13 rounded-3xl bg-slate-100 items-center gap-3">
                <SearchIcon className="text-slate-400 text-[19px]" />
                <input
                    placeholder="Search a component..."
                    className="bg-slate-100 outline-none font-light text-[12px] w-full"
                />
                {/* Close Icon */}
                <div className="absolute right-2 top-[10px] cursor-pointer w-5 h-5 flex justify-center items-center lbg-slate-300">
                    <CloseRoundedIcon
                        sx={{ fontSize: 14 }}
                        className="text-slate-400 text-[14px]" />
                </div>
            </div>
            {/* Add Component Button */}
            <div className="flex gap-2 items-center">
                <button className="bg-sky-500 text-[12px] h-[33px] text-white px-3 rounded-md">
                    <AddOutlined sx={{ fontSize: 16 }} className="" />
                    <span className="max-sm:hidden">Component</span>
                </button>
                <div className="hidden max-sm:block">
                    <MenuIcon
                        onClick={() => setShowSideBar(true)}
                        className="text-slate-500 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}