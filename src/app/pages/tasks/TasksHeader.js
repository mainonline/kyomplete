import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@kyo/core/NavLinkAdapter';
import FuseSvgIcon from '@kyo/core/SvgIcon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, selectTasks, setSearch } from './store/tasksSlice';

function TasksHeader(props) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const search = useSelector(selectSearch);
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col sm:flex-row item-center sm:items-start space-y-16 sm:space-y-0 p-24 sm:p-32 w-full border-b-1 flex items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-12">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          Tasks
        </Typography>
        <Typography
          component={motion.span}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          delay={500}
          className="text-14 font-medium ml-2"
          color="text.secondary"
        >
          {`${tasks?.totalResults} total tasks`}
        </Typography>
      </div>

      <div className="flex items-center -mx-8">
        {pathname === '/tasks' && (
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

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
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
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
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="mx-8">Add Task</span>
        </Button>
      </div>
    </div>
  );
}

export default TasksHeader;
