import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { useAppSelector } from "../../redux/hook";
import NavButton from "./NavButton";
import HamburgerMenu from "./HamburgerMenu";
import LogoutIcon from "@mui/icons-material/Logout";

interface AppHeaderProps {
  onSignOutClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onSignOutClick }) => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { isLoggedIn } = useAppSelector((state) => state.session);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <NavButton href="/" label="Fraud Ninja" />
          {isLoggedIn && (
            <LogoutIcon onClick={onSignOutClick} sx={{ cursor: "pointer" }} />
          )}
        </Typography>

        {isLoggedIn && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <NavButton href="/play" label="Play Game" />
            <NavButton href="/resources" label="Resources" />
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Avatar />
          </IconButton>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {userInfo.username}
          </Typography>
        </div>
        {isLoggedIn && <HamburgerMenu onSignOutClick={onSignOutClick} />}
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
