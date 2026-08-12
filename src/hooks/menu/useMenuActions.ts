import useDarkMode from "@/store/darkmode.store";
import { logout as clearAuthSession } from "@/api/auth.api";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export const useMenuActions = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore(state => state.clearUser);

  const refreshPage = () => {
    window.location.reload();
  };

  const logout = async () => {
    clearAuthSession();
    clearUser();
    navigate("/");
  };

  const { toggleMode } = useDarkMode(
    useShallow(state => ({
      toggleMode: state.toggleMode,
    })),
  );

  return {
    refreshPage,
    logout,
    toggleTheme: toggleMode,
  };
};
