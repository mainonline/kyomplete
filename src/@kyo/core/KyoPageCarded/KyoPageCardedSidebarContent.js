import { useSelector } from 'react-redux';
import FuseScrollbars from '@kyo/core/KyoScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/kyo/settingsSlice';
import clsx from 'clsx';

function KyoPageCardedSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <FuseScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div
            className={clsx(
              'KyoPageCarded-sidebarHeader',
              props.variant,
              props.sidebarInner && 'KyoPageCarded-sidebarHeaderInnerSidebar'
            )}
          >
            {props.header}
          </div>
        </ThemeProvider>
      )}

      {props.content && <div className="KyoPageCarded-sidebarContent">{props.content}</div>}
    </FuseScrollbars>
  );
}

export default KyoPageCardedSidebarContent;
