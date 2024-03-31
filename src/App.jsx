import { Outlet } from "react-router-dom";
import Sidebar from "./components/utils/Sidebar";

function App() {
  return (
    <div className="relative">
      <div className="py-5 w-full text-center bg-primary fixed top-0 left-0 z-10">
        <h1 className="text-5xl font-bold text-white gap-3">Task Master</h1>
      </div>
      <div className="flex justify-center items-center">
      <div className="w-20">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
    </div>
  );
}

export default App;
