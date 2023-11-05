import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useDebounce from '@kyo/hooks/useDebounce';
import TablePagination from '@mui/material/TablePagination';
import {
  reorderList,
  selectTasks,
  selectSearch,
  getTasks,
  selectLoading,
} from './store/tasksSlice';
import TaskListItem from './TaskListItem';

function TasksList(props) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const search = useSelector(selectSearch);
  const loading = useSelector(selectLoading);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  console.log('tasks', tasks);

  const getFilteredTasks = () => {
    dispatch(
      getTasks({
        limit: rowsPerPage,
        page: page + 1,
        search,
      })
    );
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    dispatch(
      getTasks({
        limit: rowsPerPage,
        page: value + 1,
        search,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(
      getTasks({
        limit: event.target.value,
        page: 1,
        search,
      })
    );
  };

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search.length !== 0) {
      setPage(0);
      getFilteredTasks();
    } else if (!loading) {
      getFilteredTasks();
    }
  }, [debouncedSearch]);

  if (!tasks) {
    return null;
  }

  if (tasks?.results?.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no tasks!
        </Typography>
      </div>
    );
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    dispatch(
      reorderList({
        currentOrder: result.source.index,
        newOrder: result.destination.index,
      })
    );
  }
  return (
    <div className="flex flex-col w-full">
      <List className="w-full m-0 p-0">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" type="list" direction="vertical">
            {(provided) => (
              <>
                <div ref={provided.innerRef}>
                  {tasks?.results?.map((item) => (
                    <TaskListItem item={item} index={item.order} key={item.id} />
                  ))}
                </div>
                {provided.placeholder}
              </>
            )}
          </Droppable>
        </DragDropContext>
      </List>
      {tasks?.totalResults > 20 && (
        <TablePagination
          className="shrink-0 border-t-1"
          component="div"
          count={parseInt(tasks?.totalResults, 10)}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}

export default TasksList;
