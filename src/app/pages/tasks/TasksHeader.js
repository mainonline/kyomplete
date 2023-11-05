import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@kyo/core/NavLinkAdapter';
import SvgIcon from '@kyo/core/SvgIcon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { selectLeftSidebarOpen, toggleLeftSidebar } from './store/labelsSlice';
import { selectSearch, selectTasks, setSearch } from './store/tasksSlice';

function TasksHeader(props) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const search = useSelector(selectSearch);
  const leftSidebarOpen = useSelector(selectLeftSidebarOpen);
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col sm:flex-row item-center sm:items-start space-y-16 sm:space-y-0 p-24 sm:p-32 w-full border-b-1 flex items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-12">
        <div className="flex flex-col">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-18 md:text-24 font-extrabold tracking-tight leading-none"
          >
            Tasks
          </Typography>
          <Typography
            component={motion.span}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            delay={500}
            className="text-10 font-medium ml-2"
            color="text.secondary"
          >
            {`${tasks?.totalResults || 0} total tasks`}
          </Typography>
        </div>
        <IconButton className="m-4" onClick={() => dispatch(toggleLeftSidebar())} size="large">
          <SvgIcon color="action">heroicons-outline:adjustments</SvgIcon>
        </IconButton>
      </div>

      <div className="flex items-center -mx-8">
        {pathname === '/tasks' && (
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="hidden sm:flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <SvgIcon color="disabled">heroicons-solid:search</SvgIcon>

            <Input
              placeholder="Search..."
              className="flex flex-1"
              disableUnderline
              fullWidth
              value={search}
              inputProps={{
                'aria-label': 'Поиск...',
              }}
              onChange={(ev) => dispatch(setSearch(ev))}
            />
          </Paper>
        )}
        <Button
          size="small"
          className="mx-8 whitespace-nowrap"
          component={NavLinkAdapter}
          to="new/task"
        >
          <SvgIcon size={20}>heroicons-outline:plus</SvgIcon>
          <span className="mx-8">Add Project</span>
        </Button>
        <Button
          size="small"
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          component={NavLinkAdapter}
          to="new/task"
        >
          <SvgIcon size={20}>heroicons-outline:plus</SvgIcon>
          <span className="mx-8">Add Task</span>
        </Button>
      </div>
    </div>
  );
}

export default TasksHeader;
