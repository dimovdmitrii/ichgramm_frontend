import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./pages/Navigation";
import "./styles/style.css";
import { getCurrentUser } from "./store/auth/authOperations";
import { selectTokens, selectUser } from "./store/auth/authSelectors";

function App() {
  const dispatch = useDispatch();
  const hasTokens = useSelector(selectTokens);
  const user = useSelector(selectUser);

  // Восстанавливаем данные пользователя при загрузке приложения, если есть токены, но нет данных пользователя
  useEffect(() => {
    if (hasTokens && !user) {
      dispatch(getCurrentUser() as any).catch((error) => {
        console.error("Failed to restore user session:", error);
      });
    }
  }, [dispatch, hasTokens, user]);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
