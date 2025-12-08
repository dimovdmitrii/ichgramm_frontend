import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "./store/auth/authOperations";

import { selectTokens } from "./store/auth/authSelectors";

import Navigation from "./pages/Navigation";
import "./styles/style.css";

function App() {
  const isToken = useSelector(selectTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isToken) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isToken]);
  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
