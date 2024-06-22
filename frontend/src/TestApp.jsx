import Sidebar from "./Components/TestSideBar.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import IntroPage from "./Components/IntroPage.jsx";
import TestIntro from "./Components/TestIntro.jsx"
import EmptyPage from "./Components/EmptyPage.jsx";
import MainPlanContents, {MainFormContents} from "./Components/MainContent.jsx";
import {CreateForm} from "./Components/CreateForm.jsx";
import FlightPlan from "./Components/FlightPlan.jsx";
import PopUp from "./Components/PopUp.jsx";
import LoadingForChange from "./Components/LoadingForChange.jsx";
import DayPlanLoadingScreen from "./Components/DayPlanLoadingScreen.jsx";

export default function TestApp() {
    return (
        <BrowserRouter>
            <div className="w-full h-screen grid grid-cols-[max-content_auto] grid-rows-1 bg-gray-300">
                <Sidebar className="h-full"/>
                <Routes>
                    <Route>
                        <Route path="/" element={<IntroPage/>}/>

                        <Route path="/create_form" element={<MainFormContents/>}/>
                        <Route path="/chat/:targetId" element={<MainPlanContents/>}/>
                        <Route path="/create_chat" element={<CreateForm/>}/>
                        <Route path="/flight" element={<FlightPlan/>}/>
                        <Route path="/test" element={<TestIntro/>}/>

                        {/*className="bg-neutral-700 h-full"*/}

                    </Route>
                    <Route path="*" element={<EmptyPage/>}/>
                </Routes>

            </div>
        </BrowserRouter>
    );
}