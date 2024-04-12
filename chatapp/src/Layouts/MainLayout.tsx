import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  if (!localStorage.getItem("access_token")) return <Navigate to={"/login"} />;
  return (
    <main className="flex gap-2 h-full overflow-hidden">
      <Navbar></Navbar>
      <div className="flex bg-[url('./assets/images/background.jpg')] z-0 h-full w-full relative after:absolute after:block after:bg-black after:w-full after:h-full after:bg-opacity-60 after:top-0 after:left-0 after:-z-[1]">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
