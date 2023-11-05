import KyoPageSimple from '@kyo/core/KyoPageSimple';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@kyo/hooks';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@kyo/hooks/useThemeMediaQuery';
import TasksSidebarContent from './TasksSidebarContent';
import Labels from './Labels';
import TasksHeader from './TasksHeader';
import TasksList from './TasksList';
import LabelsDialog from './dialogs/labels/LabelsDialog';
import reducer from './store';
import { getTags } from './store/tagsSlice';
import { getTasks } from './store/tasksSlice';
import { getLabels, selectLeftSidebarOpen, closeLeftSidebar } from './store/labelsSlice';
import { getProjects } from './store/projectsSlice';
import { getUsers } from './store/usersSlice';

const Root = styled(KyoPageSimple)(({ theme }) => ({
  '& .KyoPageSimple-header': {
    backgroundColor: theme.palette.background.paper,
  },
}));

function TasksApp(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();
  const leftSidebarOpen = useSelector(selectLeftSidebarOpen);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  useDeepCompareEffect(() => {
    dispatch(getTasks({}));
    dispatch(getTags());
    dispatch(getLabels());
    dispatch(getProjects());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setRightSidebarOpen(Boolean(routeParams.id));
  }, [routeParams]);

  return (
    <Root
      header={<TasksHeader pageLayout={pageLayout} />}
      content={
        <>
          <TasksList />
          <LabelsDialog />
        </>
      }
      ref={pageLayout}
      rightSidebarContent={<TasksSidebarContent />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={640}
      leftSidebarOpen={leftSidebarOpen}
      leftSidebarOnClose={() => dispatch(closeLeftSidebar())}
      leftSidebarContent={<Labels />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('tasksApp', reducer)(TasksApp);
