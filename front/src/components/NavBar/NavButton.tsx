import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

interface NavButtonProps {
  href: string;
  label: string;
  inHamburger?: boolean;
  notImplemented?: boolean;
}

const NavButton = ({ href, label, notImplemented }: NavButtonProps) => {
  return (
    <Tooltip title={notImplemented ? "Coming soon" : ""}>
      <Button
        color="inherit"
        component={Link}
        to={!notImplemented ? href : "#"}
      >
        <span className="">{label}</span>
      </Button>
    </Tooltip>
  );
};

export default NavButton;
