import Header from "./components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";
import AllRoutes from "./AllRoutes";

function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    } else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, error]);

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <AllRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
