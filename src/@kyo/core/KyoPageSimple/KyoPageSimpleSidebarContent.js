import { useSelector } from 'react-redux';
import KyoScrollbars from '@kyo/core/KyoScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/kyo/settingsSlice';
import clsx from 'clsx';

function KyoPageSimpleSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <KyoScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={clsx('KyoPageSimple-sidebarHeader', props.variant)}>{props.header}</div>
        </ThemeProvider>
      )}

      {props.content && <div className="KyoPageSimple-sidebarContent">{props.content}</div>}
    </KyoScrollbars>
  );
}

export default KyoPageSimpleSidebarContent;
