import { Container } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import { WithSession } from "./components/WithSession";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";
import FullScreenSpinner from "./components/FullScreenSpinner";
import { withStore } from "./components/withStore";
import AppHeader from "./components/NavBar/AppHeader";
import { useAppDispatch } from "./redux/hook";
import { setToken } from "./redux/slices";

function App() {
  const dispatch = useAppDispatch();
  return (
    <Router>
      <WithSession>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <Container>
            <AppHeader
              onSignOutClick={() => dispatch(setToken(""))}
            ></AppHeader>
            <Suspense fallback={<FullScreenSpinner />}>
              <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/play" element={<PlayPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </Suspense>
          </Container>
        </SnackbarProvider>
      </WithSession>
    </Router>
  );
}

export default withStore(App);
