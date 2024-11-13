import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, type MouseEvent } from 'react';
import NavButton from './NavButton';
import { Button } from '@mui/material';

interface HamburgerMenuProps {
  onSignOutClick: () => void;
}

function HamburgerMenu({ onSignOutClick }: HamburgerMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <IconButton onClick={handleClick} disableRipple>
        <div className=''>
          <MenuIcon fontSize='large' style={{ color: '#fdf8f1' }} />
        </div>
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: 'fit-content',
            zIndex: '99999',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavButton label='Profile' href='/' inHamburger notImplemented />
        </MenuItem>
        <MenuItem onClick={onSignOutClick}>
          <Button>Logout</Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default HamburgerMenu;
