import { useLocation, useNavigate } from "react-router-dom";
import { Home, CalendarClock, Plane, Megaphone, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "홈",
    path: "employee/companymain",
    icon: <Home className="h-5 w-5" />,
  },

  {
    title: "출퇴근기록",
    path: "employee/calendar",
    icon: <CalendarClock className="h-5 w-5" />,
  },

  {
    title: "휴가",
    path: "employee/myvacation",
    icon: <Plane className="h-5 w-5" />,
  },

  {
    title: "메뉴",
    path: "employee/employeemenu",
    icon: <Menu className="h-5 w-5" />,
  },
];

interface EmployeeMenuBarProps {
  onLogout: () => void;
}

const BottomNavButton = ({
  icon,
  title,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  active: boolean;
}) => (
  <Button
    onClick={onClick}
    className={`flex h-full flex-1 flex-col items-center justify-center gap-1 rounded-none px-2 py-3 text-xs dark:bg-dark-bg ${active ? "font-semibold text-point-color" : "text-white"} `}
  >
    {icon}
    {title}
  </Button>
);

const EmployeeMenuBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const companyCode = pathname.split("/")[1];

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-14 w-full max-w-screen-sm -translate-x-1/2 border-t border-gray-200 bg-white-card-bg dark:border-gray-600 dark:bg-dark-bg">
      {navItems.map(item => {
        const pathMatch = pathname.includes(`/${companyCode}/${item.path}`);
        return (
          <BottomNavButton
            key={item.title}
            icon={item.icon}
            title={item.title}
            onClick={() => navigate(`/${companyCode}/${item.path}`)}
            active={pathMatch}
          />
        );
      })}
    </nav>
  );
};

export default EmployeeMenuBar;
