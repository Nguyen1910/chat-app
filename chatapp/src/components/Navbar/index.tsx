import HomeIcon from "../../assets/svg/HomeIcon";
import SearchIcon from "../../assets/svg/SearchIcon";
import SettingIcon from "../../assets/svg/SettingIcon";
import ShareIcon from "../../assets/svg/ShareIcon";
import logo from "../../assets/svg/logo.jpg";
import SunIcon from "../../assets/svg/SunIcon";
import MoonIcon from "../../assets/svg/MoonIcon";
import { useAppContext } from "../../Context/AppProvider";
import SignOutIcon from "../../assets/svg/SignOutIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthProvider";
import BellIcon from "../../assets/svg/BellIcon";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector/authSelector";
import { useAppDispatch } from "../../store/store";
import { setProfile } from "../../store/features/authSlice";

const MENU_ICON = [
  {
    title: "Home",
    icon: <HomeIcon color="white" className="scale-125" />,
    path: "/",
  },
  {
    title: "Search",
    icon: <SearchIcon color="white" className="" />,
    path: "/search",
  },
  {
    title: "Notify",
    icon: <BellIcon color="white" className="" />,
    path: "/notify",
  },
  {
    title: "Share",
    icon: <ShareIcon color="white" className="" />,
    path: "/share",
  },
  {
    title: "Setting",
    icon: <SettingIcon color="white" className="" />,
    path: "/setting",
  },
  {
    title: "Logout",
    icon: <SignOutIcon color="white" className="" />,
    path: "/login",
  },
];

const Navbar = () => {
  const { theme, setTheme } = useAppContext();
  const { logout } = useAuthContext();
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="w-[68px] h-screen dark:bg-[#1F1D1D] flex flex-col justify-between py-6">
      <ul className="flex flex-col justify-center items-center">
        <img src={logo} alt="" className="mb-6" />
        {MENU_ICON.map((item, index) => (
          <li
            key={index}
            className={`flex flex-col items-center gap-2 cursor-pointer w-full py-2.5 duration-500 ${
              pathname === item.path && "bg-gray-800"
            }`}
            onClick={() => {
              if (item.path === "/login") {
                localStorage.removeItem("access_token");
                dispatch(setProfile(null));
                logout();
                return;
              }
              navigate(item.path);
            }}
          >
            {item.icon}
            <label className="text-xs cursor-pointer">{item.title}</label>
          </li>
        ))}
      </ul>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="rounded-3xl bg-black p-1 flex flex-col cursor-pointer justify-center items-center">
          <div
            className={`rounded-full px-1 py-1.5 ${
              theme === "light" && "bg-[#1F1D1D]"
            } duration-500`}
            onClick={() => setTheme("light")}
          >
            <SunIcon color="white" />
          </div>
          <div
            className={`rounded-full px-1 py-1.5 ${
              theme === "dark" && "bg-[#1F1D1D]"
            } duration-500`}
            onClick={() => setTheme("dark")}
          >
            <MoonIcon color="white" />
          </div>
        </div>
        <img
          src={user?.avatar}
          alt=""
          className="rounded-full overflow-hidden w-12 h-12 object-cover"
        />
      </div>
    </div>
  );
};

export default Navbar;
