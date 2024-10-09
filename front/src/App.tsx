import "./App.css";
import { Container, AppBar, Typography } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Container>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          FraudNinja
        </Typography>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Container>
    </Container>
  );
}

export default App;