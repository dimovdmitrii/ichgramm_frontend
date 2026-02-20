import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./pages/Navigation";
import "./styles/style.css";
import { getCurrentUser, loginUser } from "./store/auth/authOperations";
import { selectTokens, selectUser } from "./store/auth/authSelectors";

const AUTO_LOGIN = {
  username: "dima1",
  password: "Qwer123!",
};

const SKIP_AUTO_LOGIN_KEY = "skipAutoLogin";

function App() {
  const dispatch = useDispatch();
  const hasTokens = useSelector(selectTokens);
  const user = useSelector(selectUser);

  // На задеплоенном сайте (production): при отсутствии сессии сразу логиним тестового пользователя.
  // Не делаем авто-логин, если пользователь уже выходил (чтобы мог залогиниться/зарегистрироваться сам).
  useEffect(() => {
    const userLoggedOut = typeof sessionStorage !== "undefined" && sessionStorage.getItem(SKIP_AUTO_LOGIN_KEY);
    if (import.meta.env.PROD && !hasTokens && !user && !userLoggedOut) {
      const result = dispatch(loginUser(AUTO_LOGIN) as unknown as Parameters<typeof dispatch>[0]);
      (result as unknown as Promise<unknown>).catch((error: unknown) => {
        console.error("Auto-login failed:", error);
      });
    }
  }, [dispatch, hasTokens, user]);

  // Восстанавливаем данные пользователя при загрузке приложения, если есть токены, но нет данных пользователя
  useEffect(() => {
    if (hasTokens && !user) {
      dispatch(getCurrentUser() as any).catch((error: unknown) => {
        console.error("Failed to restore user session:", error);
      });
    }
  }, [dispatch, hasTokens, user]);

  // Keep-alive: пинг бэкенда каждые 14 минут, чтобы Render (free tier) не засыпал
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL;
    if (!baseUrl) return;
    // baseURL уже содержит /api (например http://localhost:3000/api), эндпоинт — /health
    const healthUrl = baseUrl.endsWith("/api") ? `${baseUrl}/health` : `${baseUrl}/api/health`;
    const ping = () => fetch(healthUrl).catch(() => {});
    ping();
    const interval = setInterval(ping, 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
