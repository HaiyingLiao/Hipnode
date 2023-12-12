import { GoPersonFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";

export const loggedIn = [
  {
    IconComponent: GoPersonFill,
    route: "/profile",
    label: "Profile",
  },
  {
    IconComponent: IoMdSettings,
    route: "/settings",
    label: "Settings",
  },
];

export const loggedOut = [
  {
    IconComponent: BiLogIn,
    route: "/login",
    label: "Login",
  },
];
