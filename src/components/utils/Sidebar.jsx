import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { FaSignInAlt } from "react-icons/fa";
import logo from "../../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="h-screen sticky top-0 border-r-2 border-secondary/20">
      <div className="flex flex-col items-center gap-5 h-full py-5">
      <div className="tooltip tooltip-right" data-tip="Dashboard">
        <img src={logo} alt="logo" />
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group bg-primary text-white cursor-pointer transition-all"
          }
        >
          <div className="tooltip tooltip-right" data-tip="add Task">
          <SquaresPlusIcon className="h-7 w-7 group-hover:text-white" />
          </div>
        </NavLink>
        <NavLink
          to="/signUp"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group bg-primary text-white cursor-pointer transition-all"
          }
        >
            <div className="tooltip tooltip-right" data-tip="Sign Up">
          <FaSignInAlt className="h-7 w-7 group-hover:text-white " />
          </div>
        </NavLink>
        <NavLink
          to="/signIn"
          className={({ isActive }) =>
            isActive
              ? "p-2 rounded-2xl bg-primary text-white cursor-pointer"
              : "p-2 rounded-2xl group bg-primary text-white cursor-pointer transition-all"
          }
        >
            <div className="tooltip tooltip-right" data-tip="Sign In">
          <VscSignIn className="h-7 w-7 group-hover:text-white " />
          </div>
        </NavLink>
        <button className="bg-primary p-2 text-white rounded-2xl ">
        <div className="tooltip tooltip-right" data-tip="Sign Out">
          <VscSignOut
            onClick={handleSignOut}
            className="h-7 w-7 group-hover:text-white "
          />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
