import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;
