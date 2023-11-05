import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SvgIcon from '@kyo/core/SvgIcon';
import { selectUser } from 'app/store/userSlice';

function UserMenu(props) {
  const user = useSelector(selectUser);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.name}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="text.secondary">
            {user?.role?.toString()}
          </Typography>
        </div>

        {user?.data?.photoURL ? (
          <Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="md:mx-4">{user?.data?.displayName?.[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <MenuItem
          component={NavLink}
          to="/sign-out"
          onClick={() => {
            userMenuClose();
          }}
        >
          <ListItemIcon className="min-w-40">
            <SvgIcon>heroicons-outline:logout</SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Popover>
    </>
  );
}

export default UserMenu;
