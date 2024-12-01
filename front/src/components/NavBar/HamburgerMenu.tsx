import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, type MouseEvent } from 'react';
import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import type { User } from '@shared_types';

interface HamburgerMenuProps {
  userInfo: User;
  onSignOutClick: () => void;
}

function HamburgerMenu({ onSignOutClick, userInfo }: HamburgerMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  if (userInfo.username)
    return (
      <div>
        <IconButton onClick={handleClick} disableRipple>
          <div className=''>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {userInfo.username[0].toUpperCase()}
            </Avatar>
          </div>
        </IconButton>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          <MenuItem onClick={onSignOutClick}>
            <Button>Logout</Button>
          </MenuItem>
        </Menu>
      </div>
    );
  else return <></>;
}

export default HamburgerMenu;
