import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import KyoPageCardedSidebarContent from './KyoPageCardedSidebarContent';

const KyoPageCardedSidebar = forwardRef((props, ref) => {
  const { open, position, variant, rootRef } = props;

  const [isOpen, setIsOpen] = useState(open);

  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));

  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);

  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={(ev) => {}}
          onClose={() => props?.onClose()}
          disableSwipeToOpen
          classes={{
            root: clsx('KyoPageCarded-sidebarWrapper', variant),
            paper: clsx(
              'KyoPageCarded-sidebar',
              variant,
              position === 'left' ? 'KyoPageCarded-leftSidebar' : 'KyoPageCarded-rightSidebar'
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'KyoPageCarded-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <KyoPageCardedSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>
      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'KyoPageCarded-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'KyoPageCarded-leftSidebar' : 'KyoPageCarded-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('KyoPageCarded-sidebar', variant),
            }}
          >
            <KyoPageCardedSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

KyoPageCardedSidebar.defaultProps = {
  open: true,
};

export default KyoPageCardedSidebar;
