import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
