import { type ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hook';
import { setIsLoggedIn, setUser } from '../redux/slices';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ApiSdk from '../api/apiSdk';

export function WithSession({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, isLoggedIn } = useAppSelector((state) => state.session);
  const dispatch = useDispatch();
  const api = new ApiSdk();

  useEffect(() => {
    if (token) {
      api.checkUser(token).then((user) => {
        if (user) {
          dispatch(setUser(user));
          dispatch(setIsLoggedIn(true));
          if (location.pathname === '/login') {
            navigate('/');
          }
        } else {
          dispatch(
            setUser({
              _id: '',
              email: '',
              password: '',
              sub: '',
              username: '',
              overallScore: 0,
              graduated: false,
            }),
          );
          dispatch(setIsLoggedIn(false));
        }
      });
    } else {
      dispatch(
        setUser({
          _id: '',
          email: '',
          password: '',
          sub: '',
          username: '',
          overallScore: 0,
          graduated: false,
        }),
      );
      dispatch(setIsLoggedIn(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token, navigate, location.pathname]);

  if (
    !isLoggedIn &&
    location.pathname !== '/login' &&
    location.pathname !== '/signup'
  ) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
