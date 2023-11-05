import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../../shared-components/UserMenu';
import Logo from '../../shared-components/Logo';

function ToolbarLayout(props) {
  return (
    <AppBar
      className={clsx('flex relative z-20 shadow-md', props.className)}
      color="default"
      sx={{
        backgroundColor: '#fff',
      }}
      position="static"
    >
      <Toolbar className="p-0 min-h-48">
        <div className="flex flex-1 px-16">
          <Link className="" to="/">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center px-8 h-full overflow-x-auto">
          <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(ToolbarLayout);
