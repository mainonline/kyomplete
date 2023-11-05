import Dialog from '@kyo/core/Dialog';
import { styled } from '@mui/material/styles';
import FuseMessage from '@kyo/core/AppMessage';
import Suspense from '@kyo/core/Suspense';
import AppContext from 'app/AppContext';
import { memo, useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import ToolbarLayout from './components/ToolbarLayout';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

const Root = styled('div')(() => ({
  '& .container': {
    maxWidth: `1200px`,
    width: '100%',
    margin: '0 auto',
  },
}));

function Layout(props) {
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const user = useSelector(selectUser);

  return (
    <Root className="w-full flex">
      <div className="flex flex-auto min-w-0">
        <main id="fuse-main" className="flex flex-col flex-auto min-h-full min-w-0 relative z-10">
          {user && user.role && <ToolbarLayout className="sticky top-0" />}

          <div className="flex flex-col flex-auto min-h-0 relative z-10">
            <Dialog />

            <Suspense>{useRoutes(routes)}</Suspense>

            {props.children}
          </div>
        </main>
      </div>

      <FuseMessage />
    </Root>
  );
}

export default memo(Layout);
