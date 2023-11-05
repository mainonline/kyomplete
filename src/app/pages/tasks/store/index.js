import { combineReducers } from '@reduxjs/toolkit';
import tags from './tagsSlice';
import tasks from './tasksSlice';
import task from './taskSlice';
import labels from './labelsSlice';
import projects from './projectsSlice';
import users from './usersSlice';

const reducer = combineReducers({
  tags,
  tasks,
  task,
  labels,
  projects,
  users,
});

export default reducer;
