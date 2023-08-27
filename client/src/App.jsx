import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;
