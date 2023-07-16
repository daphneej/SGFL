import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col justify-between w-screen md:h-screen overflow-x-hidden  md:overflow-y-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
