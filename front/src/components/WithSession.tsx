import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import { setIsLoggedIn, setUser } from "../redux/slices";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { checkUser } from "../api";

export function WithSession({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAppSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      checkUser(token).then((user) => {
        if (user) {
          dispatch(setUser(user));
          dispatch(setIsLoggedIn(true));
          if (location.pathname === "/login") {
            navigate("/");
          }
        } else {
          dispatch(
            setUser({
              _id: "",
              email: "",
              password: "",
              sub: "",
              username: "",
            })
          );
          dispatch(setIsLoggedIn(false));
        }
      });
    } else {
      dispatch(
        setUser({
          _id: "",
          email: "",
          password: "",
          sub: "",
          username: "",
        })
      );
      dispatch(setIsLoggedIn(false));
    }
  }, [dispatch, token, navigate, location.pathname]);

  if (
    !isLoggedIn &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
