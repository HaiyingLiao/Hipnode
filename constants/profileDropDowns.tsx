import { GoPersonFill } from 'react-icons/go';
import { IoMdSettings } from 'react-icons/io';
import { BiLogIn, BiLogOut } from 'react-icons/bi';

export const loggedIn = [
  {
    IconComponent: GoPersonFill,
    route: '/profile',
    label: 'Profile',
  },
  {
    IconComponent: IoMdSettings,
    route: '/settings',
    label: 'Settings',
  },
  {
    IconComponent: BiLogOut,
    route: '',
    label: 'logout',
  },
];

export const loggedOut = [
  {
    IconComponent: BiLogIn,
    route: '/login',
    label: 'Login',
  },
];
