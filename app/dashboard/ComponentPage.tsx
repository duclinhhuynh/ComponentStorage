import React from "react";
import { useAppContext } from "../ContextApi";
import TopBar from "./Components/ComponentPage/TopBar";
import AllComponents from "./Components/ComponentPage/AllComponents";
function ComponentPage() {
    const {
        showComponentPageObject: { setShowComponentPage },
    } = useAppContext();
    return (
        <div className="w-full h-full bg-slate-50 p-3">
          <TopBar/>
          <AllComponents/>
        </div>
    );
}
export default ComponentPage;