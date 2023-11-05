import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
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

function TaskListItem(props) {
  const { data, index } = props;
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={data.id} index={index} type="list">
      {(provided, snapshot) => (
        <>
          <ListItem
            className={clsx(snapshot.isDragging ? 'shadow-lg' : 'shadow', 'px-40 py-12 group')}
            sx={{ bgcolor: 'background.paper' }}
            button
            component={NavLinkAdapter}
            to={`/tasks/${data.id}`}
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
                sx={{ color: data.completed ? 'green' : 'text.disabled' }}
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  dispatch(updateTask({ ...data, completed: !data.completed }));
                }}
              >
                <SvgIcon>heroicons-outline:check-circle</SvgIcon>
              </IconButton>
            </ListItemIcon>
            <ListItemText className={data.completed ? "line-through" : ""} classes={{ root: 'm-0', primary: 'truncate' }} primary={data.title} />

            <ListItemText
              classes={{ root: 'm-0', primary: 'truncate' }}
              className="rounded-full px-8 py-4 bg-gray-200 max-w-112 flex items-center justify-center text-center"
              primary={data.status === 'todo' ? 'not started' : data.status}
            />

            {/* <ListItemText classes={{ root: 'm-0', primary: 'truncate' }} primary={data.order} /> */}
            <div className="flex items-center">
              <div>
                {data.priority === 'low' && (
                  <SvgIcon className="text-green icon-size-16 mx-12">
                    heroicons-outline:arrow-narrow-down
                  </SvgIcon>
                )}
                {data.priority === 'high' && (
                  <SvgIcon className="text-red icon-size-16 mx-12">
                    heroicons-outline:arrow-narrow-up
                  </SvgIcon>
                )}
                {data.priority === 'medium' && (
                  <SvgIcon className="text-orange-400 icon-size-16 mx-12">
                    heroicons-outline:refresh
                  </SvgIcon>
                )}
              </div>

              {data.dueDate && (
                <Typography className="text-12 whitespace-nowrap" color="text.secondary">
                  {format(new Date(data.dueDate), 'LLL dd')}
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
