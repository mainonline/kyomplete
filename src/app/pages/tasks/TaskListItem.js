import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import NavLinkAdapter from '@kyo/core/NavLinkAdapter';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import SvgIcon from '@kyo/core/SvgIcon';
import format from 'date-fns/format';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import clsx from 'clsx';
import { updateTask } from './store/taskSlice';
import TaskProgressSelector from './task/TaskProgressSelector';

function TaskListItem(props) {
  const { item, index } = props;
  const dispatch = useDispatch();

  const [status, setStatus] = useState(item.status);

  const handleChange = (v) => {
    setStatus(v);

    if (v === 'done') {
      dispatch(updateTask({ id: item.id, status: v, completed: true }));
    } else {
      dispatch(updateTask({ id: item.id, status: v, completed: false }));
    }
  };

  return (
    <Draggable draggableId={item.id} index={index} type="list">
      {(provided, snapshot) => (
        <>
          <ListItem
            className={clsx(snapshot.isDragging ? 'shadow-lg' : 'shadow', 'px-40 py-12 group')}
            sx={{ bgcolor: 'background.paper' }}
            button
            component={NavLinkAdapter}
            to={`/tasks/${item.id}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className="md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex"
              {...provided.dragHandleProps}
            >
              <SvgIcon sx={{ color: 'text.disabled' }} size={20}>
                heroicons-solid:menu
              </SvgIcon>
            </div>
            <ListItemIcon className="min-w-40 -ml-10 mr-8">
              <IconButton
                sx={{ color: item.completed ? 'green' : 'text.disabled' }}
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  dispatch(updateTask({ ...item, completed: !item.completed }));
                }}
              >
                <SvgIcon>heroicons-outline:check-circle</SvgIcon>
              </IconButton>
            </ListItemIcon>
            <ListItemText
              className={item.completed ? 'line-through' : ''}
              classes={{ root: 'm-0', primary: 'truncate' }}
              primary={item.title}
            />
            <TaskProgressSelector value={status} onChange={(v) => handleChange(v)} />
            <div className="flex items-center">
              <div>
                {item.priority === 'low' && (
                  <SvgIcon className="text-green icon-size-16 mx-12">
                    heroicons-outline:arrow-narrow-down
                  </SvgIcon>
                )}
                {item.priority === 'high' && (
                  <SvgIcon className="text-red icon-size-16 mx-12">
                    heroicons-outline:arrow-narrow-up
                  </SvgIcon>
                )}
                {item.priority === 'medium' && (
                  <SvgIcon className="text-orange-400 icon-size-16 mx-12">
                    heroicons-outline:refresh
                  </SvgIcon>
                )}
              </div>

              {item.dueDate && (
                <Typography className="text-12 whitespace-nowrap" color="text.secondary">
                  {format(new Date(item.dueDate), 'LLL dd')}
                </Typography>
              )}
            </div>
          </ListItem>
          <Divider />
        </>
      )}
    </Draggable>
  );
}

export default TaskListItem;
