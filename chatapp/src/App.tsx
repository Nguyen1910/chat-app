import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppProvider from "./Context/AppProvider";
import AuthProvider from "./Context/AuthProvider";
import LightBox from "./components/Modals/ModalLightBox/LightBox";
import SocketProvider from "./Context/SocketProvider";
import Login from "./pages/Login";
import MainLayout from "./Layouts/MainLayout";
import Search from "./pages/Search";
import Notify from "./pages/Notify";
import Share from "./pages/Share";
import Setting from "./pages/Setting";
import Home from "./pages/Home";
import CallWindow from "./components/CallWindow";

function App() {
  return (
    <div className="dark:bg-black dark:text-gray-100 duration-100 w-screen h-screen">
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <SocketProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/:currentConversationId" element={<Home />} />
                  <Route path="groupcall" element={<CallWindow />} />
                  <Route path="search" element={<Search />} />
                  <Route path="notify" element={<Notify />} />
                  <Route path="share" element={<Share />} />
                  <Route path="setting" element={<Setting />} />
                </Route>
              </Routes>
              <LightBox />
            </SocketProvider>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
