import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import { AppStartLoading } from "./components/common/Loading";
import { useUserStore } from "@/store/user.store";
import { getCurrentUser } from "@/api/auth.api";
import { tokenStorage } from "@/api/http.api";

const App = () => {
  const [appReady, setAppReady] = useState(false);

  const setUser = useUserStore(state => state.setUser);
  const clearUser = useUserStore(state => state.clearUser);

  useEffect(() => {
    const restoreSession = async () => {
      if (!tokenStorage.get()) {
        clearUser();
        setAppReady(true);
        return;
      }
      try {
        setUser(await getCurrentUser());
      } catch {
        tokenStorage.clear();
        clearUser();
      } finally {
        setAppReady(true);
      }
    };
    void restoreSession();
  }, [setUser, clearUser]);

  if (!appReady) return <AppStartLoading />;

  return <RouterProvider router={MainRoutes} />;
};

export default App;
