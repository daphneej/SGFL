import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="relative flex flex-col w-full overflow-hidden">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
