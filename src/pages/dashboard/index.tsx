import logo from '../../assets/icons/logo.svg';
import { memo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BellIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  LayoutDashboard,
  Users,
  User,
  BookOpen,
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="w-full h-16 flex items-center justify-between px-6 bg-[#071828] text-white">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Logo"
            className="w-10 cursor-pointer"
            onClick={() => navigate('/')}
          />
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
            {isSidebarCollapsed ? (
              <MenuIcon className="w-6 h-6" />
            ) : (
              <XIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <BellIcon className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1 rounded-full">
              9+
            </span>
          </div>
          <button className="flex items-center gap-1 text-sm hover:text-red-400">
            <LogOutIcon className="w-4 h-4" />
            Chiqish
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${isSidebarCollapsed ? 'w-20' : 'w-64'
            } transition-all duration-300 bg-[#071828] text-white flex flex-col py-6 px-2`}
        >
          <ul className="space-y-2">
            <li>
              <NavLink
                end
                to=""
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md font-medium ${isActive ? 'bg-[#b38754] text-black' : 'hover:bg-[#132c45]'
                  }`
                }
              >
                <BookOpen className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Guruhlar</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="yonalishlar"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md font-medium ${isActive ? 'bg-[#b38754] text-black' : 'hover:bg-[#132c45]'
                  }`
                }
              >
                <LayoutDashboard className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Yo'nalishlar</span>}
              </NavLink>
            </li>


            <li>
              <NavLink
                to="oquvchilar"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md font-medium ${isActive ? 'bg-[#b38754] text-black' : 'hover:bg-[#132c45]'
                  }`
                }
              >
                <Users className="w-5 h-5" />
                {!isSidebarCollapsed && <span>O'quvchilar</span>}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="oqituvchilar"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md font-medium ${isActive ? 'bg-[#b38754] text-black' : 'hover:bg-[#132c45]'
                  }`
                }
              >
                <User className="w-5 h-5" />
                {!isSidebarCollapsed && <span>O'qituvchilar</span>}
              </NavLink>
            </li>
          </ul>
        </aside>

        <main className="flex-1 bg-white overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default memo(Dashboard);
